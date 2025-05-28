// /home/ubuntu/components/growth/GrowthDevelopmentPage.js
import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "../../contexts/AppContext"; // Assuming AppContext provides babyAgeInMonths

import MilestoneAlerts from "./MilestoneAlerts";
import RegressionPredictor from "./RegressionPredictor";
import BrainDevelopmentInfo from "./BrainDevelopmentInfo";
import SleepNeedsCalculator from "./SleepNeedsCalculator";

const GrowthDevelopmentPage = () => {
  // const { userProfile } = useContext(AppContext);
  // For standalone testing, let's use a local state for babyAgeInMonths
  // In a real app, this would likely come from userProfile or a dedicated context/prop
  const [babyAgeInMonths, setBabyAgeInMonths] = useState(null); // Default to null, can be set by input
  const [inputAge, setInputAge] = useState("");

  // Simulate fetching baby's age from profile or allowing user to set it for the page
  // useEffect(() => {
  //   if (userProfile && userProfile.babyAgeMonths) {
  //     setBabyAgeInMonths(userProfile.babyAgeMonths);
  //     setInputAge(String(userProfile.babyAgeMonths));
  //   } else {
  //     // If no age in profile, prompt or allow input
  //     // For now, we'll use a manual input field if no context is available
  //   }
  // }, [userProfile]);

  const handleAgeInputChange = (e) => {
    setInputAge(e.target.value);
  };

  const handleSetAge = () => {
    const age = parseInt(inputAge);
    if (!isNaN(age) && age >= 0 && age <= 48) { // Example validation
      setBabyAgeInMonths(age);
    } else {
      alert("Please enter a valid age in months (0-48).");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Growth & Development Insights</h2>
      
      {/* Section to input/confirm baby's age if not available from context */}
      {/* This is a simplified way to manage age for this standalone page component */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Baby/Toddler Age for Insights</h3>
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-grow">
            <label htmlFor="page-baby-age" className="block text-sm font-medium text-gray-600">Current Age (months):</label>
            <input 
              type="number"
              id="page-baby-age"
              value={inputAge}
              onChange={handleAgeInputChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter age in months"
            />
          </div>
          <button 
            onClick={handleSetAge}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out w-full sm:w-auto"
          >
            Update Age & Insights
          </button>
        </div>
        {babyAgeInMonths !== null && (
          <p className="text-sm text-gray-600 mt-2">Showing insights for: <strong>{babyAgeInMonths} months old</strong></p>
        )}
         {babyAgeInMonths === null && (
          <p className="text-sm text-red-500 mt-2">Please enter an age to view personalized insights.</p>
        )}
      </div>

      {/* Render child components only if age is set */}
      {babyAgeInMonths !== null ? (
        <div className="space-y-6">
          <MilestoneAlerts babyAgeInMonths={babyAgeInMonths} />
          <RegressionPredictor babyAgeInMonths={babyAgeInMonths} />
          <BrainDevelopmentInfo babyAgeInMonths={babyAgeInMonths} />
          <SleepNeedsCalculator babyAgeInMonths={babyAgeInMonths} />
        </div>
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <p className="text-gray-600">Please enter your baby or toddler&apos;s age above to see relevant growth and development insights.</p>
        </div>
      )}
    </div>
  );
};

export default GrowthDevelopmentPage;

