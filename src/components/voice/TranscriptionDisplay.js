import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TranscriptionDisplay = ({ 
  conversationHistory, // Array of { type: 'user' | 'margaret', text: string, timestamp: Date }
  isListening, 
  isSpeakingMargaret, 
  currentUserTranscript, // Live transcript of user speaking
  onEditTranscript, // Function to call when user edits a transcript (optional)
  interactionMode, // 'voice' or 'text'
  onSendTextFromInput, // Function to send text from the input field
  theme // For styling
}) => {
  const scrollableContainerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added or live transcript updates
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  }, [conversationHistory, currentUserTranscript, isListening]);

  const defaultTheme = {
    userBubbleBg: '#3B82F6', // Blue-500
    margaretBubbleBg: '#4B5563', // Gray-600
    textColor: '#FFFFFF',
    timestampColor: '#9CA3AF', // Gray-400
    inputBg: '#374151', // Gray-700
    inputTextColor: '#FFFFFF',
    buttonBg: '#10B981', // Emerald-500
  };

  const currentTheme = { ...defaultTheme, ...theme }; // Allow theme override

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const textInput = e.target.elements.textMessage;
    if (textInput.value.trim() && onSendTextFromInput) {
      onSendTextFromInput(textInput.value.trim());
      textInput.value = ''; // Clear input after send
    }
  };

  return (
    <div 
      className="flex flex-col h-full max-h-[400px] md:max-h-[500px] rounded-lg shadow-md"
      style={{ backgroundColor: currentTheme.inputBg || '#1F2937' /* Gray-800 */ }}
    >
      <div 
        ref={scrollableContainerRef} 
        className="flex-grow p-3 md:p-4 space-y-3 overflow-y-auto"
      >
        {conversationHistory && conversationHistory.map((entry, index) => (
          <motion.div 
            key={index} 
            className={`flex flex-col ${entry.type === 'user' ? 'items-end' : 'items-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className={`max-w-[75%] p-2.5 md:p-3 rounded-xl shadow`}
              style={{
                backgroundColor: entry.type === 'user' ? currentTheme.userBubbleBg : currentTheme.margaretBubbleBg,
                color: currentTheme.textColor,
              }}
            >
              <p className="text-sm md:text-base whitespace-pre-wrap">{entry.text}</p>
            </div>
            <span className="text-xs mt-1" style={{ color: currentTheme.timestampColor }}>
              {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}
        {isListening && currentUserTranscript && (
          <motion.div 
            className="flex flex-col items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-[75%] p-2.5 md:p-3 rounded-xl shadow italic" style={{ backgroundColor: `${currentTheme.userBubbleBg}B3`, color: currentTheme.textColor }}>
              <p className="text-sm md:text-base">{currentUserTranscript}...</p>
            </div>
          </motion.div>
        )}
        {isSpeakingMargaret && !currentUserTranscript && conversationHistory && conversationHistory[conversationHistory.length-1]?.type !== 'margaret' && (
            <motion.div 
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="max-w-[75%] p-2.5 md:p-3 rounded-xl shadow flex items-center" style={{ backgroundColor: currentTheme.margaretBubbleBg, color: currentTheme.textColor }}>
                    <motion.div className="w-2 h-2 bg-white rounded-full mr-2 opacity-70" animate={{scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5]}} transition={{duration: 1, repeat: Infinity}}/>
                    <motion.div className="w-2 h-2 bg-white rounded-full mr-2 opacity-70 delay-75" animate={{scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5]}} transition={{duration: 1, repeat: Infinity, delay: 0.2}}/>
                    <motion.div className="w-2 h-2 bg-white rounded-full opacity-70 delay-150" animate={{scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5]}} transition={{duration: 1, repeat: Infinity, delay: 0.4}}/>
                </div>
            </motion.div>
        )}
      </div>

      {interactionMode === 'text' && (
        <form onSubmit={handleTextSubmit} className="p-2 md:p-3 border-t flex items-center gap-2" style={{ borderColor: currentTheme.margaretBubbleBg }}>
          <input 
            type="text" 
            name="textMessage"
            placeholder="Type your message..." 
            className="flex-grow p-2.5 rounded-lg text-sm md:text-base focus:ring-2 focus:outline-none"
            style={{
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.inputTextColor,
              borderColor: currentTheme.userBubbleBg,
              ringColor: currentTheme.userBubbleBg
            }}
          />
          <button 
            type="submit" 
            className="p-2.5 rounded-lg text-white transition-colors duration-150 focus:outline-none focus:ring-2"
            style={{ backgroundColor: currentTheme.buttonBg, ringColor: currentTheme.buttonBg }}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default TranscriptionDisplay;

