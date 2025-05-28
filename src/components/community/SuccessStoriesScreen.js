import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { Search, Filter, Award, TrendingUp, Calendar, ChevronRight, ArrowLeft, Star, MessageCircle, Bookmark, ThumbsUp, Check } from 'lucide-react';

const SuccessStoriesScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  
  // State for stories and filters
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "From Hourly Wakings to 8-Hour Stretches",
      content: "After struggling with the 4-month sleep regression for weeks, we were desperate. Our baby went from sleeping 5-hour stretches to waking every 45-90 minutes all night long. We were exhausted and at our wit's end.\n\nWhat worked for us was a combination of extending wake windows slightly during the day (from 1.5 hours to 2 hours), ensuring the last nap ended at least 3 hours before bedtime, and implementing a very consistent bedtime routine.\n\nThe first few nights were still rough, but by night 4, we started seeing longer stretches. By the end of week 2, our baby was sleeping a 6-hour stretch, followed by a feeding, and then another 2-3 hours. Now at 6 months, we regularly get 8-hour stretches!\n\nFor parents in the thick of the regression: it WILL pass. Be consistent, watch wake windows, and don't be afraid to adjust your approach if something isn't working after a few days.",
      author: "Parent of 6-month-old",
      babyAge: "6 months",
      beforeMetrics: {
        nightWakings: 8,
        longestStretch: 1.5,
        timeToFallAsleep: 45
      },
      afterMetrics: {
        nightWakings: 1,
        longestStretch: 8,
        timeToFallAsleep: 10
      },
      challenges: ["4-month regression", "night wakings", "short sleep cycles"],
      approaches: ["wake window adjustment", "consistent routine", "environment optimization"],
      timeline: [
        { day: 1, description: "Started new routine, still had hourly wakings" },
        { day: 4, description: "First 3-hour stretch of sleep" },
        { day: 10, description: "Consistent 5-hour first stretch" },
        { day: 14, description: "Reached 6-hour stretch plus 2-3 more hours" },
        { day: 30, description: "Now regularly sleeping 8-hour stretches" }
      ],
      likes: 42,
      bookmarks: 18,
      helpfulCount: 37,
      submissionDate: "2025-04-28",
      isStoryOfWeek: true
    },
    {
      id: 2,
      title: "How We Conquered Early Morning Wakings",
      content: "Our little one was consistently waking at 4:30am every morning, wide awake and ready to start the day. We tried earlier bedtimes, later bedtimes, and nothing seemed to help.\n\nAfter researching and consulting with other parents, we realized we needed to address both the sleep environment and the circadian rhythm. Here's what finally worked:\n\n1. Installed blackout curtains that truly made the room pitch black\n2. Added a white noise machine that runs all night\n3. Kept the room slightly cooler (around 68°F/20°C)\n4. Most importantly: we stopped starting the day at the early wake-up. Instead, we'd do a quick check, minimal interaction, and leave the room dark until at least 6am.\n\nThe first week was challenging as our baby protested the change, but we stayed consistent. By week 2, wake-up time shifted to 5:15am, then 5:45am, and finally settled around 6:30am by week 3.\n\nThe key was consistency and patience. Some mornings were harder than others, but we didn't give in to starting the day early, which would have reinforced the early waking pattern.",
      author: "Parent of 9-month-old",
      babyAge: "9 months",
      beforeMetrics: {
        wakeTime: "4:30 AM",
        nightWakings: 2,
        moodAtWake: "Fussy"
      },
      afterMetrics: {
        wakeTime: "6:30 AM",
        nightWakings: 1,
        moodAtWake: "Happy"
      },
      challenges: ["early wakings", "sleep environment"],
      approaches: ["environment optimization", "schedule adjustment", "response modification"],
      timeline: [
        { day: 1, description: "Implemented changes, baby still woke at 4:30am" },
        { day: 7, description: "Wake time shifted to 5:15am" },
        { day: 14, description: "Wake time consistently around 5:45am" },
        { day: 21, description: "Reached target wake time of 6:30am" }
      ],
      likes: 38,
      bookmarks: 22,
      helpfulCount: 31,
      submissionDate: "2025-05-02",
      isStoryOfWeek: false
    },
    {
      id: 3,
      title: "Nap Transition Success Story",
      content: "Transitioning from 3 to 2 naps was one of the most challenging phases for us. Our 7-month-old was fighting the third nap but wasn't quite ready for just two naps. Every day felt like a struggle.\n\nWe tried to push through with 3 naps, but bedtime kept getting pushed later and later. When we tried 2 naps, our baby was overtired by bedtime and took forever to fall asleep, then woke frequently at night.\n\nWhat finally worked was a gradual transition approach:\n\n1. We started with a slightly earlier first nap (2.5 hours after wake-up instead of 3)\n2. Made the first nap slightly longer (1.5 hours if possible)\n3. Scheduled the second nap about 3 hours after the end of the first nap\n4. Used an earlier bedtime (6:30pm instead of 7:30pm) during the transition\n\nThe key insight was that we needed to be flexible during the transition period. Some days still needed a very short third nap (just 15-20 minutes) to make it to bedtime, while other days worked with just two naps.\n\nAfter about 10 days, our baby adjusted to the new rhythm. Now we have two solid naps (usually 1.5 hours each) and a consistent 7pm bedtime. Sleep has improved dramatically both day and night!",
      author: "Parent of 8-month-old",
      babyAge: "8 months",
      beforeMetrics: {
        napsPerDay: 3,
        avgNapLength: 40,
        nightSleep: 10
      },
      afterMetrics: {
        napsPerDay: 2,
        avgNapLength: 90,
        nightSleep: 11.5
      },
      challenges: ["nap transition", "overtiredness", "schedule adjustment"],
      approaches: ["gradual transition", "wake window adjustment", "earlier bedtime"],
      timeline: [
        { day: 1, description: "Started transition attempt, very overtired by evening" },
        { day: 3, description: "Implemented flexible approach with occasional cat nap" },
        { day: 7, description: "Some days successful with just 2 naps" },
        { day: 10, description: "Consistently on 2-nap schedule with good night sleep" }
      ],
      likes: 29,
      bookmarks: 15,
      helpfulCount: 26,
      submissionDate: "2025-05-10",
      isStoryOfWeek: false
    },
    {
      id: 4,
      title: "Gentle Sleep Training That Actually Worked",
      content: "We were hesitant about sleep training because we didn't want our baby to cry it out. But after 10 months of multiple night wakings and having to rock our baby completely to sleep for every nap and bedtime, we were exhausted.\n\nWe researched gentle methods and created our own approach that felt right for our family:\n\n1. We established a clear, consistent bedtime routine that ended with our baby drowsy but awake\n2. When she protested, we stayed in the room, sitting next to the crib offering reassurance\n3. We would touch and pat, but not pick up unless she became truly distressed\n4. Each night, we gradually moved our chair further from the crib\n5. For night wakings, we waited a few minutes before responding, then used minimal intervention\n\nThe first night took about 45 minutes of gentle reassurance before she fell asleep. The second night was 30 minutes, and by the fifth night, she was falling asleep within 10 minutes with minimal fussing.\n\nNight wakings improved more gradually. We first focused on extending the initial sleep stretch, then worked on the middle-of-night wakings. After about two weeks, she was sleeping through the night with occasional wakings during developmental leaps or teething.\n\nThe key for us was consistency and finding an approach that respected our baby's needs while also teaching her the skill of falling asleep independently.",
      author: "Parent of 10-month-old",
      babyAge: "10 months",
      beforeMetrics: {
        timeToFallAsleep: 40,
        nightWakings: 4,
        parentInterventions: "Full rocking to sleep"
      },
      afterMetrics: {
        timeToFallAsleep: 10,
        nightWakings: 0,
        parentInterventions: "None needed"
      },
      challenges: ["sleep associations", "night wakings", "bedtime battles"],
      approaches: ["chair method", "gradual withdrawal", "consistent routine"],
      timeline: [
        { day: 1, description: "45 minutes to fall asleep with in-room support" },
        { day: 5, description: "Falling asleep within 10 minutes, minimal fussing" },
        { day: 10, description: "First 6-hour stretch of sleep" },
        { day: 14, description: "Sleeping through the night consistently" }
      ],
      likes: 56,
      bookmarks: 34,
      helpfulCount: 48,
      submissionDate: "2025-04-15",
      isStoryOfWeek: false
    }
  ]);
  
  const [filteredStories, setFilteredStories] = useState([]);
  const [filters, setFilters] = useState({
    babyAge: '',
    challenges: [],
    approaches: [],
    searchTerm: '',
    sortBy: 'newest'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  
  // Available filter options
  const challengeOptions = [
    "4-month regression",
    "night wakings",
    "early wakings",
    "short naps",
    "nap transition",
    "sleep associations",
    "bedtime battles",
    "overtiredness"
  ];
  
  const approachOptions = [
    "consistent routine",
    "wake window adjustment",
    "environment optimization",
    "schedule adjustment",
    "gradual transition",
    "chair method",
    "response modification"
  ];
  
  const babyAgeOptions = [
    "0-3 months",
    "4-6 months",
    "7-9 months",
    "10-12 months",
    "13-18 months",
    "19+ months"
  ];
  
  // Apply filters to stories
  useEffect(() => {
    let result = [...stories];
    
    // Filter by baby age
    if (filters.babyAge) {
      result = result.filter(story => {
        // Convert story.babyAge (e.g., "6 months") to a number
        const ageInMonths = parseInt(story.babyAge);
        
        // Parse the filter range (e.g., "4-6 months")
        const [minAge, maxAge] = filters.babyAge.split('-').map(a => parseInt(a.replace(/\D/g, '')));
        
        // Handle "19+ months" case
        if (filters.babyAge.includes('+')) {
          return ageInMonths >= 19;
        }
        
        return ageInMonths >= minAge && ageInMonths <= maxAge;
      });
    }
    
    // Filter by challenges
    if (filters.challenges.length > 0) {
      result = result.filter(story => 
        filters.challenges.some(challenge => 
          story.challenges.includes(challenge)
        )
      );
    }
    
    // Filter by approaches
    if (filters.approaches.length > 0) {
      result = result.filter(story => 
        filters.approaches.some(approach => 
          story.approaches.includes(approach)
        )
      );
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(story => 
        story.title.toLowerCase().includes(term) ||
        story.content.toLowerCase().includes(term) ||
        story.author.toLowerCase().includes(term)
      );
    }
    
    // Sort stories
    if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    } else if (filters.sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate));
    } else if (filters.sortBy === 'mostHelpful') {
      result.sort((a, b) => b.helpfulCount - a.helpfulCount);
    } else if (filters.sortBy === 'mostLiked') {
      result.sort((a, b) => b.likes - a.likes);
    }
    
    setFilteredStories(result);
  }, [stories, filters]);
  
  // Handle navigation
  const navigateTo = (section) => {
    if (section === 'community') {
      dispatch({ type: "SET_VIEW", payload: "communityHome" });
    } else {
      console.log(`Navigating to ${section}`);
      alert(`Navigating to ${section}`);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (type, value) => {
    if (type === 'babyAge') {
      setFilters(prev => ({ ...prev, babyAge: value }));
    } else if (type === 'searchTerm') {
      setFilters(prev => ({ ...prev, searchTerm: value }));
    } else if (type === 'sortBy') {
      setFilters(prev => ({ ...prev, sortBy: value }));
    } else if (type === 'challenge') {
      setFilters(prev => {
        const challenges = prev.challenges.includes(value)
          ? prev.challenges.filter(c => c !== value)
          : [...prev.challenges, value];
        return { ...prev, challenges };
      });
    } else if (type === 'approach') {
      setFilters(prev => {
        const approaches = prev.approaches.includes(value)
          ? prev.approaches.filter(a => a !== value)
          : [...prev.approaches, value];
        return { ...prev, approaches };
      });
    }
  };
  
  // Handle story selection
  const handleStorySelect = (story) => {
    setSelectedStory(story);
    window.scrollTo(0, 0);
  };
  
  // Handle story interaction
  const handleStoryInteraction = (type, storyId) => {
    setStories(prev => 
      prev.map(story => {
        if (story.id === storyId) {
          if (type === 'like') {
            return { ...story, likes: story.likes + 1 };
          } else if (type === 'bookmark') {
            return { ...story, bookmarks: story.bookmarks + 1 };
          } else if (type === 'helpful') {
            return { ...story, helpfulCount: story.helpfulCount + 1 };
          }
        }
        return story;
      })
    );
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
  
  // Render detailed story view
  if (selectedStory) {
    return (
      <motion.div 
        className="success-story-detail"
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
            onClick={() => setSelectedStory(null)}
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
              Success Story
            </h1>
            <p style={{ 
              margin: 0, 
              color: themeStyles.subtleTextColor,
              fontSize: '0.9rem'
            }}>
              By {selectedStory.author}
            </p>
          </div>
        </motion.div>
        
        {/* Story title and meta */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: themeStyles.cardBg,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: `1px solid ${themeStyles.borderColor}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {selectedStory.isStoryOfWeek && (
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
          
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.3rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            {selectedStory.title}
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {selectedStory.challenges.map((challenge, index) => (
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
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            fontSize: '0.85rem',
            color: themeStyles.subtleTextColor
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Calendar size={14} />
              <span>Baby age: {selectedStory.babyAge}</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Award size={14} />
              <span>{selectedStory.helpfulCount} found helpful</span>
            </div>
          </div>
        </motion.div>
        
        {/* Before/After Metrics */}
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
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Before & After Results
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px'
          }}>
            {Object.keys(selectedStory.beforeMetrics).map((key) => (
              <div key={key} style={{
                backgroundColor: `${themeStyles.primaryColor}10`,
                borderRadius: '8px',
                padding: '12px'
              }}>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '0.8rem', 
                  color: themeStyles.subtleTextColor,
                  textTransform: 'capitalize'
                }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    backgroundColor: `${themeStyles.warningColor}20`,
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: themeStyles.warningColor
                  }}>
                    {selectedStory.beforeMetrics[key]}
                  </div>
                  
                  <div style={{
                    fontSize: '1.2rem',
                    color: themeStyles.subtleTextColor
                  }}>
                    →
                  </div>
                  
                  <div style={{
                    backgroundColor: `${themeStyles.successColor}20`,
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: themeStyles.successColor
                  }}>
                    {selectedStory.afterMetrics[key]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Story content */}
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
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Our Journey
          </h3>
          
          {selectedStory.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ 
              margin: '0 0 16px 0', 
              fontSize: '0.95rem', 
              lineHeight: '1.6',
              color: themeStyles.textColor 
            }}>
              {paragraph}
            </p>
          ))}
        </motion.div>
        
        {/* Journey Timeline */}
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
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
          }}>
            Journey Timeline
          </h3>
          
          <div style={{
            position: 'relative',
            paddingLeft: '24px',
            marginLeft: '12px',
            borderLeft: `2px dashed ${themeStyles.borderColor}`
          }}>
            {selectedStory.timeline.map((event, index) => (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  marginBottom: index === selectedStory.timeline.length - 1 ? 0 : '24px',
                  paddingLeft: '16px'
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '-37px',
                  top: '0',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: index === selectedStory.timeline.length - 1 
                    ? themeStyles.successColor 
                    : themeStyles.primaryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  border: `2px solid ${themeStyles.background}`
                }}>
                  {index === selectedStory.timeline.length - 1 ? <Check size={12} /> : index + 1}
                </div>
                
                <div style={{
                  backgroundColor: index === selectedStory.timeline.length - 1 
                    ? `${themeStyles.successColor}15`
                    : `${themeStyles.primaryColor}15`,
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    color: index === selectedStory.timeline.length - 1 
                      ? themeStyles.successColor
                      : themeStyles.primaryColor
                  }}>
                    Day {event.day}
                  </p>
                  
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.85rem', 
                    color: themeStyles.textColor 
                  }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Interaction buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: themeStyles.cardBg,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: `1px solid ${themeStyles.borderColor}`,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStoryInteraction('helpful', selectedStory.id)}
            style={{
              backgroundColor: `${themeStyles.successColor}15`,
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: themeStyles.successColor,
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <ThumbsUp size={18} />
            This Helped Me
          </motion.button>
          
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStoryInteraction('bookmark', selectedStory.id)}
              style={{
                backgroundColor: `${themeStyles.secondaryColor}15`,
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: themeStyles.secondaryColor,
                cursor: 'pointer'
              }}
            >
              <Bookmark size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStoryInteraction('like', selectedStory.id)}
              style={{
                backgroundColor: `${themeStyles.accentColor}15`,
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: themeStyles.accentColor,
                cursor: 'pointer'
              }}
            >
              <Star size={18} />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Similar stories */}
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
            <h3 style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              Similar Stories
            </h3>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {stories
              .filter(story => 
                story.id !== selectedStory.id && 
                story.challenges.some(c => selectedStory.challenges.includes(c))
              )
              .slice(0, 2)
              .map(story => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStorySelect(story)}
                  style={{
                    backgroundColor: themeStyles.cardBg,
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: `1px solid ${themeStyles.borderColor}`,
                    cursor: 'pointer'
                  }}
                >
                  <h4 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '1rem', 
                    fontWeight: 'bold',
                    color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
                  }}>
                    {story.title}
                  </h4>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    marginBottom: '8px'
                  }}>
                    {story.challenges.slice(0, 2).map((challenge, index) => (
                      <span key={index} style={{
                        backgroundColor: `${themeStyles.primaryColor}15`,
                        color: themeStyles.primaryColor,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}>
                        {challenge}
                      </span>
                    ))}
                    {story.challenges.length > 2 && (
                      <span style={{
                        backgroundColor: `${themeStyles.subtleTextColor}15`,
                        color: themeStyles.subtleTextColor,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}>
                        +{story.challenges.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: themeStyles.subtleTextColor
                  }}>
                    <span>{story.author}</span>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ThumbsUp size={14} />
                      <span>{story.helpfulCount} helpful</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }
  
  // Render stories list view
  return (
    <motion.div 
      className="success-stories-screen"
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
            Success Stories
          </h1>
          <p style={{ 
            margin: 0, 
            color: themeStyles.subtleTextColor,
            fontSize: '0.9rem'
          }}>
            Real journeys from parents like you
          </p>
        </div>
      </motion.div>
      
      {/* Search and filter bar */}
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
          gap: '8px',
          marginBottom: showFilters ? '16px' : '0'
        }}>
          <div style={{
            position: 'relative',
            flex: 1
          }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: themeStyles.subtleTextColor
            }} />
            
            <input
              type="text"
              placeholder="Search stories..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: `1px solid ${themeStyles.borderColor}`,
                backgroundColor: currentTheme === 'dark' ? '#3A3F4B' : '#F1F3F5',
                color: themeStyles.textColor,
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: showFilters 
                ? `${themeStyles.primaryColor}` 
                : `${themeStyles.primaryColor}15`,
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: showFilters 
                ? 'white' 
                : themeStyles.primaryColor,
              cursor: 'pointer'
            }}
          >
            <Filter size={18} />
          </motion.button>
        </div>
        
        {showFilters && (
          <div style={{
            marginTop: '16px',
            borderTop: `1px solid ${themeStyles.borderColor}`,
            paddingTop: '16px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Baby Age
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {babyAgeOptions.map((age) => (
                  <motion.button
                    key={age}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('babyAge', filters.babyAge === age ? '' : age)}
                    style={{
                      backgroundColor: filters.babyAge === age 
                        ? themeStyles.primaryColor 
                        : `${themeStyles.primaryColor}15`,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: filters.babyAge === age 
                        ? 'white' 
                        : themeStyles.primaryColor,
                      cursor: 'pointer'
                    }}
                  >
                    {age}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Sleep Challenges
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {challengeOptions.map((challenge) => (
                  <motion.button
                    key={challenge}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('challenge', challenge)}
                    style={{
                      backgroundColor: filters.challenges.includes(challenge) 
                        ? themeStyles.secondaryColor 
                        : `${themeStyles.secondaryColor}15`,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: filters.challenges.includes(challenge) 
                        ? 'white' 
                        : themeStyles.secondaryColor,
                      cursor: 'pointer'
                    }}
                  >
                    {challenge}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Approaches Used
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {approachOptions.map((approach) => (
                  <motion.button
                    key={approach}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('approach', approach)}
                    style={{
                      backgroundColor: filters.approaches.includes(approach) 
                        ? themeStyles.accentColor 
                        : `${themeStyles.accentColor}15`,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: filters.approaches.includes(approach) 
                        ? 'white' 
                        : themeStyles.accentColor,
                      cursor: 'pointer'
                    }}
                  >
                    {approach}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
              }}>
                Sort By
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {[
                  { id: 'newest', label: 'Newest' },
                  { id: 'mostHelpful', label: 'Most Helpful' },
                  { id: 'mostLiked', label: 'Most Liked' }
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('sortBy', option.id)}
                    style={{
                      backgroundColor: filters.sortBy === option.id 
                        ? themeStyles.primaryColor 
                        : `${themeStyles.primaryColor}15`,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: filters.sortBy === option.id 
                        ? 'white' 
                        : themeStyles.primaryColor,
                      cursor: 'pointer'
                    }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Active filters */}
      {(filters.babyAge || filters.challenges.length > 0 || filters.approaches.length > 0 || filters.searchTerm) && (
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: '16px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '0.85rem',
              color: themeStyles.subtleTextColor
            }}>
              Active filters:
            </span>
            
            {filters.babyAge && (
              <span style={{
                backgroundColor: `${themeStyles.primaryColor}15`,
                color: themeStyles.primaryColor,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {filters.babyAge}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFilterChange('babyAge', '')}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                >
                  ×
                </motion.button>
              </span>
            )}
            
            {filters.challenges.map((challenge) => (
              <span key={challenge} style={{
                backgroundColor: `${themeStyles.secondaryColor}15`,
                color: themeStyles.secondaryColor,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {challenge}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFilterChange('challenge', challenge)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                >
                  ×
                </motion.button>
              </span>
            ))}
            
            {filters.approaches.map((approach) => (
              <span key={approach} style={{
                backgroundColor: `${themeStyles.accentColor}15`,
                color: themeStyles.accentColor,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {approach}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFilterChange('approach', approach)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                >
                  ×
                </motion.button>
              </span>
            ))}
            
            {filters.searchTerm && (
              <span style={{
                backgroundColor: `${themeStyles.subtleTextColor}15`,
                color: themeStyles.subtleTextColor,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                "{filters.searchTerm}"
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFilterChange('searchTerm', '')}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                >
                  ×
                </motion.button>
              </span>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters({
                babyAge: '',
                challenges: [],
                approaches: [],
                searchTerm: '',
                sortBy: 'newest'
              })}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '4px 8px',
                fontSize: '0.8rem',
                color: themeStyles.primaryColor,
                cursor: 'pointer'
              }}
            >
              Clear all
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* Stories list */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: '24px'
        }}
      >
        {filteredStories.length === 0 ? (
          <div style={{
            backgroundColor: themeStyles.cardBg,
            borderRadius: '12px',
            padding: '24px 16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: `1px solid ${themeStyles.borderColor}`
          }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
            }}>
              No stories match your filters
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.9rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStorySelect(story)}
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
                  margin: '0 0 12px 0', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold',
                  color: currentTheme === 'dark' ? '#F8F9FA' : '#212529',
                }}>
                  {story.title}
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  {story.challenges.slice(0, 3).map((challenge, index) => (
                    <span key={index} style={{
                      backgroundColor: `${themeStyles.primaryColor}15`,
                      color: themeStyles.primaryColor,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {challenge}
                    </span>
                  ))}
                  {story.challenges.length > 3 && (
                    <span style={{
                      backgroundColor: `${themeStyles.subtleTextColor}15`,
                      color: themeStyles.subtleTextColor,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      +{story.challenges.length - 3} more
                    </span>
                  )}
                </div>
                
                <p style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '0.9rem', 
                  color: themeStyles.textColor,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {story.content.split('\n\n')[0]}
                </p>
                
                {/* Before/After Metrics Preview */}
                <div style={{
                  backgroundColor: `${themeStyles.primaryColor}10`,
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <p style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold',
                    color: themeStyles.primaryColor
                  }}>
                    Results Achieved
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    {Object.keys(story.beforeMetrics).slice(0, 2).map((key) => (
                      <div key={key} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '0.8rem',
                          color: themeStyles.subtleTextColor,
                          textTransform: 'capitalize'
                        }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        
                        <span style={{
                          backgroundColor: `${themeStyles.warningColor}20`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          color: themeStyles.warningColor
                        }}>
                          {story.beforeMetrics[key]}
                        </span>
                        
                        <span style={{
                          fontSize: '0.8rem',
                          color: themeStyles.subtleTextColor
                        }}>
                          →
                        </span>
                        
                        <span style={{
                          backgroundColor: `${themeStyles.successColor}20`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          color: themeStyles.successColor
                        }}>
                          {story.afterMetrics[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.8rem',
                    color: themeStyles.subtleTextColor
                  }}>
                    <span>{story.author}</span>
                    <span>•</span>
                    <span>Baby: {story.babyAge}</span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: themeStyles.subtleTextColor
                    }}>
                      <ThumbsUp size={14} />
                      <span>{story.helpfulCount}</span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: themeStyles.subtleTextColor
                    }}>
                      <Star size={14} />
                      <span>{story.likes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Share your story button */}
      <motion.div
        variants={itemVariants}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '16px',
          zIndex: 100
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: themeStyles.primaryColor,
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
        >
          <MessageCircle size={24} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStoriesScreen;
