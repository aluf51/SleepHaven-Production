import React from 'react';
import { motion } from 'framer-motion';
import MargaretAvatar from '../onboarding/MargaretAvatar'; // Assuming path to existing avatar
import { MessageSquare } from 'lucide-react'; // Example icon

const MargaretSupportPrompt = ({ theme, isSimplifiedView, onComplete, onAskMargaret }) => {

  const headingStyle = {
    color: theme.headingColor,
    fontSize: isSimplifiedView ? theme.simplified.headingFontSize : '1.25rem',
    fontFamily: theme.fontFamilyHeadings,
    marginBottom: isSimplifiedView ? '1rem' : '0.5rem',
  };

  const textStyle = {
    color: theme.textColor,
    fontSize: isSimplifiedView ? theme.simplified.textFontSize : '1rem',
    lineHeight: isSimplifiedView ? theme.simplified.lineHeight : '1.6',
    marginBottom: '1.5rem',
  };

  const buttonStyle = (isPrimary = true) => ({
    backgroundColor: isPrimary ? theme.primaryColor : theme.secondaryColor,
    color: theme.textColor,
    fontFamily: theme.fontFamilyBody,
    padding: isSimplifiedView ? '0.85rem 1.75rem' : '0.65rem 1.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginTop: '0.75rem',
    fontSize: isSimplifiedView ? '1.1rem' : '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  });

  // Determine if onAskMargaret is provided, otherwise default to onComplete for the primary action
  const primaryAction = onAskMargaret || onComplete;
  const primaryActionText = onAskMargaret ? "Ask Margaret for Guidance" : "Finish SOS Session";

  return (
    <div className={`text-center ${isSimplifiedView ? 'p-4' : 'p-2'}`}>
      <div className="my-4">
        <MargaretAvatar size={isSimplifiedView ? "large" : "medium"} /> {/* Adjust size prop as needed */}
      </div>
      <h2 style={headingStyle}>Margaret is Here to Help</h2>
      <p style={textStyle}>
        If you need further guidance or just want to talk through things, Margaret is available.
        She can offer personalized suggestions based on your current situation and plan.
      </p>

      <motion.button 
        onClick={primaryAction}
        style={buttonStyle(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageSquare size={isSimplifiedView ? 22 : 20} />
        {primaryActionText}
      </motion.button>

      {/* If onAskMargaret is the primary, provide a separate button to just complete/finish */}
      {onAskMargaret && onComplete && (
        <motion.button 
          onClick={onComplete}
          style={buttonStyle(false)} // Secondary button style
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          No Thanks, Finish SOS
        </motion.button>
      )}

      {!isSimplifiedView && (
        <p style={{
            ...textStyle, 
            fontSize: '0.8rem', 
            marginTop: '1.5rem', 
            color: theme.subtleTextColor
        }}>
          Remember, taking a moment for yourself is a sign of strength.
        </p>
      )}
    </div>
  );
};

export default MargaretSupportPrompt;

