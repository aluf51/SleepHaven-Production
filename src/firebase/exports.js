// src/firebase/index.js
// Export all Firebase services and functions from a single file

// Core Firebase exports
export { app, db, auth, storage, functions } from './index';

// Authentication exports
export {
  registerWithEmailPassword,
  loginWithEmailPassword,
  loginWithGoogle,
  loginWithApple,
  resetPassword,
  logoutUser
} from './auth';

// User management exports
export {
  getUserProfile,
  updateUserProfile,
  updateUserPreferences,
  updateNotificationSettings,
  toggleDarkMode
} from './users';

// Baby management exports
export {
  createBaby,
  getBabies,
  getBaby,
  updateBaby,
  deleteBaby,
  updateMilestones,
  updateSleepAssociations,
  updateSleepChallenges
} from './babies';

// Sleep logs exports
export {
  createSleepLog,
  startSleepSession,
  endSleepSession,
  addWakeup,
  getSleepLogs,
  getSleepLogsForDate,
  getSleepStats,
  updateSleepLog,
  deleteSleepLog
} from './sleepLogs';

// Sleep plans exports
export {
  createSleepPlan,
  getActiveSleepPlan,
  getSleepPlans,
  getSleepPlan,
  updateSleepPlan,
  archiveSleepPlan,
  trackSleepPlanProgress
} from './sleepPlans';

// Margaret interactions exports
export {
  saveMargaretInteraction,
  getMargaretInteractions,
  searchMargaretResponses,
  getMargaretInteractionsByCategory,
  getContextAwareInteractions
} from './margaret';

// Achievements exports
export {
  getAchievements,
  getAchievementsByType,
  checkAchievements,
  getAchievementProgress
} from './achievements';
