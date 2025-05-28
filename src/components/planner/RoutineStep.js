// /home/ubuntu/components/planner/RoutineStep.js
import React from "react";

// Placeholder icons - in a real app, these could be SVGs or from an icon library
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

const RoutineStep = ({ step, index, onUpdateStep, onRemoveStep, isDraggable }) => {
  if (!step) return null;

  const handleInputChange = (e) => {
    onUpdateStep(index, { ...step, [e.target.name]: e.target.value });
  };

  const handleIconChange = (e) => {
    onUpdateStep(index, { ...step, icon: e.target.value });
  };

  // In a real app, photo upload would involve more complex state management and API calls
  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateStep(index, { ...step, photoPlaceholder: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
      alert("Photo placeholder updated. In a real app, this would be uploaded and stored.");
    }
  };

  return (
    <div className={`p-3 mb-2 border rounded-lg shadow-sm flex items-start gap-3 ${isDraggable ? "cursor-grab bg-white hover:shadow-md" : "bg-gray-50"}`}>
      {isDraggable && <span className="text-gray-400 mt-1">⠿</span>} 
      <div className="flex-shrink-0 text-3xl pt-1">
        {step.icon ? icons[step.icon] || icons.custom : icons.custom}
      </div>
      <div className="flex-grow">
        <input 
          type="text"
          name="title"
          value={step.title}
          onChange={handleInputChange}
          placeholder="Step Title (e.g., Warm Bath)"
          className="w-full p-1 border-b border-gray-300 focus:border-blue-500 outline-none text-md font-medium mb-1"
        />
        <textarea 
          name="description"
          value={step.description}
          onChange={handleInputChange}
          placeholder="Optional: brief description or notes"
          rows={2}
          className="w-full p-1 border border-gray-200 rounded text-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
        />
        <div className="mt-2 flex flex-wrap gap-2 items-center">
          <div className="flex-grow">
            <label htmlFor={`icon-select-${index}`} className="text-xs text-gray-500 mr-1">Icon:</label>
            <select 
              id={`icon-select-${index}`}
              value={step.icon || "custom"}
              onChange={handleIconChange}
              className="p-1 border border-gray-200 rounded text-xs"
            >
              {Object.keys(icons).map(iconKey => (
                <option key={iconKey} value={iconKey}>{icons[iconKey]} {iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}</option>
              ))}
            </select>
          </div>
          {/* Conceptual Photo Upload - UI only */}
          <div className="flex-grow">
            <label htmlFor={`photo-upload-${index}`} className="text-xs text-gray-500 mr-1">Photo (optional):</label>
            <input 
              type="file"
              id={`photo-upload-${index}`}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="text-xs w-full max-w-xs"
            />
            {step.photoPlaceholder && <img src={step.photoPlaceholder} alt="Uploaded preview" className="mt-1 h-10 w-10 object-cover rounded"/>}
          </div>
        </div>
      </div>
      {isDraggable && (
        <button 
          onClick={() => onRemoveStep(index)}
          className="ml-2 p-1 text-red-500 hover:text-red-700 text-xs"
          aria-label="Remove step"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default RoutineStep;

