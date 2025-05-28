// /home/ubuntu/components/community/FAQItem.js
import React, { useState } from "react";

// Simple ChevronDown and ChevronUp icons for accordion
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!faq) {
    return null;
  }

  // Assuming faq object has: id, question, answer, pediatricianAttribution, lastUpdatedDate, category
  const { question, answer, pediatricianAttribution, lastUpdatedDate } = faq;

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-yellow-700 focus:outline-none"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      {isOpen && (
        <div className="mt-3 pl-2 pr-2 pb-2">
          <p className="text-gray-600 whitespace-pre-line leading-relaxed">{answer}</p>
          {pediatricianAttribution && (
            <p className="text-sm text-gray-500 italic mt-3">- Answered by: {pediatricianAttribution}</p>
          )}
          {lastUpdatedDate && (
            <p className="text-xs text-gray-400 mt-1 text-right">Last updated: {new Date(lastUpdatedDate).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQItem;

