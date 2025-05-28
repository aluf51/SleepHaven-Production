// /home/ubuntu/components/growth/RegressionPredictor.js
import React, { useState, useEffect } from 'react';

// Mock API service for regressions
const mockApiService = {
  getRegressions: async (babyAgeMonths) => {
    console.log(`Fetching regressions for age: ${babyAgeMonths} months`);
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API delay

    const allRegressions = [
      {
        name: "4-Month Sleep Regression",
        ageRange: [3, 5], // months
        description: "This is often the first major sleep disruption. It occurs as your baby\'s sleep cycles mature, becoming more like adult sleep. They may wake more frequently between cycles.",
        tips: [
          "Focus on consistent bedtime routines.",
          "Encourage self-soothing skills if appropriate for your family.",
          "Ensure adequate daytime sleep to avoid overtiredness.",
          "Be patient; this is a developmental phase."
        ],
        source: "The Sleep Foundation"
      },
      {
        name: "6-Month Sleep Regression (Often related to milestones)",
        ageRange: [5, 7],
        description: "Sometimes linked to major developmental leaps like sitting up or increased babbling. Separation anxiety can also play a role.",
        tips: [
          "Provide plenty of floor time during the day to practice new skills.",
          "Offer extra comfort and reassurance if separation anxiety is present.",
          "Maintain consistency with sleep schedules and routines."
        ],
        source: "Parenting Science"
      },
      {
        name: "8-10 Month Sleep Regression",
        ageRange: [8, 10],
        description: "Often tied to crawling, pulling up, and increased separation anxiety. Naps can also become challenging during this period.",
        tips: [
          "Ensure a safe sleep space for newly mobile babies.",
          "Stick to nap routines even if they are resisted.",
          "Play peek-a-boo during the day to help with object permanence and separation anxiety."
        ],
        source: "HealthyChildren.org (AAP)"
      },
      {
        name: "12-Month Sleep Regression (Often related to walking)",
        ageRange: [11, 13],
        description: "Learning to walk is a huge milestone that can temporarily disrupt sleep. Some toddlers may also try to drop a nap too soon.",
        tips: [
          "Don\'t assume your baby is ready to drop to one nap just yet; many still need two.",
          "Provide ample opportunities for walking practice during the day.",
          "Keep routines predictable."
        ],
        source: "What to Expect"
      },
      {
        name: "18-Month Sleep Regression",
        ageRange: [17, 19],
        description: "Often characterized by nap refusal and increased independence/testing boundaries. Teething (molars) and separation anxiety can also contribute.",
        tips: [
          "Offer choices where appropriate (e.g., which pajamas, which book) to foster independence.",
          "Stay firm and consistent with bedtime rules and nap schedules.",
          "Rule out discomfort from teething."
        ],
        source: "The Baby Sleep Site"
      },
      {
        name: "2-Year Sleep Regression (Often related to life changes)",
        ageRange: [23, 25], // Around 2 years old
        description: "Can be triggered by potty training, transitioning to a toddler bed, arrival of a new sibling, or developing fears (like fear of the dark). Nightmares can also start.",
        tips: [
          "Address any underlying fears or anxieties with reassurance.",
          "Introduce a nightlight if fear of the dark is an issue.",
          "Maintain a calming and consistent bedtime routine.",
          "If transitioning to a bed, ensure the room is fully childproofed."
        ],
        source: "Zero to Three"
      }
    ];

    return allRegressions.filter(r => babyAgeMonths >= r.ageRange[0] && babyAgeMonths <= r.ageRange[1]);
  }
};

const RegressionPredictor = ({ babyAgeInMonths }) => {
  const [predictedRegressions, setPredictedRegressions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (babyAgeInMonths === null || babyAgeInMonths === undefined) {
      setPredictedRegressions([]);
      return;
    }

    const fetchRegressions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const regressions = await mockApiService.getRegressions(parseInt(babyAgeInMonths));
        setPredictedRegressions(regressions);
      } catch (err) {
        console.error("Error fetching regressions:", err);
        setError("Could not load sleep regression information at this time.");
      }
      setIsLoading(false);
    };

    fetchRegressions();
  }, [babyAgeInMonths]);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Checking for potential sleep regressions...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500 bg-red-50 rounded-md">{error}</div>;
  }

  if (predictedRegressions.length === 0 && babyAgeInMonths !== null && babyAgeInMonths !== undefined) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-4">
        <h4 className="font-semibold text-green-700 mb-2">Sleep Regression Watch</h4>
        <p className="text-sm text-green-600">No common sleep regressions are typically pinpointed for {babyAgeInMonths} months. However, individual variations occur. If you notice sleep changes, consider recent developmental leaps or routine adjustments.</p>
      </div>
    );
  }
  
  if (predictedRegressions.length === 0) {
      return null;
  }

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-orange-800 mb-3">Potential Sleep Regression Alert for ~{babyAgeInMonths} Months:</h4>
      {predictedRegressions.map((regression, index) => (
        <div key={index} className="mb-4 pb-3 border-b border-orange-100 last:border-b-0 last:mb-0 last:pb-0">
          <h5 className="font-medium text-orange-700">{regression.name}</h5>
          <p className="text-sm text-gray-700 mt-1">{regression.description}</p>
          {regression.tips && regression.tips.length > 0 && (
            <div className="mt-2">
              <h6 className="text-xs font-semibold text-gray-600 mb-1">Tips to Navigate:</h6>
              <ul className="list-disc list-inside pl-1 space-y-1">
                {regression.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-xs text-gray-600">{tip}</li>
                ))}
              </ul>
            </div>
          )}
          {regression.source && <p className="text-xs text-gray-500 mt-2"><em>Source: {regression.source}</em></p>}
        </div>
      ))}
    </div>
  );
};

export default RegressionPredictor;

