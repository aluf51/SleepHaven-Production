import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react';

const QuickTipScreen = ({ theme, onBack, issueType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Enhanced solutions with step-by-step guidance
  const solutions = {
    overtired: {
      title: "Overtired Baby",
      description: "When babies become overtired, they often have trouble settling and staying asleep.",
      steps: [
        {
          title: "Create a calming environment",
          content: "Dim the lights, use white noise, and ensure the room is at a comfortable temperature (68-72°F/20-22°C).",
          supportText: "Overtired babies are sensitive to stimulation. A calm environment helps signal it's time to sleep."
        },
        {
          title: "Use gentle motion",
          content: "Try gentle rocking, swaying, or walking while holding your baby close. The movement can be soothing.",
          supportText: "The rhythmic motion mimics the womb environment and can help calm an overtired nervous system."
        },
        {
          title: "Try a different soothing method",
          content: "If what you're doing isn't working after 10-15 minutes, switch to another approach like gentle bouncing on a yoga ball or a warm bath.",
          supportText: "Sometimes a change in approach can break the overtired cycle."
        },
        {
          title: "Prevention for tomorrow",
          content: "Watch for early tired signs and try putting baby down 15-30 minutes earlier than usual tomorrow night.",
          supportText: "Catching the sleep window before overtiredness sets in makes bedtime much easier."
        }
      ]
    },
    teething: {
      title: "Teething Discomfort",
      description: "Teething can cause pain, irritability, and sleep disruptions for babies.",
      steps: [
        {
          title: "Offer appropriate pain relief",
          content: "If approved by your pediatrician, give infant acetaminophen or ibuprofen (for babies over 6 months) 30 minutes before bedtime.",
          supportText: "Pain relief can help your baby settle more comfortably when teething pain is intense."
        },
        {
          title: "Use cold teething toys",
          content: "Offer a refrigerated (not frozen) teething ring or clean, damp washcloth for your baby to chew on before sleep.",
          supportText: "The cold helps numb sore gums naturally and provides relief through pressure."
        },
        {
          title: "Try gentle gum massage",
          content: "With clean hands, gently rub your baby's gums with your finger for 1-2 minutes.",
          supportText: "Pressure on the gums can provide temporary relief from teething discomfort."
        },
        {
          title: "Maintain sleep routine",
          content: "Even during teething, stick to your regular bedtime routine to provide consistency and security.",
          supportText: "Familiar routines help babies feel safe and can override some discomfort."
        }
      ]
    },
    separation: {
      title: "Separation Anxiety",
      description: "Separation anxiety is a normal developmental phase where babies become more aware of separations from caregivers.",
      steps: [
        {
          title: "Strengthen bedtime routine",
          content: "Add an extra 5-10 minutes to your bedtime routine with focused, calm connection time.",
          supportText: "A predictable, loving routine helps your baby feel secure before separation."
        },
        {
          title: "Use a comfort object",
          content: "Introduce a special blanket or stuffed animal that can represent your presence when you're not there.",
          supportText: "A transitional object can provide comfort and security during separations."
        },
        {
          title: "Practice brief separations",
          content: "During the day, practice stepping out of sight for brief periods while talking to your baby, gradually increasing the time.",
          supportText: "These practice sessions help your baby learn that separations are temporary."
        },
        {
          title: "Return briefly if needed",
          content: "If your baby is very distressed, return briefly to reassure them with a gentle touch and calm voice, then leave again while they're still awake.",
          supportText: "Brief check-ins can help your baby learn that you always come back."
        }
      ]
    },
    default: {
      title: "Quick Sleep Solution",
      description: "Here's a step-by-step approach to help your baby settle.",
      steps: [
        {
          title: "Reset the environment",
          content: "Ensure the room is dark, quiet, and at a comfortable temperature. Consider using white noise if your home is noisy.",
          supportText: "The right sleep environment can make a significant difference in helping babies settle."
        },
        {
          title: "Check physical needs",
          content: "Make sure your baby isn't hungry, doesn't need a diaper change, and isn't too hot or cold.",
          supportText: "Physical discomfort is often the cause of sleep difficulties."
        },
        {
          title: "Try a different soothing method",
          content: "If your usual approach isn't working, try an alternative like gentle bouncing, swaying, or a change of position.",
          supportText: "Sometimes babies need variety in soothing techniques."
        },
        {
          title: "Give yourself permission to rest",
          content: "If you're feeling overwhelmed, it's okay to place your baby safely in their crib and take a short break to collect yourself.",
          supportText: "Taking care of yourself helps you better care for your baby."
        }
      ]
    }
  };

  // Determine which solution to show
  const currentSolution = solutions[issueType] || solutions.default;
  const totalSteps = currentSolution.steps.length;

  // Go to next step
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack(); // Go back to main options if at first step
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  // Styles
  const headingStyle = {
    color: theme.headingColor,
    fontSize: '1.5rem',
    fontFamily: theme.fontFamilyHeadings,
    fontWeight: '600',
    marginBottom: '0.5rem'
  };

  const descriptionStyle = {
    color: theme.subtleTextColor,
    fontSize: '0.9rem',
    marginBottom: '1.5rem'
  };

  const stepTitleStyle = {
    color: theme.headingColor,
    fontSize: '1.2rem',
    fontFamily: theme.fontFamilyHeadings,
    fontWeight: '600',
    marginBottom: '0.75rem'
  };

  const stepContentStyle = {
    color: theme.textColor,
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem'
  };

  const supportTextStyle = {
    color: theme.subtleTextColor,
    fontSize: '0.85rem',
    fontStyle: 'italic',
    lineHeight: '1.4',
    marginBottom: '1.5rem'
  };

  const buttonStyle = {
    backgroundColor: theme.primaryColor,
    color: theme.textColor,
    padding: '0.75rem 1.25rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  };

  return (
    <motion.div
      className="p-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <motion.button
          onClick={handlePrevStep}
          className="p-2 rounded-full hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} color={theme.textColor} />
        </motion.button>
        <motion.h2 
          style={headingStyle}
          className="ml-2"
          variants={itemVariants}
        >
          {currentSolution.title}
        </motion.h2>
      </div>

      {/* Description */}
      <motion.p 
        style={descriptionStyle}
        variants={itemVariants}
      >
        {currentSolution.description}
      </motion.p>

      {/* Step Progress Indicator */}
      <motion.div 
        className="flex justify-between items-center mb-4"
        variants={itemVariants}
      >
        <div className="flex space-x-1">
          {currentSolution.steps.map((_, index) => (
            <div
              key={index}
              className={`w-6 h-1 rounded-full ${
                index === currentStep
                  ? 'bg-blue-500'
                  : index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-400'
              }`}
              style={{
                backgroundColor:
                  index === currentStep
                    ? theme.primaryColor
                    : index < currentStep
                    ? '#4CAF50'
                    : theme.cardBorderColor,
              }}
            />
          ))}
        </div>
        <span style={{ color: theme.subtleTextColor, fontSize: '0.8rem' }}>
          Step {currentStep + 1} of {totalSteps}
        </span>
      </motion.div>

      {/* Current Step Content */}
      <motion.div
        key={currentStep}
        className="bg-white/5 rounded-lg p-4 mb-6"
        style={{ 
          border: `1px solid ${theme.primaryColor}30`,
          boxShadow: `0 4px 12px ${theme.primaryColor}15`
        }}
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h3 style={stepTitleStyle}>
          {currentSolution.steps[currentStep].title}
        </h3>
        <p style={stepContentStyle}>
          {currentSolution.steps[currentStep].content}
        </p>
        <p style={supportTextStyle}>
          {currentSolution.steps[currentStep].supportText}
        </p>

        {/* Step completion indicator */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <CheckCircle 
              size={32} 
              color="#4CAF50" 
              className="opacity-70" 
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <motion.button
          onClick={handlePrevStep}
          style={{
            ...buttonStyle,
            backgroundColor: `${theme.primaryColor}40`,
          }}
          className="flex-1 mr-2"
          whileHover={{ 
            backgroundColor: `${theme.primaryColor}60`,
            transform: 'translateY(-2px)'
          }}
          whileTap={{ scale: 0.98 }}
          variants={itemVariants}
        >
          Back
        </motion.button>
        
        {currentStep < totalSteps - 1 ? (
          <motion.button
            onClick={handleNextStep}
            style={buttonStyle}
            className="flex-1 ml-2"
            whileHover={{ 
              backgroundColor: `${theme.primaryColor}E0`,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Next Step <ChevronRight size={18} className="ml-1" />
          </motion.button>
        ) : (
          <motion.button
            onClick={onBack}
            style={{
              ...buttonStyle,
              backgroundColor: theme.secondaryColor,
            }}
            className="flex-1 ml-2"
            whileHover={{ 
              backgroundColor: `${theme.secondaryColor}E0`,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Return to Options
          </motion.button>
        )}
      </div>

      {/* Supportive message */}
      <motion.p 
        style={{
          color: theme.subtleTextColor,
          fontSize: '0.8rem',
          marginTop: '1.5rem',
          textAlign: 'center',
          fontStyle: 'italic'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        You're taking the right steps to help your baby. Trust your instincts.
      </motion.p>
    </motion.div>
  );
};

export default QuickTipScreen;
