// /home/ubuntu/components/growth/MilestoneAlerts.js
import React, { useState, useEffect } from 'react';

// Mock API service for milestones
const mockApiService = {
  getMilestones: async (babyAgeMonths) => {
    console.log(`Fetching milestones for age: ${babyAgeMonths} months`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    const allMilestones = [
      {
        ageRange: [0, 2], // months
        milestone: "Learning to distinguish day and night",
        sleepImpact: "May have irregular sleep patterns. Focus on establishing a calming bedtime routine and exposing to natural light during the day.",
        source: "Pediatric Sleep Council"
      },
      {
        ageRange: [2, 4],
        milestone: "Developing more regular sleep-wake cycles",
        sleepImpact: "Sleep may become more predictable. Continue consistent routines. Some babies start sleeping longer stretches at night.",
        source: "Child Development Institute"
      },
      {
        ageRange: [3, 5],
        milestone: "Possible 4-month sleep regression (maturing sleep cycles)",
        sleepImpact: "May experience more frequent night wakings as sleep cycles change. Patience and consistency are key. Reinforce self-soothing if appropriate.",
        source: "Expert Sleep Resources"
      },
      {
        ageRange: [4, 7],
        milestone: "Learning to roll over",
        sleepImpact: "May wake up if they roll into an unfamiliar position. Ensure a safe sleep space. Some babies may practice rolling in their crib.",
        source: "Pediatric Academy"
      },
      {
        ageRange: [6, 9],
        milestone: "Starting solid foods",
        sleepImpact: "Generally doesn't disrupt night sleep if introduced gradually. Some digestive changes possible initially. Avoid introducing new foods right before bedtime.",
        source: "Nutrition & Sleep Org"
      },
      {
        ageRange: [6, 10],
        milestone: "Developing object permanence & separation anxiety",
        sleepImpact: "May resist bedtime or cry when you leave the room. Offer reassurance and a consistent, loving bedtime routine.",
        source: "Child Psychology Today"
      },
      {
        ageRange: [7, 10],
        milestone: "Learning to sit independently",
        sleepImpact: "Usually minimal impact on sleep, but some babies might practice sitting in the crib if they wake up.",
        source: "Developmental Milestones Guide"
      },
      {
        ageRange: [8, 12],
        milestone: "Learning to crawl, pull up, and cruise",
        sleepImpact: "Increased mobility can lead to more activity in the crib if they wake. Ensure the crib is safe. They might be too excited to settle easily.",
        source: "Active Baby Magazine"
      },
      {
        ageRange: [5, 12], // Wide range for teething
        milestone: "Teething (first teeth typically appear)",
        sleepImpact: "Can cause discomfort, leading to fussiness and night wakings. Offer comfort, consider teething remedies recommended by your pediatrician.",
        source: "Dental Health for Babies"
      },
      {
        ageRange: [10, 14],
        milestone: "Learning to walk",
        sleepImpact: "Similar to crawling, excitement and practicing new skills can sometimes delay sleep or cause brief awakenings.",
        source: "Toddler Development Journal"
      }
    ];

    return allMilestones.filter(m => babyAgeMonths >= m.ageRange[0] && babyAgeMonths <= m.ageRange[1]);
  }
};

const MilestoneAlerts = ({ babyAgeInMonths }) => {
  const [relevantMilestones, setRelevantMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (babyAgeInMonths === null || babyAgeInMonths === undefined) {
      // setError("Baby's age is required to fetch milestones.");
      setRelevantMilestones([]); // Clear milestones if age is not set
      return;
    }

    const fetchMilestones = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const milestones = await mockApiService.getMilestones(parseInt(babyAgeInMonths));
        setRelevantMilestones(milestones);
      } catch (err) {
        console.error("Error fetching milestones:", err);
        setError("Could not load developmental milestones at this time.");
      }
      setIsLoading(false);
    };

    fetchMilestones();
  }, [babyAgeInMonths]);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Loading developmental milestones...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500 bg-red-50 rounded-md">{error}</div>;
  }

  if (relevantMilestones.length === 0 && babyAgeInMonths !== null && babyAgeInMonths !== undefined) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-700 mb-2">Developmental Milestones</h4>
        <p className="text-sm text-blue-600">No specific major sleep-impacting milestones typically pinpointed for {babyAgeInMonths} months, or your little one is between common milestone periods. Continue focusing on consistent routines and a healthy sleep environment.</p>
      </div>
    );
  }
  
  if (relevantMilestones.length === 0) {
      return null; // Don't show anything if age is not set yet or no milestones
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold text-blue-800 mb-3">Heads Up! Developmental Milestones Around {babyAgeInMonths} Months:</h4>
      {relevantMilestones.map((item, index) => (
        <div key={index} className="mb-4 pb-3 border-b border-blue-100 last:border-b-0 last:mb-0 last:pb-0">
          <h5 className="font-medium text-blue-700">{item.milestone}</h5>
          {item.sleepImpact && <p className="text-sm text-gray-700 mt-1"><strong className='font-medium'>Potential Sleep Impact:</strong> {item.sleepImpact}</p>}
          {item.source && <p className="text-xs text-gray-500 mt-1"><em>Source: {item.source}</em></p>}
        </div>
      ))}
    </div>
  );
};

export default MilestoneAlerts;

