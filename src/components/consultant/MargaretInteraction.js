// /home/ubuntu/components/consultant/MargaretInteraction.js
// Conceptual component for interacting with Margaret (AI Sleep Consultant)

import React, { useState } from 'react';

// Placeholder for Margaret's 3D avatar component/image
// In a real app, this would be a 3D model viewer or an animated sprite sheet.
const MargaretAvatar = () => {
  return (
    <div style={{
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: '#E0E0E0', // Placeholder color
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px auto',
      border: '3px solid #5C6BC0' // Primary Deep Indigo for dark mode feel
    }}>
      <img 
        src="/home/ubuntu/mockups/margaret_avatar_concept_new.png" 
        alt="Margaret - AI Sleep Consultant" 
        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
      />
    </div>
  );
};

const MargaretInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [margaretResponse, setMargaretResponse] = useState('');
  const [interactionLog, setInteractionLog] = useState([]);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const recognizedQuery = "How can I help my baby sleep through the night?"; // Simulated query
      setUserQuery(recognizedQuery);
      setInteractionLog(prev => [...prev, { speaker: 'User', text: recognizedQuery }]);
      setIsListening(false);
      // Simulate Margaret's voice response
      triggerMargaretResponse(recognizedQuery);
    }, 2000);
  };

  const triggerMargaretResponse = (query) => {
    // Simulate API call to AI backend and getting a voice response
    let responseText = "That's a common question, and we can explore a few strategies together. Tell me a bit about your baby's current routine.";
    if (query.toLowerCase().includes("hello")) {
        responseText = "Hello there! How can I assist you with your little one's sleep today?";
    }
    setMargaretResponse(responseText);
    setInteractionLog(prev => [...prev, { speaker: 'Margaret', text: responseText }]);
    // Conceptually, Margaret's voice would play here
  };
  
  const handleTextInputChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleTextSubmit = () => {
    if (!userQuery.trim()) return;
    setInteractionLog(prev => [...prev, { speaker: 'User', text: userQuery }]);
    triggerMargaretResponse(userQuery);
    setUserQuery('');
  };

  // Theme colors (conceptual, would come from a global theme provider)
  const theme = {
    primaryColor: '#79A6DC', // Primary Calm Blue
    secondaryColor: '#63C5B9', // Playful Teal
    backgroundColor: '#F8F9FA', // Light Neutral Gray
    cardBackgroundColor: '#FFFFFF',
    textColor: '#495057',
    headingColor: '#212529',
    borderColor: '#E9ECEF',
    voiceButtonActive: '#FF8C69' // Engaging Coral
  };

  return (
    <div style={{
      fontFamily: '"Open Sans", sans-serif',
      backgroundColor: theme.backgroundColor,
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '30px auto'
    }}>
      <h2 style={{
        fontFamily: '"Nunito Sans", sans-serif',
        color: theme.headingColor,
        textAlign: 'center',
        marginBottom: '10px'
      }}>Chat with Margaret</h2>
      
      <MargaretAvatar />

      <div style={{
        height: '200px',
        overflowY: 'auto',
        border: `1px solid ${theme.borderColor}`,
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: theme.cardBackgroundColor
      }}>
        {interactionLog.map((entry, index) => (
          <div key={index} style={{
            marginBottom: '10px',
            textAlign: entry.speaker === 'Margaret' ? 'left' : 'right'
          }}>
            <span style={{
              backgroundColor: entry.speaker === 'Margaret' ? theme.primaryColor : theme.secondaryColor,
              color: 'white',
              padding: '8px 12px',
              borderRadius: '15px',
              display: 'inline-block',
              maxWidth: '70%'
            }}>
              <strong>{entry.speaker}:</strong> {entry.text}
            </span>
          </div>
        ))}
      </div>

      {/* Voice Interaction UI */} 
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={handleVoiceInput}
          disabled={isListening}
          style={{
            backgroundColor: isListening ? theme.voiceButtonActive : theme.primaryColor,
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '50px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          {/* Mic Icon Placeholder - would use an SVG icon */} 
          <span style={{ marginRight: '8px' }}>🎤</span> 
          {isListening ? 'Listening...' : 'Ask Margaret (Voice)'}
        </button>
        {isListening && <p style={{ color: theme.textColor, marginTop: '5px' }}>Recording your question...</p>}
      </div>

      {/* Text Input as Alternative */} 
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input 
          type="text"
          value={userQuery}
          onChange={handleTextInputChange}
          placeholder="Or type your question here..."
          style={{
            flexGrow: 1,
            padding: '12px',
            borderRadius: '20px 0 0 20px',
            border: `1px solid ${theme.borderColor}`,
            fontSize: '15px',
            marginRight: '-1px'
          }}
        />
        <button 
          onClick={handleTextSubmit}
          style={{
            backgroundColor: theme.secondaryColor,
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '0 20px 20px 0',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default MargaretInteraction;

