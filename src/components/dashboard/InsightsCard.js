import React from 'react';
import SleepTrendSparkline from './SleepTrendSparkline'; // Assuming it's in the same directory
import { LightBulbIcon } from '@heroicons/react/24/outline'; // Example icon

const InsightsCard = ({ insights, sleepTrendData, onNavigateToDetails }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <div className="flex items-center mb-3">
        <LightBulbIcon className="w-6 h-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-700">Sleep Insights</h2>
      </div>

      {(!insights || insights.length === 0) && (!sleepTrendData || sleepTrendData.length === 0) ? (
        <p className="text-gray-500 text-sm flex-grow flex items-center justify-center">No specific insights available yet. Keep logging data!</p>
      ) : (
        <div className="flex-grow">
          {insights && insights.map(insight => (
            <div key={insight.id} className="mb-3 p-2 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-700">💡 {insight.text}</p>
              {insight.actionable && onNavigateToDetails && (
                <button 
                  onClick={() => onNavigateToDetails(insight.detailsLink)}
                  className="text-xs text-yellow-600 hover:text-yellow-800 mt-1"
                >
                  Learn more
                </button>
              )}
            </div>
          ))}

          {sleepTrendData && sleepTrendData.data && sleepTrendData.data.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-600 mb-1">Recent Sleep Trend ({sleepTrendData.metricName || 'Duration'}):</h3>
              <SleepTrendSparkline 
                data={sleepTrendData.data} 
                dataKey={sleepTrendData.dataKey || 'value'}
                strokeColor={sleepTrendData.strokeColor || '#82ca9d'} 
              />
            </div>
          )}
        </div>
      )}
      <p className="text-xs text-gray-400 mt-3 italic text-center">Insights are generated based on your logged data.</p>
    </div>
  );
};

export default InsightsCard;

