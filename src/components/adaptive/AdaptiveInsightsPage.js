// /home/ubuntu/components/adaptive/AdaptiveInsightsPage.js
import React, { useState, useEffect } from "react";
import TechniqueLogger from "./TechniqueLogger";
import PastSuccesses from "./PastSuccesses";
import AdaptiveRecommendations from "./AdaptiveRecommendations";

// In a real app, babyAgeInMonths would come from a shared context or user profile
const MOCK_BABY_AGE_MONTHS = 6; // Example age for recommendations

const AdaptiveInsightsPage = () => {
  const [loggedTechniques, setLoggedTechniques] = useState([]);
  const [babyAge, setBabyAge] = useState(MOCK_BABY_AGE_MONTHS);

  useEffect(() => {
    // Load logged techniques from local storage on mount
    const savedLogs = localStorage.getItem("adaptiveSleepTechniqueLogs");
    if (savedLogs) {
      setLoggedTechniques(JSON.parse(savedLogs));
    }
    // In a real app, baby's age would be fetched from a profile or context
    // For this demo, we can allow it to be updated or use a mock value.
  }, []);

  const handleLogSubmit = (newLog) => {
    const updatedLogs = [...loggedTechniques, newLog];
    setLoggedTechniques(updatedLogs);
    localStorage.setItem("adaptiveSleepTechniqueLogs", JSON.stringify(updatedLogs));
  };

  // Simple input to change baby's age for demo purposes
  const handleAgeChangeForDemo = (e) => {
    const newAge = parseInt(e.target.value);
    if (!isNaN(newAge) && newAge >=0 && newAge <= 48) {
        setBabyAge(newAge);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Adaptive Sleep Insights</h2>
      <p className="text-center text-gray-600 mb-8">
        Log the sleep techniques you try and how effective they are. Over time, this section will provide personalized insights and suggestions based on what works for your baby.
        This is a conceptual feature demonstrating how an adaptive engine might begin.
      </p>

      {/* Demo: Allow changing baby age to see different recommendations */}
      <div className="mb-6 p-3 bg-gray-100 rounded-md flex items-center gap-3">
          <label htmlFor="demo-age-input" className="text-sm font-medium text-gray-700">Demo - Baby&apos;s Age (months):</label>
          <input 
            type="number"
            id="demo-age-input"
            value={babyAge}
            onChange={handleAgeChangeForDemo}
            className="p-1 border border-gray-300 rounded-md w-20"
            min="0"
            max="48"
          />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TechniqueLogger onLogSubmit={handleLogSubmit} />
        </div>
        <div>
          <PastSuccesses loggedTechniques={loggedTechniques} />
          <AdaptiveRecommendations loggedTechniques={loggedTechniques} babyAgeInMonths={babyAge} />
        </div>
      </div>
    </div>
  );
};

export default AdaptiveInsightsPage;

