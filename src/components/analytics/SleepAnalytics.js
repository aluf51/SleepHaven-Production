import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { 
  BarChart3, 
  LineChart, 
  Calendar, 
  Clock, 
  Moon, 
  Sun, 
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';

// Sleep Analytics Dashboard Component
const SleepAnalytics = ({ babyName }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // Sample sleep data - in a real app, this would come from the user's logged data
  const [sleepData, setSleepData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate sample sleep data on component mount
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const sampleData = generateSampleSleepData(selectedTimeframe);
      setSleepData(sampleData);
      setInsights(generateInsights(sampleData));
      setIsLoading(false);
    }, 1000);
  }, [selectedTimeframe]);
  
  // Generate sample sleep data based on timeframe
  const generateSampleSleepData = (timeframe) => {
    const data = [];
    const now = new Date();
    let days = 7;
    
    if (timeframe === 'month') days = 30;
    else if (timeframe === 'quarter') days = 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate realistic sleep data with some variability
      const hoursSlept = 7 + Math.random() * 3; // Between 7-10 hours
      const wakings = Math.floor(Math.random() * 4); // 0-3 wakings
      const sleepQuality = wakings === 0 ? 'excellent' : wakings === 1 ? 'good' : wakings === 2 ? 'fair' : 'poor';
      
      // Add some trends for better insights
      let adjustedHours = hoursSlept;
      if (i < days / 2) {
        // Show improvement in the second half of the period
        adjustedHours += 0.5;
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        hoursSlept: Math.round(adjustedHours * 10) / 10,
        wakings,
        sleepQuality,
        bedtime: `${19 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`,
        wakeTime: `${5 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`
      });
    }
    
    return data;
  };
  
  // Generate insights based on sleep data
  const generateInsights = (data) => {
    if (!data || data.length === 0) return [];
    
    const insights = [];
    
    // Calculate average hours slept
    const avgHoursSlept = data.reduce((sum, day) => sum + day.hoursSlept, 0) / data.length;
    
    // Calculate average wakings
    const avgWakings = data.reduce((sum, day) => sum + day.wakings, 0) / data.length;
    
    // Calculate sleep quality distribution
    const qualityCount = data.reduce((counts, day) => {
      counts[day.sleepQuality] = (counts[day.sleepQuality] || 0) + 1;
      return counts;
    }, {});
    
    // Check for trends
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    
    const avgFirstHalf = firstHalf.reduce((sum, day) => sum + day.hoursSlept, 0) / firstHalf.length;
    const avgSecondHalf = secondHalf.reduce((sum, day) => sum + day.hoursSlept, 0) / secondHalf.length;
    
    const sleepTrend = avgSecondHalf - avgFirstHalf;
    
    // Add insights based on the data
    insights.push({
      type: 'summary',
      title: 'Sleep Summary',
      text: `${babyName || 'Your baby'} slept an average of ${avgHoursSlept.toFixed(1)} hours with ${avgWakings.toFixed(1)} wakings per night.`
    });
    
    if (sleepTrend > 0.5) {
      insights.push({
        type: 'positive',
        title: 'Positive Trend',
        text: `Sleep duration is improving! ${babyName || 'Your baby'} is sleeping ${sleepTrend.toFixed(1)} hours longer on average compared to earlier in this period.`
      });
    } else if (sleepTrend < -0.5) {
      insights.push({
        type: 'negative',
        title: 'Sleep Regression',
        text: `Sleep duration has decreased by ${Math.abs(sleepTrend).toFixed(1)} hours on average. This could be due to a developmental leap or sleep regression.`
      });
    }
    
    // Add quality insight
    const bestQuality = Object.entries(qualityCount).sort((a, b) => b[1] - a[1])[0];
    insights.push({
      type: bestQuality[0] === 'excellent' || bestQuality[0] === 'good' ? 'positive' : 'neutral',
      title: 'Sleep Quality',
      text: `Most nights had ${bestQuality[0]} sleep quality (${Math.round(bestQuality[1] / data.length * 100)}% of nights).`
    });
    
    // Add bedtime consistency insight
    const bedtimes = data.map(day => {
      const [hours, minutes] = day.bedtime.split(':').map(Number);
      return hours * 60 + minutes;
    });
    
    const maxBedtime = Math.max(...bedtimes);
    const minBedtime = Math.min(...bedtimes);
    const bedtimeVariance = maxBedtime - minBedtime;
    
    if (bedtimeVariance <= 30) {
      insights.push({
        type: 'positive',
        title: 'Consistent Bedtime',
        text: `${babyName || 'Your baby'} has a very consistent bedtime, varying by only ${bedtimeVariance} minutes. This is excellent for sleep quality!`
      });
    } else if (bedtimeVariance >= 90) {
      insights.push({
        type: 'suggestion',
        title: 'Bedtime Consistency',
        text: `Bedtimes vary by ${bedtimeVariance} minutes. A more consistent bedtime could improve sleep quality.`
      });
    }
    
    return insights;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Get max value for chart scaling
  const maxHours = Math.max(...sleepData.map(day => day.hoursSlept), 12);
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Sleep Analytics
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Track {babyName ? `${babyName}'s` : 'your baby\'s'} sleep patterns and discover insights to improve sleep quality.
      </p>
      
      {/* Timeframe Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {['week', 'month', 'quarter'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${
                timeframe === 'week' ? 'rounded-l-lg' : timeframe === 'quarter' ? 'rounded-r-lg' : ''
              } border border-gray-200 dark:border-gray-600`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sleep Duration Chart */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Sleep Duration
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <LineChart size={16} className="mr-1" />
                <span>Hours per night</span>
              </div>
            </div>
            
            <div className="h-64 flex items-end space-x-2">
              {sleepData.map((day, index) => {
                const heightPercentage = (day.hoursSlept / maxHours) * 100;
                const barColor = day.sleepQuality === 'excellent' ? '#4ade80' : 
                                day.sleepQuality === 'good' ? '#60a5fa' : 
                                day.sleepQuality === 'fair' ? '#fbbf24' : '#f87171';
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-center mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">{day.hoursSlept}</span>
                    </div>
                    <div 
                      className="w-full rounded-t-sm transition-all duration-500"
                      style={{ 
                        height: `${heightPercentage}%`, 
                        backgroundColor: barColor,
                        minHeight: '4px'
                      }}
                    ></div>
                    <div className="w-full text-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(day.date)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
                  <span className="text-gray-600 dark:text-gray-400">Excellent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                  <span className="text-gray-600 dark:text-gray-400">Good</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                  <span className="text-gray-600 dark:text-gray-400">Fair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
                  <span className="text-gray-600 dark:text-gray-400">Poor</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insights Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Sleep Insights
            </h3>
            
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg ${
                    insight.type === 'positive' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                    insight.type === 'negative' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                    insight.type === 'suggestion' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                    'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700'
                  } border`}
                >
                  <h4 className={`font-medium mb-1 ${
                    insight.type === 'positive' ? 'text-green-700 dark:text-green-400' :
                    insight.type === 'negative' ? 'text-red-700 dark:text-red-400' :
                    insight.type === 'suggestion' ? 'text-blue-700 dark:text-blue-400' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sleep Stats
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Moon size={16} className="text-indigo-500 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Bedtime</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {sleepData.length > 0 ? 
                      (() => {
                        const bedtimes = sleepData.map(day => {
                          const [hours, minutes] = day.bedtime.split(':').map(Number);
                          return hours * 60 + minutes;
                        });
                        const avgMinutes = bedtimes.reduce((sum, mins) => sum + mins, 0) / bedtimes.length;
                        const hours = Math.floor(avgMinutes / 60);
                        const minutes = Math.floor(avgMinutes % 60);
                        return `${hours}:${minutes.toString().padStart(2, '0')} PM`;
                      })() : 'N/A'
                    }
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Sun size={16} className="text-amber-500 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Wake Time</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {sleepData.length > 0 ? 
                      (() => {
                        const wakeTimes = sleepData.map(day => {
                          const [hours, minutes] = day.wakeTime.split(':').map(Number);
                          return hours * 60 + minutes;
                        });
                        const avgMinutes = wakeTimes.reduce((sum, mins) => sum + mins, 0) / wakeTimes.length;
                        const hours = Math.floor(avgMinutes / 60);
                        const minutes = Math.floor(avgMinutes % 60);
                        return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
                      })() : 'N/A'
                    }
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Clock size={16} className="text-blue-500 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Sleep Duration</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {sleepData.length > 0 ? 
                      `${(sleepData.reduce((sum, day) => sum + day.hoursSlept, 0) / sleepData.length).toFixed(1)} hours` : 
                      'N/A'
                    }
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <BarChart3 size={16} className="text-purple-500 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Night Wakings</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {sleepData.length > 0 ? 
                      `${(sleepData.reduce((sum, day) => sum + day.wakings, 0) / sleepData.length).toFixed(1)}` : 
                      'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Download size={18} className="mr-2" />
          <span>Export Data</span>
        </button>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Share2 size={18} className="mr-2" />
          <span>Share with Pediatrician</span>
        </button>
      </div>
      
      {/* Developmental Context */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Developmental Context
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {babyName ? `${babyName} is` : 'Your baby is'} currently in a period where sleep patterns may be affected by developmental milestones.
        </p>
        
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
            <Calendar size={24} className="text-purple-500" />
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              6-8 Month Sleep Regression
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Many babies experience disrupted sleep during this period due to developmental leaps, teething, and increased mobility.
            </p>
            <a href="#" className="inline-flex items-center mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Learn more about this stage <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepAnalytics;
