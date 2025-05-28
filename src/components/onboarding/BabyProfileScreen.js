import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const BabyProfileScreen = ({ onNext, onBack, parentData }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // Initialize with empty values instead of hardcoded ones
  const [babyName, setBabyName] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [ageError, setAgeError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (babyName.trim() === '') {
      alert('Please enter your baby\'s name.');
      return;
    }
    
    const age = parseInt(ageMonths);
    if (isNaN(age) || age < 0 || age > 36) {
      setAgeError('Please enter a valid age between 0 and 36 months.');
      return;
    }
    
    onNext({ 
      ...parentData,
      babyName, 
      ageMonths: age 
    });
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAgeMonths(value);
    
    if (value.trim() === '') {
      setAgeError('');
      return;
    }
    
    const age = parseInt(value);
    if (isNaN(age) || age < 0 || age > 36) {
      setAgeError('Please enter a valid age between 0 and 36 months.');
    } else {
      setAgeError('');
    }
  };

  const screenVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "circIn" } },
  };

  const backgroundStyle = {
    background: state.isDarkMode 
      ? 'linear-gradient(160deg, #29323c 0%, #485563 100%)' 
      : 'linear-gradient(160deg, #e0c3fc 0%, #8ec5fc 100%)',
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

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={backgroundStyle}
      className="flex flex-col items-center justify-center"
    >
      {/* Placeholder for baby illustration */}
      <div className="mb-4 text-4xl">👶✨</div> 

      <motion.div style={cardStyle}>
        <h2 
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        >
          Tell Us About Your Little One
        </h2>
        <p className="mb-6 text-md" style={{color: currentTheme.subtleTextColor}}>
          This helps us personalize your sleep plan.
        </p>

        {/* Progress Indicator */}
        <div className="w-full mb-6">
            <p className="text-xs text-right mb-1" style={{color: currentTheme.subtleTextColor}}>Step 4 of 6</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '66.7%', backgroundColor: currentTheme.primaryColor }}></div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="babyName" className="block mb-1.5 text-sm font-medium text-left" style={{ color: currentTheme.textColor }}>
              What's your baby's name?
            </label>
            <motion.input 
              type="text" 
              id="babyName" 
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              placeholder="Baby's Name"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
              whileFocus={{ scale: 1.02, borderColor: currentTheme.primaryColor, boxShadow: `0 0 8px ${currentTheme.primaryColor}` }}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="ageMonths" className="block mb-1.5 text-sm font-medium text-left" style={{ color: currentTheme.textColor }}>
              How old is {babyName || 'your baby'} (in months)?
            </label>
            <motion.input 
              type="number" 
              id="ageMonths" 
              value={ageMonths}
              onChange={handleAgeChange}
              placeholder="Age in months (0-36)"
              min="0"
              max="36"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
              whileFocus={{ scale: 1.02, borderColor: currentTheme.primaryColor, boxShadow: `0 0 8px ${currentTheme.primaryColor}` }}
              required
            />
            {ageError && (
              <p className="text-sm mt-1 text-left text-red-500">{ageError}</p>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <motion.button
              type="button"
              onClick={onBack}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center"
              style={{ 
                backgroundColor: state.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                color: currentTheme.textColor,
                fontFamily: currentTheme.fontFamilyBody,
                border: `1px solid ${state.isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2"/> Back
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, boxShadow: `0px 8px 20px ${currentTheme.ctaColor}50` }}
              whileTap={{ scale: 0.98 }}
              className="flex-grow px-6 py-3.5 rounded-xl font-semibold text-white text-lg transition-all shadow-lg flex items-center justify-center"
              style={{ backgroundColor: currentTheme.ctaColor, fontFamily: currentTheme.fontFamilyBody }}
            >
              Next: Sleep Challenges <ArrowRightIcon className="w-5 h-5 ml-2"/>
            </motion.button>
          </div>
          
          <p className="text-xs mt-4" style={{color: currentTheme.subtleTextColor}}>
            Sleep needs change rapidly in the first few years. Your baby's age helps us recommend age-appropriate strategies.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BabyProfileScreen;
