import React, { useEffect, useState } from 'react';

// Placeholder for a more sophisticated baby avatar component
const BabyAvatarDisplay = ({ avatarUrl, babyName }) => {
  return (
    <img 
      src={avatarUrl || '/images/default_baby_avatar.png'} // Fallback to a default path
      alt={`${babyName || 'Baby'}'s avatar`}
      className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-2 border-white object-cover"
    />
  );
};

const TimeOfDayBanner = ({ userName, babyName, babyAvatarUrl }) => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [greeting, setGreeting] = useState('');
  const [timeIcon, setTimeIcon] = useState('');
  const [bannerStyle, setBannerStyle] = useState('');

  useEffect(() => {
    // Get current hour to determine time of day
    const updateTimeOfDay = () => {
      const currentHour = new Date().getHours();
      
      // Morning: 5am to 11:59am
      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDay('morning');
        setGreeting('Good morning');
        setTimeIcon('☀️');
        setBannerStyle('bg-gradient-to-r from-yellow-300 to-orange-300 text-orange-800');
      } 
      // Afternoon: 12pm to 4:59pm
      else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay('afternoon');
        setGreeting('Good afternoon');
        setTimeIcon('🌤️');
        setBannerStyle('bg-gradient-to-r from-sky-300 to-blue-400 text-blue-800');
      } 
      // Evening: 5pm to 8:59pm
      else if (currentHour >= 17 && currentHour < 21) {
        setTimeOfDay('evening');
        setGreeting('Good evening');
        setTimeIcon('🌆');
        setBannerStyle('bg-gradient-to-r from-indigo-400 to-purple-500 text-purple-100');
      } 
      // Night: 9pm to 4:59am
      else {
        setTimeOfDay('night');
        setGreeting('Good night');
        setTimeIcon('🌙');
        setBannerStyle('bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-100');
      }
    };

    // Set initial time of day
    updateTimeOfDay();
    
    // Update time of day every minute
    const intervalId = setInterval(updateTimeOfDay, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className={`p-4 md:p-6 rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between transition-all duration-1000 ${bannerStyle}`}
    >
      <div className="text-center sm:text-left mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold">
          {greeting}, {userName || 'Parent'}! {timeIcon}
        </h1>
        <p className="text-md md:text-lg mt-1">
          Here's what's new for {babyName || 'your little one'}.
        </p>
      </div>
      <div className="flex-shrink-0">
        <BabyAvatarDisplay avatarUrl={babyAvatarUrl} babyName={babyName} />
      </div>
    </div>
  );
};

export default TimeOfDayBanner;
