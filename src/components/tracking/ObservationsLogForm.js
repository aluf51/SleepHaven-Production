import React from 'react';

const ObservationsLogForm = ({ logData, onInputChange, isSubmitting }) => {
  const handleChange = (id, value) => {
    onInputChange(id, value, 'observations'); // Pass category 'observations'
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Notes & Observations:</h2>
      <div>
        <label htmlFor="observations_notes" className="block text-sm font-medium text-gray-700 mb-1">
          Record any observations, challenges, successes, or anything else noteworthy about today.
        </label>
        <textarea
          id="observations_notes"
          name="observations_notes"
          rows="5"
          value={logData.observations_notes || ''}
          onChange={(e) => handleChange('observations_notes', e.target.value)}
          disabled={isSubmitting}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-75"
          placeholder="e.g., Baby seemed extra fussy during the afternoon. Had a breakthrough with the bedtime routine!"
        />
      </div>
      {/* Placeholder for future structured observations, photo uploads, etc. */}
    </div>
  );
};

export default ObservationsLogForm;

