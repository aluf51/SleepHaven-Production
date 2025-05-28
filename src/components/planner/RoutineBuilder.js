// /home/ubuntu/components/planner/RoutineBuilder.js
import React, { useState, useEffect } from "react";
import RoutineStep from "./RoutineStep";

// Simulating dnd-kit or react-beautiful-dnd functionality conceptually
// In a real app, you would import from the chosen library:
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

const initialPredefinedSteps = [
  { id: "pre_bath", type: "bath", title: "Warm Bath", description: "A calming bath to relax before bed.", icon: "bath" },
  { id: "pre_pjs", type: "pjs", title: "Pajamas & Diaper", description: "Get comfy in fresh pajamas and a clean diaper.", icon: "pjs" },
  { id: "pre_teeth", type: "teeth", title: "Brush Teeth", description: "Gentle tooth brushing.", icon: "teeth" },
  { id: "pre_story", type: "story", title: "Quiet Story Time", description: "Read a calm book together.", icon: "story" },
  { id: "pre_feed", type: "feed", title: "Final Feed", description: "A top-up feed if needed.", icon: "feed" },
  { id: "pre_lullaby", type: "lullaby", title: "Lullaby/Song", description: "Sing a gentle song.", icon: "lullaby" },
  { id: "pre_cuddle", type: "cuddle", title: "Cuddles & Comfort", description: "Quiet cuddles and reassurance.", icon: "cuddle" },
  { id: "pre_custom", type: "custom", title: "Custom Step", description: "Add your own activity.", icon: "custom" }
];

// Conceptual SortableItem for dnd-kit simulation
const SortableItem = ({ id, step, index, onUpdateStep, onRemoveStep }) => {
  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };
  // In this simulation, we don\'t apply dnd-kit specific props like setNodeRef, listeners, etc.
  return (
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <div>
      <RoutineStep step={step} index={index} onUpdateStep={onUpdateStep} onRemoveStep={onRemoveStep} isDraggable={true} />
    </div>
  );
};

const RoutineBuilder = ({ onPlanSave }) => {
  const [routineSteps, setRoutineSteps] = useState([]);
  const [planName, setPlanName] = useState("My Bedtime Routine");

  // Conceptual: dnd-kit sensors
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  // );

  useEffect(() => {
    // Load saved routine from local storage (or mock API)
    const savedRoutine = localStorage.getItem("visualSleepPlan_routineSteps");
    const savedPlanName = localStorage.getItem("visualSleepPlan_planName");
    if (savedRoutine) {
      setRoutineSteps(JSON.parse(savedRoutine));
    }
    if (savedPlanName) {
      setPlanName(savedPlanName);
    }
  }, []);

  const saveRoutineToLocalStorage = (name, steps) => {
    localStorage.setItem("visualSleepPlan_planName", name);
    localStorage.setItem("visualSleepPlan_routineSteps", JSON.stringify(steps));
  };

  const addStepFromPredefined = (predefinedStep) => {
    const newStep = { 
        ...predefinedStep, 
        id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Unique ID for dnd
        photoPlaceholder: null // Initialize photo placeholder
    };
    const newSteps = [...routineSteps, newStep];
    setRoutineSteps(newSteps);
    saveRoutineToLocalStorage(planName, newSteps);
  };

  const updateStep = (index, updatedStep) => {
    const newSteps = routineSteps.map((step, i) => i === index ? updatedStep : step);
    setRoutineSteps(newSteps);
    saveRoutineToLocalStorage(planName, newSteps);
  };

  const removeStep = (index) => {
    const newSteps = routineSteps.filter((_, i) => i !== index);
    setRoutineSteps(newSteps);
    saveRoutineToLocalStorage(planName, newSteps);
  };

  // Conceptual: dnd-kit handleDragEnd
  const handleDragEnd = (event) => {
    // const { active, over } = event;
    // if (active.id !== over.id) {
    //   setRoutineSteps((items) => {
    //     const oldIndex = items.findIndex(item => item.id === active.id);
    //     const newIndex = items.findIndex(item => item.id === over.id);
    //     const movedItems = arrayMove(items, oldIndex, newIndex);
    //     saveRoutineToLocalStorage(planName, movedItems); 
    //     return movedItems;
    //   });
    // }
    alert("Drag-and-drop simulated. In a real app, item order would change here.");
  };

  const handleSavePlan = () => {
    saveRoutineToLocalStorage(planName, routineSteps);
    onPlanSave({ name: planName, steps: routineSteps });
    alert("Plan saved! (Locally for this demo)");
  };

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold text-blue-800 mb-2">Build Your Visual Sleep Routine</h4>
      <input 
        type="text"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
        placeholder="Name Your Sleep Plan"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Predefined Steps */} 
        <div className="md:col-span-1 p-3 bg-gray-100 rounded-lg border border-gray-200">
          <h5 className="text-md font-medium text-gray-700 mb-2">Add Routine Steps:</h5>
          <div className="space-y-2">
            {initialPredefinedSteps.map(pStep => (
              <button 
                key={pStep.id}
                onClick={() => addStepFromPredefined(pStep)}
                className="w-full text-left p-2 bg-white hover:bg-blue-100 border border-gray-300 rounded-md shadow-sm text-sm flex items-center gap-2"
              >
                <span className="text-xl">{RoutineStep.icons ? RoutineStep.icons[pStep.icon] || RoutineStep.icons.custom : "✨"}</span> 
                {pStep.title}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Routine Builder (Drag & Drop Area) */} 
        <div className="md:col-span-2 p-3 bg-white rounded-lg border border-gray-300 min-h-[200px]">
          <h5 className="text-md font-medium text-gray-700 mb-2">Your Routine (Drag to reorder):</h5>
          {/* Conceptual DndContext and SortableContext wrapping */}
          {/* <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}> */}
          {/*   <SortableContext items={routineSteps.map(s => s.id)} strategy={verticalListSortingStrategy}> */}
          {routineSteps.length > 0 ? (
            routineSteps.map((step, index) => (
              // In a real dnd-kit setup, SortableItem would be used here
              // <SortableItem key={step.id} id={step.id} step={step} index={index} onUpdateStep={updateStep} onRemoveStep={removeStep} />
              <div key={step.id} onClick={handleDragEnd} title="Click to simulate drag-end reorder event">
                 <RoutineStep step={step} index={index} onUpdateStep={updateStep} onRemoveStep={removeStep} isDraggable={true} />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-10">Add steps from the left panel to build your routine.</p>
          )}
          {/*   </SortableContext> */}
          {/* </DndContext> */}
        </div>
      </div>

      <button 
        onClick={handleSavePlan}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out"
      >
        Save Sleep Plan
      </button>
    </div>
  );
};

export default RoutineBuilder;

