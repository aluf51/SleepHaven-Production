// /home/ubuntu/components/analyzer/EnvironmentAnalyzerPage.js
import React, { useState } from "react";
import SensorInfoPlaceholder from "./SensorInfoPlaceholder";
import EnvironmentChecklist from "./EnvironmentChecklist";
import EnvironmentRecommendations from "./EnvironmentRecommendations";

const EnvironmentAnalyzerPage = () => {
  const [checklistAnswers, setChecklistAnswers] = useState(null);

  const handleChecklistSubmit = (answers) => {
    setChecklistAnswers(answers);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sleep Environment Analyzer</h2>
      <p className="text-center text-gray-600 mb-8">
        Assess your baby&apos;s sleep environment to ensure it&apos;s safe, comfortable, and conducive to restful sleep. Answer the questions below to get personalized recommendations.
      </p>

      <SensorInfoPlaceholder />

      <EnvironmentChecklist onChecklistSubmit={handleChecklistSubmit} />

      {checklistAnswers && (
        <EnvironmentRecommendations answers={checklistAnswers} />
      )}
    </div>
  );
};

export default EnvironmentAnalyzerPage;

