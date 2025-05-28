// /home/ubuntu/components/profile/ParentAvatarEditor.js
// Conceptual component for editing the parent avatar (simple 2D style)

import React, { useState, useContext } from 'react';
import { AppContext } from "../../contexts/AppContext"; // Adjust path as needed

// Simple 2D Parent Avatar Display (similar to the one in beautified_sleep_consultant_app.js)
const ParentAvatarDisplay = ({ avatarData, size = 80, theme }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: avatarData.bgColor || theme.secondaryLighter, 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: avatarData.textColor || theme.secondaryDarker,
    fontWeight: "bold",
    fontSize: `${size * 0.4}px`,
    border: `3px solid ${avatarData.borderColor || theme.secondaryDarker}`,
    fontFamily: theme.fontFamilyBody,
    margin: "0 auto 20px auto"
  };
  return <div style={style}>{avatarData.initials || "P"}</div>;
};

const ParentAvatarEditor = ({ theme }) => {
  const { userProfile, setUserProfile } = useContext(AppContext);
  
  // Mock customization options based on visual_theme_and_avatar_design.md
  // In a real app, these would be more extensive and visually represented.
  const [selectedInitials, setSelectedInitials] = useState(userProfile.avatar.initials || "P");
  const [selectedBgColor, setSelectedBgColor] = useState(userProfile.avatar.bgColor || theme.secondaryLighter);
  const [selectedTextColor, setSelectedTextColor] = useState(userProfile.avatar.textColor || theme.secondaryDarker);

  const initialsOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const colorOptions = [
    { name: "Teal", bgColor: theme.secondaryLighter, textColor: theme.secondaryDarker, borderColor: theme.secondaryDarker },
    { name: "Blue", bgColor: theme.primaryLighter, textColor: theme.primaryDarker, borderColor: theme.primaryDarker },
    { name: "Coral", bgColor: "#FFD1C1", textColor: "#FF8C69", borderColor: "#FF8C69" }, // Lighter coral bg
    { name: "Lavender", bgColor: "#E6E0FF", textColor: "#B0B0E8", borderColor: "#B0B0E8" }, // Lighter lavender bg
    { name: "Mint", bgColor: "#DFF2F0", textColor: "#5A8E88", borderColor: "#5A8E88" },
  ];

  const handleSaveChanges = () => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      avatar: {
        initials: selectedInitials,
        bgColor: selectedBgColor,
        textColor: selectedTextColor,
        borderColor: colorOptions.find(c => c.bgColor === selectedBgColor)?.borderColor || theme.secondaryDarker
      }
    }));
    alert("Avatar changes saved conceptually!"); // Placeholder for actual save
  };

  return (
    <div style={{
      fontFamily: theme.fontFamilyBody,
      backgroundColor: theme.cardBackgroundColor,
      color: theme.textColor,
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: '30px auto'
    }}>
      <h3 style={{
        fontFamily: theme.fontFamilyHeadings,
        color: theme.headingColor,
        textAlign: 'center',
        marginBottom: '20px'
      }}>Edit Your Avatar</h3>

      <ParentAvatarDisplay 
        avatarData={{
          initials: selectedInitials,
          bgColor: selectedBgColor,
          textColor: selectedTextColor,
          borderColor: colorOptions.find(c => c.bgColor === selectedBgColor)?.borderColor || theme.secondaryDarker
        }} 
        theme={theme} 
      />

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="initials-select" style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Select Initial:</label>
        <select 
          id="initials-select"
          value={selectedInitials}
          onChange={(e) => setSelectedInitials(e.target.value)}
          style={selectStyle(theme)}
        >
          {initialsOptions.map(initial => (
            <option key={initial} value={initial}>{initial}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Select Color Scheme:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {colorOptions.map(color => (
            <button 
              key={color.name}
              onClick={() => {
                setSelectedBgColor(color.bgColor);
                setSelectedTextColor(color.textColor);
              }}
              style={{
                ...colorButtonStyle(theme),
                backgroundColor: color.bgColor,
                color: color.textColor,
                border: `2px solid ${selectedBgColor === color.bgColor ? theme.ctaColor : color.borderColor }`,
                transform: selectedBgColor === color.bgColor ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSaveChanges}
        style={{
          ...buttonStyle(theme),
          width: '100%',
          padding: '12px'
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

// Helper styles (would ideally be part of a global stylesheet or utility classes)
const selectStyle = (theme) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: `1px solid ${theme.cardBorderColor}`,
  backgroundColor: theme.pageBackground, // Slightly different from card for contrast
  color: theme.textColor,
  fontSize: '16px',
  fontFamily: theme.fontFamilyBody
});

const colorButtonStyle = (theme) => ({
  padding: '10px 15px',
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: theme.fontFamilyBody,
  fontWeight: '600'
});

const buttonStyle = (theme) => ({
  backgroundColor: theme.ctaColor,
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontFamily: theme.fontFamilyHeadings
});

export default ParentAvatarEditor;

