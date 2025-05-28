// /home/ubuntu/components/AdvancedFeaturesHub.js
import React from "react";

// Placeholder icons for the hub - can be replaced with actual icons or SVGs
const HubIcons = {
  growth: "🌱",
  wellness: "💖",
  planner: "📅",
  analyzer: "🔬",
  adaptive: "🧠"
};

const AdvancedFeaturesHub = ({ navigateToAdvancedFeaturePage }) => {
  const features = [
    {
      key: "growthDevelopmentMain",
      title: "Growth & Development Insights",
      description: "Track milestones, understand sleep regressions, and learn about baby development.",
      icon: HubIcons.growth,
      bgColor: "bg-green-100",
      hoverBgColor: "hover:bg-green-200",
      borderColor: "border-green-300",
      textColor: "text-green-700"
    },
    {
      key: "caregiverWellnessMain",
      title: "Caregiver Wellness Hub",
      description: "Access micro-meditations, planning tools, and self-care reminders.",
      icon: HubIcons.wellness,
      bgColor: "bg-purple-100",
      hoverBgColor: "hover:bg-purple-200",
      borderColor: "border-purple-300",
      textColor: "text-purple-700"
    },
    {
      key: "visualSleepPlannerMain",
      title: "Visual Sleep Plan Creator",
      description: "Design and print a custom visual bedtime routine for your child.",
      icon: HubIcons.planner,
      bgColor: "bg-blue-100",
      hoverBgColor: "hover:bg-blue-200",
      borderColor: "border-blue-300",
      textColor: "text-blue-700"
    },
    {
      key: "environmentAnalyzerMain",
      title: "Sleep Environment Analyzer",
      description: "Assess and optimize your baby’s sleep space for safety and comfort.",
      icon: HubIcons.analyzer,
      bgColor: "bg-teal-100",
      hoverBgColor: "hover:bg-teal-200",
      borderColor: "border-teal-300",
      textColor: "text-teal-700"
    },
    {
      key: "adaptiveInsightsMain",
      title: "Adaptive Sleep Insights",
      description: "Log techniques and get personalized suggestions based on what works.",
      icon: HubIcons.adaptive,
      bgColor: "bg-indigo-100",
      hoverBgColor: "hover:bg-indigo-200",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-700"
    }
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Advanced Insights & Tools</h2>
      <p className="text-center text-gray-600 mb-8">
        Explore these premium features designed to provide deeper understanding and practical tools for you and your baby&apos;s sleep journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <button
            key={feature.key}
            onClick={() => navigateToAdvancedFeaturePage(feature.key)}
            className={`p-6 rounded-lg shadow-lg border text-left transition-all duration-150 ease-in-out transform hover:scale-105 ${feature.bgColor} ${feature.hoverBgColor} ${feature.borderColor}`}
          >
            <div className="flex items-center mb-3">
              <span className="text-4xl mr-4">{feature.icon}</span>
              <h3 className={`text-xl font-semibold ${feature.textColor}`}>{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedFeaturesHub;

