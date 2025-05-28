// src/contexts/FirebaseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  getUserProfile,
  getBabies,
  getActiveSleepPlan,
  getSleepLogs
} from '../firebase';

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [babies, setBabies] = useState([]);
  const [activeBaby, setActiveBaby] = useState(null);
  const [activeSleepPlan, setActiveSleepPlan] = useState(null);
  const [recentSleepLogs, setRecentSleepLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get user profile
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          
          // Get babies
          const babyProfiles = await getBabies(user.uid);
          setBabies(babyProfiles);
          
          // Set active baby to first baby if available
          if (babyProfiles.length > 0) {
            setActiveBaby(babyProfiles[0]);
            
            // Get active sleep plan for this baby
            const sleepPlan = await getActiveSleepPlan(babyProfiles[0].id);
            setActiveSleepPlan(sleepPlan);
            
            // Get recent sleep logs
            const now = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            
            const logs = await getSleepLogs(babyProfiles[0].id, oneWeekAgo, now);
            setRecentSleepLogs(logs);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        // Reset state when user logs out
        setUserProfile(null);
        setBabies([]);
        setActiveBaby(null);
        setActiveSleepPlan(null);
        setRecentSleepLogs([]);
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Function to switch active baby
  const switchActiveBaby = async (babyId) => {
    const baby = babies.find(b => b.id === babyId);
    if (baby) {
      setActiveBaby(baby);
      
      // Get active sleep plan for this baby
      const sleepPlan = await getActiveSleepPlan(baby.id);
      setActiveSleepPlan(sleepPlan);
      
      // Get recent sleep logs
      const now = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const logs = await getSleepLogs(baby.id, oneWeekAgo, now);
      setRecentSleepLogs(logs);
    }
  };
  
  const value = {
    currentUser,
    userProfile,
    babies,
    activeBaby,
    switchActiveBaby,
    activeSleepPlan,
    recentSleepLogs,
    loading
  };
  
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
