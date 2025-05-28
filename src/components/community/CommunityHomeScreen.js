import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { Users, Award, MessageCircle, TrendingUp, Calendar, ChevronRight, Bell } from 'lucide-react';

const CommunityHomeScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  const babyName = state.babyName || 'your baby';
  
  // State for community data
  const [communityStats, setCommunityStats] = useState({
    totalMembers: 12483,
    activeDiscussions: 47,
    successStories: 328,
    newContentToday: 18
  });
  
  const [featuredStories, setFeaturedStories] = useState([
    {
      id: 1,
      title: "From Hourly Wakings to 8-Hour Stretches",
      preview: "After struggling with the 4-month sleep regression, we finally found a routine that worked...",
      author: "Parent of 6-month-old",
      likes: 42,
      tags: ["4-month regression", "night wakings"],
      isStoryOfWeek: true
    },
    {
      id: 2,
      title: "How We Conquered Early Morning Wakings",
      preview: "Our little one was consistently waking at 4:30am. After trying several approaches, we discovered...",
      author: "Parent of 9-month-old",
      likes: 38,
      tags: ["early wakings", "schedule adjustment"],
      isStoryOfWeek: false
    },
    {
      id: 3,
      title: "Nap Transition Success Story",
      preview: "Transitioning from 3 to 2 naps was challenging until we implemented these changes...",
      author: "Parent of 8-month-old",
      likes: 29,
      tags: ["nap transition", "schedule"],
      isStoryOfWeek: false
    }
  ]);
  
  const [recentDiscussions, setRecentDiscussions] = useState([
    {
      id: 1,
      title: "Tips for managing sleep during teething?",
      preview: "My 7-month-old is teething and suddenly waking every hour at night. What's helped your baby?",
      replies: 14,
      lastActive: "2 hours ago",
      category: "Challenges"
    },
    {
      id: 2,
      title: "Success with gentle sleep training methods?",
      preview: "Looking for gentle approaches that worked for your baby. We're struggling with...",
      replies: 23,
      lastActive: "5 hours ago",
      category: "Methods"
    },
    {
      id: 3,
      title: "Travel and sleep schedules",
      preview: "We're planning a trip next month and I'm worried about disrupting our finally-stable sleep routine...",
      replies: 8,
      lastActive: "1 day ago",
      category: "Routines"
    }
  ]);
  
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState([
    {
      id: 1,
      type: "sleepTwins",
      title: "New matches available!",
      description: "We've found 3 new parents with babies similar to yours facing the same sleep challenges."
    },
    {
      id: 2,
      type: "discussion",
      title: "Join the conversation",
      description: "Parents are discussing solutions for short naps in babies aged 4-6 months."
    },
    {
      id: 3,
      type: "story",
      title: "Story you might relate to",
      description: "Read how another parent overcame bedtime resistance with their 5-month-old."
    }
  ]);
  
  // Handle navigation to different community sections
  const navigateTo = (section) => {
    console.log(`Navigating to ${section}`);
    // In a real implementation, this would use the app's navigation system
    // For now, we'll just simulate with alerts
    if (section === "sleepTwins") {
      dispatch({ type: "SET_VIEW", payload: "sleepTwins" });
    } else if (section === "successStories") {
      dispatch({ type: "SET_VIEW", payload: "successStories" });
    } else {
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
  
  return (
    <motion.div 
      className="community-home-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: themeStyles.background,
        color: themeStyles.textColor,
        minHeight: 'calc(100vh - 70px)', // Account for bottom navigation
        padding: '16px',
        paddingBottom: '80px' // Extra padding for bottom nav
      }}
    >
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
          fontFamily: '"Nunito Sans", sans-serif',
          color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
        }}>
          Sleep Haven Community
        </h1>
        <p style={{ 
          margin: 0, 
          color: themeStyles.subtleTextColor,
          fontSize: '0.9rem'
        }}>
          Connect with parents on similar sleep journeys
        </p>
      </motion.div>
      
      {/* Community Stats */}
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
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{
            flex: '1 1 45%',
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px'
          }}>
            <Users size={24} color={themeStyles.primaryColor} style={{ marginBottom: '8px' }} />
            <p style={{ 
              margin: '0 0 4px 0', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              {communityStats.totalMembers.toLocaleString()}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Community Members
            </p>
          </div>
          
          <div style={{
            flex: '1 1 45%',
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px'
          }}>
            <MessageCircle size={24} color={themeStyles.secondaryColor} style={{ marginBottom: '8px' }} />
            <p style={{ 
              margin: '0 0 4px 0', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              {communityStats.activeDiscussions}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Active Discussions
            </p>
          </div>
          
          <div style={{
            flex: '1 1 45%',
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px'
          }}>
            <Award size={24} color={themeStyles.accentColor} style={{ marginBottom: '8px' }} />
            <p style={{ 
              margin: '0 0 4px 0', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              {communityStats.successStories}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Success Stories
            </p>
          </div>
          
          <div style={{
            flex: '1 1 45%',
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px'
          }}>
            <TrendingUp size={24} color={themeStyles.successColor} style={{ marginBottom: '8px' }} />
            <p style={{ 
              margin: '0 0 4px 0', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              {communityStats.newContentToday}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              New Today
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Personalized Recommendations */}
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
            Recommended for You
          </h2>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {personalizedRecommendations.map((recommendation) => (
            <motion.div
              key={recommendation.id}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo(recommendation.type)}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${themeStyles.borderColor}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: recommendation.type === 'sleepTwins' 
                  ? `${themeStyles.primaryColor}20` 
                  : recommendation.type === 'discussion' 
                    ? `${themeStyles.secondaryColor}20` 
                    : `${themeStyles.accentColor}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {recommendation.type === 'sleepTwins' && (
                  <Users size={20} color={themeStyles.primaryColor} />
                )}
                {recommendation.type === 'discussion' && (
                  <MessageCircle size={20} color={themeStyles.secondaryColor} />
                )}
                {recommendation.type === 'story' && (
                  <Award size={20} color={themeStyles.accentColor} />
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '0.95rem', 
                  fontWeight: 'bold',
                  color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
                }}>
                  {recommendation.title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.85rem', 
                  color: themeStyles.subtleTextColor 
                }}>
                  {recommendation.description}
                </p>
              </div>
              
              <ChevronRight size={18} color={themeStyles.subtleTextColor} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Featured Success Stories */}
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
            Featured Success Stories
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('successStories')}
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
            View All
            <ChevronRight size={16} />
          </motion.button>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {featuredStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('successStories')}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${themeStyles.borderColor}`,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {story.isStoryOfWeek && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '-30px',
                  backgroundColor: themeStyles.accentColor,
                  color: 'white',
                  padding: '4px 30px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  STORY OF THE WEEK
                </div>
              )}
              
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '1rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                {story.title}
              </h3>
              
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '0.9rem', 
                color: themeStyles.textColor 
              }}>
                {story.preview}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  {story.tags.map((tag, index) => (
                    <span key={index} style={{
                      backgroundColor: `${themeStyles.primaryColor}15`,
                      color: themeStyles.primaryColor,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: themeStyles.subtleTextColor,
                  fontSize: '0.8rem'
                }}>
                  <Award size={14} />
                  <span>{story.likes}</span>
                </div>
              </div>
              
              <p style={{ 
                margin: '12px 0 0 0', 
                fontSize: '0.8rem', 
                color: themeStyles.subtleTextColor,
                fontStyle: 'italic'
              }}>
                By {story.author}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Recent Discussions */}
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
            Recent Discussions
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('discussions')}
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
            View All
            <ChevronRight size={16} />
          </motion.button>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {recentDiscussions.map((discussion) => (
            <motion.div
              key={discussion.id}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('discussions')}
              style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${themeStyles.borderColor}`,
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1rem', 
                  fontWeight: 'bold',
                  color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
                }}>
                  {discussion.title}
                </h3>
                
                <span style={{
                  backgroundColor: `${themeStyles.secondaryColor}15`,
                  color: themeStyles.secondaryColor,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}>
                  {discussion.category}
                </span>
              </div>
              
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '0.9rem', 
                color: themeStyles.textColor 
              }}>
                {discussion.preview}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: themeStyles.subtleTextColor
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <MessageCircle size={14} />
                  <span>{discussion.replies} replies</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Calendar size={14} />
                  <span>Active {discussion.lastActive}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Community Navigation */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: themeStyles.cardBg,
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: `1px solid ${themeStyles.borderColor}`,
          marginBottom: '24px'
        }}
      >
        <h2 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '1.1rem', 
          fontWeight: 'bold',
          color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
        }}>
          Explore Community
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px'
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('sleepTwins')}
            style={{
              backgroundColor: `${themeStyles.primaryColor}10`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '8px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: `${themeStyles.primaryColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={20} color={themeStyles.primaryColor} />
            </div>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: themeStyles.primaryColor,
              textAlign: 'center'
            }}>
              Sleep Twins
            </span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('successStories')}
            style={{
              backgroundColor: `${themeStyles.accentColor}10`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '8px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: `${themeStyles.accentColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} color={themeStyles.accentColor} />
            </div>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: themeStyles.accentColor,
              textAlign: 'center'
            }}>
              Success Stories
            </span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('discussions')}
            style={{
              backgroundColor: `${themeStyles.secondaryColor}10`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '8px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: `${themeStyles.secondaryColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle size={20} color={themeStyles.secondaryColor} />
            </div>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: themeStyles.secondaryColor,
              textAlign: 'center'
            }}>
              Discussions
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommunityHomeScreen;
