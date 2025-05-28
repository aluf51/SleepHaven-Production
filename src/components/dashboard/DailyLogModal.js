import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../contexts/AppContext';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, scaleUp, slideUp } from '../../utils/animations';

const DailyLogModal = ({ date, onClose, existingLog = null }) => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  
  // Initialize state with existing log data or defaults
  const [logData, setLogData] = useState({
    completion: existingLog?.completion || 'none',
    notes: existingLog?.notes || '',
    mood: existingLog?.mood || 'neutral'
  });

  const handleCompletionChange = (completion) => {
    setLogData(prev => ({ ...prev, completion }));
  };

  const handleMoodChange = (mood) => {
    setLogData(prev => ({ ...prev, mood }));
  };

  const handleNotesChange = (e) => {
    setLogData(prev => ({ ...prev, notes: e.target.value }));
  };

  const handleSave = () => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    dispatch({
      type: 'SAVE_DAILY_LOG',
      payload: {
        day: formattedDate,
        log: logData
      }
    });
    onClose();
  };

  // Determine color classes based on completion status
  const getCompletionButtonClass = (status) => {
    const baseClass = "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200";
    const isSelected = logData.completion === status;
    
    if (status === 'completed') {
      return `${baseClass} ${isSelected 
        ? 'bg-green-500 text-white ring-2 ring-green-300' 
        : 'bg-green-100 text-green-800 hover:bg-green-200 hover:scale-105 transform'}`;
    } else if (status === 'partial') {
      return `${baseClass} ${isSelected 
        ? 'bg-yellow-500 text-white ring-2 ring-yellow-300' 
        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:scale-105 transform'}`;
    } else if (status === 'skipped') {
      return `${baseClass} ${isSelected 
        ? 'bg-red-500 text-white ring-2 ring-red-300' 
        : 'bg-red-100 text-red-800 hover:bg-red-200 hover:scale-105 transform'}`;
    }
    return baseClass;
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <motion.div 
            className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
            variants={slideUp}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <PencilIcon className="w-5 h-5 mr-2 text-blue-500" />
              </motion.div>
              Log for {format(date, 'MMMM d, yyyy')}
            </h2>
            <motion.button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="p-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            {/* Sleep Plan Completion */}
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={0}
            >
              <label className="block text-sm font-medium mb-2">
                Sleep Plan Completion
              </label>
              <motion.div 
                className="flex space-x-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {['completed', 'partial', 'skipped'].map((status, index) => (
                  <motion.button 
                    key={status}
                    className={getCompletionButtonClass(status)}
                    onClick={() => handleCompletionChange(status)}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Baby's Mood */}
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={1}
            >
              <label className="block text-sm font-medium mb-2">
                {state.babyName || 'Baby'}'s Mood
              </label>
              <motion.div 
                className="flex justify-between"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                {[
                  { mood: 'happy', emoji: '😊' },
                  { mood: 'neutral', emoji: '😐' },
                  { mood: 'fussy', emoji: '😣' },
                  { mood: 'tired', emoji: '😴' },
                  { mood: 'energetic', emoji: '🤗' }
                ].map((item, index) => (
                  <motion.button 
                    key={item.mood}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      logData.mood === item.mood 
                        ? 'bg-blue-100 dark:bg-blue-800 ring-2 ring-blue-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleMoodChange(item.mood)}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                  </motion.button>
                ))}
              </motion.div>
              <motion.p 
                className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {logData.mood ? `Selected: ${logData.mood.charAt(0).toUpperCase() + logData.mood.slice(1)}` : 'Select a mood'}
              </motion.p>
            </motion.div>
            
            {/* Notes */}
            <motion.div 
              className="mb-4"
              variants={slideUp}
              custom={2}
            >
              <label className="block text-sm font-medium mb-2" htmlFor="notes">
                Notes
              </label>
              <motion.textarea
                id="notes"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="What worked? What challenges did you face?"
                value={logData.notes}
                onChange={handleNotesChange}
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              ></motion.textarea>
            </motion.div>
          </motion.div>
          
          {/* Footer */}
          <motion.div 
            className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700"
            variants={slideUp}
            custom={3}
          >
            <motion.button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 mr-2 transition-all duration-200"
              whileHover={{ scale: 1.05, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
              whileHover={{ scale: 1.05, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              disabled={logData.completion === 'none'}
            >
              Save
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyLogModal;
