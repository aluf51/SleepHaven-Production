// /home/ubuntu/components/adaptive/TechniqueLogger.js
import React, { useState } from "react";

const sleepTechniques = [
  "Swaddling (for young infants)",
  "White Noise Machine",
  "Dark Room",
  "Consistent Bedtime Routine",
  "Pacifier",
  "Rocking/Swaying",
  "Patting/Shushing",
  "Dream Feed",
  "Check and Console (Timed Intervals)",
  "Pick Up/Put Down",
  "Fading (Gradual Withdrawal of Support)",
  "Other (Specify)"
];

const effectivenessLevels = [
  { value: 5, label: "★★★★★ Very Effective" },
  { value: 4, label: "★★★★☆ Effective" },
  { value: 3, label: "★★★☆☆ Moderately Effective" },
  { value: 2, label: "★★☆☆☆ Slightly Effective" },
  { value: 1, label: "★☆☆☆☆ Not Effective" }
];

const TechniqueLogger = ({ onLogSubmit }) => {
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [customTechnique, setCustomTechnique] = useState("");
  const [effectiveness, setEffectiveness] = useState("");
  const [notes, setNotes] = useState("");
  const [logDate, setLogDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTechnique || (selectedTechnique === "Other (Specify)" && !customTechnique) || !effectiveness) {
      alert("Please select a technique, specify if other, and rate its effectiveness.");
      return;
    }

    const logEntry = {
      id: `log_${Date.now()}`,
      date: logDate,
      technique: selectedTechnique === "Other (Specify)" ? customTechnique : selectedTechnique,
      effectiveness: parseInt(effectiveness),
      effectivenessLabel: effectivenessLevels.find(lvl => lvl.value === parseInt(effectiveness))?.label || "",
      notes: notes,
    };
    onLogSubmit(logEntry);
    // Reset form
    setSelectedTechnique("");
    setCustomTechnique("");
    setEffectiveness("");
    setNotes("");
    // setLogDate(new Date().toISOString().split("T")[0]); // Keep date or reset as preferred
    alert("Technique logged successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold text-indigo-800 mb-4">Log a Sleep Technique</h4>
      
      <div className="mb-3">
        <label htmlFor="log-date" className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
        <input 
          type="date"
          id="log-date"
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="technique-select" className="block text-sm font-medium text-gray-700 mb-1">Technique Used:</label>
        <select 
          id="technique-select"
          value={selectedTechnique}
          onChange={(e) => setSelectedTechnique(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">-- Select a technique --</option>
          {sleepTechniques.map(tech => <option key={tech} value={tech}>{tech}</option>)}
        </select>
      </div>

      {selectedTechnique === "Other (Specify)" && (
        <div className="mb-3">
          <label htmlFor="custom-technique" className="block text-sm font-medium text-gray-700 mb-1">Specify Other Technique:</label>
          <input 
            type="text"
            id="custom-technique"
            value={customTechnique}
            onChange={(e) => setCustomTechnique(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Specific song, type of hold"
            required
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="effectiveness-select" className="block text-sm font-medium text-gray-700 mb-1">Effectiveness:</label>
        <select 
          id="effectiveness-select"
          value={effectiveness}
          onChange={(e) => setEffectiveness(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">-- Rate effectiveness --</option>
          {effectivenessLevels.map(lvl => <option key={lvl.value} value={lvl.value}>{lvl.label}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional):</label>
        <textarea 
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., How long it took, baby's reaction, specific circumstances"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out"
      >
        Log Technique
      </button>
    </form>
  );
};

export default TechniqueLogger;

