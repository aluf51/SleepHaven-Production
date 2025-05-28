import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const MargaretVoiceInteraction = ({ onInteraction, isListening, transcript, margaretResponse }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const conversationRef = useRef(null);

  // Simulated speech recognition
  const toggleListening = () => {
    if (isListening) {
      onInteraction('stop');
      setIsProcessing(true);
    } else {
      onInteraction('start');
    }
  };

  // Add new messages to conversation history
  useEffect(() => {
    if (transcript && isListening) {
      onInteraction('transcript', transcript);
    }
  }, [transcript, isListening, onInteraction]);

  // Handle Margaret's response
  useEffect(() => {
    if (margaretResponse && !isListening) {
      setIsProcessing(false);
      
      // Add to conversation history
      setConversationHistory(prev => [
        ...prev, 
        { speaker: 'user', text: transcript },
        { speaker: 'margaret', text: margaretResponse }
      ]);

      // Speak Margaret's response if not muted
      if (!isMuted) {
        speakResponse(margaretResponse);
      }
    }
  }, [margaretResponse, isListening, transcript, isMuted]);

  // Scroll to bottom of conversation
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  // Simulated text-to-speech function
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set a female voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Victoria')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Adjust speech parameters for a warm, nurturing tone
      utterance.pitch = 1.1;  // Slightly higher pitch
      utterance.rate = 0.9;   // Slightly slower rate
      utterance.volume = 1.0; // Full volume
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any current speech
    }
  };

  return (
    <div className="w-full">
      {/* Conversation Display */}
      {conversationHistory.length > 0 && (
        <div 
          ref={conversationRef}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto text-left"
          style={{ 
            border: `1px solid ${state.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            fontSize: '0.9rem'
          }}
        >
          {conversationHistory.map((message, index) => (
            <div key={index} className={`mb-2 ${message.speaker === 'margaret' ? 'pl-2 border-l-2' : ''}`} style={{ 
              borderColor: message.speaker === 'margaret' ? currentTheme.primaryColor : 'transparent' 
            }}>
              <span className="font-semibold" style={{ color: message.speaker === 'margaret' ? currentTheme.primaryColor : currentTheme.textColor }}>
                {message.speaker === 'margaret' ? 'Margaret: ' : 'You: '}
              </span>
              <span style={{ color: currentTheme.textColor }}>{message.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Current Transcript Display */}
      {isListening && transcript && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mb-3 text-left">
          <p className="text-sm" style={{ color: currentTheme.textColor }}>"{transcript}"</p>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center mb-3">
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Margaret is thinking...</span>
        </div>
      )}

      {/* Voice Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
          }`}
          disabled={isProcessing}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full transition-colors ${
            isMuted 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400' 
              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
          }`}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      {/* Mode Indicator */}
      <p className="text-xs mt-2" style={{ color: currentTheme.subtleTextColor }}>
        {isListening 
          ? "I'm listening..." 
          : isProcessing 
            ? "Processing your request..." 
            : "Tap microphone to speak with Margaret"}
      </p>
    </div>
  );
};

export default MargaretVoiceInteraction;
