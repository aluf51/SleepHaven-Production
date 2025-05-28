// /home/ubuntu/components/growth/BrainDevelopmentInfo.js
import React, { useState, useEffect } from 'react';

// Mock data for brain development topics
const brainDevTopics = {
  newborn: {
    title: "Newborn Brain Development & Sleep",
    content: "A newborn's brain is rapidly developing, and so are their sleep patterns. Sleep is crucial for this growth, helping to consolidate memories and process new information. Newborns spend a significant amount of time in REM (Rapid Eye Movement) sleep, which is vital for brain maturation.\n\nKey points:\n- Sleep cycles are short, around 45-60 minutes.\n- They may not distinguish day from night initially.\n- Frequent waking for feeds is normal and necessary for growth.",
    source: "Neuroscience for Kids"
  },
  infant_3_6_months: {
    title: "Brain Development at 3-6 Months & Sleep Changes",
    content: "Around 3-4 months, babies' sleep cycles start to mature and lengthen, becoming more like adult sleep. This is often when the '4-month sleep regression' occurs. Their brain is developing more organized sleep-wake rhythms (circadian rhythms).\n\nKey points:\n- Sleep cycles lengthen to about 90 minutes.\n- More defined periods of light and deep sleep emerge.\n- The brain starts to consolidate sleep into longer stretches, especially at night.",
    source: "Understanding Childhood Development"
  },
  infant_6_12_months: {
    title: "Cognitive Leaps at 6-12 Months & Sleep",
    content: "This period is marked by significant cognitive milestones like object permanence and the beginnings of understanding cause and effect. These developmental leaps can sometimes temporarily disrupt sleep as babies process new skills and information. Separation anxiety may also emerge as their understanding of presence and absence develops.\n\nKey points:\n- Increased brain activity during wakefulness can sometimes make settling harder.\n- Dreams may become more vivid.\n- Consistent routines help provide security during these cognitive shifts.",
    source: "The Developing Mind Journal"
  },
  toddler_12_24_months: {
    title: "Toddler Brain Growth & Sleep Patterns",
    content: "Language development explodes during this time, and toddlers are learning rapidly about the world. Their brains are still working hard during sleep to process these experiences. Naps remain important for cognitive function and mood regulation.\n\nKey points:\n- Sleep helps with language acquisition and memory consolidation.\n- Nightmares or night terrors can occasionally occur as imagination develops.\n- Resistance to bedtime can be common as toddlers assert their independence.",
    source: "Toddler Brain Development Quarterly"
  }
};

const BrainDevelopmentInfo = ({ babyAgeInMonths }) => {
  const [selectedTopicKey, setSelectedTopicKey] = useState("");

  useEffect(() => {
    if (babyAgeInMonths === null || babyAgeInMonths === undefined) {
      setSelectedTopicKey("");
      return;
    }
    const age = parseInt(babyAgeInMonths);
    if (age < 3) {
      setSelectedTopicKey("newborn");
    } else if (age >= 3 && age < 6) {
      setSelectedTopicKey("infant_3_6_months");
    } else if (age >= 6 && age < 12) {
      setSelectedTopicKey("infant_6_12_months");
    } else if (age >= 12 && age <= 24) {
      setSelectedTopicKey("toddler_12_24_months");
    } else {
      setSelectedTopicKey(""); // Default or for ages outside defined ranges
    }
  }, [babyAgeInMonths]);

  const currentTopic = selectedTopicKey ? brainDevTopics[selectedTopicKey] : null;

  if (!currentTopic) {
    if (babyAgeInMonths !== null && babyAgeInMonths !== undefined) {
        return (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg mt-4">
                <h4 className="font-semibold text-indigo-700 mb-2">Brain Development & Sleep</h4>
                <p className="text-sm text-indigo-600">Information on brain development and sleep for {babyAgeInMonths} months will be available soon. Sleep is vital at every stage for growth and learning!</p>
            </div>
        );
    }
    return null; // Don't show if no age or no matching topic
  }

  return (
    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm mt-4">
      <h4 className="text-lg font-semibold text-indigo-800 mb-3">Brain Development & Sleep at ~{babyAgeInMonths} Months</h4>
      <div className="mb-3">
        <h5 className="font-medium text-indigo-700">{currentTopic.title}</h5>
        <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{currentTopic.content}</p>
        {currentTopic.source && <p className="text-xs text-gray-500 mt-2"><em>Source: {currentTopic.source}</em></p>}
      </div>
      {/* Optionally, add a selector if multiple topics could be relevant or for general browsing */}
    </div>
  );
};

export default BrainDevelopmentInfo;

