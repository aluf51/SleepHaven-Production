// /home/ubuntu/components/wellness/SelfCareReminders.js
import React, { useState } from "react";

const selfCareTips = [
  {
    id: "tip1",
    title: "Hydrate Regularly",
    description: "Even a little dehydration can affect your mood and energy. Keep a water bottle handy.",
    category: "Physical"
  },
  {
    id: "tip2",
    title: "Stretch for 5 Minutes",
    description: "Release tension with simple stretches. Focus on your neck, shoulders, and back.",
    category: "Physical"
  },
  {
    id: "tip3",
    title: "Connect with a Friend",
    description: "A quick call or text can make a big difference. You are not alone.",
    category: "Social"
  },
  {
    id: "tip4",
    title: "Step Outside for Fresh Air",
    description: "Even a few minutes of fresh air and daylight can boost your spirits.",
    category: "Mental"
  },
  {
    id: "tip5",
    title: "Jot Down 3 Good Things",
    description: "Take a moment to acknowledge small positives from your day.",
    category: "Mental"
  },
  {
    id: "tip6",
    title: "Ask for Help When Needed",
    description: "It’s a sign of strength, not weakness, to ask for support.",
    category: "Social"
  }
];

const SelfCareReminders = () => {
  const [showTip, setShowTip] = useState(null);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * selfCareTips.length);
    setShowTip(selfCareTips[randomIndex]);
  };

  // Conceptual: In a real app, reminders would be set via notifications (native or scheduled)
  const handleSetReminder = (tipTitle) => {
    alert(`Reminder conceptually set for: "${tipTitle}". In a real app, this would use system notifications.`);
  };

  return (
    <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-pink-800 mb-3">Quick Self-Care Boosters</h4>
      
      <button 
        onClick={getRandomTip}
        className="w-full mb-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out"
      >
        Show Me a Quick Self-Care Tip
      </button>

      {showTip && (
        <div className="p-3 bg-white border border-pink-300 rounded-md shadow">
          <h5 className="font-medium text-pink-700">{showTip.title}</h5>
          <p className="text-sm text-gray-600 mt-1">{showTip.description}</p>
          <p className="text-xs text-gray-400 mt-1">Category: {showTip.category}</p>
          <button 
            onClick={() => handleSetReminder(showTip.title)}
            className="mt-2 text-xs text-pink-600 hover:text-pink-800 hover:underline"
          >
            Remind Me (Conceptual)
          </button>
        </div>
      )}

      <div className="mt-4">
        <h5 className="text-md font-semibold text-pink-700 mb-2">Remember to:</h5>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Take short breaks, even 5 minutes can help.</li>
          <li>Acknowledge your efforts – you are doing great.</li>
          <li>Prioritize rest when possible, even if it’s not perfect sleep.</li>
          <li>Be kind to yourself during this demanding time.</li>
        </ul>
      </div>
      <p className="text-xs text-gray-500 mt-3">Self-care isn’t selfish; it’s essential for being the best parent you can be.</p>
    </div>
  );
};

export default SelfCareReminders;

