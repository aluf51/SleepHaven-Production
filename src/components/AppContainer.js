import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../contexts/AppContext";
import { lightTheme, darkTheme } from "../utils/theme";
import { pageVariants, pageTransition } from "../utils/animations";

// Core App Screens
import DashboardPage from "./dashboard/DashboardPage";
import SOSModeMain from "./sos/SOSModeMain";
import SleepPlanView from "./plan/SleepPlanView";
import VisualSleepPlannerPage from "./planner/VisualSleepPlannerPage";
import SOSMode from "./SOSMode";

// Margaret AI Screens
import AskMargaretScreen from "./margaret/AskMargaretScreen";
import MargaretCheckInScreen from "./margaret/MargaretCheckInScreen";

// Community Screens
import CommunityHomeScreen from "./community/CommunityHomeScreen";
import SleepTwinsScreen from "./community/SleepTwinsScreen";
import SuccessStoriesScreen from "./community/SuccessStoriesScreen";

// Settings Screen
import SettingsScreen from "./settings/SettingsScreen";

// Navigation Components
import BottomNavigation from "./navigation/BottomNavigation";

// Onboarding Components
import WelcomeScreen from "./onboarding/WelcomeScreen";
import MargaretIntroductionNew from "./onboarding/MargaretIntroductionNew";
import ParentInformationScreen from "./onboarding/ParentInformationScreen";
import BabyProfileScreen from "./onboarding/BabyProfileScreen";
import CurrentSleepSituationScreen from "./onboarding/CurrentSleepSituationScreen";
import SleepChallengesScreen from "./onboarding/SleepChallengesScreen";
import AnalysisScreen from "./onboarding/AnalysisScreen";
import InitialAssessmentScreen from "./onboarding/InitialAssessmentScreen";
import KeyFeaturesIntroductionScreen from "./onboarding/KeyFeaturesIntroductionScreen";
import PermissionsRequestsScreen from "./onboarding/PermissionsRequestsScreen";
import PreferencesSetupScreen from "./onboarding/PreferencesSetupScreen";
import CompletionScreen from "./onboarding/CompletionScreen";
import SleepPlanPresentation from "./onboarding/SleepPlanPresentation";

