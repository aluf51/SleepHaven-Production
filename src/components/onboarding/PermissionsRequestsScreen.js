import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';

const PermissionsRequestsScreen = ({ onNext }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  // Mock states for permissions - in a real app, these would interact with device APIs
  const [notificationPermission, setNotificationPermission] = useState('not_requested'); // 'granted', 'denied', 'not_requested'
  const [microphonePermission, setMicrophonePermission] = useState('not_requested');

  const requestNotifications = () => {
    // Mock permission request
    console.log('Requesting notification permission...');
    // Simulate a delay and then a granted state for demo purposes
    setTimeout(() => {
      setNotificationPermission('granted');
      dispatch({ type: 'SET_PERMISSION_STATUS', payload: { notification: 'granted' } });
      console.log('Notification permission granted (mocked)');
    }, 1000);
  };

  const requestMicrophone = () => {
    // Mock permission request
    console.log('Requesting microphone permission...');
    setTimeout(() => {
      setMicrophonePermission('granted');
      dispatch({ type: 'SET_PERMISSION_STATUS', payload: { microphone: 'granted' } });
      console.log('Microphone permission granted (mocked)');
    }, 1000);
  };

  const handleContinue = () => {
    // Check if critical permissions are granted or if user wants to skip
    // For this example, we'll just proceed.
    onNext();
  };

  const screenVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
  };
  
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const permissionCardStyle = {
    backgroundColor: currentTheme.cardBackgroundColor,
    border: `1px solid ${currentTheme.cardBorderColor}`,
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
        App Permissions
      </motion.h2>

      <div className="w-full max-w-md space-y-6 mb-10">
        {/* Notification Permission */}
        <motion.div 
          className="p-5 rounded-lg shadow-md"
          style={permissionCardStyle}
          initial={{ opacity:0, x: -20}} animate={{opacity:1, x:0, transition:{delay:0.2}}}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.headingColor }}>Notifications</h3>
          <p className="text-sm mb-3" style={{ color: currentTheme.subtleTextColor }}>
            To remind you about sleep tracking, plan steps, and important updates from Margaret.
          </p>
          {notificationPermission === 'not_requested' && (
            <motion.button
              variants={buttonVariants} whileHover="hover" whileTap="tap"
              onClick={requestNotifications}
              className="w-full px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
              style={{ backgroundColor: currentTheme.primaryColor, color: currentTheme.primaryColorContrast || '#FFFFFF' }}
            >
              Allow Notifications
            </motion.button>
          )}
          {notificationPermission === 'granted' && (
            <p className="text-sm font-medium" style={{ color: currentTheme.successColor || 'green' }}>Notifications Enabled!</p>
          )}
          {notificationPermission === 'denied' && (
            <p className="text-sm font-medium" style={{ color: currentTheme.errorColor || 'red' }}>Notifications Denied. You can change this in settings.</p>
          )}
        </motion.div>

        {/* Microphone Permission */}
        <motion.div 
          className="p-5 rounded-lg shadow-md"
          style={permissionCardStyle}
          initial={{ opacity:0, x: -20}} animate={{opacity:1, x:0, transition:{delay:0.4}}}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.headingColor }}>Microphone Access</h3>
          <p className="text-sm mb-3" style={{ color: currentTheme.subtleTextColor }}>
            To enable voice conversations with Margaret and use voice commands.
          </p>
          {microphonePermission === 'not_requested' && (
            <motion.button
              variants={buttonVariants} whileHover="hover" whileTap="tap"
              onClick={requestMicrophone}
              className="w-full px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
              style={{ backgroundColor: currentTheme.primaryColor, color: currentTheme.primaryColorContrast || '#FFFFFF' }}
            >
              Allow Microphone
            </motion.button>
          )}
          {microphonePermission === 'granted' && (
            <p className="text-sm font-medium" style={{ color: currentTheme.successColor || 'green' }}>Microphone Access Enabled!</p>
          )}
          {microphonePermission === 'denied' && (
            <p className="text-sm font-medium" style={{ color: currentTheme.errorColor || 'red' }}>Microphone Access Denied. You can change this in settings.</p>
          )}
        </motion.div>
      </div>

      <motion.button
        variants={buttonVariants}
        whileHover={{ scale: 1.05, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor }}
        whileTap="tap"
        onClick={handleContinue}
        className="w-full max-w-xs px-8 py-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
        style={{ backgroundColor: currentTheme.ctaColor }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

export default PermissionsRequestsScreen;

