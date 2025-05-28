import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const ParentAvatar = ({ avatarData, size = 40, theme }) => {
  // If userProfile is needed directly, it should be passed or accessed from context if AppProvider wraps this part of the tree
  // For now, assuming avatarData is sufficient or userProfile is available in a higher context if needed for initials
  const { userProfile } = useContext(AppContext); // Added to resolve userProfile undefined
  const initials = avatarData && avatarData.initials ? avatarData.initials : (userProfile && userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "P");
  const bgColor = avatarData && avatarData.bgColor ? avatarData.bgColor : theme.secondaryLighter;
  const textColor = avatarData && avatarData.textColor ? avatarData.textColor : theme.secondaryDarker;
  const borderColor = avatarData && avatarData.borderColor ? avatarData.borderColor : theme.secondaryDarker;

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: bgColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: textColor,
    fontWeight: "bold",
    fontSize: `${size * 0.5}px`,
    border: `2px solid ${borderColor}`,
    fontFamily: theme.fontFamilyBody,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };
  return <div style={style}>{initials}</div>;
};

export default ParentAvatar;
