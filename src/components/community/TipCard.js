// /home/ubuntu/components/community/TipCard.js
import React from 'react';

const TipCard = ({ tip }) => {
  if (!tip) {
    return null;
  }

  // Assuming tip object has: id, title, content, expertAttribution, publishDate, category
  const { title, content, expertAttribution, publishDate, category } = tip;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-green-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-green-700">{title || "Weekly Sleep Tip"}</h3>
        {category && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {category}
          </span>
        )}
      </div>
      <p className="text-gray-700 mb-4 whitespace-pre-line">{content}</p>
      {expertAttribution && (
        <p className="text-sm text-gray-500 italic mb-2">- {expertAttribution}</p>
      )}
      {publishDate && (
        <p className="text-xs text-gray-400 text-right">Published on: {new Date(publishDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default TipCard;

