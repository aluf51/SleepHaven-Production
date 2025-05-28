import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';

const PreferencesSetupScreen = ({ onNext }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  const [isDarkMode, setIsDarkMode] = useState(state.isDarkMode);
  const [notificationTiming, setNotificationTiming] = useState(state.margaretVoiceSettings?.notificationTiming || 'default'); // Example, adapt to your state
  const [voiceTextPreference, setVoiceTextPreference] = useState(state.margaretVoiceSettings?.preferredMode || 'voice');

  const handleThemeChange = (mode) => {
    setIsDarkMode(mode === 'dark');
    dispatch({ type: 'TOGGLE_DARK_MODE', payload: mode === 'dark' });
  };

  const handleNotificationTimingChange = (timing) => {
    setNotificationTiming(timing);
    dispatch({ type: 'UPDATE_MARGARET_VOICE_SETTINGS', payload: { ...state.margaretVoiceSettings, notificationTiming: timing } });
  };

  const handleVoiceTextPreferenceChange = (preference) => {
    setVoiceTextPreference(preference);
    dispatch({ type: 'UPDATE_MARGARET_VOICE_SETTINGS', payload: { ...state.margaretVoiceSettings, preferredMode: preference } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // All preferences are already dispatched on change, so just proceed
    console.log("Preferences Set:", { isDarkMode, notificationTiming, voiceTextPreference });
    onNext();
  };

  const screenVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeIn" } },
  };
  
  const optionButtonStyle = (isActive) => ({
    borderColor: isActive ? currentTheme.primaryColor : currentTheme.cardBorderColor,
    backgroundColor: isActive ? currentTheme.primaryColorMuted : (currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor),
    color: isActive ? currentTheme.primaryColorContrast : currentTheme.textColor,
    fontWeight: isActive ? '600' : 'normal',
  });

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
        Set Your Preferences
      </motion.h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Dark/Light Mode Preference */}
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: currentTheme.textColor }}>Appearance Mode</label>
          <div className="flex space-x-2">
            <motion.button type="button" onClick={() => handleThemeChange('light')}
              className={`flex-1 p-3 border rounded-lg text-center transition-colors shadow-sm`}
              style={optionButtonStyle(!isDarkMode)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Light Mode ☀️
            </motion.button>
            <motion.button type="button" onClick={() => handleThemeChange('dark')}
              className={`flex-1 p-3 border rounded-lg text-center transition-colors shadow-sm`}
              style={optionButtonStyle(isDarkMode)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Dark Mode 🌙
            </motion.button>
          </div>
        </div>

        {/* Notification Preferences (Simplified) */}
        <div>
          <label htmlFor="notificationTiming" className="block mb-2 text-sm font-medium" style={{ color: currentTheme.textColor }}>Notification Reminders</label>
          <select 
            id="notificationTiming" 
            value={notificationTiming}
            onChange={(e) => handleNotificationTimingChange(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={{
              borderColor: currentTheme.cardBorderColor,
              backgroundColor: currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor,
              color: currentTheme.textColor,
              outlineColor: currentTheme.primaryColor
            }}
          >
            <option value="default">Default (Recommended)</option>
            <option value="morning_evening">Morning & Evening Only</option>
            <option value="minimal">Minimal Reminders</option>
            <option value="off">Turn Off Reminders</option>
          </select>
        </div>

        {/* Voice/Text Preference for Margaret */}
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: currentTheme.textColor }}>Margaret Interaction Style</label>
          <div className="flex space-x-2">
            <motion.button type="button" onClick={() => handleVoiceTextPreferenceChange('voice')}
              className={`flex-1 p-3 border rounded-lg text-center transition-colors shadow-sm`}
              style={optionButtonStyle(voiceTextPreference === 'voice')}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Voice 🗣️
            </motion.button>
            <motion.button type="button" onClick={() => handleVoiceTextPreferenceChange('text')}
              className={`flex-1 p-3 border rounded-lg text-center transition-colors shadow-sm`}
              style={optionButtonStyle(voiceTextPreference === 'text')}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Text 💬
            </motion.button>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-8 py-4 mt-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
          style={{ backgroundColor: currentTheme.ctaColor }}
        >
          Save Preferences & Continue
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PreferencesSetupScreen;

