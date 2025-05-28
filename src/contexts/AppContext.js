import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  currentView: "dashboard", // e.g., dashboard, sos, askMargaret, onboarding, sleepPlan, dailyTrack
  userName: "Emma", // Example user name
  babyName: "Charlie", // Example baby name
  babyAgeMonths: 6, // Example baby age in months
  babyPhoto: null,
  isDarkMode: false,
  timeOfDay: "morning",
  hasSleepPlan: true,
  currentPlanDay: 1,
  totalPlanDays: 14,
  planStartDate: new Date(2025, 4, 1), // May 1, 2025
  todayFocus: "Establish a consistent bedtime routine and begin timed check-ins.",
  dailyLogs: {
    "2025-05-01": { completion: "completed", mood: "happy", notes: "Great first day!" },
    "2025-05-02": { completion: "completed", mood: "neutral", notes: "Some fussing but overall good" },
    "2025-05-03": { completion: "partial", mood: "fussy", notes: "Difficult naps today" },
    "2025-05-16": { completion: "completed", mood: "happy", notes: "Today was a good day!" }
  },
  margaretOnboardingComplete: false,
  margaretPlanAnswers: {},
  sleepPlan: null,
  onboardingData: {} // To store all data collected during onboarding
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, currentView: action.payload };
    case "COMPLETE_MARGARET_ONBOARDING": // Changed from COMPLETE_ONBOARDING
      return { ...state, margaretOnboardingComplete: action.payload, currentView: "dashboard" }; // payload is boolean true
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    case "SET_BABY_PROFILE": // Added case
      return { 
        ...state, 
        babyName: action.payload.name,
        babyAgeMonths: action.payload.ageMonths 
      };
    case "UPDATE_ONBOARDING_DATA": // Added case for intermediate onboarding data
        return {
            ...state,
            onboardingData: { ...state.onboardingData, ...action.payload }
        };
    case "UPDATE_ONBOARDING_DATA_COMPLETE": // Added case to store all onboarding data upon completion
        return {
            ...state,
            onboardingData: action.payload,
            // Optionally update userName, babyName etc. from final onboardingData here if not done by individual dispatches
            userName: action.payload.parentName || state.userName,
            babyName: action.payload.babyName || state.babyName,
            babyAgeMonths: action.payload.babyAgeMonths || state.babyAgeMonths,
        };
    case "SET_SLEEP_PLAN":
      return {
        ...state,
        sleepPlan: action.payload,
        hasSleepPlan: true,
        currentPlanDay: 1,
        totalPlanDays: action.payload.phases ? 
          action.payload.phases.reduce((total, phase) => {
            // Extract days from phase title format "Phase X (Days Y-Z): Title"
            const daysMatch = phase.title.match(/Days (\d+)-(\d+)/);
            return daysMatch ? Math.max(total, parseInt(daysMatch[2])) : total;
          }, 14) : 14,
        todayFocus: action.payload.phases && action.payload.phases.length > 0 ? 
          action.payload.phases[0].dailyActions[0] : ''
      };
    case "UPDATE_PLAN_DAY":
      return {
        ...state,
        currentPlanDay: action.payload.day,
        todayFocus: action.payload.focus || state.todayFocus
      };
    case "SAVE_DAILY_LOG":
      return {
        ...state,
        dailyLogs: {
          ...state.dailyLogs,
          [action.payload.day]: action.payload.log,
        },
      };
    case "SET_HAS_SLEEP_PLAN":
      return { ...state, hasSleepPlan: action.payload };
    case "TOGGLE_DARK_MODE": // Added case
      return { ...state, isDarkMode: action.payload !== undefined ? action.payload : !state.isDarkMode };
    case "SET_PERMISSION_STATUS": // Added case
        return {
            ...state,
            permissions: { ...state.permissions, ...action.payload }
        };
    // ... other actions
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

