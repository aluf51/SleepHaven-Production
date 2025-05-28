import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const SoundscapePlayer = ({ embedded = false, theme }) => {
    const { userProfile } = useContext(AppContext);
    return <div className={`p-6 rounded-xl shadow-lg`} style={{ backgroundColor: theme.cardBackgroundColor, color: theme.textColor, border: `1px solid ${theme.cardBorderColor}` }}>Soundscape Player (Baby: {userProfile.babyName}) - Calming sounds will play here.</div>;
};

export default SoundscapePlayer;
