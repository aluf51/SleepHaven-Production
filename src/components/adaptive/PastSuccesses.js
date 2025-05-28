// /home/ubuntu/components/adaptive/PastSuccesses.js
import React from "react";

const PastSuccesses = ({ loggedTechniques }) => {
  if (!loggedTechniques || loggedTechniques.length === 0) {
    return (
      <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm mt-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Your Logged Techniques</h4>
        <p className="text-sm text-gray-600">No techniques logged yet. Use the logger to keep track of what you try and how it works!</p>
      </div>
    );
  }

  // Sort by date, most recent first
  const sortedLogs = [...loggedTechniques].sort((a, b) => new Date(b.date) - new Date(a.date));
  const successfulLogs = sortedLogs.filter(log => log.effectiveness >= 4); // Considering 4+ stars as successful

  return (
    <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-gray-700 mb-3">Previously Successful Techniques</h4>
      {successfulLogs.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {successfulLogs.map(log => (
            <div key={log.id} className="p-3 bg-white border border-green-300 rounded-md shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString()}</p>
                  <h5 className="font-medium text-green-700">{log.technique}</h5>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">{log.effectivenessLabel}</span>
              </div>
              {log.notes && <p className="text-xs text-gray-600 mt-1 italic">Notes: {log.notes}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No highly effective techniques logged yet. Keep trying and logging!</p>
      )}
      
      {/* Optionally, show all logs, not just successful ones */}
      {loggedTechniques.length > 0 && (
          <details className="mt-4">
              <summary className="text-sm text-indigo-600 hover:underline cursor-pointer">View All Logged Techniques ({loggedTechniques.length})</summary>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto p-2 bg-white border rounded-md">
                  {sortedLogs.map(log => (
                      <div key={log.id} className={`p-2 border-l-4 rounded-r-sm ${log.effectiveness >=4 ? "border-green-500" : log.effectiveness >=3 ? "border-yellow-500" : "border-red-500"}`}>
                          <p className="text-xs text-gray-400">{new Date(log.date).toLocaleDateString()} - {log.effectivenessLabel}</p>
                          <p className="text-sm font-medium text-gray-700">{log.technique}</p>
                          {log.notes && <p className="text-xs text-gray-500 italic">{log.notes}</p>}
                      </div>
                  ))}
              </div>
          </details>
      )}
    </div>
  );
};

export default PastSuccesses;

