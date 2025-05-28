// src/firebase/margaret.js
import { collection, doc, addDoc, getDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from './index';

// Save Margaret interaction
export const saveMargaretInteraction = async (interactionData) => {
  try {
    const newInteraction = {
      ...interactionData,
      timestamp: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'margaretInteractions'), newInteraction);
    return { id: docRef.id, ...newInteraction };
  } catch (error) {
    console.error("Error saving Margaret interaction:", error);
    throw error;
  }
};

// Get Margaret interactions for a user
export const getMargaretInteractions = async (userId, limitCount = 20) => {
  try {
    const interactionsRef = collection(db, 'margaretInteractions');
    const q = query(
      interactionsRef, 
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    const interactions = [];
    querySnapshot.forEach((doc) => {
      interactions.push({ id: doc.id, ...doc.data() });
    });
    
    return interactions;
  } catch (error) {
    console.error("Error getting Margaret interactions:", error);
    throw error;
  }
};

// Search Margaret responses
export const searchMargaretResponses = async (userId, searchTerm) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // For a real implementation, you would use a service like Algolia or ElasticSearch
    // This is a simplified version that searches for exact matches
    
    const interactionsRef = collection(db, 'margaretInteractions');
    const q = query(
      interactionsRef, 
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const searchResults = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Check if query or response contains the search term
      if (
        data.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.response.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        searchResults.push({ id: doc.id, ...data });
      }
    });
    
    return searchResults;
  } catch (error) {
    console.error("Error searching Margaret responses:", error);
    throw error;
  }
};

// Get Margaret interactions by category
export const getMargaretInteractionsByCategory = async (userId, category, limitCount = 20) => {
  try {
    const interactionsRef = collection(db, 'margaretInteractions');
    const q = query(
      interactionsRef, 
      where('userId', '==', userId),
      where('category', '==', category),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    const interactions = [];
    querySnapshot.forEach((doc) => {
      interactions.push({ id: doc.id, ...doc.data() });
    });
    
    return interactions;
  } catch (error) {
    console.error("Error getting Margaret interactions by category:", error);
    throw error;
  }
};

// Get context-aware Margaret interactions
export const getContextAwareInteractions = async (userId, limitCount = 20) => {
  try {
    const interactionsRef = collection(db, 'margaretInteractions');
    const q = query(
      interactionsRef, 
      where('userId', '==', userId),
      where('contextAware', '==', true),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    const interactions = [];
    querySnapshot.forEach((doc) => {
      interactions.push({ id: doc.id, ...doc.data() });
    });
    
    return interactions;
  } catch (error) {
    console.error("Error getting context-aware Margaret interactions:", error);
    throw error;
  }
};
