import React from 'react';

const SleepLogForm = ({ logData, onInputChange, isSubmitting }) => {
  const fields = [
    { id: 'morning_wake_time', label: 'Morning Wake Time:', type: 'time', category: 'sleep' },
    { id: 'nap1_start_time', label: 'Nap 1 Start Time:', type: 'time', category: 'sleep' },
    { id: 'nap1_end_time', label: 'Nap 1 End Time:', type: 'time', category: 'sleep' },
    // Add more nap fields as needed (nap2_start_time, nap2_end_time, etc.)
    { id: 'nap_quality', label: 'Overall Nap Quality:', type: 'select', options: ['', 'Refused', 'Short', 'Good', 'Excellent'], category: 'sleep' },
    { id: 'bedtime', label: 'Bedtime (Put in Crib):', type: 'time', category: 'sleep' },
    { id: 'fell_asleep_time', label: 'Approx. Time Fell Asleep:', type: 'time', category: 'sleep' },
    { id: 'night_wakings_count', label: 'Number of Night Wakings:', type: 'number', min: 0, category: 'sleep' },
    // Potentially add a more detailed night waking log later
  ];

  const handleChange = (id, value) => {
    onInputChange(id, value, 'sleep'); // Pass category 'sleep'
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Log Sleep Details:</h2>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.id}
                name={field.id}
                value={logData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                disabled={isSubmitting}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-75"
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option || `Select ${field.label.replace(':','')}`}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={logData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                min={field.min}
                disabled={isSubmitting}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-75"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepLogForm;

