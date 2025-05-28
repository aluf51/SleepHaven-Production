// /home/ubuntu/components/growth/SleepNeedsCalculator.js
import React, { useState, useEffect } from "react";

// Data based on general guidelines (e.g., NSF, AAP). Ranges are important.
const sleepNeedsData = [
  { ageRange: [0, 3], label: "0-3 Months", totalSleep: "14-17 hours", nightSleep: "8-9 hours (in segments)", daySleep: "6-8 hours (multiple naps)" },
  { ageRange: [4, 11], label: "4-11 Months", totalSleep: "12-16 hours", nightSleep: "9-11 hours", daySleep: "3-5 hours (2-3 naps)" },
  { ageRange: [12, 24], label: "1-2 Years", totalSleep: "11-14 hours", nightSleep: "10-11 hours", daySleep: "2-3 hours (1-2 naps)" },
  { ageRange: [25, 36], label: "2-3 Years", totalSleep: "11-14 hours", nightSleep: "10-11 hours", daySleep: "1-3 hours (1 nap)" }, // Extended to 36 months for completeness
  // Add more ranges if needed for older toddlers/preschoolers
];

const SleepNeedsCalculator = ({ babyAgeInMonths }) => {
  const [calculatedNeeds, setCalculatedNeeds] = useState(null);
  const [customAge, setCustomAge] = useState(babyAgeInMonths !== null && babyAgeInMonths !== undefined ? String(babyAgeInMonths) : "");
  const [inputError, setInputError] = useState("");

  const calculateNeeds = (age) => {
    if (age === null || age === undefined || age === "") {
      setCalculatedNeeds(null);
      setInputError("");
      return;
    }
    const numericAge = parseInt(age);
    if (isNaN(numericAge) || numericAge < 0 || numericAge > 48) { // Assuming up to 4 years for this calculator
      setInputError("Please enter a valid age in months (0-48).");
      setCalculatedNeeds(null);
      return;
    }
    setInputError("");

    const needs = sleepNeedsData.find(data => numericAge >= data.ageRange[0] && numericAge <= data.ageRange[1]);
    setCalculatedNeeds(needs || { label: `${numericAge} Months`, totalSleep: "Varies (check with pediatrician)", nightSleep: "Varies", daySleep: "Varies", note: "Specific guidelines for this exact age may vary. These are general estimates." });
  };

  useEffect(() => {
    // Initialize with babyAgeInMonths from props if available
    if (babyAgeInMonths !== null && babyAgeInMonths !== undefined) {
      setCustomAge(String(babyAgeInMonths));
      calculateNeeds(babyAgeInMonths);
    }
  }, [babyAgeInMonths]);

  const handleAgeChange = (e) => {
    setCustomAge(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateNeeds(customAge);
  };

  return (
    <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-teal-800 mb-4">Personalized Sleep Needs Estimator</h4>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-3 mb-4">
        <div className="flex-grow w-full sm:w-auto">
          <label htmlFor="baby-age-input" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Baby/Toddler Age (in months):
          </label>
          <input 
            type="number" 
            id="baby-age-input"
            value={customAge}
            onChange={handleAgeChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            placeholder="e.g., 6"
            min="0"
            max="48" // Example max for this calculator
          />
        </div>
        <button 
          type="submit"
          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out"
        >
          Calculate Needs
        </button>
      </form>

      {inputError && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md mb-3">{inputError}</p>
      )}

      {calculatedNeeds && (
        <div className="p-4 bg-white rounded-md shadow border border-teal-100">
          <h5 className="text-md font-semibold text-teal-700 mb-2">Estimated Sleep Needs for {calculatedNeeds.label}:</h5>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><strong>Total Sleep in 24 Hours:</strong> {calculatedNeeds.totalSleep}</li>
            <li><strong>Nighttime Sleep:</strong> {calculatedNeeds.nightSleep}</li>
            <li><strong>Daytime Sleep (Naps):</strong> {calculatedNeeds.daySleep}</li>
          </ul>
          {calculatedNeeds.note && <p className="text-xs text-gray-500 mt-2"><em>{calculatedNeeds.note}</em></p>}
          <p className="text-xs text-gray-500 mt-3">
            <strong>Note:</strong> These are general guidelines. Individual sleep needs can vary. If you have concerns about your child’s sleep, please consult with a pediatrician or a qualified sleep consultant.
          </p>
        </div>
      )}
      {!calculatedNeeds && !inputError && (
         <p className="text-sm text-gray-600">Enter an age above to see estimated sleep needs.</p>
      )}
    </div>
  );
};

export default SleepNeedsCalculator;

