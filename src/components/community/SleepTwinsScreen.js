import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { Users, Award, BarChart2, MessageCircle, Check, AlertCircle, ChevronRight, ArrowLeft } from 'lucide-react';

const SleepTwinsScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  const babyName = state.babyName || 'your baby';
  
  // State for profile and matching
  const [profileComplete, setProfileComplete] = useState(true);
  const [profileData, setProfileData] = useState({
    babyAge: '4-6 months',
    sleepChallenges: ['Night wakings', 'Short naps', 'Early wakings'],
    sleepGoals: ['Longer stretches', 'Consistent naps'],
    bedtimeRoutine: 'Bath, book, feed, bed',
    typicalWakeWindows: '2-2.5 hours'
  });
  
  const [matchedParents, setMatchedParents] = useState([
    {
      id: 1,
      matchScore: 92,
      babyAge: '5 months',
      sharedChallenges: ['Night wakings', 'Short naps'],
      successWith: 'Consistent wake windows and bedtime routine',
      anonymizedQuote: "After struggling with 30-minute naps for weeks, extending wake windows by 15 minutes made all the difference."
    },
    {
      id: 2,
      matchScore: 87,
      babyAge: '4.5 months',
      sharedChallenges: ['Night wakings', 'Early wakings'],
      successWith: 'Room darkening and white noise',
      anonymizedQuote: "We installed blackout curtains and a good white noise machine, and early wakings improved within days."
    },
    {
      id: 3,
      matchScore: 84,
      babyAge: '6 months',
      sharedChallenges: ['Short naps', 'Early wakings'],
      successWith: 'Consistent first morning nap time',
      anonymizedQuote: "Setting the first nap at the same time every day helped regulate the whole day's sleep pattern."
    }
  ]);
  
  const [sleepComparisons, setSleepComparisons] = useState({
    averageNightWakings: {
      you: 3.2,
      similar: 2.8,
      improving: 1.5
    },
    averageNapLength: {
      you: 35,
      similar: 42,
      improving: 65
    },
    nightSleepHours: {
      you: 9.5,
      similar: 10.2,
      improving: 11.3
    }
  });
  
  const [sharedExperiences, setSharedExperiences] = useState([
    {
      id: 1,
      challenge: 'Night wakings',
      approach: 'Gentle settling',
      outcome: 'Gradual improvement',
      description: "We started by extending the time before responding to wakings by just 1-2 minutes each night. After two weeks, our baby started connecting sleep cycles on their own.",
      helpfulCount: 24
    },
    {
      id: 2,
      challenge: 'Short naps',
      approach: 'Wake window adjustment',
      outcome: 'Significant improvement',
      description: "We realized we were putting our baby down too early. Extending wake windows by 15-20 minutes led to much longer naps within just a few days.",
      helpfulCount: 31
    },
    {
      id: 3,
      challenge: 'Early wakings',
      approach: 'Environment optimization',
      outcome: 'Complete resolution',
      description: "The early morning light was the culprit. After installing blackout curtains and adding a white noise machine, our baby started sleeping until a reasonable hour.",
      helpfulCount: 18
    }
  ]);
  
  // Handle navigation
  const navigateTo = (section) => {
    if (section === 'community') {
      dispatch({ type: "SET_VIEW", payload: "communityHome" });
    } else {
      console.log(`Navigating to ${section}`);
      alert(`Navigating to ${section}`);
    }
  };
  
  // Styles based on theme
  const themeStyles = {
    background: currentTheme === 'dark' ? '#1A1D22' : '#F8F9FA',
    cardBg: currentTheme === 'dark' ? '#2C313A' : '#FFFFFF',
    primaryColor: currentTheme === 'dark' ? '#5C6BC0' : '#79A6DC',
    secondaryColor: currentTheme === 'dark' ? '#8E7CC3' : '#63C5B9',
    accentColor: currentTheme === 'dark' ? '#FFA07A' : '#FF8C69',
    textColor: currentTheme === 'dark' ? '#CED4DA' : '#495057',
    subtleTextColor: currentTheme === 'dark' ? '#6C757D' : '#ADB5BD',
    borderColor: currentTheme === 'dark' ? '#4A407D' : '#E9ECEF',
    successColor: currentTheme === 'dark' ? '#77DD77' : '#4CAF50',
    warningColor: currentTheme === 'dark' ? '#FFB347' : '#FFC107',
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
  
  // Render profile setup if not complete
  if (!profileComplete) {
    return (
      <motion.div 
        className="sleep-twins-profile-setup"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          backgroundColor: themeStyles.background,
          color: themeStyles.textColor,
          minHeight: 'calc(100vh - 70px)',
          padding: '16px',
          paddingBottom: '80px'
        }}
      >
        <h1>Sleep Twins Profile Setup</h1>
        <p>Complete your profile to find parents with similar babies and sleep challenges.</p>
        {/* Profile setup form would go here */}
        <button onClick={() => setProfileComplete(true)}>Complete Profile</button>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="sleep-twins-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: themeStyles.background,
        color: themeStyles.textColor,
        minHeight: 'calc(100vh - 70px)',
        padding: '16px',
        paddingBottom: '80px'
      }}
    >
      {/* Header with back button */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigateTo('community')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: themeStyles.primaryColor,
            cursor: 'pointer',
            padding: '8px',
            marginRight: '8px'
          }}
        >
          <ArrowLeft size={20} />
        </motion.button>
        
        <div>
          <h1 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            fontFamily: '"Nunito Sans", sans-serif',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Sleep Twins
          </h1>
          <p style={{ 
            margin: 0, 
            color: themeStyles.subtleTextColor,
            fontSize: '0.9rem'
          }}>
            Connect with parents facing similar sleep challenges
          </p>
        </div>
      </motion.div>
      
      {/* Your Profile Summary */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: themeStyles.cardBg,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: `1px solid ${themeStyles.borderColor}`
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Your Sleep Profile
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProfileComplete(false)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: themeStyles.primaryColor,
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Edit Profile
          </motion.button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <p style={{ 
              margin: '0 0 4px 0', 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Baby Age
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.95rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              {profileData.babyAge}
            </p>
          </div>
          
          <div>
            <p style={{ 
              margin: '0 0 4px 0', 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Wake Windows
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.95rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              {profileData.typicalWakeWindows}
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '0.8rem', 
            color: themeStyles.subtleTextColor 
          }}>
            Sleep Challenges
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {profileData.sleepChallenges.map((challenge, index) => (
              <span key={index} style={{
                backgroundColor: `${themeStyles.primaryColor}15`,
                color: themeStyles.primaryColor,
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {challenge}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '0.8rem', 
            color: themeStyles.subtleTextColor 
          }}>
            Sleep Goals
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {profileData.sleepGoals.map((goal, index) => (
              <span key={index} style={{
                backgroundColor: `${themeStyles.secondaryColor}15`,
                color: themeStyles.secondaryColor,
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {goal}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Sleep Data Comparisons */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: '24px'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            How You Compare
          </h2>
        </div>
        
        <div style={{
          backgroundColor: themeStyles.cardBg,
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: `1px solid ${themeStyles.borderColor}`
        }}>
          <p style={{ 
            margin: '0 0 16px 0', 
            fontSize: '0.9rem', 
            color: themeStyles.textColor 
          }}>
            See how {babyName}'s sleep patterns compare to similar babies and those who have improved:
          </p>
          
          {/* Night Wakings Comparison */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Average Night Wakings
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                color: themeStyles.subtleTextColor
              }}>
                <span style={{ color: '#5C6BC0' }}>●</span>
                <span>You</span>
                <span style={{ color: '#8E7CC3', marginLeft: '8px' }}>●</span>
                <span>Similar</span>
                <span style={{ color: '#4CAF50', marginLeft: '8px' }}>●</span>
                <span>Improving</span>
              </div>
            </div>
            
            <div style={{
              height: '24px',
              backgroundColor: `${themeStyles.subtleTextColor}20`,
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Improving marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.averageNightWakings.improving / 5) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.successColor,
                zIndex: 3
              }} />
              
              {/* Similar marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.averageNightWakings.similar / 5) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.secondaryColor,
                zIndex: 2
              }} />
              
              {/* Your marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.averageNightWakings.you / 5) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.primaryColor,
                zIndex: 1
              }} />
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
              fontSize: '0.7rem',
              color: themeStyles.subtleTextColor
            }}>
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5+</span>
            </div>
          </div>
          
          {/* Average Nap Length Comparison */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Average Nap Length (minutes)
              </p>
            </div>
            
            <div style={{
              height: '24px',
              backgroundColor: `${themeStyles.subtleTextColor}20`,
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Improving marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.averageNapLength.improving / 120) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.successColor,
                zIndex: 3
              }} />
              
              {/* Similar marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.averageNapLength.similar / 120) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.secondaryColor,
                zIndex: 2
              }} />
              
              {/* Your marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.averageNapLength.you / 120) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.primaryColor,
                zIndex: 1
              }} />
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
              fontSize: '0.7rem',
              color: themeStyles.subtleTextColor
            }}>
              <span>0</span>
              <span>30</span>
              <span>60</span>
              <span>90</span>
              <span>120+</span>
            </div>
          </div>
          
          {/* Night Sleep Hours Comparison */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Night Sleep Hours
              </p>
            </div>
            
            <div style={{
              height: '24px',
              backgroundColor: `${themeStyles.subtleTextColor}20`,
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Improving marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.nightSleepHours.improving / 12) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.successColor,
                zIndex: 3
              }} />
              
              {/* Similar marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.nightSleepHours.similar / 12) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.secondaryColor,
                zIndex: 2
              }} />
              
              {/* Your marker */}
              <div style={{
                position: 'absolute',
                left: `${(sleepComparisons.nightSleepHours.you / 12) * 100}%`,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: themeStyles.primaryColor,
                zIndex: 1
              }} />
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
              fontSize: '0.7rem',
              color: themeStyles.subtleTextColor
            }}>
              <span>6</span>
              <span>8</span>
              <span>10</span>
              <span>12+</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Matched Parents */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: '24px'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Your Sleep Twins
          </h2>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {matchedParents.map((parent) => (
            <motion.div
              key={parent.id}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${themeStyles.borderColor}`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: `${themeStyles.primaryColor}15`,
                color: themeStyles.primaryColor,
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>{parent.matchScore}%</span>
                <span>Match</span>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${themeStyles.primaryColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={20} color={themeStyles.primaryColor} />
                </div>
                
                <div>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
                  }}>
                    Parent of {parent.babyAge} baby
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px'
                  }}>
                    {parent.sharedChallenges.map((challenge, index) => (
                      <span key={index} style={{
                        backgroundColor: `${themeStyles.primaryColor}15`,
                        color: themeStyles.primaryColor,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.7rem'
                      }}>
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={{
                backgroundColor: `${themeStyles.successColor}10`,
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <Check size={16} color={themeStyles.successColor} />
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold',
                    color: themeStyles.successColor
                  }}>
                    Found Success With
                  </p>
                </div>
                
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.85rem', 
                  color: themeStyles.textColor 
                }}>
                  {parent.successWith}
                </p>
              </div>
              
              <div style={{
                backgroundColor: `${themeStyles.subtleTextColor}10`,
                borderRadius: '8px',
                padding: '12px'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.85rem', 
                  fontStyle: 'italic',
                  color: themeStyles.textColor 
                }}>
                  "{parent.anonymizedQuote}"
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '12px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: themeStyles.primaryColor,
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Connect Anonymously
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Shared Experiences */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: '24px'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Shared Experiences
          </h2>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {sharedExperiences.map((experience) => (
            <motion.div
              key={experience.id}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${themeStyles.borderColor}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  <span style={{
                    backgroundColor: `${themeStyles.primaryColor}15`,
                    color: themeStyles.primaryColor,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {experience.challenge}
                  </span>
                  
                  <span style={{
                    backgroundColor: `${themeStyles.secondaryColor}15`,
                    color: themeStyles.secondaryColor,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {experience.approach}
                  </span>
                </div>
                
                <span style={{
                  backgroundColor: experience.outcome.includes('Significant') || experience.outcome.includes('Complete')
                    ? `${themeStyles.successColor}15`
                    : `${themeStyles.warningColor}15`,
                  color: experience.outcome.includes('Significant') || experience.outcome.includes('Complete')
                    ? themeStyles.successColor
                    : themeStyles.warningColor,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {experience.outcome}
                </span>
              </div>
              
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '0.9rem', 
                color: themeStyles.textColor 
              }}>
                {experience.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: themeStyles.subtleTextColor,
                  fontSize: '0.8rem'
                }}>
                  <Award size={14} />
                  <span>{experience.helpfulCount} found this helpful</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: themeStyles.primaryColor,
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  This Helped Me
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SleepTwinsScreen;
