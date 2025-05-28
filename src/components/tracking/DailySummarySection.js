import React from 'react';

const DailySummarySection = ({ dailyLog, planDetails }) => {
  // Helper function to calculate total sleep (very basic for now)
  const calculateTotalSleep = () => {
    // This is a placeholder. Real calculation would be more complex,
    // converting time strings to durations and summing them up.
    // For now, just an example.
    let totalMinutes = 0;
    if (dailyLog.morning_wake_time && dailyLog.bedtime) {
        // This doesn't account for night wakings or naps yet.
        // A proper implementation would parse times and calculate differences.
        totalMinutes = 8 * 60; // Placeholder for 8 hours
    }
    return totalMinutes > 0 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : 'Not enough data';
  };

  const getSleepQualityIndicator = () => {
    // Placeholder logic for sleep quality
    if (dailyLog.nap_quality === 'Excellent' && (dailyLog.night_wakings_count || 0) <= 1) {
      return <span className="text-green-600 font-semibold">Good</span>;
    }
    if (dailyLog.nap_quality === 'Short' || (dailyLog.night_wakings_count || 0) > 3) {
      return <span className="text-red-600 font-semibold">Challenging</span>;
    }
    return <span className="text-yellow-600 font-semibold">Okay</span>;
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Day {planDetails ? planDetails.currentDay : ''} Summary</h2>
      
      {Object.keys(dailyLog).length === 0 && (
        <p className="text-gray-500">No data logged for this day yet.</p>
      )}

      {Object.keys(dailyLog).length > 0 && (
        <div className="space-y-3">
          <div>
            <h3 className="text-md font-semibold text-gray-700">Sleep Overview:</h3>
            <ul className="list-disc list-inside pl-4 text-sm text-gray-600">
              {dailyLog.morning_wake_time && <li>Woke up at: {dailyLog.morning_wake_time}</li>}
              {dailyLog.bedtime && <li>Bedtime at: {dailyLog.bedtime}</li>}
              {dailyLog.fell_asleep_time && <li>Fell asleep around: {dailyLog.fell_asleep_time}</li>}
              {dailyLog.night_wakings_count !== undefined && <li>Night Wakings: {dailyLog.night_wakings_count}</li>}
              {dailyLog.nap1_start_time && dailyLog.nap1_end_time && 
                <li>Nap 1: {dailyLog.nap1_start_time} - {dailyLog.nap1_end_time}</li>}
              {dailyLog.nap_quality && <li>Overall Nap Quality: {dailyLog.nap_quality}</li>}
            </ul>
          </div>

          <div className="pt-2">
            <h3 className="text-md font-semibold text-gray-700">Key Metrics:</h3>
            <p className="text-sm text-gray-600">Total Estimated Sleep: <span className="font-bold">{calculateTotalSleep()}</span> (Target: {planDetails ? planDetails.sleepTarget : 'N/A'})</p>
            <p className="text-sm text-gray-600">Sleep Quality Today: {getSleepQualityIndicator()}</p>
          </div>

          {dailyLog.parent_mood && dailyLog.baby_mood && (
            <div className="pt-2">
              <h3 className="text-md font-semibold text-gray-700">Mood:</h3>
              <p className="text-sm text-gray-600">Parent: {dailyLog.parent_mood}, Baby: {dailyLog.baby_mood}</p>
            </div>
          )}

          {dailyLog.observations_notes && (
            <div className="pt-2">
              <h3 className="text-md font-semibold text-gray-700">Notes & Observations:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{dailyLog.observations_notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailySummarySection;

