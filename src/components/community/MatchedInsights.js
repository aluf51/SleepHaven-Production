// /home/ubuntu/components/community/MatchedInsights.js
import React from 'react';

const MatchedInsights = ({ insights, babyAgeMonths, sleepChallenges }) => {
  if (!insights || insights.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow border border-gray-200 mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Sleep Twin Insights</h3>
        <p className="text-gray-600">
          We are still gathering insights for parents with babies aged {babyAgeMonths || 'your baby\'s age'} and facing challenges like {sleepChallenges && sleepChallenges.length > 0 ? sleepChallenges.join(', ') : 'the ones you selected'}.
        </p>
        <p className="text-gray-600 mt-2">Check back soon as more parents join and share their experiences!</p>
      </div>
    );
  }

  // Example insight structure: { type: 'commonChallenge', text: 'X% of parents also report Y' }
  // { type: 'helpfulStrategy', text: 'Many parents found Z helpful for A' }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-6">
      <h3 className="text-xl font-semibold text-purple-700 mb-4">Insights from Your Sleep Twins Group</h3>
      <p className="text-sm text-gray-600 mb-4">
        Based on anonymized data from other parents with babies around {babyAgeMonths} months old and similar challenges ({sleepChallenges.join(', ')}):
      </p>
      <ul className="space-y-4">
        {insights.map((insight, index) => (
          <li key={index} className="p-4 bg-purple-50 rounded-md border-l-4 border-purple-500">
            <p className="text-purple-800">{insight.text}</p>
            {insight.source && <p className="text-xs text-purple-600 mt-1">Source: {insight.source}</p>}
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-6">
        These insights are aggregated and anonymized. No personal data is shared. As more parents join, these insights will become even more tailored.
      </p>
    </div>
  );
};

export default MatchedInsights;

