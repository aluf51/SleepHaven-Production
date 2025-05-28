import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretAvatar from './MargaretAvatar';

const KeyFeaturesIntroductionScreen = ({ onNext }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  const userName = state.userName || 'Emma';
  const babyName = state.babyName || 'Millie';

  const features = [
    { 
      name: 'Personalized Sleep Plan', 
      description: `Help ${babyName} sleep through the night with a customized plan based on her unique needs.`, 
      icon: '📅' 
    },
    { 
      name: 'Daily Sleep Tracking', 
      description: `Track ${babyName}'s sleep patterns to identify improvements and adjust your approach for better results.`, 
      icon: '📊' 
    },
    { 
      name: 'SOS Mode for Tough Moments', 
      description: 'Find calm during difficult moments with step-by-step guidance when you need it most.', 
      icon: '🆘' 
    },
    { 
      name: 'Margaret AI Support', 
      description: `Get 24/7 personalized advice and answers to all your questions about ${babyName}'s sleep.`, 
      icon: 'margaret' 
    },
    { 
      name: 'Supportive Community', 
      description: 'Connect with other parents facing similar challenges and share your sleep success stories.', 
      icon: '👨‍👩‍👧‍👦' 
    },
  ];

  const screenVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor },
    tap: { scale: 0.95 }
  };

  // Calculate onboarding progress (assuming this is step 8 out of 10 total steps)
  const currentStep = 8;
  const totalSteps = 10;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ 
        background: `linear-gradient(to bottom, ${currentTheme.isDarkMode ? '#1a2035' : '#e6f0ff'}, ${currentTheme.isDarkMode ? '#0f172a' : '#d4e6ff'})`,
        color: currentTheme.textColor, 
        fontFamily: currentTheme.fontFamilyBody 
      }}
    >
      {/* Progress indicator */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Onboarding</span>
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%`, backgroundColor: currentTheme.primaryColor }}
          ></div>
        </div>
      </div>

      {/* Welcome message */}
      <motion.div 
        className="w-full max-w-lg mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 }}}
      >
        <p className="text-lg" style={{ color: currentTheme.headingColor }}>
          Welcome, {userName}! I'm excited to help you and {babyName} get better sleep.
        </p>
      </motion.div>

      <motion.h2 
        className="text-2xl md:text-3xl font-semibold mb-8 text-center"
        style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay:0.1, duration: 0.5 }}}
      >
        Discover What Sleep Haven Offers
      </motion.h2>

      <motion.div className="w-full max-w-lg space-y-4 mb-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="flex items-start p-4 rounded-lg shadow-md"
            style={{ backgroundColor: currentTheme.cardBackgroundColor, border: `1px solid ${currentTheme.cardBorderColor}`}}
          >
            {feature.icon === 'margaret' ? (
              <div className="mr-4" style={{ minWidth: '48px', display: 'flex', justifyContent: 'center' }}>
                <MargaretAvatar size={48} theme={currentTheme} />
              </div>
            ) : (
              <span className="text-3xl mr-4" style={{ minWidth: '48px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</span>
            )}
            <div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.headingColor }}>{feature.name}</h3>
              <p className="text-sm" style={{ color: currentTheme.subtleTextColor }}>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Social proof */}
      <motion.div 
        className="w-full max-w-lg mb-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5 }}}
      >
        <p className="text-sm font-semibold" style={{ color: currentTheme.primaryColor }}>
          93% of families see improvement within the first week
        </p>
      </motion.div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onNext}
        className="w-full max-w-xs px-8 py-4 rounded-full font-semibold text-white text-lg transition-colors shadow-xl"
        style={{ backgroundColor: currentTheme.ctaColor }}
      >
        Get Started with Your Sleep Plan
      </motion.button>
    </motion.div>
  );
};

export default KeyFeaturesIntroductionScreen;

