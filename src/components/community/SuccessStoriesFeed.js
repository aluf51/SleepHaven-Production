// /home/ubuntu/components/community/SuccessStoriesFeed.js
import React, { useState, useEffect, useContext } from 'react';
import StoryCard from './StoryCard';
// import { AppContext } from '../../contexts/AppContext'; // Assuming AppContext is in a parent directory
// import apiService from '../../services/apiService'; // Assuming an apiService for backend calls

// Mock API service for now
const mockApiService = {
  getSuccessStories: async (filters) => {
    console.log("Fetching stories with filters:", filters);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock data - in a real app, this would come from the backend
    return [
      {
        id: '1',
        title: "Overcoming 4-Month Sleep Regression!",
        anonymizedContent: "Our little one hit the 4-month sleep regression hard. We were up every hour! We stuck to a consistent bedtime routine, offered extra comfort, and focused on full feeds during the day. After about two weeks, things started to improve. Now, she's back to sleeping longer stretches. Don't give up!",
        challenges: ["4-month regression", "frequent night wakings"],
        submissionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        isPremium: true
      },
      {
        id: '2',
        title: "Nap Transition Success",
        anonymizedContent: "Transitioning from 3 to 2 naps was tough. My baby was cranky and overtired for a bit. We gradually pushed wake windows and ensured the two naps were solid. It took about a week, but now our days are much more predictable, and he's happier!",
        challenges: ["nap transition", "overtiredness"],
        submissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        isPremium: true
      },
      {
        id: '3',
        title: "Self-Soothing Achieved!",
        anonymizedContent: "We worked on gentle self-soothing techniques for our 7-month-old. It involved a lot of patience, check-ins, and reassurance. There were some tears (from both of us!), but after a few nights, she started putting herself to sleep independently. It's made a huge difference!",
        challenges: ["self-soothing", "bedtime battles"],
        submissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        isPremium: true
      }
    ];
  }
};

const SuccessStoriesFeed = () => {
  // const { isPremiumUser } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ challenge: '', sortBy: 'newest' });

  // Mock challenges - in a real app, these might come from a config or API
  const availableChallenges = [
    "4-month regression",
    "frequent night wakings",
    "nap transition",
    "overtiredness",
    "self-soothing",
    "bedtime battles",
    "early morning wakings",
    "colic",
    "teething"
  ];

  useEffect(() => {
    if (!isPremiumUser) return;

    const fetchStories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const fetchedStories = await apiService.getSuccessStories(filters);
        const fetchedStories = await mockApiService.getSuccessStories(filters);
        setStories(fetchedStories);
      } catch (err) {
        console.error("Error fetching success stories:", err);
        setError("Could not load success stories. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchStories();
  }, [isPremiumUser, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  if (!isPremiumUser) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700">This is a premium feature. Please upgrade to access success stories.</p>
        {/* Add a link/button to upgrade plan here */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Parent Success Stories</h2>
        {/* Link to SubmitStoryForm would go here, e.g., <Link to="/community/success-stories/submit">Share Your Story</Link> */}
        <button 
          onClick={() => alert('Navigate to Submit Story Form!')} 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out">
          Share Your Story
        </button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="challenge-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Challenge:</label>
            <select
              id="challenge-filter"
              name="challenge"
              value={filters.challenge}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Challenges</option>
              {availableChallenges.map(challenge => (
                <option key={challenge} value={challenge}>{challenge}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By:</label>
            <select
              id="sort-by"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              {/* Add more sort options if needed, e.g., relevance, popularity */}
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading stories...</p>
          {/* Add a spinner icon here */}
        </div>
      )}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!isLoading && !error && stories.length === 0 && (
        <div className="text-center py-10 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Stories Yet!</h3>
          <p className="text-gray-500">It looks like there are no success stories matching your criteria, or none have been shared yet.</p>
          <p className="text-gray-500 mt-1">Why not be the first to share your experience?</p>
        </div>
      )}
      {!isLoading && !error && stories.length > 0 && (
        <div>
          {stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuccessStoriesFeed;

