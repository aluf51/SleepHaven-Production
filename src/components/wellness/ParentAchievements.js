// /home/ubuntu/components/wellness/ParentAchievements.js
import React, { useState, useEffect } from "react";

// Mock achievements - in a real app, these would be triggered by actual events/data
const achievementsList = [
  {
    id: "ach1",
    title: "First Full Week of Routine!",
    description: "You stuck to the bedtime routine for 7 days straight! Consistency is key.",
    icon: "🎉",
    isUnlocked: false, // Will be set by mock logic
    unlockDate: null
  },
  {
    id: "ach2",
    title: "Meditation Master (5 Sessions)",
    description: "You completed 5 micro-meditation sessions. Taking care of yourself matters!",
    icon: "🧘",
    isUnlocked: false,
    unlockDate: null
  },
  {
    id: "ach3",
    title: "Teamwork Triumph!",
    description: "You successfully used the Tag-Team Planner for a whole week.",
    icon: "🤝",
    isUnlocked: false,
    unlockDate: null
  },
  {
    id: "ach4",
    title: "Baby Slept 5 Hours Straight!",
    description: "A significant milestone! Celebrate this win (and hopefully get some rest too).",
    icon: "😴",
    isUnlocked: false,
    unlockDate: null
  }
];

// Mock function to simulate unlocking achievements over time or based on mock actions
const useMockAchievementUnlock = () => {
  const [achievements, setAchievements] = useState(achievementsList);

  useEffect(() => {
    // Simulate unlocking some achievements for demo purposes
    const timer1 = setTimeout(() => {
      setAchievements(prev => prev.map(ach => ach.id === "ach1" ? { ...ach, isUnlocked: true, unlockDate: new Date().toISOString() } : ach));
    }, 2000); // Unlock after 2 seconds

    const timer2 = setTimeout(() => {
      setAchievements(prev => prev.map(ach => ach.id === "ach4" ? { ...ach, isUnlocked: true, unlockDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() } : ach)); // Unlocked 3 days ago
    }, 3500); // Unlock after 3.5 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return achievements;
};

const ParentAchievements = () => {
  const unlockedAchievements = useMockAchievementUnlock().filter(ach => ach.isUnlocked);
  const lockedAchievements = useMockAchievementUnlock().filter(ach => !ach.isUnlocked);

  if (unlockedAchievements.length === 0 && lockedAchievements.length === 0) {
    return <p className="text-sm text-gray-500">Achievements will appear here as you progress!</p>;
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-yellow-800 mb-4">Parenting Wins & Milestones!</h4>
      
      {unlockedAchievements.length > 0 && (
        <div className="mb-4">
          <h5 className="text-md font-medium text-yellow-700 mb-2">Unlocked Achievements:</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlockedAchievements.map(ach => (
              <div key={ach.id} className="p-3 bg-white border border-yellow-400 rounded-md shadow-sm flex items-start">
                <span className="text-3xl mr-3">{ach.icon}</span>
                <div>
                  <h6 className="font-semibold text-yellow-700">{ach.title}</h6>
                  <p className="text-xs text-gray-600">{ach.description}</p>
                  {ach.unlockDate && <p className="text-xs text-gray-400 mt-1">Unlocked: {new Date(ach.unlockDate).toLocaleDateString()}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedAchievements.length > 0 && unlockedAchievements.length > 0 && (
        <hr className="my-4 border-yellow-200" />
      )}

      {lockedAchievements.length > 0 && (
        <div>
          <h5 className="text-md font-medium text-gray-500 mb-2">Keep Going! (Upcoming)</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lockedAchievements.map(ach => (
              <div key={ach.id} className="p-3 bg-gray-100 border border-gray-200 rounded-md flex items-start opacity-70">
                <span className="text-3xl mr-3 filter grayscale">{ach.icon}</span>
                <div>
                  <h6 className="font-semibold text-gray-500">{ach.title}</h6>
                  <p className="text-xs text-gray-400">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-4">Remember to celebrate every small victory on this journey!</p>
    </div>
  );
};

export default ParentAchievements;

