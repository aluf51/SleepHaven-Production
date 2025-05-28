// /home/ubuntu/components/planner/PrintableRoutineView.js
import React from "react";

// Re-using icons definition from RoutineStep for consistency, or import if centralized
const icons = {
  bath: "🛁",
  story: "📚",
  lullaby: "🎶",
  feed: "🍼",
  cuddle: "🤗",
  diaper: "👶",
  pjs: "👕",
  teeth: "🦷",
  custom: "✨"
};

const PrintableRoutineView = React.forwardRef(({ plan }, ref) => {
  if (!plan || !plan.steps || plan.steps.length === 0) {
    return (
      <div ref={ref} className="p-8 text-center text-gray-500">
        <p>No sleep plan available to print. Please create a routine first.</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="printable-plan p-6 bg-white font-sans">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-plan, .printable-plan * {
              visibility: visible;
            }
            .printable-plan {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 20px;
              font-size: 12pt;
            }
            .printable-plan h1 {
              font-size: 20pt;
              text-align: center;
              margin-bottom: 20px;
              color: #333;
            }
            .printable-plan .step-card {
              border: 1px solid #ccc;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid; /* Try to keep steps on one page */
              background-color: #f9f9f9;
            }
            .printable-plan .step-header {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
            }
            .printable-plan .step-icon {
              font-size: 24pt;
              margin-right: 15px;
            }
            .printable-plan .step-title {
              font-size: 14pt;
              font-weight: bold;
              color: #444;
            }
            .printable-plan .step-description {
              font-size: 11pt;
              color: #555;
              white-space: pre-wrap; /* Preserve line breaks from textarea */
            }
            .printable-plan .step-photo {
                max-width: 100px; /* Adjust as needed */
                max-height: 100px;
                border-radius: 4px;
                margin-top: 8px;
                border: 1px solid #eee;
            }
            .no-print {
                display: none !important;
            }
          }
        `}
      </style>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">{plan.name || "My Sleep Routine"}</h1>
      <div className="space-y-4">
        {plan.steps.map((step, index) => (
          <div key={step.id || index} className="step-card border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="step-header flex items-center mb-2">
              <span className="step-icon text-4xl mr-4">{icons[step.icon] || icons.custom}</span>
              <h2 className="step-title text-xl font-semibold text-gray-700">{index + 1}. {step.title}</h2>
            </div>
            {step.description && (
              <p className="step-description text-sm text-gray-600 ml-12 whitespace-pre-wrap">{step.description}</p>
            )}
            {step.photoPlaceholder && (
                <div className="ml-12 mt-2">
                    <img src={step.photoPlaceholder} alt={`Visual for ${step.title}`} className="step-photo max-w-xs rounded-md border"/>
                </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center mt-8">Created with Your Sleep Consultant App</p>
    </div>
  );
});

PrintableRoutineView.displayName = "PrintableRoutineView";

export default PrintableRoutineView;

