import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react'; // Using lucide-react for icons

const VoiceInputButton = ({ 
  isListening,
  isSpeaking, // To disable input while Margaret is speaking
  interactionMode, // 'voice' or 'text'
  onToggleListen, // For voice mode
  onSendText,     // For text mode (triggered by a separate send button, this component is just the mic)
  currentTextValue // For text mode, to enable send button
}) => {

  if (interactionMode === 'text') {
    // In text mode, this button might be hidden or show a different state, 
    // or a separate send button is used. For now, let's assume it's primarily for voice.
    // If we want a unified button, its role would change.
    // For this iteration, let's make it a clear microphone for voice mode only.
    return null; // Or a disabled mic icon, or a toggle to switch to voice input
  }

  const isDisabled = isSpeaking; // Disable mic if Margaret is speaking

  return (
    <motion.button
      onClick={onToggleListen}
      disabled={isDisabled}
      className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4`}
      style={{
        backgroundColor: isDisabled ? '#9CA3AF' : (isListening ? '#EF4444' : '#3B82F6'), // gray, red, blue
        color: 'white',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ringColor: isDisabled ? '#9CA3AF' : (isListening ? '#F87171' : '#60A5FA'),
      }}
      whileHover={{ scale: isDisabled ? 1 : 1.1 }}
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      animate={isListening ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
      transition={isListening ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
      title={isListening ? "Stop Listening" : "Tap to Speak"}
    >
      {isListening ? 
        <MicOff size={32} /> : 
        <Mic size={32} />
      }
    </motion.button>
  );
};

export default VoiceInputButton;

