import React from 'react';
import { motion } from 'framer-motion';

const MargaretAvatar = ({ size = 200, theme, fullView = false, isSpeaking = false }) => {
  const avatarSrc = '/assets/margaret_avatar.png';

  const containerStyle = {
    width: `${size}px`,
    height: fullView ? 'auto' : `${size}px`,
    borderRadius: fullView ? '12px' : '50%',
    overflow: 'hidden',
    margin: '0 auto 20px auto',
    border: theme ? `4px solid ${theme.secondaryColor}` : '4px solid #ccc',
    boxShadow: `0 0 20px 5px ${theme ? theme.accentColorAlpha : 'rgba(173, 216, 230, 0.7)'}, 0 4px 12px rgba(0,0,0,0.1)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // For potential future animations or overlays
  };

  const imageStyle = {
    width: '100%',
    height: fullView ? 'auto' : '100%',
    objectFit: fullView ? 'contain' : 'cover',
  };

  // Animation variants for the avatar
  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.2 },
    },
    speaking: {
        scale: 1.05, // Subtle pulse when speaking
        transition: { yoyo: Infinity, duration: 0.8 }
    }
  };

  return (
    <motion.div
      style={containerStyle}
      variants={avatarVariants}
      initial="hidden"
      animate={isSpeaking ? ["visible", "speaking"] : "visible"}
    >
      <img 
        src={avatarSrc} 
        alt="Margaret - AI Sleep Consultant" 
        style={imageStyle}
      />
    </motion.div>
  );
};

export default MargaretAvatar;

