import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../contexts/AppContext";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import CalmAnimatedBackground from "./CalmAnimatedBackground";
import GuidedBreathingStep from "./GuidedBreathingStep";
import ImmediateHelpOptions from "./ImmediateHelpOptions";
import ProgressIndicator from "./ProgressIndicator";
import MargaretSupportPrompt from "./MargaretSupportPrompt";
import QuickTipScreen from "./QuickTipScreen"; // Import new screen
import ContactSupportScreen from "./ContactSupportScreen"; // Import new screen
import CommunityWisdomScreen from "./CommunityWisdomScreen"; // Import new screen

const sosThemeColors = {
    pageBackground: "#1A2151",
    cardBackgroundColor: "#2D3258",
    textColor: "#E8EBFA",
    subtleTextColor: "#BDC4E8",
    headingColor: "#E8EBFA",
    primaryColor: "#7B91C9",
    secondaryColor: "#5A6794", // Added for back buttons or secondary actions
    accentColor: "#FF6B6B", // For stop buttons or alerts
    fontFamilyHeadings: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    fontFamilyBody: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    simplified: {
        pageBackground: "#10153B",
        textColor: "#F0F2FC",
        headingFontSize: "1.5rem",
        textFontSize: "1.1rem",
        lineHeight: "1.8",
    }
};

const SOSModeMain = () => {
  const { dispatch } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [sosSessionTime, setSosSessionTime] = useState(0);
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  // const [animationStyle, setAnimationStyle] = useState("starryNight"); // Keep for CalmAnimatedBackground
  const [currentHelpOptionScreen, setCurrentHelpOptionScreen] = useState(null); // null, 'quickTip', 'contactSupport', 'communityWisdom'

  const effectiveTheme = sosThemeColors;

  useEffect(() => {
    const timer = setInterval(() => {
      setSosSessionTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const totalSteps = 3;

  const handleNextStep = useCallback(() => {
    setCurrentHelpOptionScreen(null); // Reset help option screen when moving to next main step
    setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev));
  }, []);
  
  const handleSelectHelpOption = (option) => {
    setCurrentHelpOptionScreen(option);
  };

  const handleBackToHelpOptions = () => {
    setCurrentHelpOptionScreen(null);
  };

  const toggleSimplifiedView = () => {
    setIsSimplifiedView(prev => !prev);
  };
  
  const renderStepContent = () => {
    if (currentStep === 2 && currentHelpOptionScreen) {
      switch (currentHelpOptionScreen) {
        case 'quickTip':
          return <QuickTipScreen theme={effectiveTheme} onBack={handleBackToHelpOptions} />;
        case 'contactSupport':
          return <ContactSupportScreen theme={effectiveTheme} onBack={handleBackToHelpOptions} />;
        case 'communityWisdom':
          return <CommunityWisdomScreen theme={effectiveTheme} onBack={handleBackToHelpOptions} />;
        default:
          setCurrentHelpOptionScreen(null); // Should not happen, reset
          return <ImmediateHelpOptions theme={effectiveTheme} onSelectOption={handleSelectHelpOption} onContinue={handleNextStep} isSimplifiedView={isSimplifiedView} />;
      }
    }

    switch (currentStep) {
      case 1:
        return <GuidedBreathingStep theme={effectiveTheme} onComplete={handleNextStep} isSimplifiedView={isSimplifiedView} />;
      case 2:
        // If no specific help option screen is active, show the main options
        return <ImmediateHelpOptions theme={effectiveTheme} onSelectOption={handleSelectHelpOption} onContinue={handleNextStep} isSimplifiedView={isSimplifiedView} />;
      case 3:
        return <MargaretSupportPrompt theme={effectiveTheme} onEndSession={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })} isSimplifiedView={isSimplifiedView} />;
      default:
        return (
            <div className="text-center p-6">
                <h2 style={{ color: effectiveTheme.headingColor }}>SOS Mode Complete</h2>
                <p style={{ color: effectiveTheme.textColor }}>You have completed the SOS session.</p>
                <button 
                    onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}
                    className="mt-6 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
                    style={{ backgroundColor: effectiveTheme.primaryColor, color: effectiveTheme.textColor }}
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }
  };

  const pageStyle = {
    backgroundColor: isSimplifiedView ? effectiveTheme.simplified.pageBackground : effectiveTheme.pageBackground,
    color: isSimplifiedView ? effectiveTheme.simplified.textColor : effectiveTheme.textColor,
    fontFamily: effectiveTheme.fontFamilyBody,
    minHeight: "100vh",
    transition: "background-color 0.8s ease, color 0.8s ease",
  };

  const contentPadding = isSimplifiedView ? "p-6 md:p-8" : "p-4 md:p-6";
  const textLineHeight = isSimplifiedView ? effectiveTheme.simplified.lineHeight : "1.6";

  return (
    <div style={pageStyle} className="flex flex-col">
      <CalmAnimatedBackground animationStyle={"starryNight"} isActive={!isSimplifiedView} theme={effectiveTheme} />
      
      <header className={`flex items-center justify-between ${contentPadding} pt-6 z-10`}>
        <button 
            onClick={() => {
                if (currentStep === 2 && currentHelpOptionScreen) {
                    handleBackToHelpOptions(); // Go back to help options list first
                } else {
                    dispatch({ type: "SET_VIEW", payload: "dashboard" });
                }
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} style={{ color: effectiveTheme.textColor }} />
        </button>
        <h3 className="text-lg font-semibold" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>
          SOS Sleep Help
        </h3>
        <button onClick={toggleSimplifiedView} className="p-2 rounded-full hover:bg-white/10 transition-colors" title={isSimplifiedView ? "Show Full View" : "Show Simplified View"}>
          {isSimplifiedView ? <Eye size={24} style={{ color: effectiveTheme.textColor }} /> : <EyeOff size={24} style={{ color: effectiveTheme.textColor }} />}
        </button>
      </header>

      <div className={`my-4 ${contentPadding} z-10`}>
        <div className="flex justify-between items-center text-xs mb-4" style={{ color: effectiveTheme.subtleTextColor }}>
          <span>SOS Session: {formatTime(sosSessionTime)}</span>
          {/* Hide step count when viewing a help option sub-screen */}
          {!(currentStep === 2 && currentHelpOptionScreen) && (
            <span>Step: {currentStep > totalSteps ? totalSteps : currentStep} of {totalSteps}</span>
          )}
        </div>
        {/* Hide progress indicator when viewing a help option sub-screen */}
        {!(currentStep === 2 && currentHelpOptionScreen) && (
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} theme={effectiveTheme} isSimplifiedView={isSimplifiedView} />
        )}
      </div>
      
      <main className="flex-grow flex flex-col z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep + (currentHelpOptionScreen || '')} // Ensure re-render on sub-screen change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className={`flex-grow p-4 rounded-lg shadow-xl m-4 ${contentPadding}`}
            style={{
                backgroundColor: effectiveTheme.cardBackgroundColor,
                border: `1px solid ${effectiveTheme.primaryColor}33`,
                lineHeight: textLineHeight,
            }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className={`text-center text-xs ${contentPadding} pb-6 z-10`} style={{ color: effectiveTheme.subtleTextColor}}>
        <p>You are strong. You can do this.</p>
      </footer>
    </div>
  );
};

export default SOSModeMain;

