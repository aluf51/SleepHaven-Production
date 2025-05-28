import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import MargaretAvatar from '../onboarding/MargaretAvatar';
import { ChevronDown, ChevronUp } from 'lucide-react'; // For collapsible sections
import { lightTheme, darkTheme } from '../../utils/theme'; // Added theme imports
import NavigationButtons from '../common/NavigationButtons';

// Enhanced mock plan generator based on user's detailed specification
const generateDetailedMockPlan = (answers, babyName, babyAgeMonths) => {
  babyName = babyName || 'your baby'; // Default baby name
  babyAgeMonths = babyAgeMonths || 6; // Default baby age

  // Helper to personalize text
  const personalize = (text) => text.replace(/{babyName}/g, babyName);

  return {
    executiveSummary: {
      title: 'Executive Summary',
      currentSleepAssessment: personalize(`Based on our conversation, ${babyName} is currently experiencing frequent night wakings and has some difficulty self-soothing. The current bedtime routine could be more consistent.`),
      primaryGoals: [
        personalize(`${babyName} will learn to fall asleep independently at bedtime.`),
        personalize(`Reduce night wakings for ${babyName} to an age-appropriate level.`),
        'Establish a consistent and calming bedtime routine.'
      ],
      timelineExpectation: 'You should start seeing positive changes within 5-7 days, with more significant improvements over 2 weeks.',
      successMetrics: [
        personalize(`${babyName} falling asleep within 15-20 minutes of being put down awake.`),
        personalize(`Longer stretches of consolidated sleep for ${babyName} at night.`),
        'A more predictable and peaceful bedtime experience for the whole family.'
      ]
    },
    personalizedSleepSchedule: {
      title: 'Personalized Sleep Schedule',
      visualTimeline: [
        { time: '7:00 AM', event: 'Wake Up' },
        { time: '9:00 AM - 10:00 AM', event: personalize(`Nap 1 (Wake Window: 2hrs)`) },
        { time: '12:30 PM - 2:00 PM', event: personalize(`Nap 2 (Wake Window: 2.5hrs)`) },
        { time: '4:30 PM - 5:00 PM', event: personalize(`Nap 3 (Catnap - Wake Window: 2.5hrs)`) },
        { time: '7:00 PM', event: 'Bedtime Routine Starts' },
        { time: '7:30 PM', event: personalize(`Bedtime for ${babyName} (Wake Window: 2.5hrs)`) },
        { time: '7:30 PM - 7:00 AM', event: 'Expected Night Sleep' },
      ],
      rationale: personalize(`This schedule is designed for a ${babyAgeMonths}-month-old like ${babyName}, balancing age-appropriate wake windows with adequate nap and night sleep to prevent overtiredness.`),
      flexibilityGuidelines: 'Nap times can shift by ±30 minutes based on cues. Bedtime should be consistent within a 30-minute window.'
    },
    customizedBedtimeRoutine: {
      title: 'Customized Bedtime Routine (Approx. 30 mins)',
      steps: [
        { activity: 'Quiet Play & Wind-Down', duration: '10 mins', details: personalize(`Engage in calm activities like reading books or quiet puzzles in ${babyName}'s room. Dim the lights.`) },
        { activity: 'Warm Bath (Optional)', duration: '10 mins', details: personalize(`A soothing bath can be a great sleep cue for ${babyName}. Keep it relaxed.`) },
        { activity: 'PJs & Diaper Change', duration: '5 mins', details: 'Change into pajamas and a fresh diaper in a calm, dimly lit environment.' },
        { activity: 'Book & Cuddle', duration: '5-10 mins', details: personalize(`Read 1-2 familiar books while cuddling ${babyName}. This is a lovely bonding time.`) },
        { activity: 'Song & Into Crib Awake', duration: '2-3 mins', details: personalize(`Sing a consistent lullaby, say your goodnights, and place ${babyName} into the crib drowsy but awake.`) },
      ],
      environmentSpecifications: {
        light: 'Very dim (nightlight only) for the last part of the routine and during sleep.',
        sound: 'Consistent white noise machine at a low, rumbling volume.',
        temperature: 'Cool and comfortable, around 68-72°F (20-22°C).',
        sleepwear: personalize(`Dress ${babyName} in a comfortable sleep sack appropriate for the room temperature.`)
      }
    },
    tailoredInterventionStrategy: {
      title: 'Tailored Intervention Strategy',
      primaryMethod: personalize(`Given your preference for a gradual approach and ${babyName}'s current sleep patterns, we will use a gentle, timed check-in method (often called the Ferber method or Graduated Extinction), modified for ${babyName}.`),
      graduatedSteps: [
        { day: 'Night 1-2', checkIntervals: 'Check at 3, 5, 7 minute intervals. Comfort briefly (1-2 mins) without picking up.' },
        { day: 'Night 3-4', checkIntervals: 'Check at 5, 7, 10 minute intervals.' },
        { day: 'Night 5-7', checkIntervals: 'Check at 7, 10, 12 minute intervals.' },
        { day: 'Ongoing', checkIntervals: personalize(`Adjust intervals as ${babyName} learns. The goal is for ${babyName} to self-soothe.`) },
      ],
      responseGuidance: {
        nightWakings: personalize(`For night wakings after the initial bedtime, use the same timed check-in strategy. Ensure ${babyName} is not hungry or soiled.`),
        earlyMorningWakings: personalize(`Treat wakings before 6:00 AM as night wakings. Avoid starting the day too early. Maintain a dark room.`),
        napRefusals: personalize(`If ${babyName} doesn’t fall asleep for a nap after 30-45 minutes of trying (with checks), take a 30-minute break with quiet play, then try a shortened nap routine again.`),
        cryingEpisodes: 'It is normal for there to be some crying as your baby learns this new skill. Your brief checks reassure them you are there. Stay consistent.'
      },
      methodRationale: personalize(`This method allows ${babyName} to learn self-soothing skills while knowing you are nearby and responsive. The graduated intervals help ${babyName} adjust gently.`)
    },
    dailyActionPlan: {
      title: 'Daily Action Plan',
      days: [
        {
          day: 'Day 1: The Beginning',
          focus: 'Implement the new bedtime routine precisely. Start timed checks for bedtime and any night wakings.',
          actions: [
            'Follow the Customized Bedtime Routine step-by-step.',
            'Place baby in crib drowsy but awake.',
            'Begin timed checks as per Night 1-2 schedule (3, 5, 7 mins).',
            'Log sleep times and wakings in the app.'
          ],
          expectations: 'Expect some protest crying; this is normal. Stay strong and consistent. Naps may be a bit off today.',
          dailySuccessMetrics: 'Baby fell asleep in crib, even if it took a while with checks. You followed the routine.'
        },
        {
          day: 'Day 2-3: Building Momentum',
          focus: 'Consistency is key. Continue with the routine and check-in schedule for nights and naps.',
          actions: [
            'Maintain the bedtime routine.',
            'Continue timed checks (Night 1-2 or 3-4 schedule).',
            'Apply the same approach for naps.',
            'Note any patterns in crying duration or sleep stretches.'
          ],
          expectations: 'Crying may decrease slightly or shift. Some nights/naps might be better than others.',
          dailySuccessMetrics: 'Reduced overall crying time. Baby settling a bit quicker for some sleep periods.'
        },
        {
          day: 'Day 4-7: Seeing Progress',
          focus: 'Reinforce learning. Baby should be showing more signs of self-soothing.',
          actions: [
            'Stick to the routine and check-in schedule (Night 3-4 or 5-7).',
            'Observe how baby responds to checks – are they calming sooner?',
            'Ensure wake windows are still appropriate.',
            'Celebrate small wins!'
          ],
          expectations: 'Noticeably less crying at bedtime. Longer stretches of night sleep. Naps becoming more predictable.',
          dailySuccessMetrics: 'Baby falling asleep independently for most sleep. Fewer night wakings.'
        }
      ],
      adjustmentTriggers: 'If baby is ill, pause the formal plan and focus on comfort. Re-evaluate if crying significantly worsens after Day 5 without any improvement.'
    },
    troubleshootingGuide: {
      title: 'Troubleshooting Common Challenges',
      scenarios: [
        { scenario: personalize(`${babyName} is teething.`), solution: 'Offer teething toys during wake times. If pain seems significant, consult your pediatrician about pain relief before sleep. You can be more lenient with checks if needed, but try to return to the plan once discomfort subsides.' },
        { scenario: personalize(`${babyName} stands up or sits in the crib and won\'t lie down.`), solution: 'During checks, gently lay them back down once without much interaction. They will learn to lie down themselves. Ensure the crib is safe.' },
        { scenario: 'Travel or disruption to routine.', solution: 'Try to stick to the core elements of the routine as much as possible. Return to the full plan as soon as you are back home. It might take a day or two to get back on track.' }
      ]
    },
    supportResources: {
      title: 'Support & Resources',
      quickReferenceCards: 'Coming Soon: Downloadable summary of your daily check-in schedule and routine steps.',
      recommendedTools: personalize(`Consider a white noise machine like the Hatch Rest. For ${babyName}'s room, ensure blackout curtains are effective.`),
      sosProtocols: 'If you are feeling overwhelmed, it is okay to take a break. Ask your partner for help, or step away for a few minutes. Your well-being is important.'
    },
    progressTrackingIntegration: {
      title: 'Progress Tracking',
      keyMetrics: ['Time to fall asleep at bedtime', 'Number of night wakings', 'Duration of naps', 'Total night sleep duration'],
      milestoneMarkers: ['First night falling asleep independently', 'Sleeping through for 4+ hours', 'Consistently good naps'],
      trendAnalysis: 'Use the app calendar to log these metrics. We will look for downward trends in time to fall asleep and night wakings, and upward trends in sleep duration.'
    },
    nextStagePreview: {
      title: 'Looking Ahead',
      futureTransitions: personalize(`As ${babyName} grows, nap transitions (e.g., dropping the 3rd nap around 8-9 months) will occur. We can adjust the plan then.`),
      gradualIndependenceSteps: 'Continue to encourage independent sleep skills. The goal is a child who feels secure and confident sleeping on their own.',
      longTermGoals: personalize(`Within 1-3 months, ${babyName} should have a predictable sleep schedule, fall asleep independently for all sleep, and wake minimally at night according to age. `)
    }
  };
};

