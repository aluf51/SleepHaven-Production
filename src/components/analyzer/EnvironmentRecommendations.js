// /home/ubuntu/components/analyzer/EnvironmentRecommendations.js
import React from "react";
import { checklistQuestions } from "./EnvironmentChecklist"; // Import questions for ideal answers

const getRecommendations = (answers) => {
  const recommendations = [];

  // Light
  const lightAnswer = answers.q_light;
  if (!checklistQuestions.find(q=>q.id === "q_light").ideal.includes(lightAnswer)) {
    recommendations.push({
      id: "rec_light",
      category: "Light",
      text: "Aim for a pitch black or very dark room. Darkness promotes melatonin production, a key sleep hormone. Consider blackout curtains or blinds. Remove or cover any electronic lights.",
      severity: (lightAnswer === "somewhat_lit") ? "high" : "medium"
    });
  }

  // Noise
  const noiseAnswer = answers.q_noise;
  if (!checklistQuestions.find(q=>q.id === "q_noise").ideal.includes(noiseAnswer)) {
    recommendations.push({
      id: "rec_noise",
      category: "Noise",
      text: "A quiet environment or consistent white noise is best. Sudden or loud noises can disrupt sleep cycles. If the room is noisy, consider a white noise machine to mask disruptive sounds.",
      severity: (noiseAnswer === "frequent_disruptive") ? "high" : "medium"
    });
  }

  // Temperature
  const tempAnswer = answers.q_temp;
  if (!checklistQuestions.find(q=>q.id === "q_temp").ideal.includes(tempAnswer)) {
    recommendations.push({
      id: "rec_temp",
      category: "Temperature",
      text: "A cool room (around 18-22°C or 65-72°F) is generally recommended for optimal sleep. Overheating can lead to restlessness. Adjust thermostat, use fans, or appropriate sleepwear.",
      severity: (tempAnswer === "warm") ? "high" : "medium"
    });
  }

  // Crib Safety
  const cribAnswer = answers.q_crib_safety;
  if (!checklistQuestions.find(q=>q.id === "q_crib_safety").ideal.includes(cribAnswer)) {
    recommendations.push({
      id: "rec_crib",
      category: "Crib/Bed Safety",
      text: "The baby’s sleep space should be completely clear of loose bedding, pillows, bumpers, and soft toys to reduce the risk of SIDS and suffocation. Use only a firm mattress with a fitted sheet.",
      severity: "high"
    });
  }

  // Air Quality
  const airAnswer = answers.q_air_quality;
  if (!checklistQuestions.find(q=>q.id === "q_air_quality").ideal.includes(airAnswer)) {
    recommendations.push({
      id: "rec_air",
      category: "Air Quality",
      text: "Ensure good ventilation and avoid exposure to smoke or strong odors. Fresh air is important. If the air is dry, a humidifier might be helpful, especially in winter.",
      severity: (airAnswer === "poor_smoke") ? "high" : "medium"
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
        id: "rec_all_good",
        category: "Overall",
        text: "Great job! Based on your checklist, your baby’s sleep environment seems well-optimized according to general guidelines. Keep up the good work!",
        severity: "low" // or "none"
    });
  }

  return recommendations;
};

const EnvironmentRecommendations = ({ answers }) => {
  if (!answers || Object.keys(answers).length === 0) {
    return null; // Don't show if no answers yet
  }

  const recommendations = getRecommendations(answers);

  const severityStyles = {
    high: "border-red-500 bg-red-50 text-red-700",
    medium: "border-yellow-500 bg-yellow-50 text-yellow-700",
    low: "border-green-500 bg-green-50 text-green-700"
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Personalized Recommendations:</h4>
      {recommendations.length === 0 && (
        <p className="text-md text-green-700">Congratulations! Your sleep environment seems to meet all key recommendations.</p>
      )}
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className={`p-3 border-l-4 rounded-r-md ${severityStyles[rec.severity] || "border-gray-300 bg-gray-50 text-gray-700"}`}>
            <h5 className="font-medium">{rec.category}</h5>
            <p className="text-sm">{rec.text}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">These recommendations are based on general sleep guidelines. If you have specific concerns, consult with a pediatrician or certified sleep consultant.</p>
    </div>
  );
};

export default EnvironmentRecommendations;

