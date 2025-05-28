import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/solid';

/**
 * Reusable navigation buttons component that provides Back and/or Dashboard buttons
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onBack - Function to call when Back button is clicked
 * @param {Function} props.onDashboard - Function to call when Dashboard button is clicked
 * @param {boolean} props.showBack - Whether to show the Back button
 * @param {boolean} props.showDashboard - Whether to show the Dashboard button
 * @param {string} props.position - Position of the buttons: 'top-left', 'top-right', 'bottom'
 * @param {string} props.variant - Visual variant: 'default', 'minimal', 'text-only'
 * @returns {JSX.Element} Navigation buttons component
 */
const NavigationButtons = ({ 
  onBack, 
  onDashboard, 
  showBack = true, 
  showDashboard = true,
  position = 'top-left',
  variant = 'default'
}) => {
  // Position styles
  const positionStyles = {
    'top-left': 'absolute top-4 left-4 flex',
    'top-right': 'absolute top-4 right-4 flex',
    'bottom': 'w-full flex justify-between mt-4',
    'header': 'flex items-center'
  };

  // Button variants
  const buttonVariants = {
    'default': {
      back: 'px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center transition-all duration-200 shadow-sm',
      dashboard: 'px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center transition-all duration-200 shadow-sm'
    },
    'minimal': {
      back: 'p-2 bg-white/80 hover:bg-gray-100 text-gray-700 rounded-full flex items-center transition-all duration-200 shadow-sm backdrop-blur-sm',
      dashboard: 'p-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-full flex items-center transition-all duration-200 shadow-sm backdrop-blur-sm'
    },
    'text-only': {
      back: 'px-2 py-1 text-gray-600 hover:text-gray-900 flex items-center transition-all duration-200',
      dashboard: 'px-2 py-1 text-blue-600 hover:text-blue-800 flex items-center transition-all duration-200'
    }
  };

  return (
    <div className={positionStyles[position]}>
      {showBack && (
        <motion.button
          onClick={onBack}
          className={buttonVariants[variant].back}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          {variant !== 'minimal' && <span>Back</span>}
        </motion.button>
      )}
      
      {showDashboard && (
        <motion.button
          onClick={onDashboard}
          className={`${buttonVariants[variant].dashboard} ${showBack ? 'ml-2' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: showBack ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: showBack ? 0.1 : 0 }}
        >
          <HomeIcon className="w-4 h-4 mr-1" />
          {variant !== 'minimal' && <span>Dashboard</span>}
        </motion.button>
      )}
    </div>
  );
};

export default NavigationButtons;