const CollapsibleSection = ({ title, children, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Defensive check for theme
  if (!theme) {
    console.error("CollapsibleSection: theme is undefined.");
    return <div className="mb-4 p-4 rounded-lg shadow-sm">Error: Theme not available for section: {title}</div>;
  }
  return (
    <div className="mb-4 p-4 rounded-lg shadow-sm" style={{backgroundColor: theme.cardBackgroundColor, border: `1px solid ${theme.cardBorderColor}`}}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left text-lg font-semibold mb-2 focus:outline-none"
        style={{ color: theme.primaryColor }}
      >
        {title}
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && <div className="mt-2 text-sm space-y-2" style={{color: theme.textColor}}>{children}</div>}
    </div>
  );
};

const SleepPlanView = () => {
  const { state, dispatch } = useContext(AppContext); // Changed to get state and dispatch
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme; // Derived currentTheme
  
  // Defensive check for currentTheme and necessary state properties
  if (!currentTheme || !state) {
    console.error("SleepPlanView: currentTheme or state is undefined. Check AppContext.");
    return <div>Loading theme or state...</div>; // Or some other fallback UI
  }

  const handleGoToDashboard = () => {
    console.log("[handleGoToDashboard] Called. Redirecting to dashboard.");
    dispatch({ type: "SET_VIEW", payload: "dashboard" });
  };

  const plan = generateDetailedMockPlan(
    state.margaretPlanAnswers || {},
    state.babyName,
    state.babyAgeMonths
  );

  const renderList = (items) => <ul className="list-disc list-inside space-y-1 pl-2">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
  const renderKeyValue = (obj) => <ul className="list-disc list-inside space-y-1 pl-2">{Object.entries(obj).map(([key, value]) => <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</li>)}</ul>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 flex flex-col h-full max-w-3xl mx-auto relative"
      style={{ color: currentTheme.textColor, fontFamily: currentTheme.fontFamilyBody }}
    >
      {/* Add Dashboard button only when bottom navigation is not present */}
      {!state.margaretOnboardingComplete && (
        <NavigationButtons 
          onDashboard={handleGoToDashboard}
          showBack={false}
          showDashboard={true}
          position="top-right"
          variant="minimal"
        />
      )}
      <div className="flex flex-col items-center mb-8">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center mb-4">
            <MargaretAvatar theme={currentTheme} size={200} fullView={true} /> 
        </div>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}>
            Your Personalized Sleep Plan for {state.babyName || 'Your Baby'}
          </h2>
          <p className="text-md mt-2" style={{color: currentTheme.subtleTextColor}}>
            Crafted with care by Margaret. Let's begin this journey to better sleep together, {state.userName || 'User'}!
          </p>
        </div>
      </div>

      {/* Executive Summary */}
      <CollapsibleSection title={plan.executiveSummary.title} theme={currentTheme}>
        <p className="mb-2"><strong>Current Sleep Assessment:</strong> {plan.executiveSummary.currentSleepAssessment}</p>
        <p className="mb-1"><strong>Primary Goals:</strong></p>
        {renderList(plan.executiveSummary.primaryGoals)}
        <p className="mt-2 mb-1"><strong>Timeline Expectation:</strong> {plan.executiveSummary.timelineExpectation}</p>
        <p className="mb-1"><strong>Success Metrics:</strong></p>
        {renderList(plan.executiveSummary.successMetrics)}
      </CollapsibleSection>

      {/* Personalized Sleep Schedule */}
      <CollapsibleSection title={plan.personalizedSleepSchedule.title} theme={currentTheme}>
        <h4 className="font-semibold mb-1">Visual Timeline (Example):</h4>
        <div className="overflow-x-auto mb-2">
            <table className="min-w-full text-left text-xs">
                <thead><tr><th className="p-1 border-b" style={{borderColor: currentTheme.cardBorderColor}}>Time</th><th className="p-1 border-b" style={{borderColor: currentTheme.cardBorderColor}}>Event</th></tr></thead>
                <tbody>{plan.personalizedSleepSchedule.visualTimeline.map(item => <tr key={item.time}><td className="p-1 border-b" style={{borderColor: currentTheme.cardBorderColor}}>{item.time}</td><td className="p-1 border-b" style={{borderColor: currentTheme.cardBorderColor}}>{item.event}</td></tr>)}</tbody>
            </table>
        </div>
        <p className="mb-1"><strong>Rationale:</strong> {plan.personalizedSleepSchedule.rationale}</p>
        <p><strong>Flexibility Guidelines:</strong> {plan.personalizedSleepSchedule.flexibilityGuidelines}</p>
      </CollapsibleSection>

      {/* Customized Bedtime Routine */}
      <CollapsibleSection title={plan.customizedBedtimeRoutine.title} theme={currentTheme}>
        {plan.customizedBedtimeRoutine.steps.map((step, i) => (
          <div key={i} className="mb-2 pb-2 border-b" style={{borderColor: currentTheme.subtleTextColor}}>
            <h5 className="font-semibold">{i+1}. {step.activity} ({step.duration})</h5>
            <p className="pl-2 text-xs">{step.details}</p>
          </div>
        ))}
        <h5 className="font-semibold mt-2 mb-1">Environment Specifications:</h5>
        {renderKeyValue(plan.customizedBedtimeRoutine.environmentSpecifications)}
      </CollapsibleSection>
      
      {/* Tailored Intervention Strategy */}
      <CollapsibleSection title={plan.tailoredInterventionStrategy.title} theme={currentTheme}>
        <p className="mb-2"><strong>Primary Method:</strong> {plan.tailoredInterventionStrategy.primaryMethod}</p>
        <h5 className="font-semibold mb-1">Graduated Steps:</h5>
        {plan.tailoredInterventionStrategy.graduatedSteps.map((step, i) => (
          <div key={i} className="mb-1">
            <strong>{step.day}:</strong> {step.checkIntervals}
          </div>
        ))}
        <h5 className="font-semibold mt-2 mb-1">Response Guidance:</h5>
        {renderKeyValue(plan.tailoredInterventionStrategy.responseGuidance)}
        <p className="mt-2"><strong>Method Rationale:</strong> {plan.tailoredInterventionStrategy.methodRationale}</p>
      </CollapsibleSection>

      {/* Daily Action Plan */}
      <CollapsibleSection title={plan.dailyActionPlan.title} theme={currentTheme}>
        {plan.dailyActionPlan.days.map((dayPlan, i) => (
          <div key={i} className="mb-3 pb-2 border-b" style={{borderColor: currentTheme.subtleTextColor}}>
            <h5 className="font-semibold text-md">{dayPlan.day}</h5>
            <p className="text-xs italic my-1"><strong>Focus:</strong> {dayPlan.focus}</p>
            <p className="text-xs mb-1"><strong>Actions:</strong></p>
            {renderList(dayPlan.actions)}
            <p className="text-xs mt-1"><strong>Expectations:</strong> {dayPlan.expectations}</p>
            <p className="text-xs mt-1"><strong>Daily Success Metrics:</strong> {dayPlan.dailySuccessMetrics}</p>
          </div>
        ))}
        <p className="mt-2"><strong>Adjustment Triggers:</strong> {plan.dailyActionPlan.adjustmentTriggers}</p>
      </CollapsibleSection>

      {/* Troubleshooting Guide */}
      <CollapsibleSection title={plan.troubleshootingGuide.title} theme={currentTheme}>
        {plan.troubleshootingGuide.scenarios.map((scenario, i) => (
          <div key={i} className="mb-2 pb-2 border-b" style={{borderColor: currentTheme.subtleTextColor}}>
            <h5 className="font-semibold">{scenario.scenario}</h5>
            <p className="pl-2 text-xs">{scenario.solution}</p>
          </div>
        ))}
      </CollapsibleSection>

      {/* Support Resources */}
      <CollapsibleSection title={plan.supportResources.title} theme={currentTheme}>
        <p><strong>Quick Reference Cards:</strong> {plan.supportResources.quickReferenceCards}</p>
        <p><strong>Recommended Tools:</strong> {plan.supportResources.recommendedTools}</p>
        <p><strong>SOS Protocols:</strong> {plan.supportResources.sosProtocols}</p>
      </CollapsibleSection>

      {/* Progress Tracking Integration */}
      <CollapsibleSection title={plan.progressTrackingIntegration.title} theme={currentTheme}>
        <p className="mb-1"><strong>Key Metrics to Track:</strong></p>
        {renderList(plan.progressTrackingIntegration.keyMetrics)}
        <p className="mt-2 mb-1"><strong>Milestone Markers:</strong></p>
        {renderList(plan.progressTrackingIntegration.milestoneMarkers)}
        <p className="mt-2"><strong>Trend Analysis:</strong> {plan.progressTrackingIntegration.trendAnalysis}</p>
      </CollapsibleSection>

      {/* Next Stage Preview */}
      <CollapsibleSection title={plan.nextStagePreview.title} theme={currentTheme}>
        <p><strong>Future Transitions:</strong> {plan.nextStagePreview.futureTransitions}</p>
        <p><strong>Gradual Independence Steps:</strong> {plan.nextStagePreview.gradualIndependenceSteps}</p>
        <p><strong>Long-Term Goals:</strong> {plan.nextStagePreview.longTermGoals}</p>
      </CollapsibleSection>

      {/* Add a button to go back to dashboard or other relevant navigation */}
      {/* For now, this button is not implemented as per the current plan */}

    </motion.div>
  );
};

export default SleepPlanView;

