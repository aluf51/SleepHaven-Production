import React, { useState } from 'react';
import { CalendarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import DailyPlanDetailsModal from './DailyPlanDetailsModal';
import { fadeIn, slideUp, addInteractiveIndicator } from '../../utils/animations';

const SleepPlanOverviewCard = ({ currentPlanDay, totalPlanDays, todayFocus, onNavigateToPlan }) => {
  const progressPercentage = totalPlanDays > 0 ? (currentPlanDay / totalPlanDays) * 100 : 0;
  const [showDailyPlanModal, setShowDailyPlanModal] = useState(false);

  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow h-full flex flex-col"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2 
        className="text-xl font-semibold text-gray-700 mb-3"
        variants={slideUp}
      >
        Active Sleep Plan
      </motion.h2>
      {currentPlanDay && totalPlanDays ? (
        <>
          <motion.div 
            className="mb-3"
            variants={slideUp}
          >
            <p className="text-sm text-gray-600">
              You are on <span className="font-bold text-primary">Day {currentPlanDay}</span> of {totalPlanDays}.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 overflow-hidden">
              <motion.div 
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="mb-4 p-3 bg-indigo-50 rounded-md flex-grow relative group hover:shadow-md transition-all duration-300"
            variants={slideUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h3 className="text-md font-semibold text-indigo-700">Today's Focus:</h3>
            <p className="text-gray-700 text-sm mt-1">{todayFocus || 'Review your daily tasks and stay consistent!'}</p>
            
            {/* View Details button that appears on hover with improved animation */}
            <div className="absolute inset-0 bg-indigo-600 bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md">
              <motion.button
                onClick={() => setShowDailyPlanModal(true)}
                className="px-3 py-1 bg-white text-indigo-700 text-xs font-semibold rounded-md shadow hover:bg-indigo-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex space-x-2 mb-4"
            variants={slideUp}
          >
            <motion.button
              onClick={() => setShowDailyPlanModal(true)}
              className={addInteractiveIndicator("flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center")}
              whileHover={{ scale: 1.03, backgroundColor: "rgb(224 231 255)" }}
              whileTap={{ scale: 0.97 }}
            >
              <CalendarIcon className="w-4 h-4 mr-1" />
              Today's Tasks
            </motion.button>
            <motion.button
              onClick={onNavigateToPlan}
              className={addInteractiveIndicator("flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center")}
              whileHover={{ scale: 1.03, backgroundColor: "rgb(224 231 255)" }}
              whileTap={{ scale: 0.97 }}
            >
              <ClipboardDocumentListIcon className="w-4 h-4 mr-1" />
              Full Plan
            </motion.button>
          </motion.div>
          
          <motion.button
            onClick={onNavigateToPlan}
            className={addInteractiveIndicator("mt-auto w-full px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50")}
            variants={slideUp}
            whileHover={{ scale: 1.03, y: -2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Sleep Plan Dashboard
          </motion.button>
          
          {/* Daily Plan Modal */}
          {showDailyPlanModal && (
            <DailyPlanDetailsModal 
              date={new Date()} 
              onClose={() => setShowDailyPlanModal(false)} 
            />
          )}
        </>
      ) : (
        <motion.div 
          className="text-center py-4 flex-grow flex flex-col justify-center items-center"
          variants={slideUp}
        >
          <p className="text-gray-500 mb-3">No active sleep plan found.</p>
          <motion.button
            onClick={onNavigateToPlan}
            className={addInteractiveIndicator("bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50")}
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Create Sleep Plan
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SleepPlanOverviewCard;

