import React from 'react';
import { BoltIcon } from '@heroicons/react/24/outline'; // Example icon

const QuickActionsCard = ({ actions, onQuickAction }) => {
  if (!actions || actions.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
        <div className="flex items-center mb-3">
          <BoltIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Quick Actions</h2>
        </div>
        <p className="text-gray-500 text-sm flex-grow flex items-center justify-center">No quick actions available right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <div className="flex items-center mb-3">
        <BoltIcon className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-700">Quick Actions</h2>
      </div>
      <div className="space-y-2 flex-grow">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => onQuickAction(action.actionType, action.payload)}
            className="w-full px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 flex items-center justify-center"
          >
            {action.icon && <span className="mr-2">{action.icon}</span>} 
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;

