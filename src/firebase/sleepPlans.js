// src/firebase/sleepPlans.js
import { collection, doc, addDoc, updateDoc, getDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from './index';

// Create sleep plan
export const createSleepPlan = async (sleepPlanData) => {
  try {
    const newSleepPlan = {
      ...sleepPlanData,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'sleepPlans'), newSleepPlan);
    return { id: docRef.id, ...newSleepPlan };
  } catch (error) {
    console.error("Error creating sleep plan:", error);
    throw error;
  }
};

// Get active sleep plan for a baby
export const getActiveSleepPlan = async (babyId) => {
  try {
    const sleepPlansRef = collection(db, 'sleepPlans');
    const q = query(
      sleepPlansRef, 
      where('babyId', '==', babyId),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting active sleep plan:", error);
    throw error;
  }
};

// Get all sleep plans for a baby
export const getSleepPlans = async (babyId) => {
  try {
    const sleepPlansRef = collection(db, 'sleepPlans');
    const q = query(
      sleepPlansRef, 
      where('babyId', '==', babyId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const sleepPlans = [];
    querySnapshot.forEach((doc) => {
      sleepPlans.push({ id: doc.id, ...doc.data() });
    });
    
    return sleepPlans;
  } catch (error) {
    console.error("Error getting sleep plans:", error);
    throw error;
  }
};

// Get sleep plan by ID
export const getSleepPlan = async (sleepPlanId) => {
  try {
    const sleepPlanRef = doc(db, 'sleepPlans', sleepPlanId);
    const sleepPlanSnap = await getDoc(sleepPlanRef);
    
    if (sleepPlanSnap.exists()) {
      return { id: sleepPlanSnap.id, ...sleepPlanSnap.data() };
    } else {
      throw new Error("Sleep plan not found");
    }
  } catch (error) {
    console.error("Error getting sleep plan:", error);
    throw error;
  }
};

// Update sleep plan
export const updateSleepPlan = async (sleepPlanId, sleepPlanData) => {
  try {
    const sleepPlanRef = doc(db, 'sleepPlans', sleepPlanId);
    await updateDoc(sleepPlanRef, {
      ...sleepPlanData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating sleep plan:", error);
    throw error;
  }
};

// Archive sleep plan
export const archiveSleepPlan = async (sleepPlanId) => {
  try {
    const sleepPlanRef = doc(db, 'sleepPlans', sleepPlanId);
    await updateDoc(sleepPlanRef, {
      status: 'archived',
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error archiving sleep plan:", error);
    throw error;
  }
};

// Track progress against sleep plan
export const trackSleepPlanProgress = async (sleepPlanId, progressData) => {
  try {
    const sleepPlanRef = doc(db, 'sleepPlans', sleepPlanId);
    const sleepPlanSnap = await getDoc(sleepPlanRef);
    
    if (sleepPlanSnap.exists()) {
      const sleepPlanData = sleepPlanSnap.data();
      const progress = sleepPlanData.progress || [];
      
      // Add new progress entry
      const updatedProgress = [
        ...progress,
        {
          ...progressData,
          date: new Date(),
          createdAt: serverTimestamp()
        }
      ];
      
      await updateDoc(sleepPlanRef, {
        progress: updatedProgress,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } else {
      throw new Error("Sleep plan not found");
    }
  } catch (error) {
    console.error("Error tracking sleep plan progress:", error);
    throw error;
  }
};
