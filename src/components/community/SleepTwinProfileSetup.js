// /home/ubuntu/components/community/SleepTwinProfileSetup.js
import React, { useState, useContext } from "react";
// import { AppContext } from "../../contexts/AppContext"; // Assuming AppContext
// import apiService from "../../services/apiService"; // Assuming an apiService

// Mock API service for now
const mockApiService = {
  saveSleepTwinProfile: async (profileData) => {
    console.log("Saving Sleep Twin profile:", profileData);
    // Simulate API delay and success
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: "Your Sleep Twin profile has been saved!" };
  }
};

const SleepTwinProfileSetup = ({ onProfileSetupComplete }) => {
  // const { userProfile, updateUserProfile } = useContext(AppContext);
  const [babyAgeMonths, setBabyAgeMonths] = useState(""); // e.g., "0-3", "4-6", "7-9", "10-12", "13-18", "18+"
  const [sleepChallenges, setSleepChallenges] = useState([]);
  const [optIn, setOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const ageRanges = [
    { value: "0-3", label: "0-3 months" },
    { value: "4-6", label: "4-6 months" },
    { value: "7-9", label: "7-9 months" },
    { value: "10-12", label: "10-12 months" },
    { value: "13-18", label: "13-18 months" },
    { value: "18+", label: "18+ months" },
  ];

  const availableChallenges = [
    "Frequent night wakings",
    "Short naps",
    "Difficulty self-soothing",
    "Bedtime resistance",
    "Early morning wakings",
    "Nap transitions",
    "Sleep regressions",
    "Co-sleeping challenges",
    "Feeding to sleep association"
  ].sort();

  const handleChallengeChange = (e) => {
    const { value, checked } = e.target;
    setSleepChallenges(prev =>
      checked ? [...prev, value] : prev.filter(challenge => challenge !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!optIn) {
      setError("You must opt-in to the Sleep Twins feature to proceed.");
      return;
    }
    if (!babyAgeMonths) {
      setError("Please select your baby's age range.");
      return;
    }
    if (sleepChallenges.length === 0) {
      setError("Please select at least one sleep challenge.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const profileData = {
        babyAgeMonths,
        sleepChallenges,
        optInStatus: true,
        // userId: userProfile.id // Anonymized or handled by backend
      };
      // const response = await apiService.saveSleepTwinProfile(profileData);
      const response = await mockApiService.saveSleepTwinProfile(profileData);

      if (response.success) {
        setSuccessMessage(response.message || "Profile saved successfully!");
        // Potentially update AppContext here with opt-in status
        // updateUserProfile({ sleepTwinProfile: profileData, hasOptedInSleepTwins: true });
        if (onProfileSetupComplete) {
          onProfileSetupComplete(profileData);
        }
      } else {
        setError(response.message || "Could not save your profile. Please try again.");
      }
    } catch (err) {
      console.error("Error saving Sleep Twin profile:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Set Up Your Sleep Twins Profile</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Help us connect you with other parents facing similar sleep situations. All information shared for matching is anonymized.
      </p>

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
          <label htmlFor="baby-age-months" className="block text-sm font-medium text-gray-700 mb-1">Baby's Age Range:</label>
          <select
            id="baby-age-months"
            value={babyAgeMonths}
            onChange={(e) => setBabyAgeMonths(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Select age range</option>
            {ageRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Sleep Challenges (select all that apply):</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-gray-50">
            {availableChallenges.map(challenge => (
              <div key={challenge} className="flex items-center p-1">
                <input
                  type="checkbox"
                  id={`st-challenge-${challenge.replace(/\s+/g, "-")}`}
                  value={challenge}
                  checked={sleepChallenges.includes(challenge)}
                  onChange={handleChallengeChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`st-challenge-${challenge.replace(/\s+/g, "-")}`} className="ml-2 text-sm text-gray-700">{challenge}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-start">
            <input
              id="opt-in-checkbox"
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
            />
            <label htmlFor="opt-in-checkbox" className="ml-3 text-sm text-gray-700">
              I want to participate in the Sleep Twins feature. I understand that my baby's age range and selected sleep challenges will be used anonymously to help find parents in similar situations and provide aggregated insights.
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !optIn}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Profile...
              </>
            ) : "Save and Find Sleep Twins"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SleepTwinProfileSetup;

