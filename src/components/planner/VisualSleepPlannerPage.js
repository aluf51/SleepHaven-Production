// /home/ubuntu/components/planner/VisualSleepPlannerPage.js
import React, { useState, useRef, useEffect } from "react";
import RoutineBuilder from "./RoutineBuilder";
import PrintableRoutineView from "./PrintableRoutineView";
// import { useReactToPrint } from "react-to-print"; // In a real app

const VisualSleepPlannerPage = () => {
  const [currentPlan, setCurrentPlan] = useState({ name: "My Bedtime Routine", steps: [] });
  const printableComponentRef = useRef();

  useEffect(() => {
    // Load the last saved plan when the page mounts
    const savedRoutine = localStorage.getItem("visualSleepPlan_routineSteps");
    const savedPlanName = localStorage.getItem("visualSleepPlan_planName");
    if (savedRoutine) {
      setCurrentPlan({ 
        name: savedPlanName || "My Bedtime Routine", 
        steps: JSON.parse(savedRoutine) 
      });
    }
  }, []);

  const handlePlanSave = (plan) => {
    setCurrentPlan(plan);
    // The RoutineBuilder already saves to localStorage, so this primarily updates the state for printing
    console.log("Plan updated in VisualSleepPlannerPage:", plan);
  };

  // Conceptual: react-to-print hook
  // const handlePrint = useReactToPrint({
  //   content: () => printableComponentRef.current,
  //   documentTitle: currentPlan.name || "Sleep Plan",
  // });
  
  // Simulated print function
  const handlePrint = () => {
    if (printableComponentRef.current) {
        // In a real scenario with react-to-print, the library handles this.
        // For simulation, we can just log or show an alert.
        alert(`Printing "${currentPlan.name}"... (Conceptual: This would trigger browser print dialog with the formatted plan.)`);
        // A more advanced simulation might try to open a new window with the printable content,
        // but that can be blocked by pop-up blockers and is complex for this conceptual phase.
        // const printWindow = window.open("", "_blank");
        // printWindow.document.write("<html><head><title>Print</title></head><body>");
        // printWindow.document.write(printableComponentRef.current.innerHTML);
        // printWindow.document.write("</body></html>");
        // printWindow.document.close();
        // printWindow.print();
    } else {
        alert("No plan content available to print.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Visual Sleep Plan Creator</h2>
      <p className="text-center text-gray-600 mb-8">
        Design a personalized bedtime routine for your little one. Drag and drop steps, customize details, and print your plan!
      </p>

      <RoutineBuilder onPlanSave={handlePlanSave} />

      {currentPlan && currentPlan.steps && currentPlan.steps.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Preview & Print Your Plan</h3>
          <div className="border border-gray-300 rounded-md p-1 max-h-96 overflow-y-auto bg-white shadow-inner">
            {/* This instance of PrintableRoutineView is for on-screen preview, not direct printing via ref yet */}
            <PrintableRoutineView plan={currentPlan} />
          </div>
          <button 
            onClick={handlePrint}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out"
          >
            Print Routine Chart
          </button>
        </div>
      )}

      {/* Hidden component for actual printing process, used by react-to-print */}
      <div style={{ display: "none" }}>
        <PrintableRoutineView ref={printableComponentRef} plan={currentPlan} />
      </div>
    </div>
  );
};

export default VisualSleepPlannerPage;

