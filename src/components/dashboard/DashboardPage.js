import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import TimeOfDayBanner from './TimeOfDayBanner';
import AchievementsCard from './AchievementsCard';
import SleepPlanOverviewCard from './SleepPlanOverviewCard';
import ProgressCalendarCard from './ProgressCalendarCard';
import MargaretPresenceWidget from './MargaretPresenceWidget';
import QuickActionCards from '../navigation/QuickActionCards';

const DashboardPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  const mockAchievements = [
    { id: '1', title: 'First Log!', description: 'You logged your first sleep session.', achieved: true, icon: '🌟' },
    { id: '2', title: 'Sleep Streak: 3 Days', description: 'Logged sleep for 3 days in a row.', achieved: true, icon: '🔥' },
    { id: '3', title: 'Early Bird', description: 'Woke up before 7 AM.', achieved: false, icon: '☀️' },
  ];

  const mockLoggedData = {
    '2024-05-01': { sleepQuality: 'good', mood: 'happy' },
    '2024-05-02': { sleepQuality: 'fair', mood: 'neutral' },
    '2024-05-03': { sleepQuality: 'excellent', mood: 'energetic' },
  };

  const handleMargaretInteraction = () => {
    console.log('Interacting with Margaret AI');
  };
  
  const handleNavigateToCreatePlan = () => {
    dispatch({ type: "SET_VIEW", payload: "sleepPlanPresentation" });
  };

  const handleNavigateToViewPlan = () => {
    // Navigate to the sleep plan view
    dispatch({ type: "SET_VIEW", payload: "sleepPlanView" }); 
  };

  const handleNavigateToSOS = () => {
    dispatch({ type: "SET_VIEW", payload: "sos" });
  };

  const handleNavigateToVisualPlanner = () => {
    dispatch({ type: "SET_VIEW", payload: "visualSleepPlanner" });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: currentTheme.pageBackground,
      color: currentTheme.textColor,
      padding: '0px',
      margin: '0px',
      boxSizing: 'border-box',
    }}>
      <TimeOfDayBanner 
        userName={state.userName || 'User'} 
        babyName={state.babyName || 'your little one'}
        babyAvatarUrl={state.avatar} 
        timeOfDay={state.timeOfDay}
      />
      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <AchievementsCard achievements={mockAchievements} />
        {state.hasSleepPlan ? (
          // Show active sleep plan if one exists
          <SleepPlanOverviewCard 
            currentPlanDay={state.currentPlanDay} 
            totalPlanDays={state.totalPlanDays} 
            todayFocus={state.todayFocus || 'Focus on consistent bedtime routine.'} 
            onNavigateToPlan={handleNavigateToViewPlan} // This navigates to the sleep plan view
          />
        ) : (
          // Show "Create Sleep Plan" button if no plan exists
          <SleepPlanOverviewCard 
            currentPlanDay={null}
            totalPlanDays={null} 
            todayFocus={null} 
            onNavigateToPlan={handleNavigateToCreatePlan} // This navigates to sleep plan creation
          />
        )}
        <ProgressCalendarCard />
        <MargaretPresenceWidget onInteraction={handleMargaretInteraction} />
      </div>
      
      {/* Quick Action Cards */}
      <QuickActionCards />
    </div>
  );
};

export default DashboardPage;

