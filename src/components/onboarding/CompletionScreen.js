import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';

const CompletionScreen = ({ onGoToDashboard, onStartTutorial, babyName }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  const screenVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center h-screen p-6 text-center"
      style={{ backgroundColor: currentTheme.pageBackground, color: currentTheme.textColor, fontFamily: currentTheme.fontFamilyBody }}
    >
      <motion.div 
        className="mb-8 text-6xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0], transition: { delay: 0.2, duration: 1, type: "spring", stiffness: 120 } }}
      >
        <span role="img" aria-label="Party Popper">🎉</span>
      </motion.div>

      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
      >
        You're All Set!
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl mb-6"
        style={{ color: currentTheme.subtleTextColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } }}
      >
        {babyName || 'Your baby'}'s personalized sleep journey begins now. Margaret is preparing your sleep plan and will have it ready for you on the dashboard.
      </motion.p>
      
      <motion.p 
        className="text-md mb-10"
        style={{ color: currentTheme.subtleTextColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.5 } }}
      >
        Start by exploring your dashboard or take a quick tour of the app.
      </motion.p>

      <motion.button
        variants={buttonVariants}
        whileHover={{ ...buttonVariants.hover, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor}}
        whileTap="tap"
        onClick={onGoToDashboard}
        className="w-full max-w-xs px-8 py-4 mb-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
        style={{ backgroundColor: currentTheme.ctaColor }}
      >
        Go to Dashboard
      </motion.button>

      {onStartTutorial && (
        <motion.button
          variants={buttonVariants}
          whileHover={{ ...buttonVariants.hover, backgroundColor: currentTheme.secondaryLighterBg || currentTheme.secondaryLighter}}
          whileTap="tap"
          onClick={onStartTutorial}
          className="w-full max-w-xs px-8 py-3 rounded-full font-semibold transition-colors"
          style={{ 
            backgroundColor: 'transparent',
            color: currentTheme.primaryColor,
            border: `2px solid ${currentTheme.primaryColor}`
          }}
        >
          Show Me Around (60s Tour)
        </motion.button>
      )}
    </motion.div>
  );
};

export default CompletionScreen;

