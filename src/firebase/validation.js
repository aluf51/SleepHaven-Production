// src/firebase/validation.js
/**
 * This file contains validation functions to test the end-to-end data flow
 * between the frontend and Firebase backend for the Sleep Haven app.
 */

import {
  registerWithEmailPassword,
  loginWithEmailPassword,
  getUserProfile,
  createBaby,
  getBabies,
  startSleepSession,
  endSleepSession,
  getSleepLogs,
  createSleepPlan,
  getActiveSleepPlan,
  saveMargaretInteraction,
  getMargaretInteractions,
  checkAchievements
} from './exports';

// Validate user authentication flow
export const validateAuthFlow = async (email, password, displayName) => {
  try {
    console.log('🔍 Validating authentication flow...');
    
    // Register new user
    console.log('📝 Registering new user...');
    const newUser = await registerWithEmailPassword(email, password, displayName);
    console.log('✅ User registered successfully:', newUser.uid);
    
    // Log out (handled by Firebase Auth internally)
    
    // Log in with the same credentials
    console.log('🔑 Logging in with credentials...');
    const loggedInUser = await loginWithEmailPassword(email, password);
    console.log('✅ User logged in successfully:', loggedInUser.uid);
    
    // Get user profile
    console.log('👤 Fetching user profile...');
    const userProfile = await getUserProfile(loggedInUser.uid);
    console.log('✅ User profile retrieved successfully:', userProfile);
    
    return {
      success: true,
      userId: loggedInUser.uid,
      userProfile
    };
  } catch (error) {
    console.error('❌ Authentication flow validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Validate baby profile management flow
export const validateBabyProfileFlow = async (userId) => {
  try {
    console.log('🔍 Validating baby profile management flow...');
    
    // Create baby profile
    console.log('👶 Creating baby profile...');
    const babyData = {
      name: 'Charlie',
      birthDate: new Date(2023, 0, 15), // January 15, 2023
      gender: 'male',
      developmentalInfo: {
        milestones: []
      },
      sleepAssociations: ['rocking', 'pacifier'],
      sleepChallenges: ['night waking', 'short naps']
    };
    
    const newBaby = await createBaby(userId, babyData);
    console.log('✅ Baby profile created successfully:', newBaby.id);
    
    // Get all babies for parent
    console.log('👨‍👩‍👧‍👦 Fetching all babies for parent...');
    const babies = await getBabies(userId);
    console.log('✅ Retrieved', babies.length, 'baby profiles');
    
    return {
      success: true,
      babyId: newBaby.id,
      babies
    };
  } catch (error) {
    console.error('❌ Baby profile flow validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Validate sleep tracking flow
export const validateSleepTrackingFlow = async (babyId, parentId) => {
  try {
    console.log('🔍 Validating sleep tracking flow...');
    
    // Start sleep session
    console.log('😴 Starting sleep session...');
    const sleepSession = await startSleepSession(
      babyId,
      parentId,
      'nap',
      'crib',
      { noise: 'white noise', light: 'dark', temperature: 72 }
    );
    console.log('✅ Sleep session started successfully:', sleepSession.id);
    
    // Wait a moment to simulate sleep duration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // End sleep session
    console.log('⏰ Ending sleep session...');
    const completedSession = await endSleepSession(
      sleepSession.id,
      4, // Quality rating (1-5)
      'Slept well after initial fussing'
    );
    console.log('✅ Sleep session ended successfully');
    
    // Get sleep logs
    console.log('📊 Fetching sleep logs...');
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const sleepLogs = await getSleepLogs(babyId, oneWeekAgo, now);
    console.log('✅ Retrieved', sleepLogs.length, 'sleep logs');
    
    return {
      success: true,
      sleepSessionId: sleepSession.id,
      sleepLogs
    };
  } catch (error) {
    console.error('❌ Sleep tracking flow validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Validate sleep plan flow
export const validateSleepPlanFlow = async (babyId, parentId) => {
  try {
    console.log('🔍 Validating sleep plan flow...');
    
    // Create sleep plan
    console.log('📋 Creating sleep plan...');
    const sleepPlanData = {
      babyId,
      parentId,
      executiveSummary: {
        currentSleepAssessment: 'Charlie is experiencing frequent night wakings and has some difficulty self-soothing.',
        primaryGoals: [
          'Charlie will learn to fall asleep independently at bedtime.',
          'Reduce night wakings to an age-appropriate level.',
          'Establish a consistent and calming bedtime routine.'
        ],
        timelineExpectation: 'You should start seeing positive changes within 5-7 days, with more significant improvements over 2 weeks.',
        successMetrics: [
          'Charlie falling asleep within 15-20 minutes of being put down awake.',
          'Longer stretches of consolidated sleep at night.',
          'A more predictable and peaceful bedtime experience for the whole family.'
        ]
      },
      personalizedSleepSchedule: {
        visualTimeline: [
          { time: '7:00 AM', event: 'Wake up' },
          { time: '9:30 AM', event: 'Morning nap' },
          { time: '1:00 PM', event: 'Afternoon nap' },
          { time: '7:00 PM', event: 'Bedtime routine begins' },
          { time: '7:30 PM', event: 'Bedtime' }
        ],
        rationale: 'This schedule is designed to align with Charlie\'s natural sleep rhythms based on his age.',
        flexibilityGuidelines: 'Aim to keep wake windows within 15 minutes of the recommended times.'
      },
      customizedBedtimeRoutine: {
        steps: [
          { activity: 'Bath', duration: '10 minutes', details: 'Warm, calming bath' },
          { activity: 'Pajamas & Diaper', duration: '5 minutes', details: 'Comfortable sleepwear' },
          { activity: 'Feeding', duration: '15 minutes', details: 'Last feeding in dimly lit room' },
          { activity: 'Book', duration: '5 minutes', details: 'Same short book each night' },
          { activity: 'Song', duration: '2 minutes', details: 'Soft lullaby' },
          { activity: 'Bed', duration: '3 minutes', details: 'Place in crib drowsy but awake' }
        ],
        environmentSpecifications: {
          light: 'Dim lights 30 minutes before bedtime, completely dark for sleep',
          sound: 'White noise machine at 65 decibels',
          temperature: '68-72°F (20-22°C)',
          sleepwear: 'Cotton pajamas with 1.0 TOG sleep sack'
        }
      },
      dailyActionPlan: {
        days: [
          {
            day: 'Day 1',
            focus: 'Establishing the bedtime routine',
            actions: [
              'Implement the full bedtime routine as outlined',
              'Place Charlie in crib drowsy but awake',
              'If crying occurs, check in at 3, 5, and 10 minute intervals'
            ],
            expectations: 'The first night may be challenging as Charlie adjusts to the new routine.',
            dailySuccessMetrics: 'Successfully completed the full bedtime routine'
          },
          {
            day: 'Day 2',
            focus: 'Consistency with the routine',
            actions: [
              'Maintain the same bedtime routine',
              'Continue drowsy but awake at bedtime',
              'Extend check-in intervals to 5, 10, and 15 minutes if needed'
            ],
            expectations: 'Some improvement may be seen, but consistency is key.',
            dailySuccessMetrics: 'Reduced time to fall asleep compared to Day 1'
          }
        ],
        adjustmentTriggers: 'If no improvement is seen after 3 days, we will reassess and adjust the approach.'
      }
    };
    
    const newSleepPlan = await createSleepPlan(sleepPlanData);
    console.log('✅ Sleep plan created successfully:', newSleepPlan.id);
    
    // Get active sleep plan
    console.log('📝 Fetching active sleep plan...');
    const activeSleepPlan = await getActiveSleepPlan(babyId);
    console.log('✅ Active sleep plan retrieved successfully');
    
    return {
      success: true,
      sleepPlanId: newSleepPlan.id,
      activeSleepPlan
    };
  } catch (error) {
    console.error('❌ Sleep plan flow validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Validate Margaret interaction flow
export const validateMargaretFlow = async (userId, babyId) => {
  try {
    console.log('🔍 Validating Margaret interaction flow...');
    
    // Save Margaret interaction
    console.log('💬 Saving Margaret interaction...');
    const interactionData = {
      userId,
      babyId,
      query: 'How can I help Charlie sleep through the night?',
      response: 'Based on Charlie\'s age and sleep patterns, I recommend establishing a consistent bedtime routine and ensuring he\'s getting enough daytime sleep. You might also consider checking if he\'s comfortable - not too hot or cold, and that his sleep environment is conducive to good sleep with appropriate darkness and white noise.',
      category: 'routine',
      contextAware: true,
      mediaIncluded: false,
      relatedSleepLogIds: []
    };
    
    const newInteraction = await saveMargaretInteraction(interactionData);
    console.log('✅ Margaret interaction saved successfully:', newInteraction.id);
    
    // Get Margaret interactions
    console.log('🔍 Fetching Margaret interactions...');
    const interactions = await getMargaretInteractions(userId);
    console.log('✅ Retrieved', interactions.length, 'Margaret interactions');
    
    return {
      success: true,
      interactionId: newInteraction.id,
      interactions
    };
  } catch (error) {
    console.error('❌ Margaret interaction flow validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Validate achievements flow
export const validateAchievementsFlow = async (babyId, parentId) => {
  try {
    console.log('🔍 Validating achievements flow...');
    
    // Check for achievements
    console.log('🏆 Checking for achievements...');
    const newAchievements = await checkAchievements(babyId, parentId);
    console.log('✅ Achievement check completed, found', newAchievements.length, 'new achievements');
    
    return {
      success: true,
      newAchievements
    };
  } catch (error) {
    console.error('❌ Achievements flow validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Run all validations
export const validateAllFlows = async () => {
  try {
    console.log('🔍 Starting end-to-end validation of all data flows...');
    
    // Generate a unique test email
    const testEmail = `test-${Date.now()}@sleephaven-test.com`;
    const testPassword = 'Test123!';
    const testDisplayName = 'Test Parent';
    
    // Validate authentication flow
    const authResult = await validateAuthFlow(testEmail, testPassword, testDisplayName);
    if (!authResult.success) {
      throw new Error(`Authentication validation failed: ${authResult.error}`);
    }
    
    const userId = authResult.userId;
    
    // Validate baby profile flow
    const babyResult = await validateBabyProfileFlow(userId);
    if (!babyResult.success) {
      throw new Error(`Baby profile validation failed: ${babyResult.error}`);
    }
    
    const babyId = babyResult.babyId;
    
    // Validate sleep tracking flow
    const sleepResult = await validateSleepTrackingFlow(babyId, userId);
    if (!sleepResult.success) {
      throw new Error(`Sleep tracking validation failed: ${sleepResult.error}`);
    }
    
    // Validate sleep plan flow
    const planResult = await validateSleepPlanFlow(babyId, userId);
    if (!planResult.success) {
      throw new Error(`Sleep plan validation failed: ${planResult.error}`);
    }
    
    // Validate Margaret interaction flow
    const margaretResult = await validateMargaretFlow(userId, babyId);
    if (!margaretResult.success) {
      throw new Error(`Margaret interaction validation failed: ${margaretResult.error}`);
    }
    
    // Validate achievements flow
    const achievementsResult = await validateAchievementsFlow(babyId, userId);
    if (!achievementsResult.success) {
      throw new Error(`Achievements validation failed: ${achievementsResult.error}`);
    }
    
    console.log('✅ All data flows validated successfully!');
    
    return {
      success: true,
      results: {
        auth: authResult,
        baby: babyResult,
        sleep: sleepResult,
        plan: planResult,
        margaret: margaretResult,
        achievements: achievementsResult
      }
    };
  } catch (error) {
    console.error('❌ End-to-end validation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
