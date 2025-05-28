// /home/ubuntu/components/community/SleepTwinsDashboard.js
import React, { useState, useEffect, useContext } from "react";
import SleepTwinProfileSetup from "./SleepTwinProfileSetup";
import MatchedInsights from "./MatchedInsights";
// import { AppContext } from "../../contexts/AppContext"; // Assuming AppContext
// import apiService from "../../services/apiService"; // Assuming an apiService

// Mock API service for now
const mockApiService = {
  getSleepTwinProfile: async () => {
    console.log("Fetching sleep twin profile...");
    await new Promise(resolve => setTimeout(resolve, 700));
    // Simulate a user who has already set up their profile
    // return { hasProfile: true, profile: { babyAgeMonths: "4-6", sleepChallenges: ["Short naps", "Bedtime resistance"], optInStatus: true } };
    // Simulate a user who has NOT set up their profile
    return { hasProfile: false, profile: null }; 
  },
  getSleepTwinInsights: async (profile) => {
    console.log("Fetching insights for profile:", profile);
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Mock insights data
    return [
      { id: "insight1", text: `Many parents with babies aged ${profile.babyAgeMonths} months also report challenges with ${profile.sleepChallenges.join(" and ")}. You are not alone!`, type: "reassurance" },
      { id: "insight2", text: "A common strategy for bedtime resistance in this age group is establishing a very consistent and calming bedtime routine.", type: "strategy" },
      { id: "insight3", text: "For short naps, some parents find success by trying to resettle the baby immediately after they wake, or by slightly adjusting wake windows.", type: "strategy" },
      { id: "insight4", text: "72% of parents in a similar situation found that focusing on a dark, cool, and quiet sleep environment helped improve nap duration.", type: "statistic" }
    ];
  }
};

const SleepTwinsDashboard = () => {
  // const { isPremiumUser, userProfile, updateUserProfile } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now

  const [hasProfile, setHasProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPremiumUser) {
      setIsLoadingProfile(false);
      return;
    }

    const loadProfile = async () => {
      setIsLoadingProfile(true);
      setError(null);
      try {
        // const data = await apiService.getSleepTwinProfile();
        const data = await mockApiService.getSleepTwinProfile();
        if (data.hasProfile && data.profile) {
          setHasProfile(true);
          setProfileData(data.profile);
          // updateUserProfile({ sleepTwinProfile: data.profile, hasOptedInSleepTwins: true });
        } else {
          setHasProfile(false);
          // updateUserProfile({ sleepTwinProfile: null, hasOptedInSleepTwins: false });
        }
      } catch (err) {
        console.error("Error loading Sleep Twin profile:", err);
        setError("Could not load your Sleep Twin information. Please try again.");
      }
      setIsLoadingProfile(false);
    };

    loadProfile();
  }, [isPremiumUser]);

  useEffect(() => {
    if (hasProfile && profileData) {
      const fetchInsights = async () => {
        setIsLoadingInsights(true);
        setError(null);
        try {
          // const fetchedInsights = await apiService.getSleepTwinInsights(profileData);
          const fetchedInsights = await mockApiService.getSleepTwinInsights(profileData);
          setInsights(fetchedInsights);
        } catch (err) {
          console.error("Error fetching sleep twin insights:", err);
          setError("Could not load insights at this time. Please try again later.");
        }
        setIsLoadingInsights(false);
      };
      fetchInsights();
    }
  }, [hasProfile, profileData]);

  const handleProfileSetupComplete = (newProfile) => {
    setProfileData(newProfile);
    setHasProfile(true);
    // updateUserProfile({ sleepTwinProfile: newProfile, hasOptedInSleepTwins: true });
    // Potentially navigate away or show a success message before loading insights
  };
  
  const handleOptOut = async () => {
    // Placeholder for opt-out logic
    // This would involve an API call to update backend and then update local state
    // await mockApiService.optOutOfSleepTwins(); 
    setHasProfile(false);
    setProfileData(null);
    setInsights([]);
    // updateUserProfile({ sleepTwinProfile: null, hasOptedInSleepTwins: false });
    alert("You have opted out of the Sleep Twins feature. Your profile data has been removed from matching.");
  };

  if (!isPremiumUser) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700">The Sleep Twins feature is available for premium subscribers. Upgrade to connect!</p>
      </div>
    );
  }

  if (isLoadingProfile) {
    return <div className="text-center p-10"><p>Loading Sleep Twins information...</p></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500"><p>{error}</p></div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Sleep Twins Connect</h2>
      
      {!hasProfile ? (
        <SleepTwinProfileSetup onProfileSetupComplete={handleProfileSetupComplete} />
      ) : (
        <div>
          <div className="p-6 bg-purple-50 rounded-lg shadow-md border border-purple-200 mb-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Your Sleep Twin Profile</h3>
            <p className="text-gray-700">
              <span className="font-medium">Baby Age Range:</span> {profileData?.babyAgeMonths} months
            </p>
            <p className="text-gray-700 mt-1">
              <span className="font-medium">Selected Challenges:</span> {profileData?.sleepChallenges?.join(", ") || "None selected"}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button 
                    onClick={() => setHasProfile(false)} // Allow re-setup or edit
                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150 ease-in-out"
                >
                    Edit Profile
                </button>
                <button 
                    onClick={handleOptOut}
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150 ease-in-out"
                >
                    Opt Out of Sleep Twins
                </button>
            </div>
          </div>

          {isLoadingInsights ? (
            <div className="text-center p-10"><p>Loading insights from your Sleep Twins group...</p></div>
          ) : (
            <MatchedInsights 
                insights={insights} 
                babyAgeMonths={profileData?.babyAgeMonths}
                sleepChallenges={profileData?.sleepChallenges}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SleepTwinsDashboard;

