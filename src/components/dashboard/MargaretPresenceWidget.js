import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import MargaretVoiceInteraction from '../voice/MargaretVoiceInteraction';

const MargaretPresenceWidget = ({ onInteraction }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [margaretResponse, setMargaretResponse] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleVoiceInteraction = (action, data) => {
    if (action === 'start') {
      setIsListening(true);
      setTranscript('');
      setMargaretResponse('');
    } else if (action === 'stop') {
      setIsListening(false);
      const mockUserQuery = transcript || "User said something";
      setConversation(prev => [...prev, { speaker: 'user', text: mockUserQuery }]);
      setTimeout(() => {
        const response = "I'm a mock response to: " + mockUserQuery;
        setMargaretResponse(response);
        setConversation(prev => [...prev, { speaker: 'margaret', text: response }]);
      }, 1000);
    } else if (action === 'transcript') {
      setTranscript(data);
    }
  };

  // Enhanced prominence styles
  const prominentCardStyle = {
    padding: '20px', // Slightly increased padding
    backgroundColor: currentTheme.cardBackground, // Keep theme consistency
    borderRadius: currentTheme.borderRadius,
    // Enhanced boxShadow for more prominence
    boxShadow: state.isDarkMode ? '0 10px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)' : '0 10px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
    textAlign: 'center',
    color: currentTheme.textColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // Adding a subtle border for more definition
    border: `1px solid ${state.isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
    // Consider a slight scale up or transform if needed, but start with shadow/border
    // transform: 'scale(1.02)', // Example: makes card slightly larger
  };

  return (
    <div style={prominentCardStyle}>
      <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', fontSize: '1.1em' }}>Talk to Margaret</p>
      
      <img 
        src="/images/margaret_avatar.png" 
        alt="Margaret's Avatar"
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '20px', // Increased margin
          border: `2px solid ${currentTheme.textColor}`
        }}
      />

      <MargaretVoiceInteraction
        isVisible={true}
        onInteraction={handleVoiceInteraction}
        isListening={isListening}
        transcript={transcript}
        margaretResponse={margaretResponse}
      />
    </div>
  );
};

export default MargaretPresenceWidget;

