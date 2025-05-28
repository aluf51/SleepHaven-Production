// src/firebase/babies.js
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './index';

// Create baby profile
export const createBaby = async (parentId, babyData) => {
  try {
    const newBaby = {
      parentId,
      ...babyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'babies'), newBaby);
    return { id: docRef.id, ...newBaby };
  } catch (error) {
    console.error("Error creating baby profile:", error);
    throw error;
  }
};

// Get all babies for a parent
export const getBabies = async (parentId) => {
  try {
    const babiesRef = collection(db, 'babies');
    const q = query(babiesRef, where('parentId', '==', parentId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const babies = [];
    querySnapshot.forEach((doc) => {
      babies.push({ id: doc.id, ...doc.data() });
    });
    
    return babies;
  } catch (error) {
    console.error("Error getting babies:", error);
    throw error;
  }
};

// Get single baby by ID
export const getBaby = async (babyId) => {
  try {
    const babyRef = doc(db, 'babies', babyId);
    const babySnap = await getDoc(babyRef);
    
    if (babySnap.exists()) {
      return { id: babySnap.id, ...babySnap.data() };
    } else {
      throw new Error("Baby profile not found");
    }
  } catch (error) {
    console.error("Error getting baby profile:", error);
    throw error;
  }
};

// Update baby profile
export const updateBaby = async (babyId, babyData) => {
  try {
    const babyRef = doc(db, 'babies', babyId);
    await updateDoc(babyRef, {
      ...babyData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating baby profile:", error);
    throw error;
  }
};

// Delete baby profile
export const deleteBaby = async (babyId) => {
  try {
    await deleteDoc(doc(db, 'babies', babyId));
    return true;
  } catch (error) {
    console.error("Error deleting baby profile:", error);
    throw error;
  }
};

// Update developmental milestones
export const updateMilestones = async (babyId, milestone) => {
  try {
    const babyRef = doc(db, 'babies', babyId);
    const babySnap = await getDoc(babyRef);
    
    if (babySnap.exists()) {
      const babyData = babySnap.data();
      const milestones = babyData.developmentalInfo?.milestones || [];
      
      // Add new milestone
      const updatedMilestones = [
        ...milestones,
        {
          ...milestone,
          achievedAt: serverTimestamp()
        }
      ];
      
      await updateDoc(babyRef, {
        'developmentalInfo.milestones': updatedMilestones,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } else {
      throw new Error("Baby profile not found");
    }
  } catch (error) {
    console.error("Error updating milestones:", error);
    throw error;
  }
};

// Update sleep associations
export const updateSleepAssociations = async (babyId, sleepAssociations) => {
  try {
    const babyRef = doc(db, 'babies', babyId);
    await updateDoc(babyRef, {
      sleepAssociations,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating sleep associations:", error);
    throw error;
  }
};

// Update sleep challenges
export const updateSleepChallenges = async (babyId, sleepChallenges) => {
  try {
    const babyRef = doc(db, 'babies', babyId);
    await updateDoc(babyRef, {
      sleepChallenges,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating sleep challenges:", error);
    throw error;
  }
};
