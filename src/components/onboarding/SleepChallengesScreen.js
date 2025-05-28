import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretAvatar from './MargaretAvatar';

const SleepChallengesScreen = ({ onNext, babyName }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // Multi-step questionnaire state
  const [currentStep, setCurrentStep] = useState(0);
  
  // Sleep challenges data
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [customChallenge, setCustomChallenge] = useState('');
  
  // Additional questionnaire data
  const [sleepEnvironment, setSleepEnvironment] = useState('');
  const [sleepRoutine, setSleepRoutine] = useState('');
  const [sleepGoals, setSleepGoals] = useState([]);
  const [customGoal, setCustomGoal] = useState('');
  const [sleepHistory, setSleepHistory] = useState('');
  const [previousAttempts, setPreviousAttempts] = useState('');
  const [parentingStyle, setParentingStyle] = useState('');

  const predefinedChallenges = [
    "Frequent night wakings (waking up 3+ times)",
    "Short naps (less than 30 minutes)",
    "Bedtime resistance or crying",
    "Early morning wakings (before 5:30 AM)",
    "Difficulty falling asleep independently",
    "Sleep association dependencies (needs rocking, feeding, etc.)",
    "Transitioning between sleep cycles",
    "Co-sleeping challenges",
    "Nighttime feeding issues",
    "Inconsistent sleep schedule"
  ];
  
  const predefinedGoals = [
    "Longer stretches of nighttime sleep",
    "Independent sleep (falling asleep without help)",
    "Consistent nap schedule",
    "Bedtime without tears",
    "Sleeping through the night",
    "Easier bedtime routine",
    "Better sleep environment"
  ];

  const toggleChallenge = (challenge) => {
    setSelectedChallenges(prev => 
      prev.includes(challenge) 
        ? prev.filter(item => item !== challenge) 
        : [...prev, challenge]
    );
  };

  const toggleGoal = (goal) => {
    setSleepGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(item => item !== goal) 
        : [...prev, goal]
    );
  };

  const handleAddCustomChallenge = () => {
    if (customChallenge.trim() && !selectedChallenges.includes(customChallenge.trim())) {
      setSelectedChallenges(prev => [...prev, customChallenge.trim()]);
      setCustomChallenge('');
    }
  };
  
  const handleAddCustomGoal = () => {
    if (customGoal.trim() && !sleepGoals.includes(customGoal.trim())) {
      setSleepGoals(prev => [...prev, customGoal.trim()]);
      setCustomGoal('');
    }
  };

  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 0 && selectedChallenges.length === 0 && !customChallenge.trim()) {
      alert('Please select at least one sleep challenge or add a custom one.');
      return;
    }
    
    if (currentStep === 1 && sleepGoals.length === 0 && !customGoal.trim()) {
      alert('Please select at least one sleep goal or add a custom one.');
      return;
    }
    
    // Add any pending custom entries
    if (currentStep === 0 && customChallenge.trim()) {
      handleAddCustomChallenge();
    }
    
    if (currentStep === 1 && customGoal.trim()) {
      handleAddCustomGoal();
    }
    
    // Move to next step or submit
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Compile all questionnaire data
    const questionnaireData = {
      sleepChallenges: selectedChallenges,
      sleepEnvironment,
      sleepRoutine,
      sleepGoals,
      sleepHistory,
      previousAttempts,
      parentingStyle
    };
    
    // Update app state
    dispatch({ type: 'UPDATE_ONBOARDING_DATA', payload: questionnaireData });
    console.log("Questionnaire Data:", questionnaireData);
    
    // Proceed to next screen
    onNext(questionnaireData);
  };

  const screenVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const inputStyle = {
    borderColor: currentTheme.cardBorderColor,
    backgroundColor: currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor,
    color: currentTheme.textColor,
    outlineColor: currentTheme.primaryColor
  };
  
  const labelStyle = {
    color: currentTheme.textColor
  };
  
  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };
  
  const progressPercentage = ((currentStep + 1) / 5) * 100;

  // Render different content based on current step
  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-2 text-center"
              style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
            >
              What Sleep Challenges Are You Facing With {babyName || 'Your Little One'}?
            </motion.h2>
            
            <motion.p 
              className="text-center mb-6 text-sm md:text-base"
              style={{ color: currentTheme.subtleTextColor }}
            >
              Select all that apply to help us understand your specific situation.
            </motion.p>
            
            <div className="space-y-3 mb-4">
              {predefinedChallenges.map(challenge => (
                <motion.button
                  key={challenge}
                  type="button"
                  onClick={() => toggleChallenge(challenge)}
                  className={`w-full p-3.5 border rounded-lg text-left transition-all duration-200 ease-in-out shadow-sm 
                              ${selectedChallenges.includes(challenge) ? 'ring-2 ring-offset-1' : ''}`}
                  style={{
                    ...inputStyle,
                    borderColor: selectedChallenges.includes(challenge) ? currentTheme.primaryColor : currentTheme.cardBorderColor,
                    backgroundColor: selectedChallenges.includes(challenge) ? currentTheme.primaryColorMuted : (currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor),
                    color: selectedChallenges.includes(challenge) ? currentTheme.primaryColorContrast : currentTheme.textColor,
                    fontWeight: selectedChallenges.includes(challenge) ? '600' : 'normal',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 8px ${currentTheme.primaryColor}`}}
                >
                  {challenge}
                </motion.button>
              ))}
            </div>

            <div className="mb-6">
              <label htmlFor="customChallenge" className="block mb-2 text-sm font-medium" style={labelStyle}>
                Or add a custom challenge:
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  id="customChallenge" 
                  value={customChallenge}
                  onChange={(e) => setCustomChallenge(e.target.value)}
                  placeholder="E.g., Wakes up when put down"
                  className="flex-grow p-3 border rounded-lg shadow-sm focus:ring-2"
                  style={inputStyle}
                />
                <motion.button 
                  type="button"
                  onClick={handleAddCustomChallenge}
                  className="px-4 py-3 rounded-lg font-semibold text-white transition-colors shadow-md"
                  style={{ backgroundColor: currentTheme.secondaryColor }}
                  whileHover={{ scale: 1.05, backgroundColor: currentTheme.secondaryDarker || currentTheme.secondaryColor }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </div>
            </div>
          </>
        );
        
      case 1:
        return (
          <>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-2 text-center"
              style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
            >
              What Are Your Sleep Goals For {babyName || 'Your Little One'}?
            </motion.h2>
            
            <motion.p 
              className="text-center mb-6 text-sm md:text-base"
              style={{ color: currentTheme.subtleTextColor }}
            >
              Select the outcomes that matter most to you and your family.
            </motion.p>
            
            <div className="space-y-3 mb-4">
              {predefinedGoals.map(goal => (
                <motion.button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`w-full p-3.5 border rounded-lg text-left transition-all duration-200 ease-in-out shadow-sm 
                              ${sleepGoals.includes(goal) ? 'ring-2 ring-offset-1' : ''}`}
                  style={{
                    ...inputStyle,
                    borderColor: sleepGoals.includes(goal) ? currentTheme.primaryColor : currentTheme.cardBorderColor,
                    backgroundColor: sleepGoals.includes(goal) ? currentTheme.primaryColorMuted : (currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor),
                    color: sleepGoals.includes(goal) ? currentTheme.primaryColorContrast : currentTheme.textColor,
                    fontWeight: sleepGoals.includes(goal) ? '600' : 'normal',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 8px ${currentTheme.primaryColor}`}}
                >
                  {goal}
                </motion.button>
              ))}
            </div>

            <div className="mb-6">
              <label htmlFor="customGoal" className="block mb-2 text-sm font-medium" style={labelStyle}>
                Or add a custom goal:
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  id="customGoal" 
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="E.g., Less stress at bedtime"
                  className="flex-grow p-3 border rounded-lg shadow-sm focus:ring-2"
                  style={inputStyle}
                />
                <motion.button 
                  type="button"
                  onClick={handleAddCustomGoal}
                  className="px-4 py-3 rounded-lg font-semibold text-white transition-colors shadow-md"
                  style={{ backgroundColor: currentTheme.secondaryColor }}
                  whileHover={{ scale: 1.05, backgroundColor: currentTheme.secondaryDarker || currentTheme.secondaryColor }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </div>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-2 text-center"
              style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
            >
              Tell Us About {babyName || 'Your Baby'}'s Sleep Environment
            </motion.h2>
            
            <motion.p 
              className="text-center mb-6 text-sm md:text-base"
              style={{ color: currentTheme.subtleTextColor }}
            >
              Describe where and how your baby sleeps (room, crib/bed, lighting, noise, temperature, etc.)
            </motion.p>
            
            <div className="mb-6">
              <textarea
                value={sleepEnvironment}
                onChange={(e) => setSleepEnvironment(e.target.value)}
                placeholder="Example: She sleeps in her own crib in a dark room with a white noise machine. The room tends to be warm, around 74°F. We use blackout curtains and a night light."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-2"
                style={textareaStyle}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="sleepRoutine" className="block mb-2 text-base font-medium" style={labelStyle}>
                Current Bedtime Routine:
              </label>
              <textarea
                id="sleepRoutine"
                value={sleepRoutine}
                onChange={(e) => setSleepRoutine(e.target.value)}
                placeholder="Example: Bath at 7pm, pajamas, story time for 10 minutes, then rocking until drowsy before placing in crib."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-2"
                style={textareaStyle}
              />
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-2 text-center"
              style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
            >
              Sleep History & Previous Attempts
            </motion.h2>
            
            <motion.p 
              className="text-center mb-6 text-sm md:text-base"
              style={{ color: currentTheme.subtleTextColor }}
            >
              This helps us understand what has and hasn't worked for your family.
            </motion.p>
            
            <div className="mb-6">
              <label htmlFor="sleepHistory" className="block mb-2 text-base font-medium" style={labelStyle}>
                How has {babyName || 'your baby'}'s sleep changed over time?
              </label>
              <textarea
                id="sleepHistory"
                value={sleepHistory}
                onChange={(e) => setSleepHistory(e.target.value)}
                placeholder="Example: She slept well as a newborn but started waking frequently around 4 months. Things got worse when we started solids."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-2"
                style={textareaStyle}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="previousAttempts" className="block mb-2 text-base font-medium" style={labelStyle}>
                What sleep training methods or approaches have you tried before?
              </label>
              <textarea
                id="previousAttempts"
                value={previousAttempts}
                onChange={(e) => setPreviousAttempts(e.target.value)}
                placeholder="Example: We tried the chair method for a week but gave up because she cried too much. We also tried pick-up-put-down which helped a little."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-2"
                style={textareaStyle}
              />
            </div>
          </>
        );
        
      case 4:
        return (
          <>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-2 text-center"
              style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
            >
              Your Parenting Approach
            </motion.h2>
            
            <motion.p 
              className="text-center mb-6 text-sm md:text-base"
              style={{ color: currentTheme.subtleTextColor }}
            >
              This helps us tailor a sleep plan that aligns with your parenting philosophy.
            </motion.p>
            
            <div className="mb-6">
              <label htmlFor="parentingStyle" className="block mb-2 text-base font-medium" style={labelStyle}>
                Describe your parenting style and comfort level with different sleep training approaches:
              </label>
              <textarea
                id="parentingStyle"
                value={parentingStyle}
                onChange={(e) => setParentingStyle(e.target.value)}
                placeholder="Example: We prefer gentle approaches with minimal crying. We're comfortable with gradual methods but not cry-it-out. We value consistency but also respond to our baby's needs."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-2"
                style={textareaStyle}
              />
            </div>
            
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: currentTheme.primaryColorMuted || 'rgba(0,0,0,0.05)' }}>
              <div className="flex items-center mb-3">
                <MargaretAvatar size={40} theme={currentTheme} />
                <p className="ml-3 font-medium" style={{ color: currentTheme.headingColor }}>
                  From Margaret
                </p>
              </div>
              <p className="text-sm" style={{ color: currentTheme.textColor }}>
                Thank you for sharing these details about {babyName || 'your baby'}. This comprehensive information will help me create a truly personalized sleep plan that respects your parenting style and addresses your specific challenges.
              </p>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ 
        background: `linear-gradient(to bottom, ${currentTheme.isDarkMode ? '#1a2035' : '#e6f0ff'}, ${currentTheme.isDarkMode ? '#0f172a' : '#d4e6ff'})`,
        fontFamily: currentTheme.fontFamilyBody 
      }}
    >
      {/* Progress indicator */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Step {currentStep + 1} of 5</span>
          <span>{['Sleep Challenges', 'Sleep Goals', 'Sleep Environment', 'Sleep History', 'Parenting Approach'][currentStep]}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%`, backgroundColor: currentTheme.primaryColor }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: currentTheme.cardBackgroundColor }}>
        {renderStepContent()}
      </div>

      <div className="w-full max-w-lg flex justify-between">
        <motion.button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-full font-semibold transition-colors ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ 
            backgroundColor: 'transparent',
            color: currentTheme.primaryColor,
            border: `2px solid ${currentTheme.primaryColor}`
          }}
          whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
        >
          Back
        </motion.button>
        
        <motion.button
          type="button"
          onClick={handleNextStep}
          whileHover={{ scale: 1.05, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full font-semibold text-white transition-colors shadow-xl"
          style={{ backgroundColor: currentTheme.ctaColor }}
        >
          {currentStep < 4 ? 'Continue' : 'Submit'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SleepChallengesScreen;

