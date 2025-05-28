// /home/ubuntu/components/wellness/TagTeamPlanner.js
import React, { useState, useEffect } from "react";

// Helper to get dates for the week
const getWeekDates = (startDate = new Date()) => {
  const dates = [];
  const currentDay = startDate.getDay(); // 0 (Sun) - 6 (Sat)
  const firstDayOfWeek = new Date(startDate);
  firstDayOfWeek.setDate(startDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Adjust to start on Monday

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    dates.push(day);
  }
  return dates;
};

const timeSlots = [
  "10 PM - 1 AM",
  "1 AM - 4 AM",
  "4 AM - 7 AM",
  "Other (Specify)"
];

const caregivers = ["Parent 1", "Parent 2", "Other"]; // Customizable in a real app

const TagTeamPlanner = () => {
  const [weekDates, setWeekDates] = useState(getWeekDates());
  const [schedule, setSchedule] = useState({}); // { "YYYY-MM-DD_slot": { caregiver: "", notes: "" } }
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  useEffect(() => {
    // Load schedule from local storage (or mock API)
    const savedSchedule = localStorage.getItem("tagTeamSchedule");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  useEffect(() => {
    // Save schedule to local storage whenever it changes
    localStorage.setItem("tagTeamSchedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleScheduleChange = (dateKey, slot, field, value) => {
    const key = `${dateKey}_${slot}`;
    setSchedule(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [field]: value
      }
    }));
  };

  const changeWeek = (offset) => {
    const newOffset = currentWeekOffset + offset;
    const newStartDate = new Date();
    newStartDate.setDate(newStartDate.getDate() + newOffset * 7);
    setWeekDates(getWeekDates(newStartDate));
    setCurrentWeekOffset(newOffset);
  };

  const formatDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-sky-800 mb-4">Night Duty Tag-Team Planner</h4>
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeWeek(-1)} className="px-3 py-1 bg-sky-200 text-sky-700 rounded hover:bg-sky-300 text-sm">&larr; Previous Week</button>
        <h5 className="text-md font-medium text-sky-700">
          Week of {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </h5>
        <button onClick={() => changeWeek(1)} className="px-3 py-1 bg-sky-200 text-sky-700 rounded hover:bg-sky-300 text-sm">Next Week &rarr;</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300 text-left text-sm font-medium text-gray-600">Time Slot</th>
              {weekDates.map(date => (
                <th key={formatDateKey(date)} className="p-2 border border-gray-300 text-center text-sm font-medium text-gray-600">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}<br/>
                  <span className="text-xs">{date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => (
              <tr key={slot} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 text-sm text-gray-700 font-medium align-top">{slot}</td>
                {weekDates.map(date => {
                  const dateKey = formatDateKey(date);
                  const entryKey = `${dateKey}_${slot}`;
                  const currentEntry = schedule[entryKey] || { caregiver: "", notes: "" };
                  return (
                    <td key={dateKey} className="p-2 border border-gray-300 align-top w-1/7">
                      <select 
                        value={currentEntry.caregiver}
                        onChange={(e) => handleScheduleChange(dateKey, slot, "caregiver", e.target.value)}
                        className="w-full p-1 mb-1 border border-gray-200 rounded text-xs focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="">Assign...</option>
                        {caregivers.map(cg => <option key={cg} value={cg}>{cg}</option>)}
                      </select>
                      <textarea 
                        value={currentEntry.notes}
                        onChange={(e) => handleScheduleChange(dateKey, slot, "notes", e.target.value)}
                        placeholder="Notes..."
                        rows={2}
                        className="w-full p-1 border border-gray-200 rounded text-xs focus:ring-sky-500 focus:border-sky-500"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">Planner data is saved in your browser&apos;s local storage. Clear browser data to reset.</p>
    </div>
  );
};

export default TagTeamPlanner;

