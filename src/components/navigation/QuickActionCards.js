import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { AlertTriangle, Layout } from 'lucide-react';

const QuickActionCards = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  
  const quickActions = [
    {
      id: 'sos',
      title: 'SOS MODE',
      description: 'Need help now? Get immediate support',
      icon: <AlertTriangle size={24} />,
      color: '#FF6B6B', // Soft red
      action: () => dispatch({ type: "SET_VIEW", payload: "sos" })
    },
    {
      id: 'visualPlanner',
      title: 'VISUAL PLANNER',
      description: `Create visual routines for ${state.babyName || 'your baby'}`,
      icon: <Layout size={24} />,
      color: '#7B91C9', // Light blue
      action: () => dispatch({ type: "SET_VIEW", payload: "visualSleepPlanner" })
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="quick-actions-container"
      style={{
        marginBottom: '80px', // Space for bottom navigation
        padding: '0 20px'
      }}
    >
      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '12px',
        color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
        fontFamily: '"Nunito Sans", sans-serif'
      }}>
        Quick Actions
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        {quickActions.map((action) => (
          <motion.div
            key={action.id}
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
              backgroundColor: action.id === 'sos' 
                ? `${action.color}15` 
                : currentTheme === 'dark' 
                  ? 'rgba(121, 134, 203, 0.15)' 
                  : 'rgba(86, 134, 196, 0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
            style={{
              backgroundColor: action.id === 'sos' 
                ? `${action.color}10` 
                : currentTheme === 'dark' 
                  ? 'rgba(121, 134, 203, 0.1)' 
                  : 'rgba(86, 134, 196, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              border: action.id === 'sos' 
                ? `1px solid ${action.color}30` 
                : `1px solid ${currentTheme === 'dark' ? '#4A407D' : '#E9ECEF'}`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              marginBottom: '12px'
            }}>
              <div style={{
                backgroundColor: action.id === 'sos' 
                  ? `${action.color}20` 
                  : currentTheme === 'dark' 
                    ? 'rgba(121, 134, 203, 0.2)' 
                    : 'rgba(86, 134, 196, 0.2)',
                borderRadius: '8px',
                padding: '10px',
                marginRight: '12px',
                color: action.id === 'sos' 
                  ? action.color 
                  : currentTheme === 'dark' 
                    ? '#7986CB' 
                    : '#5686C4'
              }}>
                {action.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  marginBottom: '4px',
                  color: action.id === 'sos' 
                    ? action.color 
                    : currentTheme === 'dark' 
                      ? '#F8F9FA' 
                      : '#212529',
                  fontFamily: '"Nunito Sans", sans-serif'
                }}>
                  {action.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: currentTheme === 'dark' ? '#CED4DA' : '#495057',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {action.description}
                </p>
              </div>
            </div>
            
            {action.id === 'sos' && (
              <div style={{
                backgroundColor: `${action.color}15`,
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
                fontStyle: 'italic'
              }}>
                Feeling overwhelmed? We're here to help.
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActionCards;
