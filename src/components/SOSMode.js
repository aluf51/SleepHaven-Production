import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { ArrowLeft, Zap, HelpCircle, Smile, Phone, MessageCircle, Users } from 'lucide-react';
import NavigationButtons from './common/NavigationButtons';

// Enhanced quick solutions data with more detailed guidance
const quickSolutionsData = {
  overtired: {
    title: "Overtired",
    solution: "Try an earlier bedtime tomorrow, even 30min can help. Focus on calming activities before bed. Dim lights and reduce stimulation."
  },
  teething: {
    title: "Teething",
    solution: "Consider appropriate teething remedies like a cold teether or consult your pediatrician for pain relief options. Gentle gum massage may help."
  },
  separation_anxiety: {
    title: "Separation Anxiety",
    solution: "Reassure baby with your presence, then gradually step away. Use a comfort object that smells like you. Maintain a consistent goodbye routine."
  },
  hunger: {
    title: "Hunger Cues",
    solution: "Ensure baby is getting full feeds during the day. A small top-up feed might be needed if it has been a while since the last feeding."
  }
};

const SOSMode = ({ theme, babyName }) => {
  const { state, dispatch } = useContext(AppContext);
  const effectiveTheme = theme || (state.isDarkMode ? state.darkTheme : state.lightTheme);

  const [currentStep, setCurrentStep] = useState(1);
  const [sosSessionTime, setSosSessionTime] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingCycle, setBreathingCycle] = useState({ inhale: 4, hold: 2, exhale: 6, count: 0 });
  const [partnerPhone, setPartnerPhone] = useState(localStorage.getItem('partnerPhone') || '');
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleGoToDashboard = () => {
    console.log("[handleGoToDashboard] Called. Redirecting to dashboard.");
    dispatch({ type: "SET_VIEW", payload: "dashboard" });
  };

  // Timer for SOS Session
  useEffect(() => {
    const timer = setInterval(() => {
      setSosSessionTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer for Breathing Exercise
  useEffect(() => {
    let breathTimer;
    if (isBreathing && breathingCycle.count < 30) {
      breathTimer = setInterval(() => {
        setBreathingCycle(prev => ({ ...prev, count: prev.count + 1 }));
      }, 1000);
    } else if (breathingCycle.count >= 30) {
      setIsBreathing(false);
    }
    return () => clearInterval(breathTimer);
  }, [isBreathing, breathingCycle.count]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathingCycle({ ...breathingCycle, count: 0 });
  };

  const handleCallPartner = () => {
    if (partnerPhone) {
      // In a real app, this would integrate with the device's phone capabilities
      alert(`Calling partner at ${partnerPhone}...`);
    } else {
      setShowPartnerForm(true);
    }
  };

  const handleSavePartnerPhone = () => {
    localStorage.setItem('partnerPhone', partnerPhone);
    setShowPartnerForm(false);
    alert(`Partner's number saved. You can now call for help with one tap.`);
  };

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setCurrentStep(3); // Move to specific guidance step
  };
  
  const totalSteps = 5;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <Smile size={48} className="mx-auto mb-4" style={{ color: effectiveTheme.primaryColor }} />
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>Take a Deep Breath</h4>
            <p className="mb-4 text-sm" style={{ color: effectiveTheme.textColor }}>First, let's help you find your calm. Take a moment to breathe with me before addressing baby's needs.</p>
            <motion.div 
              className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white mb-4 shadow-lg"
              style={{ backgroundColor: effectiveTheme.primaryColor }}
              animate={isBreathing ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={isBreathing ? { duration: breathingCycle.inhale + breathingCycle.hold + breathingCycle.exhale, repeat: Infinity, ease: "linear" } : {}}
            >
              {isBreathing ? `Breathe... ${breathingCycle.count}s` : "Breathe with me"}
            </motion.div>
            <p className="text-xs mb-6" style={{ color: effectiveTheme.subtleTextColor }}>Inhale {breathingCycle.inhale}s, Hold {breathingCycle.hold}s, Exhale {breathingCycle.exhale}s. Continue for at least 30 seconds.</p>
            {!isBreathing ? (
              <button 
                onClick={handleStartBreathing}
                className="w-full py-3 rounded-lg font-semibold text-white transition-colors shadow-md"
                style={{ backgroundColor: effectiveTheme.ctaColor, fontFamily: effectiveTheme.fontFamilyBody }}
              >
                Start Breathing
              </button>
            ) : (
              <button 
                onClick={() => { setIsBreathing(false); setCurrentStep(2); }}
                className="w-full py-3 rounded-lg font-semibold text-white transition-colors shadow-md mt-2"
                style={{ backgroundColor: effectiveTheme.secondaryColor, fontFamily: effectiveTheme.fontFamilyBody }}
              >
                Next Step
              </button>
            )}
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <HelpCircle size={48} className="mx-auto mb-4" style={{ color: effectiveTheme.primaryColor }} />
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>What's Happening?</h4>
            <p className="mb-4 text-sm" style={{ color: effectiveTheme.textColor }}>Select the issue that best describes what's happening with {babyName || 'your baby'}.</p>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              {Object.entries(quickSolutionsData).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleSelectIssue(key)}
                  className="p-3 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow"
                  style={{ 
                    backgroundColor: effectiveTheme.cardBackgroundColor,
                    border: `1px solid ${effectiveTheme.cardBorderColor}`
                  }}
                >
                  <h5 className="font-semibold text-sm" style={{ color: effectiveTheme.headingColor }}>{value.title}</h5>
                </button>
              ))}
              <button
                onClick={() => setCurrentStep(4)}
                className="p-3 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow"
                style={{ 
                  backgroundColor: effectiveTheme.cardBackgroundColor,
                  border: `1px solid ${effectiveTheme.cardBorderColor}`
                }}
              >
                <h5 className="font-semibold text-sm" style={{ color: effectiveTheme.headingColor }}>None of these / Not sure</h5>
              </button>
            </div>
            
            <button 
              onClick={() => setCurrentStep(4)}
              className="w-full py-3 rounded-lg font-semibold transition-colors shadow-md"
              style={{ 
                backgroundColor: effectiveTheme.subtleBackground,
                color: effectiveTheme.textColor,
                fontFamily: effectiveTheme.fontFamilyBody
              }}
            >
              Skip to Quick Solutions
            </button>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <Zap size={48} className="mx-auto mb-4" style={{ color: effectiveTheme.primaryColor }} />
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>
              {selectedIssue && quickSolutionsData[selectedIssue]?.title || 'Specific Guidance'}
            </h4>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 text-left">
              <p className="text-sm" style={{ color: effectiveTheme.textColor }}>
                {selectedIssue && quickSolutionsData[selectedIssue]?.solution || 'Try these specific techniques to help your baby.'}
              </p>
              
              {selectedIssue === 'overtired' && (
                <ul className="list-disc pl-5 mt-3 text-sm space-y-2" style={{ color: effectiveTheme.textColor }}>
                  <li>Darken the room completely</li>
                  <li>Use white noise at a consistent volume</li>
                  <li>Try gentle rocking while holding baby close</li>
                  <li>Tomorrow, watch for early tired signs and put baby down sooner</li>
                </ul>
              )}
              
              {selectedIssue === 'teething' && (
                <ul className="list-disc pl-5 mt-3 text-sm space-y-2" style={{ color: effectiveTheme.textColor }}>
                  <li>Offer a cold teether or clean washcloth</li>
                  <li>Gently massage baby's gums with a clean finger</li>
                  <li>Consult your pediatrician about appropriate pain relief</li>
                  <li>Extra cuddles and comfort during this uncomfortable time</li>
                </ul>
              )}
              
              {selectedIssue === 'separation_anxiety' && (
                <ul className="list-disc pl-5 mt-3 text-sm space-y-2" style={{ color: effectiveTheme.textColor }}>
                  <li>Stay in the room but gradually increase distance</li>
                  <li>Use a comfort object that smells like you</li>
                  <li>Play peek-a-boo during the day to build confidence</li>
                  <li>Maintain consistent bedtime routines</li>
                </ul>
              )}
              
              {selectedIssue === 'hunger' && (
                <ul className="list-disc pl-5 mt-3 text-sm space-y-2" style={{ color: effectiveTheme.textColor }}>
                  <li>Offer a feed, even if it's outside normal schedule</li>
                  <li>Tomorrow, ensure daytime feeds are full and complete</li>
                  <li>Consider if baby is going through a growth spurt</li>
                  <li>For older babies, a small protein-rich snack before bed may help</li>
                </ul>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentStep(2)}
                className="flex-1 py-3 rounded-lg font-medium transition-colors"
                style={{ 
                  backgroundColor: effectiveTheme.subtleBackground,
                  color: effectiveTheme.textColor,
                  fontFamily: effectiveTheme.fontFamilyBody
                }}
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-3 rounded-lg font-semibold text-white transition-colors shadow-md"
                style={{ 
                  backgroundColor: effectiveTheme.ctaColor,
                  fontFamily: effectiveTheme.fontFamilyBody
                }}
              >
                Next: Get Help
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <Users size={48} className="mx-auto mb-4" style={{ color: effectiveTheme.primaryColor }} />
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>Need Extra Support?</h4>
            <p className="mb-6 text-sm" style={{ color: effectiveTheme.textColor }}>Sometimes we all need a helping hand. Reach out to your support network.</p>
            
            <div className="space-y-3 mb-6">
              <button 
                onClick={handleCallPartner}
                className="w-full py-3 px-4 rounded-lg font-medium text-left flex items-center"
                style={{ 
                  backgroundColor: effectiveTheme.primaryColorMuted || effectiveTheme.subtleBackground,
                  color: effectiveTheme.textColor,
                  border: `1px solid ${effectiveTheme.cardBorderColor}`
                }}
              >
                <Phone size={20} className="mr-3" />
                <span>Call Partner for Help</span>
              </button>
              
              <button 
                onClick={() => setCurrentStep(5)}
                className="w-full py-3 px-4 rounded-lg font-medium text-left flex items-center"
                style={{ 
                  backgroundColor: effectiveTheme.secondaryColorMuted || effectiveTheme.subtleBackground,
                  color: effectiveTheme.textColor,
                  border: `1px solid ${effectiveTheme.cardBorderColor}`
                }}
              >
                <Users size={20} className="mr-3" />
                <span>Community Tips</span>
              </button>
            </div>
            
            <button 
              onClick={() => setCurrentStep(5)}
              className="w-full py-3 rounded-lg font-semibold text-white transition-colors shadow-md"
              style={{ 
                backgroundColor: effectiveTheme.ctaColor,
                fontFamily: effectiveTheme.fontFamilyBody
              }}
            >
              Next: Community Wisdom
            </button>
          </div>
        );
      case 5:
        return (
          <div className="text-center">
            <Users size={48} className="mx-auto mb-4" style={{ color: effectiveTheme.primaryColor }} />
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>Community Wisdom</h4>
            <p className="mb-6 text-sm" style={{ color: effectiveTheme.textColor }}>Tips from other parents who've been through similar situations.</p>
            
            <div className="space-y-4 mb-6 text-left">
              <div className="p-4 rounded-lg" style={{ backgroundColor: effectiveTheme.subtleBackground, border: `1px solid ${effectiveTheme.cardBorderColor}` }}>
                <p className="text-sm italic mb-2" style={{ color: effectiveTheme.textColor }}>
                  "When my baby wouldn't settle, I found that changing the white noise sound made a huge difference. We switched from rain to ocean waves and it worked like magic!"
                </p>
                <p className="text-xs" style={{ color: effectiveTheme.subtleTextColor }}>- Parent of 8-month-old</p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: effectiveTheme.subtleBackground, border: `1px solid ${effectiveTheme.cardBorderColor}` }}>
                <p className="text-sm italic mb-2" style={{ color: effectiveTheme.textColor }}>
                  "For teething pain at night, we found that a quick cuddle session with a cold teether before putting down helped tremendously. The key was catching it early."
                </p>
                <p className="text-xs" style={{ color: effectiveTheme.subtleTextColor }}>- Parent of 11-month-old</p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: effectiveTheme.subtleBackground, border: `1px solid ${effectiveTheme.cardBorderColor}` }}>
                <p className="text-sm italic mb-2" style={{ color: effectiveTheme.textColor }}>
                  "Taking shifts with my partner saved our sanity. Even just 3 hours of uninterrupted sleep made a huge difference in how we could handle the situation."
                </p>
                <p className="text-xs" style={{ color: effectiveTheme.subtleTextColor }}>- Parent of 4-month-old</p>
              </div>
            </div>
            
            <button 
              onClick={handleGoToDashboard}
              className="w-full py-3 rounded-lg font-semibold text-white transition-colors shadow-md"
              style={{ 
                backgroundColor: effectiveTheme.ctaColor,
                fontFamily: effectiveTheme.fontFamilyBody
              }}
            >
              Return to Dashboard
            </button>
          </div>
        );
      default:
        return <p>Step {currentStep} content will go here.</p>;
    }
  };

  return (
    <div className="p-4 flex flex-col h-full relative" style={{ backgroundColor: effectiveTheme.pageBackground }}>
      {/* Dashboard Navigation Button */}
      <NavigationButtons 
        onDashboard={handleGoToDashboard}
        showBack={false}
        showDashboard={true}
        position="top-right"
        variant="minimal"
      />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : handleGoToDashboard()} className="p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft size={24} style={{ color: effectiveTheme.textColor }} />
        </button>
        <h3 className="text-lg font-semibold" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>SOS Sleep Help</h3>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      {/* Session Info */}
      <div className="flex justify-between items-center mb-6 text-xs px-2" style={{ color: effectiveTheme.subtleTextColor }}>
        <span>SOS Session: {formatTime(sosSessionTime)}</span>
        <span>Step: {currentStep} of {totalSteps}</span>
      </div>
      
      {/* Step Progress Dots */}
      <div className="flex justify-center items-center mb-6">
        {[...Array(totalSteps)].map((_, i) => (
          <React.Fragment key={i}>
            <motion.div 
              className={`w-3 h-3 rounded-full ${currentStep === i + 1 ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
              style={{ backgroundColor: currentStep === i + 1 ? effectiveTheme.primaryColor : effectiveTheme.cardBorderColor }}
              animate={{ scale: currentStep === i + 1 ? 1.25 : 1}}
            />
            {i < totalSteps - 1 && <div className="w-6 h-px bg-gray-300" style={{ backgroundColor: effectiveTheme.cardBorderColor }} />} 
          </React.Fragment>
        ))}
      </div>

      {/* Main Step Content */}
      <div className="flex-grow p-4 rounded-lg shadow-lg mb-6" style={{ backgroundColor: effectiveTheme.cardBackgroundColor, border: `1px solid ${effectiveTheme.cardBorderColor}`}}>
        {renderStepContent()}
      </div>

      {/* Quick Solutions - Only show on first step */}
      {currentStep === 1 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-3" style={{ fontFamily: effectiveTheme.fontFamilyHeadings, color: effectiveTheme.headingColor }}>Quick Solutions for Common Issues</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(quickSolutionsData).map(([key, value]) => (
              <div 
                key={key} 
                className="p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                style={{ 
                  backgroundColor: effectiveTheme.secondaryLighterBg || effectiveTheme.secondaryLighter, 
                  border: `1px solid ${effectiveTheme.secondaryLighterAccent || effectiveTheme.cardBorderColor}`
                }}
                onClick={() => {
                  setSelectedIssue(key);
                  setCurrentStep(3);
                }}
              >
                <h5 className="font-semibold text-sm mb-1" style={{ color: effectiveTheme.secondaryDarker, fontFamily: effectiveTheme.fontFamilyBody }}>{value.title}</h5>
                <p className="text-xs" style={{ color: effectiveTheme.subtleTextColor }}>{value.solution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partner Phone Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Add Partner's Phone</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Partner's Phone Number
              </label>
              <input
                type="tel"
                value={partnerPhone}
                onChange={(e) => setPartnerPhone(e.target.value)}
                placeholder="e.g., +1 555-123-4567"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This will be saved for quick access during nighttime emergencies.
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPartnerForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePartnerPhone}
                disabled={!partnerPhone.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  !partnerPhone.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Save & Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSMode;
