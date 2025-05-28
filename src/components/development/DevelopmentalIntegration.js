import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { 
  Brain, 
  Calendar, 
  ArrowRight,
  AlertCircle,
  Milestone,
  Baby,
  Activity
} from 'lucide-react';

// Developmental Integration Component
const DevelopmentalIntegration = ({ babyName, ageMonths = 6 }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // State for developmental data
  const [developmentalData, setDevelopmentalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('sleep');
  
  // Load developmental data based on baby's age
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const data = getDevelopmentalDataByAge(ageMonths);
      setDevelopmentalData(data);
      setIsLoading(false);
    }, 1000);
  }, [ageMonths]);
  
  // Get developmental data based on age
  const getDevelopmentalDataByAge = (months) => {
    // This would come from a real database in production
    // Simplified example for demo purposes
    
    if (months >= 0 && months < 3) {
      return {
        stage: 'Newborn',
        sleepNeeds: {
          totalHours: '14-17',
          nightSleep: '8-9',
          naps: '3-5 naps',
          challenges: ['Frequent night wakings', 'Short sleep cycles', 'Day/night confusion'],
          tips: ['Swaddling can help', 'White noise to mimic womb sounds', 'Keep night feedings low-key']
        },
        milestones: [
          { name: 'Lifts head briefly', expected: true },
          { name: 'Follows objects with eyes', expected: true },
          { name: 'Responds to sounds', expected: true }
        ],
        upcomingChanges: [
          'Will begin to smile socially',
          'Sleep cycles will begin to mature',
          'May start to show preferences for familiar faces'
        ]
      };
    } else if (months >= 3 && months < 6) {
      return {
        stage: '3-6 Months',
        sleepNeeds: {
          totalHours: '12-15',
          nightSleep: '9-10',
          naps: '3-4 naps',
          challenges: ['Rolling over in crib', 'Early morning wakings', 'Catnapping'],
          tips: ['Begin bedtime routine', 'Consider sleep sack instead of swaddle', 'Watch for overtiredness']
        },
        milestones: [
          { name: 'Rolls from back to side', expected: true },
          { name: 'Laughs and squeals', expected: true },
          { name: 'Reaches for objects', expected: true },
          { name: 'Recognizes familiar faces', expected: true }
        ],
        upcomingChanges: [
          'Will begin to sit with support',
          'May start showing interest in solid foods',
          'Sleep consolidation may improve'
        ]
      };
    } else if (months >= 6 && months < 9) {
      return {
        stage: '6-9 Months',
        sleepNeeds: {
          totalHours: '12-14',
          nightSleep: '10-11',
          naps: '2-3 naps',
          challenges: ['Separation anxiety', 'Teething pain', 'Learning to sit/crawl disrupting sleep'],
          tips: ['Consistent bedtime routine is crucial', 'Comfort object may help with separation', 'Teething relief before bed']
        },
        milestones: [
          { name: 'Sits without support', expected: true },
          { name: 'Babbles consonant sounds', expected: true },
          { name: 'Responds to own name', expected: true },
          { name: 'May begin crawling', expected: false }
        ],
        upcomingChanges: [
          'Will likely begin crawling',
          'May pull to stand',
          'Separation anxiety may peak',
          'Transition to 2 naps'
        ]
      };
    } else if (months >= 9 && months < 12) {
      return {
        stage: '9-12 Months',
        sleepNeeds: {
          totalHours: '12-14',
          nightSleep: '10-12',
          naps: '2 naps',
          challenges: ['Standing in crib', 'Separation anxiety peak', 'Increased mobility'],
          tips: ['Consistent response to night wakings', 'Extra cuddles during the day', 'Wind-down time before naps']
        },
        milestones: [
          { name: 'Crawls well', expected: true },
          { name: 'Pulls to stand', expected: true },
          { name: 'Says "mama" or "dada"', expected: true },
          { name: 'Plays simple games', expected: true },
          { name: 'May take first steps', expected: false }
        ],
        upcomingChanges: [
          'Will likely take first steps',
          'May begin saying more words',
          'Will start to understand simple instructions',
          'May be ready for one nap by 12-15 months'
        ]
      };
    } else if (months >= 12 && months < 18) {
      return {
        stage: '12-18 Months',
        sleepNeeds: {
          totalHours: '11-14',
          nightSleep: '10-12',
          naps: '1-2 naps',
          challenges: ['Nap transitions', 'Newfound independence', 'Separation anxiety'],
          tips: ['Consistent schedule', 'Clear boundaries at bedtime', 'Bedtime routine with choices']
        },
        milestones: [
          { name: 'Walks independently', expected: true },
          { name: 'Says several words', expected: true },
          { name: 'Follows simple directions', expected: true },
          { name: 'Feeds self with fingers', expected: true }
        ],
        upcomingChanges: [
          'Will transition to one nap',
          'Vocabulary will expand rapidly',
          'May begin to assert independence more strongly',
          'Climbing skills will develop'
        ]
      };
    } else {
      return {
        stage: 'Toddler',
        sleepNeeds: {
          totalHours: '11-13',
          nightSleep: '10-12',
          naps: '1 nap',
          challenges: ['Bedtime resistance', 'Nightmares', 'Early rising', 'Climbing out of crib'],
          tips: ['Consistent limits', 'Bedtime routine with choices', 'Nightlight for fears', 'Child-proof room']
        },
        milestones: [
          { name: 'Runs and climbs', expected: true },
          { name: 'Uses 2-word phrases', expected: true },
          { name: 'Follows 2-step instructions', expected: true },
          { name: 'Shows empathy', expected: true }
        ],
        upcomingChanges: [
          'Will develop more complex language',
          'May be ready for potty training',
          'Imagination will develop more fully',
          'May transition from crib to bed'
        ]
      };
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Developmental Integration
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  
  if (!developmentalData) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Developmental Integration
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
          <p className="text-red-700 dark:text-red-400">
            Unable to load developmental data. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Developmental Integration
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Understanding how {babyName ? `${babyName}'s` : 'your baby\'s'} development affects sleep patterns.
      </p>
      
      {/* Age Stage Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-lg shadow-md mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {developmentalData.stage} Stage
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {babyName || 'Your baby'} is currently {ageMonths} months old
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setSelectedTab('sleep')}
          className={`py-2 px-4 font-medium text-sm ${
            selectedTab === 'sleep'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Sleep Needs
        </button>
        <button
          onClick={() => setSelectedTab('milestones')}
          className={`py-2 px-4 font-medium text-sm ${
            selectedTab === 'milestones'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Milestones
        </button>
        <button
          onClick={() => setSelectedTab('upcoming')}
          className={`py-2 px-4 font-medium text-sm ${
            selectedTab === 'upcoming'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Upcoming Changes
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        {selectedTab === 'sleep' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Moon size={20} className="mr-2 text-indigo-500" />
              Sleep Needs at {ageMonths} Months
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">
                  Total Sleep Needed
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {developmentalData.sleepNeeds.totalHours} hours
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Per 24-hour period
                </p>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-1">
                  Night Sleep
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {developmentalData.sleepNeeds.nightSleep} hours
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Consolidated nighttime sleep
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">
                  Nap Schedule
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {developmentalData.sleepNeeds.naps}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Typical for this age
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <AlertCircle size={18} className="mr-2 text-amber-500" />
                  Common Sleep Challenges
                </h4>
                <ul className="space-y-2">
                  {developmentalData.sleepNeeds.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                      <span className="text-gray-600 dark:text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <CheckCircle size={18} className="mr-2 text-green-500" />
                  Age-Appropriate Sleep Tips
                </h4>
                <ul className="space-y-2">
                  {developmentalData.sleepNeeds.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'milestones' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Milestone size={20} className="mr-2 text-green-500" />
              Developmental Milestones at {ageMonths} Months
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These milestones can affect sleep patterns as {babyName || 'your baby'}'s brain processes new skills.
            </p>
            
            <div className="space-y-4">
              {developmentalData.milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    milestone.expected
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${
                      milestone.expected
                        ? 'text-green-700 dark:text-green-400'
                        : 'text-blue-700 dark:text-blue-400'
                    }`}>
                      {milestone.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      milestone.expected
                        ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300'
                    }`}>
                      {milestone.expected ? 'Expected now' : 'Coming soon'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Sleep Impact:</strong> When babies are working on new skills like rolling, crawling, or language, they often practice during sleep, which can cause more night wakings or shorter naps.
              </p>
            </div>
          </div>
        )}
        
        {selectedTab === 'upcoming' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <Calendar size={20} className="mr-2 text-purple-500" />
              Upcoming Developmental Changes
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Prepare for these upcoming changes that may affect {babyName || 'your baby'}'s sleep in the next few months.
            </p>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-5 rounded-lg mb-6">
              <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-3">
                What's Coming Next
              </h4>
              
              <ul className="space-y-3">
                {developmentalData.upcomingChanges.map((change, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight size={16} className="flex-shrink-0 text-indigo-500 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg">
              <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-3">
                How to Prepare
              </h4>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Maintain consistent sleep routines even during developmental leaps
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Allow extra practice time for new skills during the day
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Be prepared for temporary sleep disruptions as new skills develop
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Adjust sleep environment for increased mobility (lower crib mattress, remove hazards)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Developmental Sleep Connection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <Brain size={20} className="mr-2 text-purple-500" />
          The Brain-Sleep Connection
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
              How Development Affects Sleep
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              During periods of rapid brain development, babies often experience disrupted sleep as their brains process new skills and information.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Research shows that sleep regressions often coincide with major developmental milestones. This is a sign of healthy brain development, even though it can be challenging for parents.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
              How Sleep Supports Development
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Quality sleep is essential for brain development, memory consolidation, and learning new skills. During sleep, the brain processes and organizes information gathered during waking hours.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Studies show that babies who get adequate sleep show better cognitive development, language acquisition, and emotional regulation.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            "Sleep is the power source that keeps your mind alert and calm. Sleep is the power source that keeps your mind alert and calm. Every night and at every nap, sleep recharges the brain's battery. Sleeping well increases brainpower just as weight lifting builds stronger muscles."
            <br />
            — Dr. Marc Weissbluth, Pediatric Sleep Specialist
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentalIntegration;
