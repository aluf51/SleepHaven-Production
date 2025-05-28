import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const ProgressDashboard = ({ embedded = false, theme }) => {
    const { userProfile } = useContext(AppContext);
    return (
        <div className={`p-6 rounded-xl shadow-lg`} style={{ backgroundColor: theme.cardBackgroundColor, color: theme.textColor, border: `1px solid ${theme.cardBorderColor}` }}>
            <h2 style={{ fontFamily: theme.fontFamilyHeadings, color: theme.headingColor, fontSize: "1.8rem", marginBottom: "1rem" }}>Welcome back, {userProfile.name}!</h2>
            <p style={{marginBottom: "0.5rem"}}>Here is a summary of {userProfile.babyName}"s sleep progress.</p>
            {/* Placeholder for Sleep Story visualization */}
            <div style={{
                height: "150px", 
                backgroundColor: theme.primaryLightest, 
                borderRadius: "8px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                marginTop: "1rem",
                border: `1px dashed ${theme.primaryLighter}`
            }}>
                <p style={{color: theme.primaryDarker, fontFamily: theme.fontFamilyBody}}>Sleep Story Visualization Area</p>
            </div>
            <p style={{marginTop: "1rem", fontSize: "0.9rem", color: theme.subtleTextColor}}>Log more sleep to see detailed patterns.</p>
        </div>
    );
};

export default ProgressDashboard;
