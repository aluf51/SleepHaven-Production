import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import MargaretAvatar from './MargaretAvatar'; // Import the avatar component
import { lightTheme, darkTheme } from '../../utils/theme'; // Added theme imports

// Mock data for plan - replace with actual plan generation logic later
const generateMockPlan = (answers, babyName, babyAgeMonths) => {
  return {
    timeline: [
      { day: '1-3', milestone: 'Setting the Foundation' },
      { day: '4-7', milestone: 'Building Consistency' },
      { day: '8-14', milestone: 'Strengthening New Habits' },
    ],
    phases: [
      {
        title: 'Phase 1 (Days 1-3): Setting the Foundation',
        explanation: `Based on what you\'ve told me about ${babyName}'s sensitivity to change and your preference for a gradual approach, we\'ll start by optimizing the bedtime routine.`,
        dailyActions: [
          'Establish a consistent, calming bedtime routine (e.g., bath, book, song).',
          'Ensure the sleep environment is dark, quiet, and cool.',
          `Aim for a bedtime around 7-8 PM for a ${babyAgeMonths}-month-old.`,
        ],
      },
      {
        title: 'Phase 2 (Days 4-7): Building Consistency',
        explanation: 'Now we will focus on consistent responses to night wakings.',
        dailyActions: [
          'If {babyName} wakes, wait a few minutes before responding.',
          'Offer comfort with minimal interaction (e.g., patting, shushing).',
          'Gradually reduce intervention as {babyName} learns to self-soothe.',
        ],
      },
      {
        title: 'Phase 3 (Days 8-14): Strengthening New Habits',
        explanation: 'This phase is about reinforcing the new sleep skills.',
        dailyActions: [
          'Continue with the consistent bedtime routine and responses.',
          'Monitor nap times and adjust wake windows as needed.',
          'Celebrate small victories and be patient with setbacks.',
        ],
      },
    ],
    successIndicators: [
      `${babyName} falling asleep more easily at bedtime.`, 
      'Longer stretches of sleep at night.',
      'Reduced fussiness during the day due to better rest.',
    ],
  };
};

const SleepPlanPresentation = ({ answers, onStartPlan, babyName, babyAgeMonths }) => {
  const { state, dispatch } = useContext(AppContext); // Changed to get state and dispatch
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme; // Derived currentTheme
  const plan = generateMockPlan(answers, babyName, babyAgeMonths);

  // Save the generated plan to the app state when the component mounts
  React.useEffect(() => {
    // Only dispatch if we don't already have a plan in state
    if (currentTheme && !state.hasSleepPlan && plan) {
      dispatch({ type: "SET_SLEEP_PLAN", payload: plan });
      console.log("Sleep plan saved to app state");
    }
  }, [dispatch, plan, state.hasSleepPlan, currentTheme, state]);
  
  // Defensive check for currentTheme to prevent runtime errors if state or isDarkMode is undefined initially
  if (!currentTheme) {
    // You might want to return a loading indicator or a default theme component
    // For now, let's log an error and return null to prevent further rendering issues.
    console.error("SleepPlanPresentation: currentTheme is undefined. Check AppContext state.");
    return null; 
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8 flex flex-col h-full"
      style={{ color: currentTheme.textColor, fontFamily: currentTheme.fontFamilyBody }}
    >
      <MargaretAvatar theme={currentTheme} size={100} /> {/* Added Margaret's Avatar */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-6 text-center" style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}>
        Your Personalized Sleep Plan for {babyName}
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.headingColor }}>Expected Timeline:</h3>
        <div className="flex justify-around p-3 rounded-lg" style={{backgroundColor: currentTheme.secondaryLighterBg || currentTheme.secondaryLighter}}>
          {plan.timeline.map(item => (
            <div key={item.day} className="text-center">
              <p className="font-bold text-sm" style={{color: currentTheme.secondaryDarker}}>{item.day}</p>
              <p className="text-xs" style={{color: currentTheme.subtleTextColor}}>{item.milestone}</p>
            </div>
          ))}
        </div>
      </div>

      {plan.phases.map((phase, index) => (
        <div key={index} className="mb-6 p-4 rounded-lg shadow-sm" style={{backgroundColor: currentTheme.cardBackgroundColor, border: `1px solid ${currentTheme.cardBorderColor}`}}>
          <h4 className="text-md font-semibold mb-2" style={{ color: currentTheme.primaryColor }}>{phase.title}</h4>
          <p className="text-sm mb-3 italic" style={{color: currentTheme.subtleTextColor}}>{phase.explanation.replace('{babyName}', babyName)}</p>
          <h5 className="text-sm font-semibold mb-1" style={{color: currentTheme.headingColor}}>Daily Actions:</h5>
          <ul className="list-disc list-inside text-sm space-y-1 pl-2" style={{color: currentTheme.textColor}}>
            {phase.dailyActions.map((action, i) => (
              <li key={i}>{action.replace('{babyName}', babyName)}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mb-8 p-4 rounded-lg shadow-sm" style={{backgroundColor: currentTheme.cardBackgroundColor, border: `1px solid ${currentTheme.cardBorderColor}`}}>
        <h4 className="text-md font-semibold mb-2" style={{ color: currentTheme.primaryColor }}>How We\'ll Know It\'s Working:</h4>
        <ul className="list-disc list-inside text-sm space-y-1 pl-2" style={{color: currentTheme.textColor}}>
          {plan.successIndicators.map((indicator, i) => (
            <li key={i}>{indicator.replace('{babyName}', babyName)}</li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: currentTheme.buttonHoverScale, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor }}
        whileTap={{ scale: currentTheme.buttonTapScale }}
        onClick={onStartPlan} // This would likely navigate to the dashboard or first day of the plan
        className="w-full mt-auto px-8 py-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
        style={{ backgroundColor: currentTheme.ctaColor, fontFamily: currentTheme.fontFamilyBody }}
      >
        Let\'s Begin the Plan!
      </motion.button>
    </motion.div>
  );
};

export default SleepPlanPresentation;

