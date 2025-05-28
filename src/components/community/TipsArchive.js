// /home/ubuntu/components/community/TipsArchive.js
import React, { useState, useEffect, useContext } from "react";
import TipCard from "./TipCard";
// import { AppContext } from "../../contexts/AppContext"; // Assuming AppContext
// import apiService from "../../services/apiService"; // Assuming an apiService

// Mock API service for now
const mockApiService = {
  getArchivedTips: async (filters) => {
    console.log("Fetching archived tips with filters:", filters);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock data - in a real app, this would come from the backend
    const allTips = [
      {
        id: "tip_archive_1",
        title: "Creating the Perfect Sleep Environment",
        content: "A cool, dark, and quiet room is essential for good sleep. Consider blackout curtains, a white noise machine, and a comfortable room temperature (around 68-72°F or 20-22°C).",
        expertAttribution: "Sleep Foundation Experts",
        publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        category: "Sleep Environment"
      },
      {
        id: "tip_archive_2",
        title: "The Importance of a Consistent Bedtime Routine",
        content: "A predictable bedtime routine signals to your baby that it's time to wind down. This could include a bath, a story, a lullaby, and a final feed. Keep it calm and consistent every night.",
        expertAttribution: "Dr. Gentle Sleep",
        publishDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
        category: "Bedtime Routines"
      },
      {
        id: "tip_archive_3",
        title: "Navigating Nap Transitions",
        content: "As babies grow, their nap needs change. Watch for signs of readiness for a nap transition, such as consistently refusing a nap or taking a long time to fall asleep for it. Adjust wake windows gradually.",
        expertAttribution: "The Baby Sleep Site",
        publishDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
        category: "Naps"
      },
      {
        id: "tip_current_week", // Same as current for testing
        title: "Understanding Sleep Cycles",
        content: "Babies, like adults, cycle through different stages of sleep (light and deep). Understanding these cycles can help you recognize when your baby is truly waking versus just stirring between cycles.",
        expertAttribution: "Dr. Sleepwell, Pediatric Sleep Consultant",
        publishDate: new Date().toISOString(),
        category: "Sleep Science"
      }
    ];
    // Basic filtering for mock service
    let filtered = allTips;
    if (filters.category) {
      filtered = filtered.filter(tip => tip.category === filters.category);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(tip => 
        tip.title.toLowerCase().includes(searchTerm) || 
        tip.content.toLowerCase().includes(searchTerm)
      );
    }
    return filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  }
};

const TipsArchive = () => {
  // const { isPremiumUser } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now

  const [archivedTips, setArchivedTips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: "", search: "" });
  const availableCategories = ["Sleep Environment", "Bedtime Routines", "Naps", "Sleep Science", "Feeding & Sleep"]; // Mock

  useEffect(() => {
    if (!isPremiumUser) return;

    const fetchTips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const tips = await apiService.getArchivedTips(filters);
        const tips = await mockApiService.getArchivedTips(filters);
        setArchivedTips(tips);
      } catch (err) {
        console.error("Error fetching archived tips:", err);
        setError("Could not load archived tips. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchTips();
  }, [isPremiumUser, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Fetching is triggered by useEffect on filters change
  };

  if (!isPremiumUser) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700">Access our archive of expert sleep tips by upgrading to premium.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Sleep Tips Archive</h2>

      {/* Filter and Search Controls */}
      <form onSubmit={handleSearchSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
            <select
              id="category-filter"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Categories</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-1">Search Tips:</label>
            <input 
              type="search"
              id="search-filter"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="e.g., naps, routine, environment"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        {/* A search button is not strictly necessary if filtering happens on change, but can be added for explicit action */}
        {/* <button type="submit" className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">Search</button> */}
      </form>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading archived tips...</p>
        </div>
      )}
      {error && <p className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-md">{error}</p>}
      
      {!isLoading && !error && archivedTips.length === 0 && (
        <div className="text-center py-10 bg-white shadow-md rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tips Found</h3>
          <p className="text-gray-500">Sorry, we couldn't find any tips matching your criteria. Try broadening your search or checking back later!</p>
        </div>
      )}

      {!isLoading && !error && archivedTips.length > 0 && (
        <div className="space-y-6">
          {archivedTips.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TipsArchive;

