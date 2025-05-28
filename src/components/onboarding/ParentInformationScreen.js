import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { UserIcon, SparklesIcon, MoonIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'; // Using outline for a softer feel

const ParentInformationScreen = ({ onNext }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  const [parentName, setParentName] = useState(state.userName || '');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [nameEntered, setNameEntered] = useState(false);

  const goals = [
    { id: 'get_sleep', text: 'Get more sleep myself', icon: <MoonIcon className="w-6 h-6 mr-2 inline-block" /> },
    { id: 'consistent_routine', text: 'Establish a consistent routine', icon: <SparklesIcon className="w-6 h-6 mr-2 inline-block" /> }, // Replaced ClockIcon with SparklesIcon
    { id: 'reduce_wakings', text: 'Reduce night wakings', icon: <MoonIcon className="w-6 h-6 mr-2 inline-block" /> }, // Replaced BellSlashIcon with MoonIcon
    { id: 'self_soothe', text: 'Help baby learn to self-soothe', icon: <UserIcon className="w-6 h-6 mr-2 inline-block" /> } // Replaced HandRaisedIcon with UserIcon
  ];

  useEffect(() => {
    if (parentName.trim() !== '') {
      setNameEntered(true);
    } else {
      setNameEntered(false);
    }
  }, [parentName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parentName.trim() === '') {
      alert('Please let us know what we should call you.');
      return;
    }
    // No need to dispatch SET_USER_NAME here as it's done in AppContainer on onboarding completion
    onNext({ parentName, sleepGoal: selectedGoal });
  };

  const screenVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "circIn" } },
  };

  const backgroundStyle = {
    background: state.isDarkMode 
      ? 'linear-gradient(160deg, #29323c 0%, #485563 100%)' 
      : 'linear-gradient(160deg, #e0c3fc 0%, #8ec5fc 100%)', // Gentle blue/lavender gradient
    color: currentTheme.textColor,
    fontFamily: currentTheme.fontFamilyBody,
    minHeight: '100vh',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const cardStyle = {
    backgroundColor: state.isDarkMode ? 'rgba(42,50,60,0.8)' : 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  };

  const inputStyle = {
    backgroundColor: state.isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
    color: currentTheme.textColor,
    border: `1px solid ${state.isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
  };

  const goalCardStyle = (goalId) => ({
    backgroundColor: selectedGoal === goalId 
        ? (state.isDarkMode ? currentTheme.primaryColor : currentTheme.primaryColorMuted) 
        : (state.isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'),
    color: selectedGoal === goalId 
        ? (state.isDarkMode ? currentTheme.pageBackground : currentTheme.primaryColorContrast) 
        : currentTheme.textColor,
    border: `1px solid ${selectedGoal === goalId ? currentTheme.primaryColor : (state.isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)')}`,
    boxShadow: selectedGoal === goalId ? `0 0 15px ${currentTheme.primaryColor}` : '0 4px 6px rgba(0,0,0,0.1)',
  });

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={backgroundStyle}
      className="flex flex-col items-center justify-center"
    >
      {/* Placeholder for friendly illustration */}
      <div className="mb-4 text-4xl">🌙✨</div> 

      <motion.div style={cardStyle}>
        <h2 
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        >
          Hello! Let's Get Started
        </h2>
        <p className="mb-6 text-md" style={{color: currentTheme.subtleTextColor}}>
          You're taking an important step toward better sleep for your family.
        </p>

        {/* Progress Indicator */}
        <div className="w-full mb-6">
            <p className="text-xs text-right mb-1" style={{color: currentTheme.subtleTextColor}}>Step 3 of 6</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '50%', backgroundColor: currentTheme.primaryColor }}></div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="parentName" className="block mb-1.5 text-sm font-medium text-left" style={{ color: currentTheme.textColor }}>
              What should we call you?
            </label>
            <motion.input 
              type="text" 
              id="parentName" 
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
              whileFocus={{ scale: 1.02, borderColor: currentTheme.primaryColor, boxShadow: `0 0 8px ${currentTheme.primaryColor}` }}
              required
            />
            {nameEntered && (
              <motion.p 
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                className="text-sm mt-1.5 text-left pl-1"
                style={{color: currentTheme.primaryColor}}
              >
                Nice to meet you, {parentName}!
              </motion.p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-left" style={{ color: currentTheme.textColor }}>
              What would help your family most right now?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goals.map(goal => (
                <motion.button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full p-3.5 border rounded-xl text-left transition-all duration-200 ease-in-out flex items-center justify-between`}
                  style={goalCardStyle(goal.id)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{goal.icon}{goal.text}</span>
                  {selectedGoal === goal.id && <CheckCircleIcon className="w-5 h-5 text-white" style={{color: state.isDarkMode ? currentTheme.pageBackground : currentTheme.primaryColorContrast }}/>}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03, boxShadow: `0px 8px 20px ${currentTheme.ctaColor}50` }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3.5 rounded-xl font-semibold text-white text-lg transition-all shadow-lg flex items-center justify-center"
            style={{ backgroundColor: currentTheme.ctaColor, fontFamily: currentTheme.fontFamilyBody }}
          >
            Next: Tell Us About Your Little One <ArrowRightIcon className="w-5 h-5 ml-2"/>
          </motion.button>
          <p className="text-xs mt-4" style={{color: currentTheme.subtleTextColor}}>
            Every family's sleep journey is unique. Your answers help us personalize your experience.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ParentInformationScreen;

