import React from 'react';

const MoodLogger = ({ parentMood, babyMood, onParentMoodChange, onBabyMoodChange }) => {
  // For now, a simple text representation. Could be emojis or sliders later.
  return (
    <div className="my-4 p-3 bg-gray-100 rounded-md">
      <h3 className="text-md font-semibold text-gray-700 mb-2">Mood Check-in:</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="parentMood" className="block text-sm font-medium text-gray-600">Parent's Mood:</label>
          <input 
            type="text" 
            id="parentMood" 
            value={parentMood}
            onChange={(e) => onParentMoodChange(e.target.value)}
            placeholder="e.g., Tired, Hopeful"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="babyMood" className="block text-sm font-medium text-gray-600">Baby's Mood:</label>
          <input 
            type="text" 
            id="babyMood" 
            value={babyMood}
            onChange={(e) => onBabyMoodChange(e.target.value)}
            placeholder="e.g., Fussy, Calm"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default MoodLogger;

