import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretAvatar from './MargaretAvatar';
import NavigationButtons from '../common/NavigationButtons';
import { ChevronDownIcon, ChevronUpIcon, SparklesIcon, ChatBubbleLeftRightIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// Simple Star component for background animation
const AnimatedStar = ({ delay, size, top, left, duration }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        delay,
        duration: duration || 5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
    />
  );
};

const SpeechBubble = ({ text, theme }) => {
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.5 },
    },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: theme.speechBubbleBackground || (theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'),
        color: theme.speechBubbleText || theme.textColor,
        padding: '12px 18px',
        borderRadius: '12px',
        maxWidth: '300px',
        textAlign: 'left',
        position: 'relative',
        marginTop: '10px',
      }}
    >
      {text}
    </motion.div>
  );
};

const MargaretIntroductionNew = ({ onNext }) => {
  const { state } = useContext(AppContext);
  const { isDarkMode } = state;
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const [showConversationStarters, setShowConversationStarters] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [isMargaretSpeaking, setIsMargaretSpeaking] = useState(false); // For avatar animation during TTS

  // Generic greeting that doesn't reference specific names
  const greetingText = "Hello! I'm excited to help you and your baby sleep better.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConversationStarters(true);
      setShowTestimonial(true);
    }, 2500);
    
    // Auto-play Margaret's voice when component mounts
    if ('speechSynthesis' in window) {
      setTimeout(() => {
        speakGreeting(greetingText);
      }, 1000);
    }
    
    return () => clearTimeout(timer);
  }, []);

  const speakGreeting = (text) => {
    if ('speechSynthesis' in window) {
      setIsMargaretSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice to sound like a 50-60 year old woman
      const voices = window.speechSynthesis.getVoices();
      // Try to find a mature female voice
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('woman') || 
        voice.name.includes('en-US') || 
        voice.name.includes('en-GB')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Adjust for mature, calming yet authoritative voice
      utterance.pitch = 0.9; // Slightly lower pitch for maturity
      utterance.rate = 0.85; // Slightly slower for calming effect
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsMargaretSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsMargaretSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleConversationStarterClick = (starterType) => {
    setShowConversationStarters(false);
    setIsMargaretSpeaking(true);
    
    let message = "";
    switch (starterType) {
      case 'how_help':
        message = "I can help you establish a consistent sleep schedule, tackle night wakings, and teach your baby to self-soothe, all tailored to your family's unique needs.";
        break;
      case 'approach':
        message = "My approach is gentle, evidence-based, and always personalized. I believe in working with you to find solutions that feel right for your family and your little one.";
        break;
      case 'experience':
        message = "I've been developed based on over 20 years of pediatric sleep science and have successfully guided thousands of parents. My knowledge base is constantly updated with the latest research and real-world data from families like yours, allowing me to learn and improve continuously.";
        break;
      default:
        message = "I'm ready to answer your questions!";
    }
    
    // Speak the response
    speakGreeting(message);
    
    setTimeout(() => {
      setShowConversationStarters(true);
    }, 1000);
  };

  const backgroundStyle = {
    background: isDarkMode
      ? 'linear-gradient(180deg, #2A3B4D 0%, #3E5062 100%)'
      : 'linear-gradient(180deg, #B2EBF2 0%, #E0F7FA 100%)',
    color: currentTheme.textColor,
    fontFamily: currentTheme.fontFamilyBody,
    minHeight: '100vh',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  };

  const avatarAndBubbleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
  };

  const interactionAreaStyle = {
    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
    zIndex: 1,
  };

  const stars = [
    { id: 1, delay: 0, size: 2, top: 10, left: 15, duration: 6 },
    { id: 2, delay: 1, size: 3, top: 20, left: 80, duration: 5 },
    { id: 3, delay: 2, size: 2, top: 50, left: 10, duration: 7 },
    { id: 4, delay: 3, size: 4, top: 70, left: 90, duration: 4 },
    { id: 5, delay: 4, size: 3, top: 85, left: 30, duration: 6 },
    { id: 6, delay: 0.5, size: 2, top: 5, left: 50, duration: 5.5 },
    { id: 7, delay: 1.5, size: 3, top: 35, left: 5, duration: 6.5 },
    { id: 8, delay: 2.5, size: 2, top: 60, left: 60, duration: 4.5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={backgroundStyle}
    >
      {stars.map(star => <AnimatedStar key={star.id} {...star} />)}

      <div style={{ width: '100%', textAlign: 'center', marginTop: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}>
          Meet Margaret
        </h1>
        <p className="text-lg mb-4" style={{ color: currentTheme.subtleTextColor }}>Your Personal Sleep Consultant</p>
        
        <div style={avatarAndBubbleContainerStyle}>
          <MargaretAvatar theme={currentTheme} size={200} isSpeaking={isMargaretSpeaking} /> 
          <SpeechBubble text={greetingText} theme={currentTheme} />
        </div>
      </div>

      {(showConversationStarters || showCredentials) && (
        <div style={interactionAreaStyle} className="mb-6">
          {showConversationStarters && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <button onClick={() => handleConversationStarterClick('how_help')} className="p-3 rounded-lg text-sm text-left transition-all" style={{ backgroundColor: currentTheme.buttonBackground, color: currentTheme.buttonTextColor, border: `1px solid ${currentTheme.borderColor}` }}><LightBulbIcon className="h-5 w-5 inline mr-2" />How can you help us?</button>
              <button onClick={() => handleConversationStarterClick('approach')} className="p-3 rounded-lg text-sm text-left transition-all" style={{ backgroundColor: currentTheme.buttonBackground, color: currentTheme.buttonTextColor, border: `1px solid ${currentTheme.borderColor}` }}><ChatBubbleLeftRightIcon className="h-5 w-5 inline mr-2" />Tell me about your approach.</button>
              <button onClick={() => setShowCredentials(!showCredentials)} className="p-3 rounded-lg text-sm text-left transition-all md:col-span-2" style={{ backgroundColor: currentTheme.buttonBackground, color: currentTheme.buttonTextColor, border: `1px solid ${currentTheme.borderColor}` }}><UserGroupIcon className="h-5 w-5 inline mr-2" />What's your experience? {showCredentials ? <ChevronUpIcon className="h-4 w-4 inline ml-1" /> : <ChevronDownIcon className="h-4 w-4 inline ml-1" />}</button>
            </motion.div>
          )}

          {showCredentials && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 p-3 rounded text-sm text-left" style={{ backgroundColor: currentTheme.subtleBackground, border: `1px solid ${currentTheme.borderColor}` }}>
              <p>
                Margaret is built on 20+ years of pediatric sleep science and has guided thousands of parents. My knowledge is constantly updated with the latest research and real-world data to provide you the best support.
              </p>
              <p className="mt-2">
                I analyze patterns from thousands of families to identify what works best for different situations, learning from collective experiences while maintaining privacy. This allows me to offer evidence-based, personalized guidance that evolves with new insights.
              </p>
              <div className="mt-2 text-xs" style={{ color: currentTheme.accentColor }}>Success Rate: 93% of families see improvement within 5 days!</div>
            </motion.div>
          )}
        </div>
      )}

      <div className="w-full max-w-md flex flex-col items-center mt-auto" style={{zIndex: 1}}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="w-full mt-4 px-8 py-3 rounded-full font-semibold text-white transition-colors shadow-xl text-lg"
          style={{ backgroundColor: currentTheme.ctaColor, fontFamily: currentTheme.fontFamilyBody }}
        >
          Let's Get Started!
        </motion.button>
      </div>

      <div className="w-full text-center mt-auto pt-4" style={{zIndex: 1}}>
        <p className="text-xs" style={{ color: currentTheme.subtleTextColor }}>Step 2 of 6: Meet Your Consultant</p>
      </div>

    </motion.div>
  );
};

export default MargaretIntroductionNew;
