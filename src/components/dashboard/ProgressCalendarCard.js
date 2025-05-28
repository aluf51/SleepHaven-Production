import React, { useState, useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { AppContext } from '../../contexts/AppContext';
import DailyLogModal from './DailyLogModal';
import DailyPlanDetailsModal from './DailyPlanDetailsModal';

const ProgressCalendarCard = () => {
  const { state } = useContext(AppContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Get daily logs from app state
  const dailyLogs = state.dailyLogs || {};

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center py-2 px-1">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        <span className="text-lg font-semibold text-gray-700">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRightIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 text-center text-xs text-gray-500">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowLogModal(true);
  };

  const handlePlanClick = (day, e) => {
    e.stopPropagation();
    setSelectedDate(day);
    setShowPlanModal(true);
    console.log("Plan modal should open for date:", format(day, 'yyyy-MM-dd'));
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 text-center">
        {days.map((day, i) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const dayLog = dailyLogs[formattedDate];
          
          // Determine cell background color based on completion status
          let bgColorClass = '';
          let statusText = '';
          
          if (dayLog) {
            if (dayLog.completion === 'completed') {
              bgColorClass = 'bg-green-100 hover:bg-green-200';
              statusText = 'Completed';
            } else if (dayLog.completion === 'partial') {
              bgColorClass = 'bg-yellow-100 hover:bg-yellow-200';
              statusText = 'Partial';
            } else if (dayLog.completion === 'skipped') {
              bgColorClass = 'bg-red-100 hover:bg-red-200';
              statusText = 'Skipped';
            }
          }
          
          // Base cell classes
          let cellClasses = `relative py-2 border border-gray-200 ${
            !isSameMonth(day, monthStart) ? 'text-gray-400' : 'text-gray-700'
          } ${bgColorClass || 'hover:bg-gray-100'}`;
          
          // Text classes
          let textClasses = 'text-sm';
          
          // Today's highlight
          if (isSameDay(day, new Date())) {
            if (!bgColorClass) cellClasses += ' bg-blue-100'; // Only add blue background if no status color
            textClasses += ' font-bold text-blue-600';
          }

          // Check if this day is within the sleep plan range
          const isInPlanRange = state.hasSleepPlan && 
                               isSameMonth(day, new Date()) && 
                               day.getDate() <= (new Date().getDate() + state.totalPlanDays - state.currentPlanDay);

          return (
            <div key={i} className={`${cellClasses} relative min-h-[60px]`}>
              {/* Date number in top left */}
              <div className="absolute top-1 left-1">
                <span className={textClasses}>
                  {format(day, 'd')}
                </span>
              </div>
              
              {/* Status indicator in center */}
              {dayLog && dayLog.completion !== 'none' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`
                    text-xs px-2 py-0.5 rounded-sm
                    ${dayLog.completion === 'completed' ? 'bg-green-100 text-green-800' : 
                      dayLog.completion === 'partial' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {dayLog.completion === 'completed' ? 'Done' : 
                     dayLog.completion === 'partial' ? 'Partial' : 'Skipped'}
                  </div>
                  
                  {/* Mood emoji */}
                  {dayLog.mood && (
                    <div className="text-sm mt-1">
                      <span>
                        {dayLog.mood === 'happy' ? '😊' : 
                         dayLog.mood === 'neutral' ? '😐' : 
                         dayLog.mood === 'fussy' ? '😣' : 
                         dayLog.mood === 'tired' ? '😴' : '🤗'}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Action buttons - subtle but always visible */}
              {isSameMonth(day, monthStart) && (
                <div className="absolute bottom-0 right-0 flex">
                  {isInPlanRange && (
                    <button 
                      className="text-indigo-500 hover:text-indigo-700 transition-colors p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanClick(day, e);
                      }}
                      title="View plan for this day"
                    >
                      <CalendarIcon className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDateClick(day);
                    }}
                    title="Log progress for this day"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const closeLogModal = () => {
    setShowLogModal(false);
    setSelectedDate(null);
  };

  const closePlanModal = () => {
    setShowPlanModal(false);
    setSelectedDate(null);
  };

  // Get existing log data for the selected date
  const getExistingLog = () => {
    if (!selectedDate) return null;
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    return dailyLogs[formattedDate];
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Progress Calendar</h2>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-200 mr-1"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-200 mr-1"></div>
          <span>Partial</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-200 mr-1"></div>
          <span>Skipped</span>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center">
          <PlusIcon className="w-3 h-3 text-blue-500 mr-1" />
          <span>Log Progress</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-3 h-3 text-indigo-600 mr-1" />
          <span>View Plan</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mt-2 italic text-center">
        Tap on a day or use the buttons to log progress or view your plan
      </p>
      
      {/* Daily Log Modal */}
      {showLogModal && selectedDate && (
        <DailyLogModal 
          date={selectedDate} 
          onClose={closeLogModal} 
          existingLog={getExistingLog()}
        />
      )}
      
      {/* Daily Plan Modal */}
      {showPlanModal && selectedDate && (
        <DailyPlanDetailsModal 
          date={selectedDate} 
          onClose={closePlanModal} 
        />
      )}
    </div>
  );
};

export default ProgressCalendarCard;

