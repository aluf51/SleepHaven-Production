import React from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ currentStep, totalSteps, theme, isSimplifiedView }) => {
  const effectiveStep = currentStep > totalSteps ? totalSteps : currentStep;

  const dotSize = isSimplifiedView ? '0.85rem' : '0.75rem'; // Slightly larger in simplified view
  const selectedDotScale = 1.35;
  const connectorHeight = '2px';
  const connectorWidth = isSimplifiedView ? '2rem' : '1.5rem';

  return (
    <div className="flex justify-center items-center my-4">
      {[...Array(totalSteps)].map((_, i) => {
        const stepNumber = i + 1;
        const isCompleted = stepNumber < effectiveStep;
        const isActive = stepNumber === effectiveStep;
        let dotColor = theme.subtleTextColor + '50'; // Default for upcoming steps (more transparent)
        let scale = 1;

        if (isActive) {
          dotColor = theme.primaryColor;
          scale = selectedDotScale;
        } else if (isCompleted) {
          dotColor = theme.accentColor; // Forest Green for completed
        }

        return (
          <React.Fragment key={i}>
            <motion.div
              className="rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: dotColor,
                boxShadow: isActive ? `0 0 8px ${theme.primaryColor}80` : 'none',
              }}
              animate={{ scale: scale }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            {i < totalSteps - 1 && (
              <div
                className="h-px mx-1"
                style={{
                  width: connectorWidth,
                  height: connectorHeight,
                  backgroundColor: (isCompleted || isActive) ? theme.primaryColor : (theme.subtleTextColor + '30'),
                  transition: 'background-color 0.5s ease, width 0.3s ease'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;

