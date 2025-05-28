import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../../contexts/AppContext';
import MargaretAvatar from '../onboarding/MargaretAvatar';
import DayNavigation from './DayNavigation';
import DayOverviewSection from './DayOverviewSection';
import SleepLogForm from './SleepLogForm';
import ObservationsLogForm from './ObservationsLogForm';
import DailySummarySection from './DailySummarySection';
import QuickActionsBar from './QuickActionsBar';
import LoggingReminders from './LoggingReminders';

// Mock daily plan data - this would eventually come from the generated sleep plan
const mockPlanData = {
  totalDays: 14,
  defaultFocus: "Focus on consistency and patience.",
  defaultTasks: ["Follow the recommended schedule closely.", "Log observations thoroughly."],
  sleepTarget: "10-12 hours total",
  days: {
    1: {
      focus: "Establish a consistent bedtime routine.",
      tasks: [
        "Begin bedtime routine at 7:00 PM.",
        "Include a warm bath, quiet story, and gentle song.",
        "Place baby in crib drowsy but awake.",
        "If baby fusses, wait 5 minutes before a brief check-in."
      ],
    },
    2: {
      focus: "Reinforce nap schedule consistency.",
      tasks: [
        "Aim for nap 1 around 9:00 AM.",
        "Ensure a calm pre-nap routine.",
      ],
    }
    // ... more days would be defined here
  }
};

const DailyView = () => {
  const { state, dispatch } = useContext(AppContext);
  const [currentDay, setCurrentDay] = useState(state.currentPlanDay || 1);
  const [dailyLog, setDailyLog] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // '', 'saving', 'saved', 'error'
  const [reminders, setReminders] = useState([]);

  const planDayData = mockPlanData.days[currentDay] || 
                      { focus: mockPlanData.defaultFocus, tasks: mockPlanData.defaultTasks };

  const planDetails = {
      currentDay: currentDay,
      totalDays: mockPlanData.totalDays,
      sleepTarget: mockPlanData.sleepTarget
  }

  // Initialize or load log for the current day
  useEffect(() => {
    const loadedLog = state.dailyLogs && state.dailyLogs[currentDay] ? state.dailyLogs[currentDay] : {};
    const initialLog = {
      parent_mood: '',
      baby_mood: '',
      morning_wake_time: '',
      nap1_start_time: '',
      nap1_end_time: '',
      nap_quality: '',
      bedtime: '',
      fell_asleep_time: '',
      night_wakings_count: '',
      observations_notes: '',
      ...loadedLog // Overwrite with loaded log if available
    };
    setDailyLog(initialLog);
    setSubmitStatus(''); // Reset submit status when day changes

    // Mock reminders
    if (!loadedLog.morning_wake_time) {
        setReminders([{id: 'r1', text: 'Remember to log morning wake-up time.', dismissible: true}]);
    } else {
        setReminders([]);
    }
  }, [currentDay, state.dailyLogs]);

  const handleInputChange = useCallback((fieldId, value, category) => {
    setDailyLog(prevLog => ({ ...prevLog, [fieldId]: value }));
    setSubmitStatus(''); // Clear status on new input
  }, []);

  const handleLogSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('saving');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      dispatch({ type: 'SAVE_DAILY_LOG', payload: { day: currentDay, log: dailyLog } });
      setSubmitStatus('saved');
      setTimeout(() => setSubmitStatus(''), 2000); // Clear 'saved' status after 2s
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };
  
  const goToNextDay = () => {
    if (currentDay < mockPlanData.totalDays) {
        setCurrentDay(prevDay => prevDay + 1);
        dispatch({ type: 'SET_CURRENT_PLAN_DAY', payload: currentDay + 1 });
    }
  };

  const goToPreviousDay = () => {
    if (currentDay > 1) {
        setCurrentDay(prevDay => prevDay - 1);
        dispatch({ type: 'SET_CURRENT_PLAN_DAY', payload: currentDay - 1 });
    }
  };

  const handleQuickAction = (actionType) => {
    // Example: Pre-fill a field or log an event directly
    const now = new Date().toTimeString().substring(0,5); // HH:MM
    if (actionType === 'LOG_WAKE_UP') {
      handleInputChange('morning_wake_time', now, 'sleep');
    }
    if (actionType === 'LOG_NAP_START') {
      handleInputChange('nap1_start_time', now, 'sleep');
    }
    // Add more quick actions
    alert(`Quick Action: ${actionType} triggered!`);
  };

  const handleDismissReminder = (reminderId) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex items-center mb-6">
          <MargaretAvatar />
          <h1 className="text-2xl md:text-3xl font-bold text-primary ml-4">Daily Tracking</h1>
        </div>

        <DayNavigation 
          currentDay={currentDay} 
          totalDays={mockPlanData.totalDays} 
          goToPreviousDay={goToPreviousDay} 
          goToNextDay={goToNextDay}
          onLogSubmit={handleLogSubmit}
          isSubmitting={isSubmitting}
        />

        {submitStatus === 'saving' && <p className="text-center text-blue-600 p-2 bg-blue-50 rounded-md">Saving log...</p>}
        {submitStatus === 'saved' && <p className="text-center text-green-600 p-2 bg-green-50 rounded-md">Log saved successfully!</p>}
        {submitStatus === 'error' && <p className="text-center text-red-600 p-2 bg-red-50 rounded-md">Error saving log. Please try again.</p>}

        <QuickActionsBar onQuickAction={handleQuickAction} isSubmitting={isSubmitting} />
        <LoggingReminders reminders={reminders} onDismissReminder={handleDismissReminder} />

        <DayOverviewSection 
            dayData={planDayData} 
            parentMood={dailyLog.parent_mood}
            babyMood={dailyLog.baby_mood}
            onParentMoodChange={(value) => handleInputChange('parent_mood', value, 'overview')}
            onBabyMoodChange={(value) => handleInputChange('baby_mood', value, 'overview')}
        />
        
        <SleepLogForm 
            logData={dailyLog} 
            onInputChange={handleInputChange} 
            isSubmitting={isSubmitting} 
        />
        
        <ObservationsLogForm 
            logData={dailyLog} 
            onInputChange={handleInputChange} 
            isSubmitting={isSubmitting} 
        />
        
        <DailySummarySection dailyLog={dailyLog} planDetails={planDetails} />

        {/* Footer navigation can be repeated if needed or placed outside scrollable area */}
        <DayNavigation 
          currentDay={currentDay} 
          totalDays={mockPlanData.totalDays} 
          goToPreviousDay={goToPreviousDay} 
          goToNextDay={goToNextDay}
          onLogSubmit={handleLogSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default DailyView;

