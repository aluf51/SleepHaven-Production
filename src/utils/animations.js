// Animation utility functions and constants for consistent animations across the app

// Page transition variants for AppContainer
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Framer Motion variants for common animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const slideDown = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const slideInFromRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },
  exit: { 
    x: 50, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const slideInFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },
  exit: { 
    x: -50, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Staggered children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// Button hover animation (for use with CSS)
export const buttonHoverAnimation = {
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease-in-out'
};

// Pulse animation for notifications or highlights
export const pulseAnimation = {
  hidden: { scale: 1, opacity: 1 },
  visible: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Tooltip animation
export const tooltipAnimation = {
  hidden: { opacity: 0, y: 5, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

// CSS animation classes for elements that don't use Framer Motion
export const cssAnimations = {
  buttonHover: 'transition-all duration-200 hover:-translate-y-1 hover:shadow-md',
  cardHover: 'transition-all duration-300 hover:-translate-y-2 hover:shadow-lg',
  fadeIn: 'animate-fadeIn',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin'
};

// Tailwind CSS animation keyframes (to be added to tailwind.config.js)
export const tailwindAnimationKeyframes = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  slideUp: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' }
  },
  slideDown: {
    '0%': { transform: 'translateY(-20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' }
  }
};

// Animation durations
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5
};

// Helper function to add hover animation to any element
export const addHoverAnimation = (baseClasses) => {
  return `${baseClasses} transition-all duration-200 hover:-translate-y-1 hover:shadow-md`;
};

// Helper function to add interactive element indication
export const addInteractiveIndicator = (baseClasses) => {
  return `${baseClasses} cursor-pointer hover:brightness-105 active:brightness-95 transition-all duration-150`;
};
