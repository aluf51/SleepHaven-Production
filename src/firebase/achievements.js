// src/firebase/achievements.js
import { collection, doc, addDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './index';

// Get achievements for a baby
export const getAchievements = async (babyId) => {
  try {
    const achievementsRef = collection(db, 'achievements');
    const q = query(
      achievementsRef, 
      where('babyId', '==', babyId),
      orderBy('awardedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const achievements = [];
    querySnapshot.forEach((doc) => {
      achievements.push({ id: doc.id, ...doc.data() });
    });
    
    return achievements;
  } catch (error) {
    console.error("Error getting achievements:", error);
    throw error;
  }
};

// Get achievements by type
export const getAchievementsByType = async (babyId, type) => {
  try {
    const achievementsRef = collection(db, 'achievements');
    const q = query(
      achievementsRef, 
      where('babyId', '==', babyId),
      where('type', '==', type),
      orderBy('awardedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const achievements = [];
    querySnapshot.forEach((doc) => {
      achievements.push({ id: doc.id, ...doc.data() });
    });
    
    return achievements;
  } catch (error) {
    console.error("Error getting achievements by type:", error);
    throw error;
  }
};

// Check for new achievements
export const checkAchievements = async (babyId, parentId) => {
  try {
    // This would typically be handled by a Cloud Function
    // For frontend implementation, we'll just check for basic achievements
    
    // Get all sleep logs for this baby
    const sleepLogsRef = collection(db, 'sleepLogs');
    const sleepLogsQuery = query(
      sleepLogsRef, 
      where('babyId', '==', babyId)
    );
    
    const sleepLogsSnapshot = await getDocs(sleepLogsQuery);
    
    // Count sleep logs
    const sleepLogCount = sleepLogsSnapshot.size;
    
    // Get existing achievements
    const existingAchievements = await getAchievements(babyId);
    const existingTypes = existingAchievements.map(a => a.name);
    
    const newAchievements = [];
    
    // Check for first sleep log achievement
    if (sleepLogCount === 1 && !existingTypes.includes('First Sleep Log')) {
      const achievement = {
        userId: parentId,
        babyId,
        type: 'milestone',
        name: 'First Sleep Log',
        description: 'You logged your first sleep session!',
        awardedAt: serverTimestamp(),
        iconURL: '/assets/achievements/first_log.png',
        progress: 100,
        metadata: {}
      };
      
      const docRef = await addDoc(collection(db, 'achievements'), achievement);
      newAchievements.push({ id: docRef.id, ...achievement });
    }
    
    // Check for 10 sleep logs achievement
    if (sleepLogCount >= 10 && !existingTypes.includes('Sleep Tracking Pro')) {
      const achievement = {
        userId: parentId,
        babyId,
        type: 'milestone',
        name: 'Sleep Tracking Pro',
        description: 'You\'ve logged 10 sleep sessions!',
        awardedAt: serverTimestamp(),
        iconURL: '/assets/achievements/tracking_pro.png',
        progress: 100,
        metadata: {}
      };
      
      const docRef = await addDoc(collection(db, 'achievements'), achievement);
      newAchievements.push({ id: docRef.id, ...achievement });
    }
    
    return newAchievements;
  } catch (error) {
    console.error("Error checking achievements:", error);
    throw error;
  }
};

// Get achievement progress
export const getAchievementProgress = async (babyId) => {
  try {
    const achievements = await getAchievements(babyId);
    
    // Calculate overall progress
    const totalAchievements = 10; // Total possible achievements
    const completedAchievements = achievements.filter(a => a.progress === 100).length;
    
    return {
      total: totalAchievements,
      completed: completedAchievements,
      percentage: Math.round((completedAchievements / totalAchievements) * 100)
    };
  } catch (error) {
    console.error("Error getting achievement progress:", error);
    throw error;
  }
};
