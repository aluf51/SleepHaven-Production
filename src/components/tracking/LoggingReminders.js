import React, { useState, useEffect } from 'react';

const LoggingReminders = ({ reminders, onDismissReminder }) => {
  if (!reminders || reminders.length === 0) {
    return null; // Don't render if there are no reminders
  }

  return (
    <div className="my-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold text-yellow-800 mb-2">Gentle Reminders:</h3>
      <ul className="space-y-2">
        {reminders.map(reminder => (
          <li key={reminder.id} className="flex justify-between items-center text-sm text-yellow-700">
            <span>{reminder.text}</span>
            {reminder.dismissible && (
              <button 
                onClick={() => onDismissReminder(reminder.id)}
                className="ml-2 text-xs text-yellow-600 hover:text-yellow-800"
              >
                Dismiss
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoggingReminders;

