import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { 
  Bell, 
  BellOff, 
  Calendar, 
  Clock, 
  Moon, 
  Sun, 
  CheckCircle,
  AlertCircle,
  MessageCircle
} from 'lucide-react';

// Smart Notifications Component
const SmartNotifications = ({ babyName }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // State for notifications
  const [notifications, setNotifications] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    bedtimeReminders: true,
    achievementCelebrations: true,
    sleepTips: true,
    developmentalUpdates: true,
    dataEntryReminders: true
  });
  const [showSettings, setShowSettings] = useState(false);
  
  // Generate sample notifications on component mount
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'reminder',
        title: 'Bedtime Approaching',
        message: `${babyName || 'Your baby'}'s optimal bedtime is in 30 minutes (7:30 PM).`,
        time: '7:00 PM',
        date: new Date().toISOString(),
        read: false,
        icon: <Moon size={20} className="text-indigo-500" />
      },
      {
        id: 2,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: `Congratulations! ${babyName || 'Your baby'} has slept through the night for 3 consecutive days.`,
        time: '8:15 AM',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        read: true,
        icon: <CheckCircle size={20} className="text-green-500" />
      },
      {
        id: 3,
        type: 'tip',
        title: 'Sleep Tip',
        message: 'Try using a white noise machine to help mask household sounds during nap time.',
        time: '2:30 PM',
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: false,
        icon: <MessageCircle size={20} className="text-blue-500" />
      },
      {
        id: 4,
        type: 'developmental',
        title: 'Developmental Milestone',
        message: `At 6 months, ${babyName || 'your baby'} may experience sleep disruptions due to increased mobility and teething.`,
        time: '10:00 AM',
        date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        read: true,
        icon: <Calendar size={20} className="text-purple-500" />
      },
      {
        id: 5,
        type: 'data',
        title: 'Log Today\'s Sleep',
        message: 'Don\'t forget to log last night\'s sleep data to keep your insights accurate.',
        time: '9:00 AM',
        date: new Date().toISOString(),
        read: false,
        icon: <Clock size={20} className="text-amber-500" />
      }
    ];
    
    setNotifications(sampleNotifications);
  }, [babyName]);
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  // Toggle notification setting
  const toggleSetting = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Smart Notifications
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Stay informed with timely reminders and insights tailored to {babyName ? `${babyName}'s` : 'your baby\'s'} sleep journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Notifications {unreadCount > 0 && <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                {notificationSettings.bedtimeReminders ? <Bell size={20} /> : <BellOff size={20} />}
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <p>No notifications yet.</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${!notification.read ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(notification.date)}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Notification Settings or Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {showSettings ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Notification Settings
              </h3>
              
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, enabled]) => {
                  const label = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{label}</span>
                      <button
                        onClick={() => toggleSetting(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Quiet Hours
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  No notifications will be sent during these hours.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Start Time
                    </label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 AM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                      End Time
                    </label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSettings(false)}
                className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Notification Summary
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">
                    Today's Reminders
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <Clock size={16} className="mr-2 text-amber-500" />
                      <span>Log morning wake-up time</span>
                    </li>
                    <li className="flex items-center">
                      <Moon size={16} className="mr-2 text-indigo-500" />
                      <span>Bedtime at 7:30 PM</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-400 mb-1">
                    Recent Achievements
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {babyName || 'Your baby'} has been sleeping through the night more consistently!
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">
                    Upcoming Milestones
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Sleep regression may occur around 8-10 months due to developmental leaps.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowSettings(true)}
                className="w-full mt-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Notification Settings
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Contextual Help */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-800">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
            <AlertCircle size={24} className="text-blue-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              About Smart Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Sleep Haven's smart notification system learns from your baby's sleep patterns to provide timely, relevant reminders and insights.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-5">
              <li>Bedtime reminders based on optimal sleep windows</li>
              <li>Achievement celebrations to acknowledge progress</li>
              <li>Contextual sleep tips based on your specific challenges</li>
              <li>Developmental updates relevant to your baby's age</li>
              <li>Gentle reminders to log sleep data for better insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartNotifications;