const AppContainerInternal = () => {
  const context = useContext(AppContext);
  const state = context ? context.state : {};
  const dispatch = context ? context.dispatch : () => {};

  const { 
    currentView, 
    userName, 
    babyName, 
    babyAgeMonths, 
    margaretOnboardingComplete,
    hasSleepPlan
  } = state;

  const currentTheme = (state && typeof state.isDarkMode !== 'undefined' && state.isDarkMode) ? darkTheme : lightTheme;

  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({});
  const [isQuestionnaireRetakeFlow, setIsQuestionnaireRetakeFlow] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // Always start with welcome screen shown
  const [welcomeScreenTimer, setWelcomeScreenTimer] = useState(null);
  const [appInitialized, setAppInitialized] = useState(false);

  // Force margaretOnboardingComplete and hasSleepPlan to true for testing
  // This simulates a returning user who has completed onboarding and has a sleep plan
  useEffect(() => {
    if (!margaretOnboardingComplete || !hasSleepPlan) {
      console.log("[useEffect] Forcing margaretOnboardingComplete and hasSleepPlan to true for testing");
      dispatch({ type: "COMPLETE_MARGARET_ONBOARDING", payload: true });
      dispatch({ type: "SET_HAS_SLEEP_PLAN", payload: true });
      
      // Set baby name if not already set
      if (!babyName) {
        dispatch({ type: "SET_BABY_PROFILE", payload: { name: "Emma", ageMonths: 6 } });
      }
    }
  }, [margaretOnboardingComplete, hasSleepPlan, dispatch, babyName]);

  // Initial app setup - runs only once when component mounts
  useEffect(() => {
    console.log("[useEffect] Initial app setup");
    
    // Force view to welcome screen on initial load
    dispatch({ type: "SET_VIEW", payload: "welcome" });
    
    // Set timer to automatically go to dashboard after 5 seconds
    const timer = setTimeout(() => {
      console.log("[useEffect] Welcome screen timer expired. Redirecting to dashboard.");
      setShowWelcomeScreen(false);
      dispatch({ type: "SET_VIEW", payload: "dashboard" });
    }, 5000);
    
    setWelcomeScreenTimer(timer);
    setAppInitialized(true);
    
    // Cleanup timer if component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  // Handle routing based on onboarding status
  useEffect(() => {
    if (!appInitialized) return;
    
    console.log("[useEffect] Current View:", currentView, "Onboarding Complete:", margaretOnboardingComplete, "Show Welcome:", showWelcomeScreen);
    
    // Skip this check if we're deliberately showing the welcome screen
    if (showWelcomeScreen && currentView === "welcome") {
      console.log("[useEffect] Showing welcome screen, skipping routing checks");
      return;
    }
    
    if (margaretOnboardingComplete && currentView === "onboarding") {
      console.log("[useEffect] Onboarding complete, redirecting to dashboard.");
      dispatch({ type: "SET_VIEW", payload: "dashboard" });
    } else if (!margaretOnboardingComplete && 
               currentView !== "onboarding" &&
               currentView !== "sleepPlanPresentation" && // Allow sleepPlanPresentation view
               currentView !== "sleepPlanView" &&         // Allow sleepPlanView as well
               currentView !== "welcome") {               // Allow welcome view
      console.log("[useEffect] Onboarding NOT complete, and view is not 'onboarding', 'sleepPlanPresentation', 'sleepPlanView', or 'welcome'. Forcing back to 'onboarding'. Current View:", currentView);
      dispatch({ type: "SET_VIEW", payload: "onboarding" });
    }
  }, [margaretOnboardingComplete, currentView, dispatch, onboardingStep, showWelcomeScreen, appInitialized]);

  const handleNextOnboardingStep = (dataFromStep) => {
    console.log("[handleNextOnboardingStep] Called. Current onboardingStep:", onboardingStep, "Data from step:", dataFromStep);
    const newOnboardingData = { ...onboardingData, ...dataFromStep };
    setOnboardingData(newOnboardingData);

    if (dataFromStep.parentName) {
      dispatch({ type: "SET_USER_NAME", payload: dataFromStep.parentName });
    }
    if (dataFromStep.babyName && typeof dataFromStep.babyAgeMonths !== 'undefined') {
      dispatch({ type: "SET_BABY_PROFILE", payload: { name: dataFromStep.babyName, ageMonths: dataFromStep.babyAgeMonths, photo: dataFromStep.babyPhotoName } });
    }
    
    setOnboardingStep(prevStep => {
      const nextStep = prevStep + 1;
      console.log("[handleNextOnboardingStep] Incrementing onboardingStep from", prevStep, "to", nextStep);
      return nextStep;
    });
  };
  
  const handlePreviousOnboardingStep = () => {
    console.log("[handlePreviousOnboardingStep] Called. Current onboardingStep:", onboardingStep);
    if (onboardingStep > 0) {
      setOnboardingStep(prevStep => {
        const nextStep = prevStep - 1;
        console.log("[handlePreviousOnboardingStep] Decrementing onboardingStep from", prevStep, "to", nextStep);
        return nextStep;
      });
    }
  };
  
  const handleGoToDashboard = () => {
    console.log("[handleGoToDashboard] Called. Redirecting to dashboard.");
    dispatch({ type: "SET_VIEW", payload: "dashboard" });
  };
  
  const handleCompleteOnboarding = (dataFromStep) => {
    console.log("[handleCompleteOnboarding] Called. Data from step:", dataFromStep);
    const finalOnboardingData = { ...onboardingData, ...dataFromStep };
    setOnboardingData(finalOnboardingData);
    dispatch({ type: "COMPLETE_MARGARET_ONBOARDING", payload: true });
    if (finalOnboardingData.parentName) {
      dispatch({ type: "SET_USER_NAME", payload: finalOnboardingData.parentName });
    }
    if (finalOnboardingData.babyName && typeof finalOnboardingData.babyAgeMonths !== 'undefined') {
      dispatch({ type: "SET_BABY_PROFILE", payload: { name: finalOnboardingData.babyName, ageMonths: finalOnboardingData.babyAgeMonths, photo: finalOnboardingData.babyPhotoName } });
    }
    dispatch({ type: "UPDATE_ONBOARDING_DATA_COMPLETE", payload: finalOnboardingData });
    dispatch({ type: "SET_VIEW", payload: "dashboard" });
  };

  const renderOnboardingFlow = () => {
    const currentBabyName = onboardingData.babyName || babyName;
    const currentBabyAgeMonths = onboardingData.babyAgeMonths || babyAgeMonths;
    const currentUserName = onboardingData.parentName || userName;
    console.log("[renderOnboardingFlow] Rendering step:", onboardingStep);

    switch (onboardingStep) {
      case 0:
        return <WelcomeScreen onGetStarted={() => handleNextOnboardingStep({})} />;
      case 1:
        return <MargaretIntroductionNew onNext={() => handleNextOnboardingStep({})} onBack={handlePreviousOnboardingStep} userName={currentUserName} babyName={currentBabyName} babyAgeMonths={currentBabyAgeMonths} />;
      case 2:
        return <ParentInformationScreen onNext={handleNextOnboardingStep} onBack={handlePreviousOnboardingStep} />;
      case 3: // Baby Profile Screen
        return <BabyProfileScreen onNext={handleNextOnboardingStep} onBack={handlePreviousOnboardingStep} />;
      case 4: // Current Sleep Situation Screen
        return <CurrentSleepSituationScreen onNext={handleNextOnboardingStep} onBack={handlePreviousOnboardingStep} babyName={currentBabyName} />;
      case 5: // Key Features Introduction Screen (moved from step 8)
        return <KeyFeaturesIntroductionScreen 
          onNext={() => {
            console.log("KeyFeaturesIntroductionScreen onNext: Navigating to Sleep Challenges (step 6)");
            handleNextOnboardingStep({}); // Proceed to next step (Sleep Challenges)
          }} 
          onBack={handlePreviousOnboardingStep}
        />;
      case 6: // Sleep Challenges Screen (Questionnaire) - moved from step 5
        return <SleepChallengesScreen onNext={handleNextOnboardingStep} onBack={handlePreviousOnboardingStep} babyName={currentBabyName} />;
      case 7: // Analysis Screen
        return <AnalysisScreen onComplete={() => handleNextOnboardingStep({})} onBack={handlePreviousOnboardingStep} babyName={currentBabyName} />;
      case 8: // Initial Assessment Screen
        return <InitialAssessmentScreen 
                  onNext={() => {
                    console.log("InitialAssessmentScreen onNext: Advancing to next onboarding step");
                    handleNextOnboardingStep({}); // Properly advance the onboarding step
                  }} 
                  onBack={handlePreviousOnboardingStep}
                  babyName={currentBabyName} 
                  onboardingData={onboardingData} />;
      case 9:
        return <SleepPlanPresentation 
                answers={onboardingData} 
                babyName={currentBabyName} 
                babyAgeMonths={currentBabyAgeMonths} 
                onBack={handlePreviousOnboardingStep}
                onStartPlan={() => handleNextOnboardingStep({})} />;
      case 10:
        return <CompletionScreen 
                onGoToDashboard={() => handleCompleteOnboarding(onboardingData)} 
                onBack={handlePreviousOnboardingStep}
                babyName={currentBabyName} />;
      default:
        console.warn("[renderOnboardingFlow] Reached unknown onboarding step:", onboardingStep, "Forcing completion.");
        handleCompleteOnboarding(onboardingData); 
        return <DashboardPage />;
    }
  };

  const renderCurrentView = () => {
    console.log("[renderCurrentView] Current View:", currentView, "Onboarding Complete:", margaretOnboardingComplete, "Show Welcome:", showWelcomeScreen);
    
    // Special case for returning users - show welcome screen first
    if (currentView === "welcome" && margaretOnboardingComplete) {
      console.log("[renderCurrentView] Rendering welcome screen for returning user");
      return <WelcomeScreen 
                onGetStarted={() => {
                  // Clear the timer and immediately go to dashboard if user clicks
                  if (welcomeScreenTimer) {
                    clearTimeout(welcomeScreenTimer);
                  }
                  console.log("[renderCurrentView] User clicked Continue to Dashboard. Redirecting to dashboard.");
                  setShowWelcomeScreen(false);
                  dispatch({ type: "SET_VIEW", payload: "dashboard" });
                }} 
                isReturningUser={true}
              />;
    }
    
    if (currentView === "onboarding" && !margaretOnboardingComplete) {
      return renderOnboardingFlow();
    }
    if (currentView === "sos") {
      return <SOSModeMain />;
    }
    if (currentView === "sleepPlanPresentation") {
      const presentationBabyName = onboardingData.babyName || babyName;
      const presentationBabyAgeMonths = onboardingData.babyAgeMonths || babyAgeMonths;
      return <SleepPlanPresentation 
                answers={onboardingData} 
                babyName={presentationBabyName} 
                babyAgeMonths={presentationBabyAgeMonths} 
                onStartPlan={() => {
                  console.log("SleepPlanPresentation onStartPlan: Setting view back to onboarding to show completion screen");
                  dispatch({ type: "SET_VIEW", payload: "onboarding" });
                  setOnboardingStep(10); // Set to completion screen
                }} 
              />;
    }
    
    if (currentView === "dashboard") {
      return <DashboardPage />;
    } else if (currentView === "sleepPlan") {
      return <SleepPlanView />;
    } else if (currentView === "sosMode") {
      return <SOSMode />;
    } else if (currentView === "askMargaret") {
      return <AskMargaretScreen />;
    } else if (currentView === "margaretCheckIn") {
      return <MargaretCheckInScreen />;
    } else if (currentView === "communityHome") {
      return <CommunityHomeScreen />;
    } else if (currentView === "sleepTwins") {
      return <SleepTwinsScreen />;
    } else if (currentView === "successStories") {
      return <SuccessStoriesScreen />;
    } else if (currentView === "settings") {
      return <SettingsScreen />;
    }
    
    if (margaretOnboardingComplete || currentView === "dashboard" || !currentView ) {
        return <DashboardPage />;
    }
    
    // Fallback for any other unhandled views when onboarding is not complete
    if (!margaretOnboardingComplete) {
      console.warn("[renderCurrentView] Unhandled view while onboarding incomplete, forcing to onboarding flow. View:", currentView);
      // Ensure we reset to the current onboarding step if somehow currentView is invalid but onboarding not complete
      dispatch({ type: "SET_VIEW", payload: "onboarding" }); 
      return renderOnboardingFlow();
    }
    return <div style={{padding: "20px", color: currentTheme.textColor, backgroundColor: currentTheme.pageBackground, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>This is a placeholder for view: {currentView}</div>;
  };

  return (
      <div 
        style={{
          minHeight: "100vh",
          backgroundColor: currentTheme.pageBackground,
          color: currentTheme.textColor,
          fontFamily: currentTheme.fontFamilyBody,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
              key={currentView === 'onboarding' ? `onboarding-${onboardingStep}` : currentView}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              style={{ paddingBottom: currentView !== 'onboarding' && margaretOnboardingComplete ? '70px' : '0' }}
          >
              {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
        
        {/* Only show bottom navigation when onboarding is complete and not in onboarding flow or welcome screen */}
        {currentView !== 'onboarding' && currentView !== 'welcome' && margaretOnboardingComplete && (
          <BottomNavigation />
        )}
      </div>
  );
};

const AppContainer = () => {
  return <AppContainerInternal />;
}

export default AppContainer;
