// /home/ubuntu/components/wellness/MicroMeditationsPlayer.js
import React, { useState, useRef, useEffect } from "react";

// Mock meditation data - in a real app, this would come from an API or config
const mockMeditations = [
  {
    id: "med1",
    title: "2-Minute Mindful Breath",
    duration: "2 min",
    description: "A quick exercise to center yourself with your breath.",
    audioSrc: "/audio/mock_meditation_2min_breath.mp3", // Placeholder path
    category: "Mindfulness"
  },
  {
    id: "med2",
    title: "3-Minute Calming Pause",
    duration: "3 min",
    description: "Find a moment of calm amidst the chaos.",
    audioSrc: "/audio/mock_meditation_3min_calm.mp3", // Placeholder path
    category: "Stress Relief"
  },
  {
    id: "med3",
    title: "1-Minute Gratitude Boost",
    duration: "1 min",
    description: "Focus on one thing you are grateful for right now.",
    audioSrc: "/audio/mock_meditation_1min_gratitude.mp3", // Placeholder path
    category: "Positive Focus"
  }
];

// A simple play icon
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// A simple pause icon
const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MicroMeditationsPlayer = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Cleanup audio element when component unmounts or meditation changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedMeditation]);

  const handleSelectMeditation = (meditation) => {
    if (audioRef.current && selectedMeditation && selectedMeditation.id === meditation.id) {
      // If same meditation is clicked, toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        setIsPlaying(true);
      }
    } else {
      // If a new meditation is selected or no audio element exists
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setSelectedMeditation(meditation);
      setIsPlaying(false); // Reset playing state for new audio
      setCurrentTime(0);
      setDuration(0);
      // Create and setup new audio element
      const newAudio = new Audio(meditation.audioSrc);
      newAudio.onloadedmetadata = () => setDuration(newAudio.duration);
      newAudio.ontimeupdate = () => setCurrentTime(newAudio.currentTime);
      newAudio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0); // Reset time or to duration for "played" state
      };
      audioRef.current = newAudio;
      // Auto-play new selection
      newAudio.play().catch(e => {
          console.error("Error playing audio:", e);
          alert(`Could not play ${meditation.title}. Audio files are placeholders.`);
      });
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold text-purple-800 mb-4">Quick Micro-Meditations</h4>
      <div className="space-y-3">
        {mockMeditations.map((meditation) => (
          <div key={meditation.id} className={`p-3 rounded-md border ${selectedMeditation?.id === meditation.id ? "bg-purple-100 border-purple-400" : "bg-white border-gray-200 hover:border-purple-300"}`}>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-purple-700">{meditation.title} ({meditation.duration})</h5>
                <p className="text-xs text-gray-600">{meditation.description}</p>
              </div>
              <button 
                onClick={() => handleSelectMeditation(meditation)}
                className="p-2 rounded-full text-purple-600 hover:bg-purple-200 transition-colors"
                aria-label={isPlaying && selectedMeditation?.id === meditation.id ? "Pause" : "Play"}
              >
                {isPlaying && selectedMeditation?.id === meditation.id ? <PauseIcon /> : <PlayIcon />}
              </button>
            </div>
            {selectedMeditation?.id === meditation.id && audioRef.current && (
              <div className="mt-2">
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    setCurrentTime(e.target.value);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">Note: Audio files are placeholders. Ensure actual audio files are hosted and paths are correct in a real application.</p>
    </div>
  );
};

export default MicroMeditationsPlayer;

