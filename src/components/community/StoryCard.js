// /home/ubuntu/components/community/StoryCard.js
import React from 'react';

const StoryCard = ({ story }) => {
  if (!story) {
    return null;
  }

  // Assuming story object has properties like: title, anonymizedContent, challenges (array), submissionDate
  const { title, anonymizedContent, challenges, submissionDate } = story;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{title || "A Success Story"}</h3>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{anonymizedContent}</p>
      {challenges && challenges.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Related Challenges:</h4>
          <div className="flex flex-wrap gap-2">
            {challenges.map((challenge, index) => (
              <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                {challenge}
              </span>
            ))}
          </div>
        </div>
      )}
      {submissionDate && (
        <p className="text-xs text-gray-400 text-right">Shared on: {new Date(submissionDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default StoryCard;

