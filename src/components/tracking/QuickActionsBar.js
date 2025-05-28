import React from 'react';

const QuickActionsBar = ({ onQuickAction, isSubmitting }) => {
  // Define some example quick actions
  // In a real app, these might be more dynamic or context-aware
  const actions = [
    { id: 'quick_log_wake_up', label: 'Log Morning Wake Up', actionType: 'LOG_WAKE_UP' },
    { id: 'quick_log_nap_start', label: 'Start Nap', actionType: 'LOG_NAP_START' },
    { id: 'quick_log_bedtime', label: 'Log Bedtime', actionType: 'LOG_BEDTIME' },
  ];

  return (
    <div className="my-4 p-3 bg-gray-50 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-2">Quick Actions:</h3>
      <div className="flex flex-wrap gap-2">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => onQuickAction(action.actionType)}
            disabled={isSubmitting}
            className="px-3 py-2 bg-accent text-white text-sm rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition duration-150 disabled:opacity-75"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsBar;

