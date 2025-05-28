import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../contexts/AppContext';
import { XMarkIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { lightTheme, darkTheme } from '../../utils/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp, scaleUp } from '../../utils/animations';

const DailyPlanDetailsModal = ({ date, onClose }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // Get the plan day based on the date and plan start date
  const selectedDate = date || new Date();
  const planStartDate = state.planStartDate || new Date(2025, 4, 1); // Default to May 1, 2025 if not set
  
  // Calculate the day difference between selected date and plan start date
  const dayDiff = Math.floor((selectedDate - planStartDate) / (1000 * 60 * 60 * 24));
  
  // Plan day is the day difference + 1 (since day 1 is the start date)
  // Ensure it's at least 1 and not beyond the total plan days
  const planDay = Math.min(Math.max(1, dayDiff + 1), state.totalPlanDays || 14);
  
  console.log("Selected date:", format(selectedDate, 'yyyy-MM-dd'));
  console.log("Plan start date:", format(planStartDate, 'yyyy-MM-dd'));
  console.log("Day difference:", dayDiff);
  console.log("Plan day:", planDay);
  
  // Get the appropriate day's plan from the sleep plan
  const getDayPlan = () => {
    // First check if we have a real sleep plan in state
    if (!state.sleepPlan) {
      console.log("No sleep plan found in state");
      
      // Create a default plan if none exists
      // This ensures the feature works even if onboarding was skipped
      dispatch({ 
        type: "SET_SLEEP_PLAN", 
        payload: {
          timeline: [
            { day: '1-3', milestone: 'Setting the Foundation' },
            { day: '4-7', milestone: 'Building Consistency' },
            { day: '8-14', milestone: 'Strengthening New Habits' },
          ],
          phases: [
            {
              title: 'Phase 1 (Days 1-3): Setting the Foundation',
              explanation: `We'll start by optimizing the bedtime routine.`,
              dailyActions: [
                'Establish a consistent, calming bedtime routine (e.g., bath, book, song).',
                'Ensure the sleep environment is dark, quiet, and cool.',
                'Aim for an age-appropriate bedtime.',
              ],
            },
            {
              title: 'Phase 2 (Days 4-7): Building Consistency',
              explanation: 'Now we will focus on consistent responses to night wakings.',
              dailyActions: [
                'If baby wakes, wait a few minutes before responding.',
                'Offer comfort with minimal interaction (e.g., patting, shushing).',
                'Gradually reduce intervention as baby learns to self-soothe.',
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
            'Baby falling asleep more easily at bedtime.', 
            'Longer stretches of sleep at night.',
            'Reduced fussiness during the day due to better rest.',
          ],
        }
      });
      
      // Also ensure hasSleepPlan is set to true
      if (!state.hasSleepPlan) {
        dispatch({ type: "SET_HAS_SLEEP_PLAN", payload: true });
      }
    }
    
    // Map the plan day to the appropriate phase and content
    const dailyPlan = {
      title: '',
      focus: '',
      actions: [],
      expectations: '',
      successMetrics: ''
    };
    
    // Get the plan from state (or use the default if it was just created)
    const plan = state.sleepPlan || {};
    
    // Set the title based on the plan day
    if (planDay <= 3) {
      dailyPlan.title = `Day ${planDay}: Setting the Foundation`;
      dailyPlan.focus = plan.phases && plan.phases[0] ? plan.phases[0].explanation : 'Focus on establishing a consistent bedtime routine.';
      dailyPlan.actions = plan.phases && plan.phases[0] ? plan.phases[0].dailyActions : [];
    } else if (planDay <= 7) {
      dailyPlan.title = `Day ${planDay}: Building Consistency`;
      dailyPlan.focus = plan.phases && plan.phases[1] ? plan.phases[1].explanation : 'Focus on consistent responses to night wakings.';
      dailyPlan.actions = plan.phases && plan.phases[1] ? plan.phases[1].dailyActions : [];
    } else {
      dailyPlan.title = `Day ${planDay}: Strengthening New Habits`;
      dailyPlan.focus = plan.phases && plan.phases[2] ? plan.phases[2].explanation : 'Focus on reinforcing new sleep skills.';
      dailyPlan.actions = plan.phases && plan.phases[2] ? plan.phases[2].dailyActions : [];
    }
    
    // Set expectations and success metrics based on the plan day
    if (planDay === 1) {
      dailyPlan.expectations = 'Expect some protest crying; this is normal. Stay strong and consistent. Naps may be a bit off today.';
      dailyPlan.successMetrics = 'Baby fell asleep in crib, even if it took a while with checks. You followed the routine.';
    } else if (planDay <= 3) {
      dailyPlan.expectations = 'Crying may decrease slightly or shift. Some nights/naps might be better than others.';
      dailyPlan.successMetrics = 'Reduced overall crying time. Baby settling a bit quicker for some sleep periods.';
    } else if (planDay <= 7) {
      dailyPlan.expectations = 'Noticeably less crying at bedtime. Longer stretches of night sleep. Naps becoming more predictable.';
      dailyPlan.successMetrics = 'Baby falling asleep independently for most sleep. Fewer night wakings.';
    } else {
      dailyPlan.expectations = 'Sleep should be more predictable now. Occasional setbacks are normal.';
      dailyPlan.successMetrics = 'Baby consistently falling asleep independently with minimal fussing. Longer sleep stretches.';
    }
    
    return dailyPlan;
  };
  
  const dayPlan = getDayPlan();
  
  if (!dayPlan) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
          <h2 className="text-xl font-semibold mb-4">No Plan Available</h2>
          <p>There is no sleep plan available for this date.</p>
          <button 
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden" 
          style={{ color: currentTheme.textColor, backgroundColor: currentTheme.cardBackgroundColor }}
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <motion.div 
            className="flex justify-between items-center p-4 border-b" 
            style={{ borderColor: currentTheme.cardBorderColor }}
            variants={slideUp}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
              </motion.div>
              Plan for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <motion.button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="p-4 max-h-[70vh] overflow-y-auto"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={0}
            >
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.primaryColor }}>
                {dayPlan.title}
              </h3>
              <p className="text-sm mt-1 italic">Day {planDay} of your sleep plan</p>
            </motion.div>
            
            <motion.div 
              className="mb-4 p-3 rounded-md hover:shadow-md transition-shadow duration-300" 
              style={{ backgroundColor: currentTheme.secondaryLighterBg || '#f0f4ff' }}
              variants={slideUp}
              custom={1}
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-semibold mb-1">Today's Focus:</h4>
              <p>{dayPlan.focus}</p>
            </motion.div>
            
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={2}
            >
              <h4 className="font-semibold mb-2">Daily Actions:</h4>
              <motion.ul 
                className="space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {dayPlan.actions.map((action, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + (index * 0.1), type: "spring" }}
                    >
                      <CheckCircleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: currentTheme.primaryColor }} />
                    </motion.div>
                    <span>{action}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={3}
            >
              <h4 className="font-semibold mb-1">What to Expect:</h4>
              <p className="text-sm">{dayPlan.expectations}</p>
            </motion.div>
            
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={4}
            >
              <h4 className="font-semibold mb-1">Success Metrics:</h4>
              <p className="text-sm">{dayPlan.successMetrics}</p>
            </motion.div>
            
            <motion.div 
              className="p-3 rounded-md bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 hover:shadow-md transition-shadow duration-300"
              variants={slideUp}
              custom={5}
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-semibold mb-1 text-blue-700 dark:text-blue-300">Margaret's Tip:</h4>
              <p className="text-sm">Remember that consistency is key to success. If you're having trouble, don't hesitate to check the troubleshooting guide in the full sleep plan view.</p>
            </motion.div>
          </motion.div>
          
          {/* Footer */}
          <motion.div 
            className="flex justify-between p-4 border-t" 
            style={{ borderColor: currentTheme.cardBorderColor }}
            variants={slideUp}
            custom={6}
          >
            <motion.button
              onClick={onClose}
              className="px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-all duration-200"
              style={{ 
                borderColor: currentTheme.cardBorderColor,
                backgroundColor: currentTheme.cardBackgroundColor,
                color: currentTheme.textColor
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
            <motion.button
              onClick={() => {
                dispatch({ type: "SET_VIEW", payload: "sleepPlanView" });
                onClose();
              }}
              className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200"
              style={{ backgroundColor: currentTheme.primaryColor }}
              whileHover={{ scale: 1.05, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Plan
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyPlanDetailsModal;
