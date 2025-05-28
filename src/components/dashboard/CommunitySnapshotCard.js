import React from 'react';
import { UsersIcon } from '@heroicons/react/24/outline'; // Example icon

const CommunitySnapshotCard = ({ summary, onNavigateToCommunity }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <div className="flex items-center mb-3">
        <UsersIcon className="w-6 h-6 text-teal-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-700">Community Corner</h2>
      </div>

      {(!summary || Object.keys(summary).length === 0) ? (
        <p className="text-gray-500 text-sm flex-grow flex items-center justify-center">Community insights are loading...</p>
      ) : (
        <div className="space-y-2 text-sm text-gray-600 flex-grow">
          {summary.newSuccessStories && 
            <p>✨ <span className="font-semibold">{summary.newSuccessStories}</span> new success stories shared this week!</p>}
          {summary.popularTip && 
            <p>💡 Popular tip: "{summary.popularTip}"</p>}
          {summary.activeDiscussions && 
            <p>💬 <span className="font-semibold">{summary.activeDiscussions}</span> active discussions happening now.</p>}
        </div>
      )}

      <button
        onClick={onNavigateToCommunity}
        className="mt-auto w-full px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-150"
      >
        Visit Community Hub
      </button>
    </div>
  );
};

export default CommunitySnapshotCard;

