import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import MargaretAvatar from './MargaretAvatar'; // Import the avatar component

const questionCategories = {
  sleepEnvironment: {
    title: 'Sleep Environment',
    questions: [
      { id: 'q1_env_location', text: 'Where does {babyName} currently sleep? (e.g., own crib/room, your room)', type: 'text' },
      { id: 'q2_env_description', text: 'How would you describe {babyName}\'s sleep environment? (e.g., dark, quiet, cool)', type: 'text' },
      { id: 'q3_env_aids', text: 'Do you currently use any sleep aids like white noise, swaddles, or pacifiers?', type: 'text' },
    ],
  },
  sleepPattern: {
    title: 'Sleep Patterns',
    questions: [
      { id: 'q4_pattern_24hr', text: 'Could you describe a typical 24 hours with {babyName}? (When do they usually wake up, nap, go to bed?)', type: 'textarea' },
      { id: 'q5_pattern_fallasleep', text: 'How long does it typically take {babyName} to fall asleep at bedtime?', type: 'text' },
      { id: 'q6_pattern_nightwakes', text: 'What happens when {babyName} wakes during the night? How do you respond?', type: 'textarea' },
    ],
  },
  parentingPhilosophy: {
    title: 'Your Parenting Style',
    questions: [
      { id: 'q7_philosophy_approach', text: 'Some parents prefer a gradual approach to sleep training, while others prefer a more structured method. What feels right for your family?', type: 'text' },
      { id: 'q8_philosophy_crying', text: 'On a scale of 1-5, how comfortable are you with {babyName} crying for short periods while learning to self-soothe? (1=Not at all, 5=Very comfortable)', type: 'rating', max: 5 },
      { id: 'q9_philosophy_tried', text: 'What sleep strategies have you tried before, and what was your experience?', type: 'textarea' },
    ],
  },
  babyTemperament: {
    title: 'Baby\'s Temperament',    questions: [
      { id: 'q10_temperament_general', text: 'Would you describe {babyName} as generally relaxed, sensitive, or somewhere in between?', type: 'text' },
      { id: 'q11_temperament_routine', text: 'How does {babyName} typically respond to changes in routine?', type: 'text' },
      { id: 'q12_temperament_soothing', text: 'What soothes {babyName} most effectively when they\\\'re upset?', type: 'text' },
    ],
  },
};

const DeepDiveQuestions = ({ onComplete, babyName }) => {
  const { currentTheme } = useContext(AppContext);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const categoryOrder = ['sleepEnvironment', 'sleepPattern', 'parentingPhilosophy', 'babyTemperament'];
  const currentCategoryKey = categoryOrder[currentCategoryIndex];
  const currentCategory = questionCategories[currentCategoryKey];
  const currentQuestion = currentCategory.questions[currentQuestionIndex];

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const formatQuestionText = (text) => {
    return text.replace('{babyName}', babyName || 'your baby');
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentCategoryIndex < categoryOrder.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentCategoryIndex > 0) {
      const prevCategoryKey = categoryOrder[currentCategoryIndex - 1];
      setCurrentCategoryIndex(prev => prev - 1);
      setCurrentQuestionIndex(questionCategories[prevCategoryKey].questions.length - 1);
    }
  };
  
  const progress = ((currentCategoryIndex * 100) / categoryOrder.length) + (((currentQuestionIndex + 1) * 100) / currentCategory.questions.length) / categoryOrder.length;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8 flex flex-col h-full"
      style={{ color: currentTheme.textColor, fontFamily: currentTheme.fontFamilyBody }}
    >
      <MargaretAvatar theme={currentTheme} size={80} /> {/* Added Margaret's Avatar */}
      <h2 className="text-xl md:text-2xl font-semibold mt-3 mb-2 text-center" style={{ fontFamily: currentTheme.fontFamilyHeadings, color: currentTheme.headingColor }}>
        {currentCategory.title}
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700" style={{backgroundColor: currentTheme.cardBorderColor}}>
        <div className="h-2.5 rounded-full" style={{ width: `${progress}%`, backgroundColor: currentTheme.primaryColor, transition: 'width 0.3s ease-in-out' }}></div>
      </div>

      <div className="flex-grow mb-6">
        <label htmlFor={currentQuestion.id} className="block mb-3 text-md md:text-lg font-medium" style={{ color: currentTheme.textColor }}>
          {formatQuestionText(currentQuestion.text)}
        </label>
        {currentQuestion.type === 'text' && (
          <input 
            type="text" 
            id={currentQuestion.id} 
            value={answers[currentQuestion.id] || ''} 
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={{
              borderColor: currentTheme.cardBorderColor,
              backgroundColor: currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor,
              color: currentTheme.textColor,
              outlineColor: currentTheme.primaryColor
            }}
          />
        )}
        {currentQuestion.type === 'textarea' && (
          <textarea 
            id={currentQuestion.id} 
            value={answers[currentQuestion.id] || ''} 
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            rows="4"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2"
            style={{
              borderColor: currentTheme.cardBorderColor,
              backgroundColor: currentTheme.inputBackgroundColor || currentTheme.cardBackgroundColor,
              color: currentTheme.textColor,
              outlineColor: currentTheme.primaryColor
            }}
          />
        )}
        {currentQuestion.type === 'rating' && (
          <div className="flex justify-center space-x-2 mt-2">
            {[...Array(currentQuestion.max)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => handleInputChange(currentQuestion.id, i + 1)}
                className={`w-10 h-10 rounded-full border-2 transition-colors flex items-center justify-center font-semibold 
                            ${(answers[currentQuestion.id] || 0) === i + 1 
                                ? 'text-white scale-110' 
                                : 'text-gray-600'}`}
                style={{
                    borderColor: currentTheme.primaryColor,
                    backgroundColor: (answers[currentQuestion.id] || 0) === i + 1 ? currentTheme.primaryColor : currentTheme.pageBackground,
                    color: (answers[currentQuestion.id] || 0) === i + 1 ? 'white' : currentTheme.textColor
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-auto">
        <motion.button
          whileHover={{ scale: currentTheme.buttonHoverScale }}
          whileTap={{ scale: currentTheme.buttonTapScale }}
          onClick={handlePrevious}
          disabled={currentCategoryIndex === 0 && currentQuestionIndex === 0}
          className="px-6 py-3 rounded-full font-semibold transition-colors shadow-md disabled:opacity-50"
          style={{
            backgroundColor: currentTheme.secondaryColor,
            color: 'white',
            fontFamily: currentTheme.fontFamilyBody
          }}
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: currentTheme.buttonHoverScale, backgroundColor: currentTheme.ctaColorHover || currentTheme.ctaColor }}
          whileTap={{ scale: currentTheme.buttonTapScale }}
          onClick={handleNext}
          className="px-6 py-3 rounded-full font-semibold text-white transition-colors shadow-lg"
          style={{ backgroundColor: currentTheme.ctaColor, fontFamily: currentTheme.fontFamilyBody }}
        >
          {currentCategoryIndex === categoryOrder.length - 1 && currentQuestionIndex === currentCategory.questions.length - 1 ? 'Create My Plan' : 'Next'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DeepDiveQuestions;

