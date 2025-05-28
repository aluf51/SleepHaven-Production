// /home/ubuntu/components/adaptive/AdaptiveRecommendations.js
import React from "react";

// This is a very simplified, rule-based recommendation engine for conceptual purposes.
// A true adaptive engine would involve more complex logic, possibly machine learning.

const getAdaptiveRecommendations = (loggedTechniques, babyAgeInMonths) => {
  const recommendations = [];
  const recentLogs = loggedTechniques.sort((a, b) => new Date(b.date) - new Date(a.date));
  const successfulRecentLogs = recentLogs.filter(log => log.effectiveness >= 4);

  if (successfulRecentLogs.length > 0) {
    const mostRecentSuccess = successfulRecentLogs[0];
    recommendations.push({
      id: "rec_repeat_success",
      text: `You recently found "${mostRecentSuccess.technique}" to be very effective on ${new Date(mostRecentSuccess.date).toLocaleDateString()}. Consider trying it again if circumstances are similar. Remember consistency can be helpful.`,
      type: "reminder"
    });
  }

  // Age-based suggestions (very basic examples)
  if (babyAgeInMonths !== null && babyAgeInMonths !== undefined) {
    const age = parseInt(babyAgeInMonths);
    if (age <= 3) {
      if (!recentLogs.some(log => log.technique.toLowerCase().includes("swaddling") && log.effectiveness >=4)) {
        recommendations.push({
          id: "rec_swaddle_young",
          text: "For babies under 3-4 months, swaddling can be very calming if they like it and it's done safely. Have you tried logging its effectiveness?",
          type: "suggestion"
        });
      }
    }
    if (age >= 4 && age <= 7) {
        if (!recentLogs.some(log => log.technique.toLowerCase().includes("routine") && log.effectiveness >=4)) {
            recommendations.push({
                id: "rec_routine_4_7",
                text: "Around 4-7 months, establishing a consistent bedtime routine becomes even more crucial as sleep patterns mature. Ensure your routine is predictable and calming.",
                type: "suggestion"
            });
        }
    }
    if (age >= 8) {
        if (recentLogs.some(log => log.technique.toLowerCase().includes("separation anxiety") && log.effectiveness < 3)) {
             // This is a placeholder for a more complex rule.
        } else if (!recentLogs.some(log => log.technique.toLowerCase().includes("object permanence"))) {
            recommendations.push({
                id: "rec_separation_anxiety",
                text: "As babies grow (8+ months), separation anxiety can sometimes impact sleep. Quick, reassuring checks can be helpful if this is the case. Consider logging specific approaches to manage this.",
                type: "suggestion"
            });
        }
    }
  }

  // General tip if few logs
  if (recentLogs.length < 3) {
    recommendations.push({
      id: "rec_log_more",
      text: "The more consistently you log techniques and their outcomes, the better insights you can gather over time. Keep logging to see patterns!",
      type: "encouragement"
    });
  }
  
  if (recommendations.length === 0) {
      recommendations.push({
          id: "rec_general_explore",
          text: "Explore different calming techniques and log what works best for your baby. Every baby is unique!",
          type: "general"
      });
  }

  // Limit to a few recommendations to avoid overwhelming the user
  return recommendations.slice(0, 3);
};

const AdaptiveRecommendations = ({ loggedTechniques, babyAgeInMonths }) => {
  if (!loggedTechniques) {
    return null; // Or a placeholder if needed before any logs exist
  }

  const recommendations = getAdaptiveRecommendations(loggedTechniques, babyAgeInMonths);

  if (recommendations.length === 0) {
    return (
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm mt-4">
        <h4 className="text-lg font-semibold text-purple-800 mb-2">Personalized Suggestions</h4>
        <p className="text-sm text-gray-600">Log techniques to start receiving personalized suggestions here.</p>
      </div>
    );
  }

  const typeStyles = {
    reminder: "bg-blue-100 text-blue-700 border-blue-300",
    suggestion: "bg-green-100 text-green-700 border-green-300",
    encouragement: "bg-yellow-100 text-yellow-700 border-yellow-300",
    general: "bg-gray-100 text-gray-700 border-gray-300"
  };

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-purple-800 mb-3">Personalized Sleep Insights & Suggestions</h4>
      <div className="space-y-3">
        {recommendations.map(rec => (
          <div key={rec.id} className={`p-3 border-l-4 rounded-r-md ${typeStyles[rec.type] || typeStyles.general}`}>
            <p className="text-sm">{rec.text}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Note: These suggestions are based on your logs and general patterns. This is a conceptual feature; a true adaptive engine would be more sophisticated.
      </p>
    </div>
  );
};

export default AdaptiveRecommendations;

