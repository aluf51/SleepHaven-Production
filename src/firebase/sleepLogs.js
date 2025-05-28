// src/firebase/sleepLogs.js
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from './index';

// Create sleep log
export const createSleepLog = async (sleepLogData) => {
  try {
    const newSleepLog = {
      ...sleepLogData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'sleepLogs'), newSleepLog);
    return { id: docRef.id, ...newSleepLog };
  } catch (error) {
    console.error("Error creating sleep log:", error);
    throw error;
  }
};

// Start sleep session
export const startSleepSession = async (babyId, parentId, type, location, environment = {}) => {
  try {
    const startTime = new Date();
    
    const sleepSession = {
      babyId,
      parentId,
      date: startTime,
      startTime,
      endTime: null, // Will be filled when session ends
      duration: 0, // Will be calculated when session ends
      type, // 'nap' or 'night'
      location,
      quality: null, // Will be filled when session ends
      notes: '',
      sleepEnvironment: environment,
      wakeups: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'sleepLogs'), sleepSession);
    return { id: docRef.id, ...sleepSession };
  } catch (error) {
    console.error("Error starting sleep session:", error);
    throw error;
  }
};

// End sleep session
export const endSleepSession = async (sleepLogId, quality, notes = '') => {
  try {
    const sleepLogRef = doc(db, 'sleepLogs', sleepLogId);
    const sleepLogSnap = await getDoc(sleepLogRef);
    
    if (sleepLogSnap.exists()) {
      const sleepLogData = sleepLogSnap.data();
      const startTime = sleepLogData.startTime.toDate();
      const endTime = new Date();
      
      // Calculate duration in minutes
      const durationMs = endTime - startTime;
      const durationMinutes = Math.round(durationMs / (1000 * 60));
      
      await updateDoc(sleepLogRef, {
        endTime,
        duration: durationMinutes,
        quality,
        notes,
        updatedAt: serverTimestamp()
      });
      
      return {
        id: sleepLogId,
        ...sleepLogData,
        endTime,
        duration: durationMinutes,
        quality,
        notes
      };
    } else {
      throw new Error("Sleep log not found");
    }
  } catch (error) {
    console.error("Error ending sleep session:", error);
    throw error;
  }
};

// Add wakeup to sleep session
export const addWakeup = async (sleepLogId, wakeupTime, duration, reason = '') => {
  try {
    const sleepLogRef = doc(db, 'sleepLogs', sleepLogId);
    const sleepLogSnap = await getDoc(sleepLogRef);
    
    if (sleepLogSnap.exists()) {
      const sleepLogData = sleepLogSnap.data();
      const wakeups = sleepLogData.wakeups || [];
      
      // Add new wakeup
      const updatedWakeups = [
        ...wakeups,
        {
          time: wakeupTime,
          duration,
          reason
        }
      ];
      
      await updateDoc(sleepLogRef, {
        wakeups: updatedWakeups,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } else {
      throw new Error("Sleep log not found");
    }
  } catch (error) {
    console.error("Error adding wakeup:", error);
    throw error;
  }
};

// Get sleep logs for a baby
export const getSleepLogs = async (babyId, startDate, endDate) => {
  try {
    const sleepLogsRef = collection(db, 'sleepLogs');
    let q = query(
      sleepLogsRef, 
      where('babyId', '==', babyId),
      orderBy('startTime', 'desc')
    );
    
    if (startDate) {
      q = query(q, where('startTime', '>=', startDate));
    }
    
    if (endDate) {
      q = query(q, where('startTime', '<=', endDate));
    }
    
    const querySnapshot = await getDocs(q);
    
    const sleepLogs = [];
    querySnapshot.forEach((doc) => {
      sleepLogs.push({ id: doc.id, ...doc.data() });
    });
    
    return sleepLogs;
  } catch (error) {
    console.error("Error getting sleep logs:", error);
    throw error;
  }
};

// Get sleep logs for a specific date
export const getSleepLogsForDate = async (babyId, date) => {
  try {
    // Create start and end of the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return await getSleepLogs(babyId, startOfDay, endOfDay);
  } catch (error) {
    console.error("Error getting sleep logs for date:", error);
    throw error;
  }
};

// Get sleep stats for a time period
export const getSleepStats = async (babyId, startDate, endDate) => {
  try {
    const sleepLogs = await getSleepLogs(babyId, startDate, endDate);
    
    // Calculate stats
    let totalSleepMinutes = 0;
    let nightSleepMinutes = 0;
    let napSleepMinutes = 0;
    let totalWakeups = 0;
    let avgQuality = 0;
    let qualityCount = 0;
    
    sleepLogs.forEach(log => {
      if (log.duration) {
        totalSleepMinutes += log.duration;
        
        if (log.type === 'night') {
          nightSleepMinutes += log.duration;
        } else if (log.type === 'nap') {
          napSleepMinutes += log.duration;
        }
      }
      
      if (log.wakeups) {
        totalWakeups += log.wakeups.length;
      }
      
      if (log.quality) {
        avgQuality += log.quality;
        qualityCount++;
      }
    });
    
    // Calculate averages
    const avgQualityScore = qualityCount > 0 ? avgQuality / qualityCount : 0;
    
    return {
      totalSleepMinutes,
      nightSleepMinutes,
      napSleepMinutes,
      totalWakeups,
      avgQualityScore,
      sleepLogCount: sleepLogs.length
    };
  } catch (error) {
    console.error("Error getting sleep stats:", error);
    throw error;
  }
};

// Update sleep log
export const updateSleepLog = async (sleepLogId, sleepLogData) => {
  try {
    const sleepLogRef = doc(db, 'sleepLogs', sleepLogId);
    await updateDoc(sleepLogRef, {
      ...sleepLogData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating sleep log:", error);
    throw error;
  }
};

// Delete sleep log
export const deleteSleepLog = async (sleepLogId) => {
  try {
    await deleteDoc(doc(db, 'sleepLogs', sleepLogId));
    return true;
  } catch (error) {
    console.error("Error deleting sleep log:", error);
    throw error;
  }
};
