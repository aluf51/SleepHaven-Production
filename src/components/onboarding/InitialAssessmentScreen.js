import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretAvatar from './MargaretAvatar';

const InitialAssessmentScreen = ({ onNext, babyName, onboardingData }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  // Placeholder for generating a brief personalized message
  // In a real app, this would come from an AI or a more complex logic based on onboardingData
  const getPersonalizedMessage = () => {
    let message = `I've reviewed the information you shared about ${babyName || 'your little one'}. `;
    if (onboardingData?.sleepChallenges && onboardingData.sleepChallenges.length > 0) {
      message += `I see that ${babyName || 'your baby'} is experiencing challenges like ${onboardingData.sleepChallenges[0]}. `;
    } else {
      message += "We'll work together to create a great sleep plan. ";
    }
    message += `This is common for babies around ${onboardingData?.babyAgeMonths || 'this age'}, and I'm confident we can make progress together.`;
    return message;
  };

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
      className="flex flex-col items-center justify-center h-screen p-6 text-center"
      style={{ backgroundColor: currentTheme.pageBackground, color: currentTheme.textColor, fontFamily: currentTheme.fontFamilyBody }}
    >
      <MargaretAvatar theme={currentTheme} size={100} />
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold my-5"
        style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
      >
        Margaret's Initial Thoughts
      </motion.h2>

      <motion.div 
        className="w-full max-w-lg p-6 mb-8 rounded-lg shadow-lg text-left"
        style={{ backgroundColor: currentTheme.cardBackgroundColor, border: `1px solid ${currentTheme.cardBorderColor}`}}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5 } }}
      >
        <p className="text-md md:text-lg" style={{ color: currentTheme.textColor }}>
          {getPersonalizedMessage()}
        </p>
        <p className="text-md md:text-lg mt-3" style={{ color: currentTheme.textColor }}>
          I'm now preparing a more detailed set of recommendations for you.
        </p>
      </motion.div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onNext} // This would navigate to App Orientation or Sleep Plan Presentation
        className="w-full max-w-xs px-8 py-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
        style={{ backgroundColor: currentTheme.ctaColor }}
      >
        View My Recommendations
      </motion.button>
    </motion.div>
  );
};

export default InitialAssessmentScreen;

