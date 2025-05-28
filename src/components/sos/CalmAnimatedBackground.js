import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CalmAnimatedBackground = ({ animationStyle = 'starryNight', isActive = true, theme }) => {
  const canvasRef = useRef(null);
  const [currentStyle, setCurrentStyle] = useState(animationStyle);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
        if(canvasRef.current){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };
    window.addEventListener('resize', resizeCanvas);

    if (currentStyle === 'starryNight') {
      // Enhanced starry night with more stars and shooting stars
      const stars = [];
      const numStars = 100; // Increased for more immersive effect
      const shootingStars = [];
      const maxShootingStars = 2;

      // Create regular stars
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5, // Slightly larger stars
          alpha: Math.random() * 0.6 + 0.3, // More varied transparency
          twinkleSpeed: Math.random() * 0.005 + 0.001, // Varied twinkle speeds
          color: Math.random() > 0.8 ? 
            `rgba(200, 220, 255, 1)` : // Slight blue tint for some stars
            `rgba(232, 235, 250, 1)`   // White for most stars
        });
      }

      // Function to create a new shooting star
      const createShootingStar = () => {
        if (shootingStars.length < maxShootingStars && Math.random() < 0.005) { // Low probability for rare effect
          const angle = Math.random() * Math.PI / 4 + Math.PI / 8; // Angle between PI/8 and 3PI/8 (top-right direction)
          shootingStars.push({
            x: Math.random() * canvas.width * 0.3, // Start from left side
            y: Math.random() * canvas.height * 0.3, // Start from top
            length: Math.random() * 80 + 50, // Length of trail
            speed: Math.random() * 5 + 3, // Speed of movement
            angle: angle,
            alpha: 1,
            decay: Math.random() * 0.01 + 0.005 // How quickly it fades
          });
        }
      };

      const drawStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Enhanced gradient background with more depth
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, theme.pageBackground || '#0F1A40'); // Darker at top
        gradient.addColorStop(0.5, theme.pageBackground || '#1A2151'); // Original color in middle
        gradient.addColorStop(1, theme.cardBackgroundColor || '#2D3258'); // Original at bottom
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw subtle glow in the center
        const radialGradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        radialGradient.addColorStop(0, 'rgba(100, 120, 200, 0.05)'); // Very subtle blue glow
        radialGradient.addColorStop(1, 'rgba(100, 120, 200, 0)'); // Fade to transparent
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw stars with enhanced twinkling
        stars.forEach(star => {
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 0.9 || star.alpha < 0.3) {
            star.twinkleSpeed *= -1;
          }
          
          // Draw star glow
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          );
          glow.addColorStop(0, star.color.replace('1)', `${star.alpha * 0.8})`));
          glow.addColorStop(1, star.color.replace('1)', '0)'));
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
          
          // Draw star center
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = star.color.replace('1)', `${star.alpha})`);
          ctx.fill();
        });

        // Create and update shooting stars
        createShootingStar();
        
        // Draw shooting stars
        shootingStars.forEach((star, index) => {
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.alpha -= star.decay;
          
          if (star.alpha <= 0) {
            shootingStars.splice(index, 1);
            return;
          }
          
          // Draw shooting star trail
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          
          const gradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(drawStars);
      };
      
      drawStars();
    } else if (currentStyle === 'gentleWaves') {
      // Gentle ocean waves animation
      const waves = [];
      const numWaves = 5;
      const waveColors = [
        'rgba(100, 150, 200, 0.3)', // Light blue
        'rgba(80, 130, 180, 0.3)',  // Medium blue
        'rgba(60, 110, 160, 0.3)',  // Deeper blue
        'rgba(40, 90, 140, 0.3)',   // Dark blue
        'rgba(20, 70, 120, 0.3)'    // Very dark blue
      ];
      
      for (let i = 0; i < numWaves; i++) {
        waves.push({
          y: canvas.height * (0.5 + (i * 0.1)), // Staggered positions
          amplitude: 20 - (i * 3),              // Decreasing amplitude
          frequency: 0.005 + (i * 0.002),       // Increasing frequency
          speed: 0.05 - (i * 0.005),            // Decreasing speed
          offset: Math.random() * 100,          // Random offset
          color: waveColors[i]
        });
      }
      
      const drawWaves = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1A2151'); // Dark blue at top
        gradient.addColorStop(1, '#2D3258'); // Slightly lighter at bottom
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw each wave
        waves.forEach(wave => {
          wave.offset += wave.speed;
          
          ctx.beginPath();
          ctx.moveTo(0, wave.y);
          
          for (let x = 0; x < canvas.width; x++) {
            const y = wave.y + Math.sin((x * wave.frequency) + wave.offset) * wave.amplitude;
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          
          ctx.fillStyle = wave.color;
          ctx.fill();
        });
        
        animationFrameId = requestAnimationFrame(drawWaves);
      };
      
      drawWaves();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentStyle, isActive, theme]);

  // Allow switching animation styles
  useEffect(() => {
    setCurrentStyle(animationStyle);
  }, [animationStyle]);

  if (!isActive) {
    // Enhanced static gradient background with subtle animation
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, 
            ${theme.pageBackground || '#1A2151'}, 
            ${theme.cardBackgroundColor || '#2D3258'})`,
          zIndex: 0,
        }} 
      />
    );
  }

  return (
    <motion.canvas 
      ref={canvasRef} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} 
    />
  );
};

export default CalmAnimatedBackground;

