import React, { useEffect, useRef, useState } from  "react";

const VoiceOutputPlayer = ({ 
  textToSpeak,
  isSpeaking, // Boolean controlled by parent to indicate TTS is active
  onPlaybackStart, // Callback when TTS starts
  onPlaybackEnd,   // Callback when TTS ends
  // voiceSettings, // Future: for voice selection, rate, pitch from MargaretVoiceSettings
  // margaretAvatarRef // Future: ref to MargaretAvatar for direct animation control if needed
}) => {
  const audioRef = useRef(null); // For potential <audio> element if using pre-recorded or direct audio streams
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.warn("Speech Synthesis not supported by this browser.");
      return;
    }

    // Cleanup function for when the component unmounts or dependencies change
    const cleanupSpeech = () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      if (utterance) {
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
      }
    };

    if (textToSpeak && isSpeaking) {
      cleanupSpeech(); // Cancel any ongoing speech before starting new

      const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
      // Apply voice settings from spec (can be customized via props later)
      // These are examples; specific voices depend on the browser/OS
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(voice => voice.name.includes("Google US English") || voice.name.includes("Samantha") || voice.name.includes("Microsoft Zira Desktop")); // Common good quality voices
      if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.startsWith("en-US")); // Fallback to any US English
      
      if (selectedVoice) {
        newUtterance.voice = selectedVoice;
      }
      newUtterance.pitch = 1; // Medium pitch (0 to 2)
      newUtterance.rate = 0.9; // Slightly slower than average (0.1 to 10, 1 is default)
      newUtterance.volume = 1; // Max volume

      newUtterance.onstart = () => {
        console.log("TTS Playback started for:", textToSpeak);
        if (onPlaybackStart) onPlaybackStart();
      };

      newUtterance.onend = () => {
        console.log("TTS Playback ended.");
        if (onPlaybackEnd) onPlaybackEnd();
        setUtterance(null); // Clear current utterance
      };

      newUtterance.onerror = (event) => {
        console.error("SpeechSynthesisUtterance.onerror", event);
        if (onPlaybackEnd) onPlaybackEnd(); // Ensure speaking state is reset
        setUtterance(null);
      };
      
      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);

    } else if (!isSpeaking && window.speechSynthesis.speaking) {
      // If parent component sets isSpeaking to false, cancel synthesis
      window.speechSynthesis.cancel();
    }

    return cleanupSpeech; // Cleanup on unmount or re-render

  }, [textToSpeak, isSpeaking, onPlaybackStart, onPlaybackEnd]); // Removed utterance from deps to avoid loop

  // This component might not render any visible UI itself, 
  // or it could render controls if manual playback control was needed.
  // For now, it primarily manages the Web Speech API interactions.
  return null; 
  // Example: <audio ref={audioRef} hidden /> if we were playing audio files
};

export default VoiceOutputPlayer;

