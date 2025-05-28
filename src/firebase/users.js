// src/firebase/users.js
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './index';

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Update user preferences
export const updateUserPreferences = async (userId, preferences) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'preferences': preferences,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating user preferences:", error);
    throw error;
  }
};

// Update notification settings
export const updateNotificationSettings = async (userId, notificationSettings) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'preferences.notifications': notificationSettings,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating notification settings:", error);
    throw error;
  }
};

// Toggle dark mode
export const toggleDarkMode = async (userId, isDarkMode) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'preferences.darkMode': isDarkMode,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error toggling dark mode:", error);
    throw error;
  }
};
