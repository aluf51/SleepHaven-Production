import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Phone, Users, Heart, Moon, Baby } from 'lucide-react';

const ImmediateHelpOptions = ({ theme, isSimplifiedView, onComplete, onSelectOption }) => {

  const options = [
    { 
      id: 'quickTip', 
      title: 'Quick Solutions', 
      description: 'Step-by-step guidance for common sleep issues.', 
      icon: <Lightbulb size={isSimplifiedView ? 28 : 24} />, 
      action: () => onSelectOption('quickTip'),
      color: '#7B91C9' // Light blue
    },
    { 
      id: 'contactSupport', 
      title: 'Contact Support', 
      description: 'Reach out to a sleep consultant or alert your partner.', 
      icon: <Phone size={isSimplifiedView ? 28 : 24} />, 
      action: () => onSelectOption('contactSupport'),
      color: '#5A6794' // Darker blue
    },
    { 
      id: 'communityWisdom', 
      title: 'Community Wisdom', 
      description: 'See what other parents do in similar situations.', 
      icon: <Users size={isSimplifiedView ? 28 : 24} />, 
      action: () => onSelectOption('communityWisdom'),
      color: '#FF6B6B' // Soft red
    },
  ];

  // Common sleep issues for quick access
  const commonIssues = [
    { id: 'overtired', title: 'Overtired', icon: <Moon size={20} />, action: () => onSelectOption('quickTip', 'overtired') },
    { id: 'teething', title: 'Teething', icon: <Baby size={20} />, action: () => onSelectOption('quickTip', 'teething') },
    { id: 'separation', title: 'Separation Anxiety', icon: <Heart size={20} />, action: () => onSelectOption('quickTip', 'separation') },
  ];

  const headingStyle = {
    color: theme.headingColor,
    fontSize: isSimplifiedView ? theme.simplified.headingFontSize : '1.5rem',
    fontFamily: theme.fontFamilyHeadings,
    marginBottom: isSimplifiedView ? '1.5rem' : '1rem',
    fontWeight: '600',
  };

  const textStyle = {
    color: theme.textColor,
    fontSize: isSimplifiedView ? theme.simplified.textFontSize : '1.1rem',
    lineHeight: isSimplifiedView ? theme.simplified.lineHeight : '1.6',
    marginBottom: '1rem',
  };

  const descriptionStyle = {
    color: theme.subtleTextColor,
    fontSize: isSimplifiedView ? '0.9rem' : '0.85rem',
    lineHeight: isSimplifiedView ? '1.5' : '1.4',
  };

  const buttonStyle = {
    backgroundColor: theme.primaryColor,
    color: theme.textColor,
    fontFamily: theme.fontFamilyBody,
    padding: isSimplifiedView ? '1rem 1.5rem' : '0.75rem 1.25rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1.5rem',
    fontSize: isSimplifiedView ? '1.1rem' : '1rem',
    textAlign: 'center',
    fontWeight: '500',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  };

  const optionCardStyle = (color) => ({
    backgroundColor: `${color}15`, // Very light background based on option color
    border: `1px solid ${color}40`,
    borderRadius: '0.75rem',
    padding: isSimplifiedView ? '1.5rem' : '1.25rem',
    marginBottom: isSimplifiedView ? '1.25rem' : '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  });

  const quickIssueStyle = {
    backgroundColor: `${theme.primaryColor}20`,
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: `1px solid ${theme.primaryColor}30`,
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

  return (
    <motion.div 
      className={`text-center ${isSimplifiedView ? 'p-4' : 'p-2'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        style={headingStyle}
        variants={itemVariants}
      >
        Need Immediate Support?
      </motion.h2>
      
      <motion.p 
        style={{...textStyle, marginBottom: '1.5rem'}}
        variants={itemVariants}
      >
        Here are options that can help right now. Choose what you need most.
      </motion.p>

      {/* Common issues quick access */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-6"
        variants={itemVariants}
      >
        {commonIssues.map(issue => (
          <motion.div
            key={issue.id}
            style={quickIssueStyle}
            onClick={issue.action}
            whileHover={{ 
              backgroundColor: `${theme.primaryColor}30`,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{color: theme.primaryColor}} className="mr-2">{issue.icon}</span>
            <span style={{color: theme.textColor, fontSize: '0.9rem', fontWeight: '500'}}>{issue.title}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Main support options */}
      <div className="space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            style={optionCardStyle(option.color)}
            onClick={option.action}
            whileHover={{ 
                transform: 'translateY(-3px)', 
                boxShadow: `0 8px 16px ${option.color}20`,
                backgroundColor: `${option.color}25`
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
            custom={index}
          >
            <div className={`flex ${isSimplifiedView ? 'flex-col items-center text-center' : 'items-start text-left'}`}>
              <div 
                style={{
                  color: option.color,
                  backgroundColor: `${option.color}20`,
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                }} 
                className={isSimplifiedView ? 'mb-3' : 'mr-4'}
              >
                {option.icon}
              </div>
              <div>
                <h3 style={{
                    color: theme.textColor,
                    fontFamily: theme.fontFamilyHeadings,
                    fontSize: isSimplifiedView ? '1.3rem' : '1.15rem',
                    marginBottom: '0.35rem',
                    fontWeight: '600'
                }}>
                    {option.title}
                </h3>
                <p style={descriptionStyle}>{option.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue button with enhanced styling */}
      <motion.button 
        onClick={onComplete} 
        style={buttonStyle}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          backgroundColor: `${theme.primaryColor}E0`
        }}
        whileTap={{ scale: 0.98 }}
        variants={itemVariants}
      >
        Continue to Next Step
      </motion.button>

      {/* Supportive message */}
      <motion.p 
        style={{
          color: theme.subtleTextColor,
          fontSize: '0.8rem',
          marginTop: '1.5rem',
          fontStyle: 'italic'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Remember, this difficult moment will pass. You're doing great.
      </motion.p>
    </motion.div>
  );
};

export default ImmediateHelpOptions;

