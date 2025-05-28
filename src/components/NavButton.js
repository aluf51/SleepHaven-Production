import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../contexts/AppContext";

const NavButton = ({ viewName, children, currentView, setCurrentView }) => {
  const { currentTheme, isDarkMode } = useContext(AppContext);
  const isActive = currentView === viewName;
  const isSpecialButton = viewName === "margaretInteraction";

  return (
    <motion.button 
        onClick={() => setCurrentView(viewName)}
        whileHover={{ scale: currentTheme.buttonHoverScale, backgroundColor: isSpecialButton ? currentTheme.secondaryDarker : currentTheme.navButtonHoverBg }}
        whileTap={{ scale: currentTheme.buttonTapScale }}
        className={`p-2 rounded-md transition-all duration-200 ease-in-out text-sm sm:text-base`}
        style={{
            fontFamily: currentTheme.fontFamilyHeadings, 
            fontWeight: isActive ? "bold" : "normal",
            color: isSpecialButton 
                   ? (isDarkMode ? currentTheme.secondaryLightestHighlight : "white") 
                   : (isActive 
                      ? (isDarkMode ? currentTheme.primaryLightestHighlight : currentTheme.primaryDarker) 
                      : currentTheme.primaryLightest),
            backgroundColor: isSpecialButton 
                             ? currentTheme.secondaryColor 
                             : (isActive ? currentTheme.navButtonActiveBg : "transparent"),
            boxShadow: isActive && !isSpecialButton ? "inset 0 2px 4px rgba(0,0,0,0.1)" : "none",
            padding: isSpecialButton ? "0.5rem 1rem" : "0.5rem",
            borderRadius: isSpecialButton ? "9999px" : "0.375rem",
        }}
    >
        {children}
    </motion.button>
  );
};

export default NavButton;
