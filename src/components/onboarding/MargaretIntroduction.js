import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretAvatar from './MargaretAvatar';
import MargaretVoiceInteraction from '../voice/MargaretVoiceInteraction';
import { ChevronDownIcon, ChevronUpIcon, PlayCircleIcon, SparklesIcon, ChatBubbleLeftRightIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// AnimatedStar component REMOVED for simplification

const MargaretIntroduction = ({ onNext, userName, babyName, babyAgeMonths }) => {
  const { state, dispatch } = useContext(AppContext);
  const { isDarkMode, margaretVoiceSettings } = state;
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const [interactionStep, setInteractionStep] = useState(0);
  const [currentMargaretMessage, setCurrentMargaretMessage] = useState('');
  const [showConversationStarters, setShowConversationStarters] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [isMargaretSpeaking, setIsMargaretSpeaking] = useState(false);
  const [margaretScript, setMargaretScript] = useState([]);
  // showTestimonial state REMOVED for simplification

  useEffect(() => {
    // Personalized welcome kept, as it's a text change that worked.
    const personalizedWelcome = `Hello ${userName || 'Emma'}! I'm looking forward to helping you${babyName ? ` and ${babyName}` : ''} sleep better.`;
    const baseIntroPrompts = [
      `I'm Margaret, your personal AI sleep consultant.`,
      "I've helped thousands of families find better sleep for their little ones.",
      `I'm excited to work with you! What would you like to know?`
    ];
    setMargaretScript([personalizedWelcome, ...baseIntroPrompts]);
    setInteractionStep(0);
  }, [userName, babyName]);

  useEffect(() => {
    if (margaretScript.length > 0 && interactionStep < margaretScript.length) {
      setCurrentMargaretMessage(margaretScript[interactionStep]);
      setIsMargaretSpeaking(true);
      
      const timeoutDuration = interactionStep === 0 ? 3500 : 2500;

      if (interactionStep === margaretScript.length - 1) {
        setTimeout(() => {
          setShowConversationStarters(true);
          setIsMargaretSpeaking(false);
          // Testimonial logic REMOVED for simplification
        }, timeoutDuration);
      } else {
        setTimeout(() => {
          setIsMargaretSpeaking(false);
          setInteractionStep(prev => prev + 1);
        }, timeoutDuration);
      }
    }
  }, [interactionStep, margaretScript]);

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
        message = "I've been developed based on over 20 years of pediatric sleep science and have successfully guided thousands of parents like you. My knowledge base is constantly updated with the latest research.";
        break;
      default:
        message = "I'm ready to answer your questions!";
    }
    setCurrentMargaretMessage(message);
    setTimeout(() => {
      setCurrentMargaretMessage(margaretScript[margaretScript.length -1] || "What would you like to know?"); 
      setShowConversationStarters(true);
      setIsMargaretSpeaking(false);
    }, 6000);
  };

  const handleUserResponse = (response) => {
    setShowConversationStarters(false);
    setIsMargaretSpeaking(true);
    setCurrentMargaretMessage(`That's an interesting question. To create the best plan for ${babyName || 'your little one'}, I need a bit more information. Shall we proceed?`);
    setTimeout(() => {
      setIsMargaretSpeaking(false);
    }, 3000);
  };

  const playVoiceSample = () => {
    alert("Playing Margaret's voice sample... (Placeholder)");
  };

  const backgroundStyle = {
    // Background gradient kept, as it's a basic style
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

  // stars array REMOVED for simplification
  // testimonialStyle REMOVED for simplification

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={backgroundStyle}
    >
      {/* AnimatedStar mapping REMOVED for simplification */}

      <div style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
        {/* Avatar size reverted to original 200 for now, to test if even this renders correctly after simplification */}
        <MargaretAvatar theme={currentTheme} size={200} isSpeaking={isMargaretSpeaking} />
        {/* Heading text reverted to original */}
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-1" style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}>
          Meet Margaret
        </h1>
        <p className="text-lg" style={{ color: currentTheme.subtleTextColor }}>Your Personal Sleep Consultant</p>
      </div>

      <div style={interactionAreaStyle} className="mb-6">
        <MargaretVoiceInteraction
          initialMargaretText={currentMargaretMessage}
          onUserResponse={handleUserResponse}
          onSystemAdvance={() => {}} 
          isMargaretSpeaking={isMargaretSpeaking}
          showMicPrompt={showConversationStarters || (!isMargaretSpeaking && interactionStep >= margaretScript.length - 1)}
          micPromptText={showConversationStarters ? "Or ask Margaret anything..." : "Ready to begin?"}
          key={interactionStep + currentMargaretMessage}
        />

        {showConversationStarters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <button onClick={() => handleConversationStarterClick('how_help')} className="p-3 rounded-lg text-sm text-left transition-all" style={{ backgroundColor: currentTheme.buttonBackground, color: currentTheme.buttonTextColor, border: `1px solid ${currentTheme.borderColor}` }}><LightBulbIcon className="h-5 w-5 inline mr-2" />How can you help us?</button>
            <button onClick={() => handleConversationStarterClick('approach')} className="p-3 rounded-lg text-sm text-left transition-all" style={{ backgroundColor: currentTheme.buttonBackground, color: currentTheme.buttonTextColor, border: `1px solid ${currentTheme.borderColor}` }}><ChatBubbleLeftRightIcon className="h-5 w-5 inline mr-2" />Tell me about your approach.</button>
            <button onClick={() => setShowCredentials(!showCredentials)} className="p-3 rounded-lg text-sm text-left transition-all md:col-span-2" style={{ backgroundColor: currentTheme.buttonBackground, color: currentTheme.buttonTextColor, border: `1px solid ${currentTheme.borderColor}` }}><UserGroupIcon className="h-5 w-5 inline mr-2" />What's your experience? {showCredentials ? <ChevronUpIcon className="h-4 w-4 inline ml-1" /> : <ChevronDownIcon className="h-4 w-4 inline ml-1" />}</button>
          </motion.div>
        )}

        {showCredentials && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 p-3 rounded text-sm text-left" style={{ backgroundColor: currentTheme.subtleBackground, border: `1px solid ${currentTheme.borderColor}` }}>
            Margaret is built on 20+ years of pediatric sleep science and has guided thousands of parents. My knowledge is constantly updated with the latest research to provide you the best support.
            <div className="mt-2 text-xs" style={{ color: currentTheme.accentColor }}>Success Rate: 93% of families see improvement within 5 days!</div>
          </motion.div>
        )}

      </div>

      {/* Testimonial Bubble REMOVED for simplification */}

      <div className="w-full max-w-md flex flex-col items-center" style={{zIndex: 1}}>
        {(interactionStep >= margaretScript.length - 1 && !isMargaretSpeaking) && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="w-full mt-4 px-8 py-3 rounded-full font-semibold text-white transition-colors shadow-xl text-lg"
            style={{ backgroundColor: currentTheme.ctaColor, fontFamily: currentTheme.fontFamilyBody }}
          >
            Let's Get Started!
          </motion.button>
        )}

        <button onClick={playVoiceSample} className="mt-3 text-sm flex items-center justify-center transition-colors" style={{ color: currentTheme.linkColor }}>
          <PlayCircleIcon className="h-5 w-5 mr-1" /> Hear Margaret's Voice (Sample)
        </button>
      </div>

      <div className="w-full text-center mt-auto pt-4" style={{zIndex: 1}}>
        <p className="text-xs" style={{ color: currentTheme.subtleTextColor }}>Step 2 of 6: Meet Your Consultant</p>
      </div>

    </motion.div>
  );
};

export default MargaretIntroduction;

