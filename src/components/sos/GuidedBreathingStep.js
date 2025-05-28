import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuidedBreathingStep = ({ theme, isSimplifiedView, onComplete }) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale
  const [completedCycles, setCompletedCycles] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const breathingCycle = { inhale: 4, hold: 2, exhale: 6, total: 12 }; // seconds
  const totalBreathingDuration = 60; // seconds for the whole exercise (increased for better effect)
  const intervalRef = useRef(null);
  const cycleCountRef = useRef(0);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathCount(0);
    setBreathPhase('inhale');
    setCompletedCycles(0);
    cycleCountRef.current = 0;
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleSkip = () => {
    stopBreathing(); // Stop any ongoing breathing interval
    if(onComplete) onComplete(); // Call the onComplete handler to move to the next step
  };

  const handleComplete = () => {
    setShowCompletionMessage(true);
    setTimeout(() => {
      setShowCompletionMessage(false);
      if(onComplete) onComplete();
    }, 3000); // Show completion message for 3 seconds before moving on
  };

  useEffect(() => {
    if (isBreathing) {
      intervalRef.current = setInterval(() => {
        setBreathCount(prevCount => {
          const newCount = prevCount + 1;
          if (newCount >= totalBreathingDuration) {
            stopBreathing();
            handleComplete();
            return totalBreathingDuration;
          }

          const cycleTime = newCount % breathingCycle.total;
          
          // Track completed cycles
          if (cycleTime === 0 && newCount > 0) {
            cycleCountRef.current += 1;
            setCompletedCycles(cycleCountRef.current);
          }
          
          if (cycleTime < breathingCycle.inhale) {
            setBreathPhase('inhale');
          } else if (cycleTime < breathingCycle.inhale + breathingCycle.hold) {
            setBreathPhase('hold');
          } else {
            setBreathPhase('exhale');
          }
          return newCount;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isBreathing, totalBreathingDuration, breathingCycle, onComplete]);

  const progressPercent = (breathCount / totalBreathingDuration) * 100;

  const getInstructionText = () => {
    if (!isBreathing) return "Take a moment to breathe with me.";
    if (breathPhase === 'inhale') return `Inhale deeply... (${breathingCycle.inhale}s)`;
    if (breathPhase === 'hold') return `Hold gently... (${breathingCycle.hold}s)`;
    return `Exhale slowly... (${breathingCycle.exhale}s)`;
  };

  const getSupportText = () => {
    if (completedCycles === 0) return "Let's begin...";
    if (completedCycles === 1) return "That's it, you're doing great.";
    if (completedCycles === 2) return "Feel your body relaxing with each breath.";
    if (completedCycles === 3) return "Notice your thoughts slowing down.";
    if (completedCycles === 4) return "You're creating space for calm.";
    return "You're doing wonderfully.";
  };

  const headingStyle = {
    color: theme.headingColor,
    fontSize: isSimplifiedView ? theme.simplified.headingFontSize : '1.5rem',
    fontFamily: theme.fontFamilyHeadings,
    marginBottom: isSimplifiedView ? '1rem' : '0.75rem',
    fontWeight: '600',
  };

  const textStyle = {
    color: theme.textColor,
    fontSize: isSimplifiedView ? theme.simplified.textFontSize : '1.1rem',
    lineHeight: isSimplifiedView ? theme.simplified.lineHeight : '1.6',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: theme.primaryColor,
    color: theme.textColor,
    fontFamily: theme.fontFamilyBody,
    padding: isSimplifiedView ? '0.75rem 1.5rem' : '0.75rem 1.25rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1rem',
    fontSize: isSimplifiedView ? '1.1rem' : '1rem',
    fontWeight: '500',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  };

  const skipButtonStyle = {
    ...buttonStyle,
    backgroundColor: `${theme.primaryColor}40`, // More transparent for skip
    color: theme.textColor,
    marginTop: '0.75rem',
    boxShadow: 'none',
  };

  // Animation variants for breathing circle
  const circleVariants = {
    inhale: {
      scale: 1.3,
      opacity: 1,
      transition: { 
        duration: breathingCycle.inhale,
        ease: "easeInOut"
      }
    },
    hold: {
      scale: 1.3,
      opacity: 0.9,
      transition: { 
        duration: breathingCycle.hold,
        ease: "linear"
      }
    },
    exhale: {
      scale: 1,
      opacity: 0.8,
      transition: { 
        duration: breathingCycle.exhale,
        ease: "easeInOut"
      }
    },
    idle: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  };

  // Animation for the pulsing effect
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Animation for the completion message
  const completionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className={`text-center ${isSimplifiedView ? 'p-4' : 'p-3'}`}>
      <motion.h2 
        style={headingStyle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Find Your Calm
      </motion.h2>
      
      <motion.p 
        style={textStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {getInstructionText()}
      </motion.p>

      <div className="relative mx-auto mb-6">
        {/* Background pulse effect */}
        {isBreathing && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ 
              width: '180px', 
              height: '180px', 
              backgroundColor: `${theme.primaryColor}30`,
              zIndex: 0
            }}
            variants={pulseVariants}
            animate="animate"
          />
        )}
        
        {/* Main breathing circle */}
        <motion.div
          className="w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto flex items-center justify-center text-white shadow-lg relative z-10"
          style={{ 
            backgroundColor: theme.secondaryColor, 
            color: theme.textColor, 
            fontSize: isSimplifiedView ? '1.2rem' : '1.1rem',
            boxShadow: `0 0 20px ${theme.primaryColor}50`
          }}
          variants={circleVariants}
          animate={isBreathing ? breathPhase : "idle"}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">
              {isBreathing ? `${breathPhase.charAt(0).toUpperCase() + breathPhase.slice(1)}` : "Ready"}
            </span>
            {isBreathing && (
              <span className="text-sm opacity-80 mt-1">
                {breathPhase === 'inhale' ? 'Through nose' : 
                 breathPhase === 'hold' ? 'Stay still' : 
                 'Through mouth'}
              </span>
            )}
          </div>
          
          {/* Inner ripple effect */}
          {isBreathing && (
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${theme.primaryColor}80`,
                zIndex: -1
              }}
              animate={{ 
                scale: [1, 1.1, 1], 
                opacity: [0.6, 0.3, 0.6]
              }}
              transition={{ 
                duration: breathingCycle.total / 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Progress bar with enhanced styling */}
      <div className="w-full bg-gray-700 rounded-full h-3 my-4 overflow-hidden shadow-inner" 
           style={{backgroundColor: `${theme.primaryColor}20`}}>
        <motion.div 
          className="h-3 rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${theme.primaryColor}90, ${theme.primaryColor})`,
            boxShadow: `0 0 8px ${theme.primaryColor}80`
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex justify-between items-center mb-4 text-sm" style={{color: theme.subtleTextColor}}>
        <span>{breathCount}s elapsed</span>
        <span>{Math.floor(totalBreathingDuration - breathCount)}s remaining</span>
      </div>

      {/* Supportive message that changes with breathing cycles */}
      <AnimatePresence mode="wait">
        <motion.p 
          key={completedCycles}
          style={{...textStyle, fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.5rem'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {getSupportText()}
        </motion.p>
      </AnimatePresence>

      {/* Action buttons with enhanced styling */}
      {!isBreathing ? (
        <motion.button 
          onClick={startBreathing} 
          style={buttonStyle}
          whileHover={{ 
            scale: 1.02, 
            boxShadow: `0 6px 10px rgba(0, 0, 0, 0.15)`,
            backgroundColor: `${theme.primaryColor}E0`
          }}
          whileTap={{ scale: 0.98 }}
        >
          Start Guided Breathing
        </motion.button>
      ) : (
        <motion.button 
          onClick={stopBreathing} 
          style={{...buttonStyle, backgroundColor: theme.accentColor || '#FF6B6B'}}
          whileHover={{ 
            scale: 1.02, 
            boxShadow: `0 6px 10px rgba(0, 0, 0, 0.15)` 
          }}
          whileTap={{ scale: 0.98 }}
        >
          Pause Breathing
        </motion.button>
      )}

      {/* Skip button with improved styling */}
      {onComplete && (
        <motion.button 
          onClick={handleSkip} 
          style={skipButtonStyle}
          whileHover={{ backgroundColor: `${theme.primaryColor}60` }}
          whileTap={{ scale: 0.98 }}
        >
          Skip to Next Step
        </motion.button>
      )}

      {/* Completion message overlay */}
      <AnimatePresence>
        {showCompletionMessage && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            variants={completionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 m-4 max-w-sm text-center shadow-xl">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Well Done!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You've completed the breathing exercise. Notice how much calmer you feel now.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Moving to the next step...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Supportive footer text */}
      {!isSimplifiedView && (
        <motion.p 
          style={{...textStyle, fontSize: '0.75rem', marginTop: '1.5rem', color: theme.subtleTextColor}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Focus on your breath. This moment is for you and your baby.
        </motion.p>
      )}
    </div>
  );
};

export default GuidedBreathingStep;

