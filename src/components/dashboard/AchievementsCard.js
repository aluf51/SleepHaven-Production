import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';

// Import confetti conditionally to prevent build failures
let confetti;
try {
  // Dynamic import with error handling
  confetti = require('canvas-confetti');
} catch (error) {
  // Create a fallback function that does nothing if the package is not available
  confetti = () => {
    console.warn('canvas-confetti package not available, celebration animations disabled');
    return null;
  };
}

const AchievementsCard = ({ achievements, progressData }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Define achievement criteria
  const achievementDefinitions = [
    {
      id: 'first_log',
      name: 'First Sleep Log',
      description: 'You logged your first sleep session.',
      icon: '🌟',
      criteria: (progress) => progress && progress.length > 0,
      points: 10
    },
    {
      id: 'three_day_streak',
      name: 'Three-Day Streak',
      description: 'Logged sleep for 3 days in a row.',
      icon: '🔥',
      criteria: (progress) => {
        if (!progress || progress.length < 3) return false;
        
        // Sort progress by date
        const sortedDates = [...progress]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(entry => new Date(entry.date).toISOString().split('T')[0]);
        
        // Check for 3 consecutive days
        for (let i = 2; i < sortedDates.length; i++) {
          const day1 = new Date(sortedDates[i-2]);
          const day2 = new Date(sortedDates[i-1]);
          const day3 = new Date(sortedDates[i]);
          
          const diff1 = (day2 - day1) / (1000 * 60 * 60 * 24);
          const diff2 = (day3 - day2) / (1000 * 60 * 60 * 24);
          
          if (diff1 === 1 && diff2 === 1) return true;
        }
        return false;
      },
      points: 25
    },
    {
      id: 'early_riser',
      name: 'Early Riser',
      description: 'Woke up before 7 AM.',
      icon: '☀️',
      criteria: (progress) => {
        if (!progress) return false;
        return progress.some(entry => {
          if (!entry.wakeTime) return false;
          const wakeTime = new Date(`2000-01-01T${entry.wakeTime}`);
          const sevenAM = new Date(`2000-01-01T07:00:00`);
          return wakeTime < sevenAM;
        });
      },
      points: 15
    },
    {
      id: 'bedtime_routine',
      name: 'Bedtime Routine Master',
      description: 'Completed the same bedtime routine for 5 nights.',
      icon: '📚',
      criteria: (progress) => {
        if (!progress) return false;
        
        // Count routine completions
        const routineCompletions = progress.filter(entry => 
          entry.routineCompleted === true || entry.status === 'completed'
        ).length;
        
        return routineCompletions >= 5;
      },
      points: 30
    },
    {
      id: 'sleep_through',
      name: 'Sleeping Through',
      description: 'Baby slept 6+ hours without waking.',
      icon: '💤',
      criteria: (progress) => {
        if (!progress) return false;
        return progress.some(entry => {
          if (!entry.hoursSlept) return false;
          return entry.hoursSlept >= 6 && (!entry.wakings || entry.wakings === 0);
        });
      },
      points: 50
    }
  ];

  // Calculate unlocked achievements based on progress data
  useEffect(() => {
    if (!progressData) return;
    
    // Check each achievement definition against progress data
    achievementDefinitions.forEach(achievement => {
      const wasUnlocked = achievements && achievements.some(a => a.id === achievement.id && a.unlocked);
      const shouldBeUnlocked = achievement.criteria(progressData);
      
      // If achievement should be unlocked but wasn't before
      if (shouldBeUnlocked && !wasUnlocked) {
        // Dispatch action to update achievements in state
        dispatch({ 
          type: 'UNLOCK_ACHIEVEMENT', 
          payload: { 
            id: achievement.id,
            name: achievement.name,
            description: achievement.description,
            icon: achievement.icon,
            points: achievement.points,
            unlockedAt: new Date().toISOString()
          } 
        });
        
        // Set newly unlocked achievement for celebration
        setNewlyUnlocked(achievement);
        setShowCelebration(true);
        
        // Trigger confetti celebration
        triggerConfetti();
      }
    });
  }, [progressData, achievements, dispatch]);

  // Trigger confetti animation with error handling
  const triggerConfetti = () => {
    try {
      if (typeof window !== 'undefined' && confetti) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error) {
      console.warn('Failed to trigger confetti animation:', error);
      // Continue without confetti - the app should still work
    }
  };

  // Handle celebration close
  const handleCloseCelebration = () => {
    setShowCelebration(false);
    setNewlyUnlocked(null);
  };

  // Calculate total achievement points
  const totalPoints = achievements && achievements.filter(a => a.unlocked).reduce((sum, a) => sum + (a.points || 0), 0);
  
  // Determine medal level based on points
  let medalLevel = null;
  if (totalPoints >= 100) medalLevel = { type: 'gold', icon: '🥇', name: 'Gold Medal' };
  else if (totalPoints >= 50) medalLevel = { type: 'silver', icon: '🥈', name: 'Silver Medal' };
  else if (totalPoints >= 20) medalLevel = { type: 'bronze', icon: '🥉', name: 'Bronze Medal' };

  if (!achievements || achievements.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Achievements</h2>
        <p className="text-gray-500 dark:text-gray-400">Enter data in the progress calendar to unlock achievements!</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Achievements</h2>
          {medalLevel && (
            <div className="flex items-center">
              <span className="text-2xl mr-2">{medalLevel.icon}</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{medalLevel.name}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {achievements.map(ach => (
            <div 
              key={ach.id} 
              className={`p-3 rounded-md flex items-center ${
                ach.unlocked 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="text-4xl mr-3">{ach.icon || '🏆'}</span>
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  ach.unlocked 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {ach.name}
                </h3>
                {ach.description && (
                  <p className={`text-sm ${
                    ach.unlocked 
                      ? 'text-green-600 dark:text-green-500' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {ach.description}
                  </p>
                )}
                {!ach.unlocked && <p className="text-xs text-gray-400 dark:text-gray-500 italic">Keep going!</p>}
              </div>
              {ach.unlocked && ach.points && (
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                  +{ach.points} pts
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress towards next medal */}
        {totalPoints > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress to next medal</span>
              <span>
                {totalPoints < 20 ? `${totalPoints}/20 points` : 
                 totalPoints < 50 ? `${totalPoints}/50 points` : 
                 totalPoints < 100 ? `${totalPoints}/100 points` : 
                 `${totalPoints} points`}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-400 dark:bg-yellow-600 h-2 rounded-full" 
                style={{ 
                  width: `${totalPoints < 20 ? (totalPoints/20*100) : 
                          totalPoints < 50 ? (totalPoints/50*100) : 
                          totalPoints < 100 ? (totalPoints/100*100) : 100}%` 
                }}
              ></div>
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">More milestones coming soon...</p>
      </div>

      {/* Achievement Celebration Modal */}
      <AnimatePresence>
        {showCelebration && newlyUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={handleCloseCelebration}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{newlyUnlocked.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Achievement Unlocked!</h3>
                <h4 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">{newlyUnlocked.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{newlyUnlocked.description}</p>
                
                {newlyUnlocked.points && (
                  <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                    +{newlyUnlocked.points} points
                  </div>
                )}
                
                <button
                  onClick={handleCloseCelebration}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementsCard;
