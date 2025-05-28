// /home/ubuntu/components/analyzer/EnvironmentChecklist.js
import React, { useState } from "react";

const checklistQuestions = [
  {
    id: "q_light",
    category: "Light",
    text: "How dark is the room during sleep times?",
    options: [
      { value: "pitch_black", label: "Pitch black (can't see your hand in front of your face)" },
      { value: "very_dark", label: "Very dark (shapes are barely visible)" },
      { value: "dimly_lit", label: "Dimly lit (e.g., nightlight, light from hallway)" },
      { value: "somewhat_lit", label: "Somewhat lit (e.g., streetlights, electronics)" }
    ],
    ideal: ["pitch_black", "very_dark"]
  },
  {
    id: "q_noise",
    category: "Noise",
    text: "What is the typical noise level in and around the room?",
    options: [
      { value: "very_quiet", label: "Very quiet (minimal to no noticeable sounds)" },
      { value: "white_noise", label: "Consistent white noise (e.g., fan, sound machine)" },
      { value: "occasional_soft", label: "Occasional soft noises (e.g., house settling, distant traffic)" },
      { value: "frequent_disruptive", label: "Frequent or disruptive noises (e.g., loud TV, talking, pets, traffic)" }
    ],
    ideal: ["very_quiet", "white_noise"]
  },
  {
    id: "q_temp",
    category: "Temperature",
    text: "What is the approximate room temperature?",
    options: [
      { value: "cool", label: "Cool (around 18-20°C / 65-68°F)" },
      { value: "moderate_cool", label: "Moderately cool (around 20-22°C / 68-72°F)" },
      { value: "warm", label: "Warm (above 22°C / 72°F)" },
      { value: "variable", label: "Variable / Unsure" }
    ],
    ideal: ["cool", "moderate_cool"]
  },
  {
    id: "q_crib_safety",
    category: "Crib/Bed Safety",
    text: "Is the baby's sleep space (crib/bassinet) clear of loose bedding, pillows, and soft toys?",
    options: [
      { value: "yes_clear", label: "Yes, completely clear (only a fitted sheet)" },
      { value: "mostly_clear", label: "Mostly clear, maybe one small approved item" },
      { value: "no_items_present", label: "No, there are blankets, bumpers, or toys" }
    ],
    ideal: ["yes_clear"]
  },
  {
    id: "q_air_quality",
    category: "Air Quality",
    text: "Is the room well-ventilated and free of strong odors or smoke?",
    options: [
      { value: "yes_good", label: "Yes, good air circulation, no odors/smoke" },
      { value: "fair_stuffy", label: "Fair, can sometimes be a bit stuffy or has mild odors" },
      { value: "poor_smoke", label: "Poor, often stuffy, noticeable odors, or exposure to smoke" }
    ],
    ideal: ["yes_good"]
  }
];

const EnvironmentChecklist = ({ onChecklistSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation: ensure all questions are answered
    if (Object.keys(answers).length < checklistQuestions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    onChecklistSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-green-800 mb-4">Sleep Environment Checklist</h4>
      <div className="space-y-6">
        {checklistQuestions.map(q => (
          <div key={q.id} className="p-3 bg-white border border-gray-200 rounded-md">
            <fieldset>
              <legend className="text-md font-medium text-gray-800 mb-2">{q.category}: {q.text}</legend>
              <div className="space-y-2">
                {q.options.map(opt => (
                  <label key={opt.value} className="flex items-center p-2 rounded-md hover:bg-green-50 cursor-pointer border border-transparent focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400">
                    <input 
                      type="radio"
                      name={q.id}
                      value={opt.value}
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleAnswerChange(q.id, opt.value)}
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500 mr-3"
                      required
                    />
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
      <button 
        type="submit"
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out"
      >
        Get My Environment Recommendations
      </button>
    </form>
  );
};

export { checklistQuestions }; // Export for use in Recommendations component
export default EnvironmentChecklist;

