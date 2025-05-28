import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { Calendar, CheckCircle, Clock, Award } from 'lucide-react';

const MargaretCheckInScreen = () => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  const babyName = state.babyName || 'your baby';
  
  // State for check-in data
  const [checkInData, setCheckInData] = useState({
    lastCheckIn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    nextScheduledCheckIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    progress: 65, // Percentage
    achievements: [
      { id: 1, title: 'Consistent Bedtime', description: 'Maintained the same bedtime for 5 days in a row', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), icon: 'clock' },
      { id: 2, title: 'Sleep Through the Night', description: `${babyName} slept 6+ hours without waking`, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), icon: 'star' }
    ],
    recommendations: [
      { id: 1, title: 'Adjust Wake Windows', description: `Try extending ${babyName}'s afternoon wake window by 15 minutes`, priority: 'high' },
      { id: 2, title: 'Bedtime Routine', description: 'Add a calming bath to your bedtime routine', priority: 'medium' },
      { id: 3, title: 'Room Temperature', description: 'Consider lowering the room temperature by 1-2 degrees', priority: 'low' }
    ]
  });
  
  // State for UI
  const [activeTab, setActiveTab] = useState('progress');
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Show celebration animation on component mount
  useEffect(() => {
    if (checkInData.achievements.length > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Handle scheduling a check-in
  const handleScheduleCheckIn = () => {
    // In a real app, this would open a date picker
    // For now, just schedule for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckInData(prev => ({
      ...prev,
      nextScheduledCheckIn: tomorrow
    }));
  };
  
  // Handle starting a check-in
  const handleStartCheckIn = () => {
    // In a real app, this would navigate to a check-in flow
    console.log('Starting check-in');
  };
  
  // Styles based on theme
  const themeStyles = {
    background: currentTheme === 'dark' ? '#1A1D22' : '#F8F9FA',
    cardBg: currentTheme === 'dark' ? '#2C313A' : '#FFFFFF',
    primaryColor: currentTheme === 'dark' ? '#5C6BC0' : '#79A6DC',
    secondaryColor: currentTheme === 'dark' ? '#8E7CC3' : '#63C5B9',
    textColor: currentTheme === 'dark' ? '#CED4DA' : '#495057',
    subtleTextColor: currentTheme === 'dark' ? '#6C757D' : '#ADB5BD',
    borderColor: currentTheme === 'dark' ? '#4A407D' : '#E9ECEF',
    successColor: '#4CAF50',
    warningColor: '#FFC107',
    dangerColor: '#FF5252',
  };
  
  // Animation variants
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
  
  const celebrationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Get icon component based on name
  const getIconComponent = (iconName, size = 20) => {
    switch (iconName) {
      case 'clock':
        return <Clock size={size} />;
      case 'star':
        return <Award size={size} />;
      default:
        return <CheckCircle size={size} />;
    }
  };
  
  // Format date to readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <motion.div 
      className="margaret-check-in-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 70px)', // Account for bottom navigation
        backgroundColor: themeStyles.background,
        color: themeStyles.textColor,
        padding: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            variants={celebrationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}
            >
              🎉
            </motion.div>
            <h2 style={{ 
              color: 'white', 
              textAlign: 'center',
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Congratulations!
            </h2>
            <p style={{ 
              color: 'white', 
              textAlign: 'center',
              margin: '0 0 1.5rem 0',
              maxWidth: '80%'
            }}>
              You've earned new achievements in your sleep journey with {babyName}!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCelebration(false)}
              style={{
                backgroundColor: themeStyles.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              View Achievements
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: '24px'
        }}
      >
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          fontFamily: '"Nunito Sans", sans-serif'
        }}>
          Margaret Check-ins
        </h1>
        <p style={{ 
          margin: 0, 
          color: themeStyles.subtleTextColor,
          fontSize: '0.9rem'
        }}>
          Track your progress and get personalized recommendations
        </p>
      </motion.div>
      
      {/* Next check-in card */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: themeStyles.cardBg,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          border: `1px solid ${themeStyles.borderColor}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: `${themeStyles.primaryColor}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <Calendar size={20} color={themeStyles.primaryColor} />
          </div>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              fontFamily: '"Nunito Sans", sans-serif'
            }}>
              Next Check-in
            </h2>
            <p style={{ 
              margin: 0, 
              color: themeStyles.subtleTextColor,
              fontSize: '0.8rem'
            }}>
              Scheduled for {formatDate(checkInData.nextScheduledCheckIn)}
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStartCheckIn}
            style={{
              flex: 1,
              backgroundColor: themeStyles.primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Start Check-in Now
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleScheduleCheckIn}
            style={{
              backgroundColor: 'transparent',
              color: themeStyles.primaryColor,
              border: `1px solid ${themeStyles.primaryColor}`,
              borderRadius: '8px',
              padding: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Reschedule
          </motion.button>
        </div>
      </motion.div>
      
      {/* Tabs */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          borderBottom: `1px solid ${themeStyles.borderColor}`,
          marginBottom: '16px'
        }}
      >
        {['progress', 'recommendations', 'achievements'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? `2px solid ${themeStyles.primaryColor}` : 'none',
              color: activeTab === tab ? themeStyles.primaryColor : themeStyles.subtleTextColor,
              padding: '12px 16px',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>
      
      {/* Tab content */}
      <div style={{
        flex: 1,
        overflowY: 'auto'
      }}>
        {/* Progress tab */}
        {activeTab === 'progress' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                border: `1px solid ${themeStyles.borderColor}`
              }}
            >
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '1rem', 
                fontWeight: 'bold' 
              }}>
                Sleep Plan Progress
              </h3>
              
              <div style={{
                position: 'relative',
                height: '12px',
                backgroundColor: `${themeStyles.primaryColor}20`,
                borderRadius: '6px',
                marginBottom: '8px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${checkInData.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    height: '100%',
                    backgroundColor: themeStyles.primaryColor,
                    borderRadius: '6px'
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: themeStyles.subtleTextColor
              }}>
                <span>Day 1</span>
                <span>{checkInData.progress}% complete</span>
                <span>Day 30</span>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                border: `1px solid ${themeStyles.borderColor}`
              }}
            >
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '1rem', 
                fontWeight: 'bold' 
              }}>
                Recent Progress
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '0.8rem', 
                    color: themeStyles.subtleTextColor 
                  }}>
                    Sleep Quality
                  </p>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: themeStyles.successColor
                  }}>
                    +15%
                  </div>
                </div>
                
                <div style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '0.8rem', 
                    color: themeStyles.subtleTextColor 
                  }}>
                    Night Wakings
                  </p>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: themeStyles.successColor
                  }}>
                    -2
                  </div>
                </div>
                
                <div style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '0.8rem', 
                    color: themeStyles.subtleTextColor 
                  }}>
                    Nap Duration
                  </p>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: themeStyles.warningColor
                  }}>
                    -5%
                  </div>
                </div>
              </div>
              
              <p style={{ 
                margin: '0', 
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: themeStyles.subtleTextColor
              }}>
                Compared to your last check-in on {formatDate(checkInData.lastCheckIn)}
              </p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${themeStyles.borderColor}`
              }}
            >
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '1rem', 
                fontWeight: 'bold' 
              }}>
                Margaret's Insights
              </h3>
              
              <p style={{ 
                margin: '0 0 16px 0', 
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                {babyName} is showing great improvement in nighttime sleep duration. The consistent bedtime routine you've established is working well. Focus on maintaining this consistency while we work on improving nap quality.
              </p>
              
              <div style={{
                padding: '12px',
                backgroundColor: `${themeStyles.primaryColor}10`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontStyle: 'italic'
              }}>
                "Remember that progress isn't always linear. Some days will be better than others, and that's completely normal in a baby's sleep journey."
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Recommendations tab */}
        {activeTab === 'recommendations' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {checkInData.recommendations.map((recommendation) => (
              <motion.div
                key={recommendation.id}
                variants={itemVariants}
                style={{
                  backgroundColor: themeStyles.cardBg,
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: `1px solid ${themeStyles.borderColor}`,
                  borderLeft: `4px solid ${
                    recommendation.priority === 'high' ? themeStyles.dangerColor :
                    recommendation.priority === 'medium' ? themeStyles.warningColor :
                    themeStyles.successColor
                  }`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '1rem', 
                    fontWeight: 'bold' 
                  }}>
                    {recommendation.title}
                  </h3>
                  
                  <span style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: `${
                      recommendation.priority === 'high' ? themeStyles.dangerColor :
                      recommendation.priority === 'medium' ? themeStyles.warningColor :
                      themeStyles.successColor
                    }20`,
                    color: recommendation.priority === 'high' ? themeStyles.dangerColor :
                           recommendation.priority === 'medium' ? themeStyles.warningColor :
                           themeStyles.successColor
                  }}>
                    {recommendation.priority} priority
                  </span>
                </div>
                
                <p style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {recommendation.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: themeStyles.primaryColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Apply to Plan
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: 'transparent',
                      color: themeStyles.subtleTextColor,
                      border: `1px solid ${themeStyles.subtleTextColor}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Achievements tab */}
        {activeTab === 'achievements' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {checkInData.achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                style={{
                  backgroundColor: themeStyles.cardBg,
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: `1px solid ${themeStyles.borderColor}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: `${themeStyles.secondaryColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: themeStyles.secondaryColor
                }}>
                  {getIconComponent(achievement.icon, 24)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '4px'
                  }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '1rem', 
                      fontWeight: 'bold' 
                    }}>
                      {achievement.title}
                    </h3>
                    
                    <span style={{
                      fontSize: '0.7rem',
                      color: themeStyles.subtleTextColor
                    }}>
                      {formatDate(achievement.date)}
                    </span>
                  </div>
                  
                  <p style={{ 
                    margin: '0', 
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: `${themeStyles.primaryColor}10`,
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '1rem', 
                fontWeight: 'bold' 
              }}>
                Coming Soon
              </h3>
              
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '0.9rem'
              }}>
                Keep up the good work! More achievements are waiting to be unlocked.
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: `${themeStyles.subtleTextColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: themeStyles.subtleTextColor
                }}>
                  ?
                </div>
                
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: `${themeStyles.subtleTextColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: themeStyles.subtleTextColor
                }}>
                  ?
                </div>
                
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: `${themeStyles.subtleTextColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: themeStyles.subtleTextColor
                }}>
                  ?
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MargaretCheckInScreen;
