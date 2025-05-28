import React from 'react';

const DayNavigation = ({ currentDay, totalDays, goToPreviousDay, goToNextDay, onLogSubmit, isSubmitting }) => {
  return (
    <div className="flex justify-between items-center mt-8 mb-4">
      <button
        onClick={goToPreviousDay}
        disabled={currentDay === 1 || isSubmitting}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous Day
      </button>
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">Day {currentDay} of {totalDays}</p>
        <button
          onClick={onLogSubmit}
          disabled={isSubmitting}
          className="mt-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-150 disabled:opacity-75"
        >
          {isSubmitting ? 'Saving...' : `Save Day ${currentDay} Log`}
        </button>
      </div>
      <button
        onClick={goToNextDay}
        disabled={currentDay === totalDays || isSubmitting}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next Day
      </button>
    </div>
  );
};

export default DayNavigation;

