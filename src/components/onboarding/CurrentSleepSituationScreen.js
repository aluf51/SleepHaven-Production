import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';

const CurrentSleepSituationScreen = ({ onNext, babyName }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  const [sleepLocation, setSleepLocation] = useState('');
  const [sleepAssociations, setSleepAssociations] = useState('');
  const [typicalBedtime, setTypicalBedtime] = useState('');
  const [typicalWakeTime, setTypicalWakeTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation - can be enhanced
    if (!sleepLocation || !sleepAssociations || !typicalBedtime || !typicalWakeTime) {
      alert('Please fill in all fields regarding the current sleep situation.');
      return;
    }
    const sleepSituationData = {
      sleepLocation,
      sleepAssociations,
      typicalBedtime,
      typicalWakeTime,
    };
    // Dispatch this data to context if it needs to be stored globally
    // For now, just logging and passing to next step
    dispatch({ type: 'UPDATE_ONBOARDING_DATA', payload: { currentSleepSituation: sleepSituationData } });
    console.log("Current Sleep Situation:", sleepSituationData);
    onNext(sleepSituationData);
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

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: currentTheme.pageBackground, fontFamily: currentTheme.fontFamilyBody }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold mb-8 text-center"
        style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
      >
        About {babyName || 'Your Baby'}'s Current Sleep
      </motion.h2>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div>
          <label htmlFor="sleepLocation" className="block mb-2 text-sm font-medium" style={labelStyle}>
            Where does {babyName || 'your baby'} currently sleep? (e.g., own crib in own room, bassinet in parent's room, co-sleeping)
          </label>
          <input 
            type="text" 
            id="sleepLocation" 
            value={sleepLocation}
            onChange={(e) => setSleepLocation(e.target.value)}
            placeholder="Describe sleep location"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="sleepAssociations" className="block mb-2 text-sm font-medium" style={labelStyle}>
            What helps {babyName || 'your baby'} fall asleep? (e.g., nursing, rocking, pacifier, white noise)
          </label>
          <input 
            type="text" 
            id="sleepAssociations" 
            value={sleepAssociations}
            onChange={(e) => setSleepAssociations(e.target.value)}
            placeholder="List sleep associations"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={inputStyle}
            required
          />
        </div>
        
        <div>
          <label htmlFor="typicalBedtime" className="block mb-2 text-sm font-medium" style={labelStyle}>
            What is {babyName || 'your baby'}'s typical bedtime?
          </label>
          <input 
            type="time" 
            id="typicalBedtime" 
            value={typicalBedtime}
            onChange={(e) => setTypicalBedtime(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="typicalWakeTime" className="block mb-2 text-sm font-medium" style={labelStyle}>
            What is {babyName || 'your baby'}'s typical morning wake-up time?
          </label>
          <input 
            type="time" 
            id="typicalWakeTime" 
            value={typicalWakeTime}
            onChange={(e) => setTypicalWakeTime(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={inputStyle}
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-8 py-4 mt-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
          style={{ backgroundColor: currentTheme.ctaColor }}
        >
          Continue
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CurrentSleepSituationScreen;

