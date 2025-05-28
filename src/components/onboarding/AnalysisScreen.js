import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretAvatar from './MargaretAvatar'; // Assuming Margaret's avatar might be shown here

const AnalysisScreen = ({ onComplete, babyName }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Auto-advance after animation
    }, 4000); // Duration of the animation + a little buffer
    return () => clearTimeout(timer);
  }, [onComplete]);

  const screenVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
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
      <MargaretAvatar theme={currentTheme} size={120} />
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold my-6"
        style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
      >
        Creating your personalized sleep profile for {babyName || 'your little one'}...
      </motion.h2>
      
      {/* Simple animated dots for "analyzing" effect */}
      <motion.div className="flex space-x-2 mb-8">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentTheme.primaryColor }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Progress Bar - simplified */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden" style={{backgroundColor: currentTheme.cardBorderColor}}>
        <motion.div 
            className="h-2.5 rounded-full"
            style={{ backgroundColor: currentTheme.primaryColor }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
        />
      </div>

      <p className="mt-6 text-sm" style={{color: currentTheme.subtleTextColor}}>
        Just a moment while Margaret prepares some initial thoughts...
      </p>
    </motion.div>
  );
};

export default AnalysisScreen;

