// /home/ubuntu/components/community/SubmitStoryForm.js
import React, { useState, useContext } from 'react';
// import { AppContext } from '../../contexts/AppContext'; // Assuming AppContext
// import apiService from '../../services/apiService"); // Assuming an apiService

// Mock API service for now
const mockApiService = {
  submitSuccessStory: async (storyData) => {
    console.log("Submitting story:", storyData);
    // Simulate API delay and success
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, this would return the created story or a success status
    return { success: true, message: "Story submitted for moderation!", storyId: Date.now() };
  }
};

const SubmitStoryForm = ({ onStorySubmitted }) => {
  // const { isPremiumUser, userProfile } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now
  // const babyName = userProfile?.babyName || "your little one";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Mock challenges - should be consistent with SuccessStoriesFeed
  const availableChallenges = [
    "4-month regression",
    "frequent night wakings",
    "nap transition",
    "overtiredness",
    "self-soothing",
    "bedtime battles",
    "early morning wakings",
    "colic",
    "teething",
    "short naps",
    "refusing bedtime"
  ].sort();

  const handleChallengeChange = (e) => {
    const { value, checked } = e.target;
    setChallenges(prev => 
      checked ? [...prev, value] : prev.filter(challenge => challenge !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please provide a title and share your story.");
      return;
    }
    if (challenges.length === 0) {
      setError("Please select at least one related challenge.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const storyData = {
        title,
        anonymizedContent: content, // Emphasize to user this should be anonymous
        challenges,
        // userId: userProfile.id // Anonymized or handled by backend
      };
      // const response = await apiService.submitSuccessStory(storyData);
      const response = await mockApiService.submitSuccessStory(storyData);

      if (response.success) {
        setSuccessMessage(response.message || "Your story has been submitted for review. Thank you for sharing!");
        setTitle('');
        setContent('');
        setChallenges([]);
        if (onStorySubmitted) {
          onStorySubmitted(); // Callback to potentially refresh feed or close modal
        }
      } else {
        setError(response.message || "Could not submit your story. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting story:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  if (!isPremiumUser) {
    return <p className="text-center text-red-500 p-4">This feature is for premium users only.</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Sleep Success Story</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded" role="alert">
        <p className="font-bold">Share Anonymously</p>
        <p className="text-sm">Your story will be shared anonymously. Please do not include any personal identifying information (names, specific locations, etc.) in your title or story content. Our team will review all submissions.</p>
      </div>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Success!</p>
          <p>{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="story-title" className="block text-sm font-medium text-gray-700 mb-1">Story Title:</label>
          <input 
            type="text" 
            id="story-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Conquered the Bedtime Battles!"
            maxLength={100}
            required
          />
        </div>

        <div>
          <label htmlFor="story-content" className="block text-sm font-medium text-gray-700 mb-1">Your Success Story:</label>
          <textarea 
            id="story-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Share what challenges you faced and how you overcame them..."
            required
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Remember to keep it anonymous. Max 1500 characters.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Related Challenges (select all that apply):</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
            {availableChallenges.map(challenge => (
              <div key={challenge} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`challenge-${challenge.replace(/\s+/g, '-')}`}
                  value={challenge}
                  checked={challenges.includes(challenge)}
                  onChange={handleChallengeChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`challenge-${challenge.replace(/\s+/g, '-')}`} className="ml-2 text-sm text-gray-700">{challenge}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : "Submit My Story for Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitStoryForm;

