import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { Mic, Send, X, MessageSquare, ChevronDown, ChevronUp, Bookmark, Search, MoreHorizontal, Info } from 'lucide-react';
import MargaretAvatar from '../onboarding/MargaretAvatar';

const AskMargaretScreen = () => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  const babyName = state.babyName || 'your baby';
  
  // State for conversation
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'margaret',
      text: `Hi there! I'm Margaret, your sleep consultant. How can I help with ${babyName}'s sleep today?`,
      timestamp: new Date(),
      isBookmarked: false,
      category: 'greeting',
      isContextual: false
    }
  ]);
  
  // State for input and UI
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMargaretTyping, setIsMargaretTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Suggested follow-up questions based on last message
  const suggestedQuestions = [
    `How can I help ${babyName} sleep through the night?`,
    `What's a good bedtime routine for ${babyName}?`,
    `How do I know if ${babyName} is overtired?`,
    `What should I do when ${babyName} wakes up crying?`
  ];
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputText.trim() && !isRecording) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: isRecording ? '[Voice message transcription would appear here]' : inputText.trim(),
      timestamp: new Date(),
      isBookmarked: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsRecording(false);
    
    // Simulate Margaret typing
    setIsMargaretTyping(true);
    
    // Simulate Margaret's response after a delay
    setTimeout(() => {
      const margaretResponse = {
        id: messages.length + 2,
        sender: 'margaret',
        text: generateMargaretResponse(userMessage.text),
        timestamp: new Date(),
        isBookmarked: false,
        category: getRandomCategory(),
        isContextual: Math.random() > 0.5, // 50% chance of being contextual
        hasMedia: Math.random() > 0.7 // 30% chance of having media
      };
      
      setMessages(prev => [...prev, margaretResponse]);
      setIsMargaretTyping(false);
    }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
  };
  
  // Generate a response from Margaret (placeholder)
  const generateMargaretResponse = (userText) => {
    const responses = [
      `Based on what you've shared about ${babyName}'s sleep patterns, I'd recommend establishing a consistent bedtime routine. This helps signal to your baby that it's time to sleep.`,
      `It sounds like ${babyName} might be experiencing a sleep regression, which is completely normal at this age. Let's talk about some strategies that might help.`,
      `Overtiredness can definitely make it harder for ${babyName} to settle down. Try moving bedtime earlier by 15-30 minutes to see if that helps.`,
      `Many parents find that white noise machines and blackout curtains can significantly improve their baby's sleep environment. Would you like to hear more about optimizing the sleep space?`,
      `Sleep associations are powerful. If ${babyName} is used to falling asleep one way (like being rocked), they'll expect the same conditions when they wake between sleep cycles.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Get random message category for demo purposes
  const getRandomCategory = () => {
    const categories = ['routine', 'emergency', 'development', 'environment', 'feeding'];
    return categories[Math.floor(Math.random() * categories.length)];
  };
  
  // Handle recording toggle
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Would start actual recording here
      // For now, just simulate a recording
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage();
      }, 3000);
    }
  };
  
  // Handle using a suggested question
  const handleSuggestedQuestion = (question) => {
    setInputText(question);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Toggle bookmark for a message
  const toggleBookmark = (id) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? {...msg, isBookmarked: !msg.isBookmarked} : msg
      )
    );
  };
  
  // Filter messages based on search
  const filteredMessages = isSearchOpen && searchQuery 
    ? messages.filter(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;
  
  // Styles based on theme
  const themeStyles = {
    background: currentTheme === 'dark' ? '#1A1D22' : '#F8F9FA',
    cardBg: currentTheme === 'dark' ? '#2C313A' : '#FFFFFF',
    primaryColor: currentTheme === 'dark' ? '#5C6BC0' : '#79A6DC',
    secondaryColor: currentTheme === 'dark' ? '#8E7CC3' : '#63C5B9',
    textColor: currentTheme === 'dark' ? '#CED4DA' : '#495057',
    subtleTextColor: currentTheme === 'dark' ? '#6C757D' : '#ADB5BD',
    borderColor: currentTheme === 'dark' ? '#4A407D' : '#E9ECEF',
    categoryColors: {
      routine: { bg: '#4CAF5030', text: '#4CAF50' },
      emergency: { bg: '#F4433630', text: '#F44336' },
      development: { bg: '#FF980030', text: '#FF9800' },
      environment: { bg: '#03A9F430', text: '#03A9F4' },
      feeding: { bg: '#9C27B030', text: '#9C27B0' },
      greeting: { bg: '#79A6DC30', text: '#79A6DC' }
    }
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
  
  // Get category label
  const getCategoryLabel = (category) => {
    const labels = {
      routine: 'Routine',
      emergency: 'Urgent',
      development: 'Development',
      environment: 'Environment',
      feeding: 'Feeding',
      greeting: 'Greeting'
    };
    return labels[category] || category;
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'routine':
        return '🔄';
      case 'emergency':
        return '🚨';
      case 'development':
        return '📈';
      case 'environment':
        return '🏠';
      case 'feeding':
        return '🍼';
      case 'greeting':
        return '👋';
      default:
        return '💬';
    }
  };
  
  return (
    <motion.div 
      className="ask-margaret-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 70px)', // Account for bottom navigation
        backgroundColor: themeStyles.background,
        color: themeStyles.textColor,
        padding: '0',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: `1px solid ${themeStyles.borderColor}`,
        backgroundColor: themeStyles.cardBg,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: `${themeStyles.primaryColor}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
          }}>
            <MessageSquare size={20} color={themeStyles.primaryColor} />
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.2rem', 
              fontWeight: 600,
              fontFamily: '"Nunito Sans", sans-serif'
            }}>
              Ask Margaret
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor 
            }}>
              Your AI sleep consultant
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            style={{
              backgroundColor: isSearchOpen ? `${themeStyles.primaryColor}30` : 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Search size={18} color={themeStyles.textColor} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSuggestions(!showSuggestions)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {showSuggestions ? 
              <ChevronUp size={18} color={themeStyles.textColor} /> : 
              <ChevronDown size={18} color={themeStyles.textColor} />
            }
          </motion.button>
        </div>
      </div>
      
      {/* Enhanced Search bar with better visibility and functionality */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              padding: '16px',
              borderBottom: `1px solid ${themeStyles.borderColor}`,
              backgroundColor: themeStyles.cardBg,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Search size={18} color={themeStyles.primaryColor} />
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.9rem', 
                  color: themeStyles.textColor,
                  fontWeight: 600
                }}>
                  SEARCH CONVERSATION HISTORY
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(false)}
                style={{
                  backgroundColor: `${themeStyles.primaryColor}15`,
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} color={themeStyles.primaryColor} />
              </motion.button>
            </div>
            
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor
            }}>
              Find previous advice and conversations with Margaret
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: `${themeStyles.primaryColor}15`,
              borderRadius: '12px',
              padding: '12px 16px',
              border: `1px solid ${themeStyles.primaryColor}30`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <Search size={18} color={themeStyles.primaryColor} style={{ marginRight: 12 }} />
              <input
                type="text"
                placeholder="Search for keywords, topics, or advice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: themeStyles.textColor,
                  width: '100%',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '4px 0'
                }}
                autoFocus
              />
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery('')}
                  style={{
                    backgroundColor: `${themeStyles.primaryColor}20`,
                    border: 'none',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={14} color={themeStyles.primaryColor} />
                </motion.button>
              )}
            </div>
            
            {searchQuery && (
              <div style={{
                marginTop: '12px',
                padding: '8px 12px',
                backgroundColor: filteredMessages.length > 0 ? `${themeStyles.secondaryColor}15` : `${themeStyles.categoryColors.emergency.bg}20`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.85rem', 
                  color: filteredMessages.length > 0 ? themeStyles.secondaryColor : themeStyles.categoryColors.emergency.text,
                  fontWeight: 500
                }}>
                  {filteredMessages.length} {filteredMessages.length === 1 ? 'result' : 'results'} found
                </p>
                {filteredMessages.length > 0 && (
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.75rem', 
                    color: themeStyles.subtleTextColor
                  }}>
                    Matching messages are highlighted
                  </p>
                )}
              </div>
            )}
            
            {searchQuery && filteredMessages.length === 0 && (
              <div style={{
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: `${themeStyles.primaryColor}10`,
                borderRadius: '8px'
              }}>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '0.9rem', 
                  color: themeStyles.textColor,
                  textAlign: 'center'
                }}>
                  No messages found containing "{searchQuery}"
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.8rem', 
                  color: themeStyles.subtleTextColor,
                  textAlign: 'center'
                }}>
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Suggested questions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              padding: '12px 16px',
              borderBottom: `1px solid ${themeStyles.borderColor}`,
              backgroundColor: themeStyles.cardBg,
              overflow: 'hidden'
            }}
          >
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '0.8rem', 
              color: themeStyles.subtleTextColor,
              fontWeight: 600
            }}>
              SUGGESTED QUESTIONS
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, backgroundColor: `${themeStyles.primaryColor}30` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestedQuestion(question)}
                  style={{
                    backgroundColor: `${themeStyles.primaryColor}15`,
                    border: `1px solid ${themeStyles.primaryColor}30`,
                    borderRadius: '16px',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    color: themeStyles.textColor,
                    cursor: 'pointer',
                    textAlign: 'left',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Messages container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {filteredMessages.map((message) => (
          <motion.div
            key={message.id}
            variants={itemVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: window.innerWidth < 480 ? '85%' : '80%',
              width: message.sender === 'margaret' && window.innerWidth < 480 ? 'calc(100% - 60px)' : 'auto'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              // Adjust layout for mobile
              '@media (max-width: 480px)': {
                gap: '6px'
              }
            }}>
              {message.sender === 'margaret' && (
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `1px solid ${themeStyles.secondaryColor}`,
                  boxShadow: `0 0 6px ${themeStyles.secondaryColor}30`,
                  marginRight: '4px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  position: 'relative'
                }}>
                  <img 
                    src="/assets/margaret_avatar.png"
                    alt="Margaret"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top'
                    }}
                  />
                </div>
              )}
              
              <div style={{
                backgroundColor: message.sender === 'user' 
                  ? `${themeStyles.primaryColor}30` 
                  : themeStyles.cardBg,
                borderRadius: '16px',
                padding: '12px 16px',
                border: message.sender === 'margaret' 
                  ? `1px solid ${themeStyles.borderColor}` 
                  : 'none',
                position: 'relative',
                marginTop: message.sender === 'margaret' ? '12px' : '0'
              }}>
                {/* Category indicator for Margaret's messages - Integrated with message bubble */}
                {message.sender === 'margaret' && message.category && (
                  <div style={{
                    position: 'relative',
                    top: '-4px',
                    left: '0',
                    display: 'inline-block',
                    backgroundColor: themeStyles.categoryColors[message.category]?.bg || `${themeStyles.primaryColor}15`,
                    color: themeStyles.categoryColors[message.category]?.text || themeStyles.primaryColor,
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                    border: `1px solid ${themeStyles.categoryColors[message.category]?.text}20` || `${themeStyles.primaryColor}20`,
                    alignItems: 'center',
                    gap: '4px',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    <span style={{ marginRight: '4px' }}>{getCategoryIcon(message.category)}</span>
                    <span>{getCategoryLabel(message.category)}</span>
                  </div>
                )}
                
                {/* Context awareness indicator */}
                {message.sender === 'margaret' && message.isContextual && (
                  <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    backgroundColor: `${themeStyles.secondaryColor}15`,
                    color: themeStyles.secondaryColor,
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                    marginLeft: '8px',
                    border: `1px solid ${themeStyles.secondaryColor}20`,
                    alignItems: 'center',
                    maxWidth: '140px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    <Info size={10} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>For {babyName}</span>
                  </div>
                )}
                
                <p style={{ 
                  margin: 0, 
                  fontSize: window.innerWidth < 480 ? '0.9rem' : '0.95rem',
                  lineHeight: '1.5',
                  color: themeStyles.textColor
                }}>
                  {message.text}
                </p>
                
                {/* Enhanced Rich media support */}
                {message.sender === 'margaret' && message.hasMedia && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      marginTop: '16px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: `1px solid ${themeStyles.borderColor}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      backgroundColor: themeStyles.cardBg
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '56.25%', // 16:9 aspect ratio
                      backgroundColor: `${themeStyles.primaryColor}10`,
                      overflow: 'hidden'
                    }}>
                      <img 
                        src="/assets/sleep_cycle_diagram.png" 
                        alt="Sleep cycle diagram" 
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: `${themeStyles.cardBg}CC`,
                        borderRadius: '12px',
                        padding: '4px 8px',
                        fontSize: '0.7rem',
                        color: themeStyles.primaryColor,
                        fontWeight: 'bold',
                        backdropFilter: 'blur(4px)',
                        border: `1px solid ${themeStyles.primaryColor}30`
                      }}>
                        DIAGRAM
                      </div>
                    </div>
                    <div style={{
                      padding: '12px 16px',
                      borderTop: `1px solid ${themeStyles.borderColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: themeStyles.textColor
                      }}>
                        Typical Baby Sleep Cycle
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '0.8rem',
                        color: themeStyles.subtleTextColor,
                        lineHeight: 1.4
                      }}>
                        This diagram shows how babies cycle through light and deep sleep phases. Understanding these cycles can help with timing sleep transitions.
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '8px'
                      }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            backgroundColor: `${themeStyles.primaryColor}20`,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            color: themeStyles.primaryColor,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>View Full Size</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '6px'
                }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: themeStyles.subtleTextColor 
                  }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {message.sender === 'margaret' && (
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleBookmark(message.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                      }}
                    >
                      <Bookmark 
                        size={16} 
                        fill={message.isBookmarked ? themeStyles.secondaryColor : 'none'} 
                        color={message.isBookmarked ? themeStyles.secondaryColor : themeStyles.subtleTextColor} 
                      />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Margaret typing indicator */}
        {isMargaretTyping && (
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              maxWidth: '80%'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${themeStyles.secondaryColor}`,
                boxShadow: `0 0 10px ${themeStyles.secondaryColor}30`
              }}>
                <MargaretAvatar 
                  size={36} 
                  theme={{
                    secondaryColor: themeStyles.secondaryColor,
                    accentColorAlpha: `${themeStyles.secondaryColor}30`
                  }}
                  isSpeaking={true}
                />
              </div>
              
              <div style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '16px',
                padding: '12px 16px',
                border: `1px solid ${themeStyles.borderColor}`
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  <motion.div
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: themeStyles.secondaryColor
                    }}
                  />
                  <motion.div
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: themeStyles.secondaryColor
                    }}
                  />
                  <motion.div
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: themeStyles.secondaryColor
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div style={{
        padding: '12px 16px',
        borderTop: `1px solid ${themeStyles.borderColor}`,
        backgroundColor: themeStyles.cardBg,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRecording}
          style={{
            backgroundColor: isRecording ? `${themeStyles.secondaryColor}30` : `${themeStyles.primaryColor}15`,
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <Mic 
            size={20} 
            color={isRecording ? themeStyles.secondaryColor : themeStyles.primaryColor} 
          />
        </motion.button>
        
        <div style={{
          flex: 1,
          backgroundColor: `${themeStyles.primaryColor}10`,
          borderRadius: '20px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask Margaret about ${babyName}'s sleep...`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              resize: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem',
              color: themeStyles.textColor,
              fontFamily: 'inherit',
              lineHeight: '1.5',
              maxHeight: '120px',
              padding: '0',
              margin: '0'
            }}
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputText.trim() && !isRecording}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: inputText.trim() || isRecording ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 0 0 8px',
              opacity: inputText.trim() || isRecording ? 1 : 0.5,
              marginBottom: '2px'
            }}
          >
            <Send 
              size={20} 
              color={themeStyles.primaryColor} 
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AskMargaretScreen;
