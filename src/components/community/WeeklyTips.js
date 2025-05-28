// /home/ubuntu/components/community/WeeklyTips.js
import React, { useState, useEffect, useContext } from "react";
import TipCard from "./TipCard";
// import { AppContext } from "../../contexts/AppContext"; // Assuming AppContext
// import apiService from "../../services/apiService"; // Assuming an apiService
// import { Link } from "react-router-dom"; // Assuming React Router

// Mock Link component for now if React Router is not set up
const MockLink = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

// Mock API service for now
const mockApiService = {
  getCurrentWeeklyTip: async () => {
    console.log("Fetching current weekly tip...");
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock data
    return {
      id: "tip_current_week",
      title: "Understanding Sleep Cycles",
      content: "Babies, like adults, cycle through different stages of sleep (light and deep). Understanding these cycles can help you recognize when your baby is truly waking versus just stirring between cycles. \n\nFor instance, a baby might briefly fuss or make noise as they transition from one sleep cycle to the next. Waiting a few moments before intervening can sometimes allow them to resettle on their own, promoting independent sleep skills.",
      expertAttribution: "Dr. Sleepwell, Pediatric Sleep Consultant",
      publishDate: new Date().toISOString(),
      category: "Sleep Science"
    };
  }
};

const WeeklyTips = () => {
  // const { isPremiumUser } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now

  const [currentTip, setCurrentTip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPremiumUser) return;

    const fetchCurrentTip = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const tip = await apiService.getCurrentWeeklyTip();
        const tip = await mockApiService.getCurrentWeeklyTip();
        setCurrentTip(tip);
      } catch (err) {
        console.error("Error fetching current weekly tip:", err);
        setError("Could not load the weekly tip. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchCurrentTip();
  }, [isPremiumUser]);

  if (!isPremiumUser) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700">Access weekly expert sleep tips by upgrading to our premium plan.</p>
        {/* Add a link/button to upgrade plan here */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">This Week's Sleep Tip</h2>
        <MockLink 
            to="/community/tips-archive" 
            className="text-sm text-green-600 hover:text-green-800 hover:underline">
            View Tips Archive &rarr;
        </MockLink>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading this week's tip...</p>
          {/* Add a spinner icon here */}
        </div>
      )}
      {error && <p className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-md">{error}</p>}
      
      {!isLoading && !error && currentTip && (
        <TipCard tip={currentTip} />
      )}

      {!isLoading && !error && !currentTip && (
        <div className="text-center py-10 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tip Available</h3>
          <p className="text-gray-500">We couldn't fetch this week's tip. Please check back soon!</p>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
        <p className="text-sm text-green-700">
            New sleep wisdom delivered every week! Check back regularly for fresh insights from our sleep experts.
        </p>
      </div>
    </div>
  );
};

export default WeeklyTips;

