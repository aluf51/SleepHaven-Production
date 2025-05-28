import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { Home, Calendar, BookOpen, MessageCircle, Menu, Users } from 'lucide-react';

const BottomNavigation = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  const currentView = state.currentView;

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <Home size={24} />, 
      action: () => dispatch({ type: "SET_VIEW", payload: "dashboard" })
    },
    { 
      id: 'sleepPlan', 
      label: 'Plan', 
      icon: <BookOpen size={24} />, 
      action: () => dispatch({ type: "SET_VIEW", payload: "sleepPlan" })
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: <Users size={24} />, 
      action: () => dispatch({ type: "SET_VIEW", payload: "communityHome" })
    },
    { 
      id: 'margaret', 
      label: 'Margaret', 
      icon: <MessageCircle size={24} />, 
      action: () => {
        // Navigate to the Ask Margaret screen
        dispatch({ type: "SET_VIEW", payload: "askMargaret" });
      }
    },
    { 
      id: 'more', 
      label: 'More', 
      icon: <Menu size={24} />, 
      action: () => {
        // Navigate to settings screen
        dispatch({ type: "SET_VIEW", payload: "settings" });
      }
    }
  ];

  // Check if an item is active
  const isActive = (id) => {
    if (id === 'dashboard' && (!currentView || currentView === 'dashboard')) {
      return true;
    }
    return currentView === id;
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: currentTheme === 'dark' ? '#2C313A' : '#FFFFFF',
        borderTop: `1px solid ${currentTheme === 'dark' ? '#4A407D' : '#E9ECEF'}`,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}
    >
      {navItems.map((item) => (
        <motion.div
          key={item.id}
          className="nav-item"
          onClick={item.action}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: isActive(item.id) 
              ? (currentTheme === 'dark' ? '#7986CB' : '#5686C4') 
              : (currentTheme === 'dark' ? '#6C757D' : '#ADB5BD'),
            backgroundColor: isActive(item.id) 
              ? (currentTheme === 'dark' ? 'rgba(121, 134, 203, 0.1)' : 'rgba(86, 134, 196, 0.1)') 
              : 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <div className="icon">
            {item.icon}
          </div>
          <div 
            style={{
              fontSize: '0.7rem',
              marginTop: '4px',
              fontWeight: isActive(item.id) ? '600' : '400'
            }}
          >
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BottomNavigation;
