import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import NavigationButtons from '../common/NavigationButtons';

const WelcomeScreen = ({ onGetStarted, onWatchDemo, isReturningUser = false }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  const { babyName } = state;

  // Basic animation for the screen content
  const screenVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center h-screen p-6 text-center relative"
      style={{ backgroundColor: currentTheme.pageBackground, color: currentTheme.textColor, fontFamily: currentTheme.fontFamilyBody }}
    >
      {/* No Back button on first screen, but we'll add the NavigationButtons component for consistency */}
      <NavigationButtons 
        showBack={false}
        showDashboard={false}
        position="top-left"
        variant="minimal"
      />
      {/* Placeholder for a warm, calming welcome animation */}
      <motion.div 
        className="mb-8 text-6xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 5, 0], transition: { delay: 0.2, duration: 1, type: "spring", stiffness: 150 } }}
      >
        <span role="img" aria-label="Sparkles">✨</span>
        <span role="img" aria-label="Moon">🌙</span>
        <span role="img" aria-label="Stars">🌟</span>
      </motion.div>

      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
      >
        {isReturningUser ? `Welcome back to Sleep Haven` : `Welcome to Sleep Haven`}
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl mb-10"
        style={{ color: currentTheme.subtleTextColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } }}
      >
        {isReturningUser 
          ? `We're glad to see you again! Your sleep plan for ${babyName || 'your baby'} is ready.`
          : `Better sleep for your baby starts here.`
        }
      </motion.p>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onGetStarted}
        className="w-full max-w-xs px-8 py-4 mb-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
        style={{ backgroundColor: currentTheme.ctaColor }}
      >
        {isReturningUser ? 'Continue to Dashboard' : 'Get Started'}
      </motion.button>

      {!isReturningUser && onWatchDemo && (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onWatchDemo}
          className="w-full max-w-xs px-8 py-3 rounded-full font-semibold transition-colors"
          style={{ 
            backgroundColor: 'transparent',
            color: currentTheme.primaryColor,
            border: `2px solid ${currentTheme.primaryColor}`
          }}
        >
          Watch Demo (30s)
        </motion.button>
      )}
    </motion.div>
  );
};

export default WelcomeScreen;
