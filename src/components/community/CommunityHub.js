// /home/ubuntu/components/community/CommunityHub.js
import React from 'react';

const CommunityHub = ({ navigateTo }) => {
  // const { isPremiumUser } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now

  if (!isPremiumUser) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Community Hub</h2>
        <p className="text-lg text-gray-700">Access to the Community Hub is a premium feature. Please upgrade your plan to connect with other parents and access exclusive content.</p>
        {/* Add a button/link to the upgrade page */}
      </div>
    );
  }

  const handleNavigation = (e, page) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Welcome to the Community Hub!</h1>
      <p className="text-center text-gray-600 mb-10">Connect with other parents, share experiences, and find expert advice to support your sleep journey.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Card for Success Stories */}
        <a href="#" onClick={(e) => handleNavigation(e, "successStories")} className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-transparent hover:border-blue-500">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">🎉</span>
            <h2 className="text-2xl font-semibold text-gray-800">Success Stories</h2>
          </div>
          <p className="text-gray-600 mb-4">Read anonymous stories from parents who have navigated similar sleep challenges and found success.</p>
          <span className="font-medium text-blue-600 hover:text-blue-700">Explore Stories &rarr;</span>
        </a>

        {/* Card for Sleep Twins */}
        <a href="#" onClick={(e) => handleNavigation(e, "sleepTwins")} className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-transparent hover:border-purple-500">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">👯</span>
            <h2 className="text-2xl font-semibold text-gray-800">Sleep Twins</h2>
          </div>
          <p className="text-gray-600 mb-4">Connect with parents whose babies are of a similar age and facing similar sleep issues.</p>
          <span className="font-medium text-purple-600 hover:text-purple-700">Find Your Twins &rarr;</span>
        </a>

        {/* Card for Weekly Tips */}
        <a href="#" onClick={(e) => handleNavigation(e, "weeklyTips")} className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-transparent hover:border-green-500">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">💡</span>
            <h2 className="text-2xl font-semibold text-gray-800">Weekly Sleep Tips</h2>
          </div>
          <p className="text-gray-600 mb-4">Get expert advice and actionable tips delivered weekly to help improve your baby\'s sleep.</p>
          <span className="font-medium text-green-600 hover:text-green-700">Get Tips &rarr;</span>
        </a>

        {/* Card for FAQ */}
        <a href="#" onClick={(e) => handleNavigation(e, "faq")} className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-transparent hover:border-yellow-500">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">❓</span>
            <h2 className="text-2xl font-semibold text-gray-800">Expert FAQ</h2>
          </div>
          <p className="text-gray-600 mb-4">Find answers to common sleep questions, curated by pediatricians and sleep experts.</p>
          <span className="font-medium text-yellow-600 hover:text-yellow-700">Browse FAQs &rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default CommunityHub;

