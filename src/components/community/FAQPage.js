// /home/ubuntu/components/community/FAQPage.js
import React, { useState, useEffect, useContext } from "react";
import FAQItem from "./FAQItem";
// import { AppContext } from "../../contexts/AppContext"; // Assuming AppContext
// import apiService from "../../services/apiService"; // Assuming an apiService

// Mock API service for now
const mockApiService = {
  getFAQs: async (filters) => {
    console.log("Fetching FAQs with filters:", filters);
    await new Promise(resolve => setTimeout(resolve, 900));
    // Mock data - in a real app, this would come from the backend
    const allFAQs = [
      {
        id: "faq_1",
        question: "When should my baby be sleeping through the night?",
        answer: "The term 'sleeping through the night' can be misleading. For babies under 6 months, sleeping 5-6 hours straight is considered 'sleeping through the night.' By 6-9 months, many babies can sleep 8-10 hours without feeding, but this varies greatly. Some babies continue to wake for feeds well into the first year, which is completely normal.\n\nRather than focusing on a specific age milestone, look for your baby's individual patterns and developmental readiness. Consistent bedtime routines, appropriate wake windows, and gradually reducing night feedings when developmentally appropriate can help encourage longer stretches of sleep.",
        pediatricianAttribution: "Dr. Maria Johnson, Pediatric Sleep Specialist",
        lastUpdatedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        category: "Night Sleep"
      },
      {
        id: "faq_2",
        question: "Is sleep training harmful to my baby?",
        answer: "This is a common concern for many parents. Research has not found evidence that gentle, responsive sleep training methods cause harm to babies or their attachment to caregivers.\n\nThere are many approaches to sleep training, ranging from very gradual, no-tears methods to more structured approaches. The key is choosing a method that aligns with your parenting philosophy and your baby's temperament.\n\nWhichever approach you choose, consistency, responsiveness to your baby's needs, and attention to their overall well-being are essential. If you're uncomfortable with a particular method, it's unlikely to work well for your family.",
        pediatricianAttribution: "Dr. Robert Chen, Developmental Pediatrician",
        lastUpdatedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
        category: "Sleep Training"
      },
      {
        id: "faq_3",
        question: "How many naps should my baby take each day?",
        answer: "Nap needs change significantly as babies grow:\n\n• Newborns (0-3 months): 4-5 naps per day, often irregular\n• 3-6 months: 3-4 naps per day\n• 6-9 months: 2-3 naps per day\n• 9-12 months: 2 naps per day\n• 12-18 months: 1-2 naps per day\n• 18+ months: 1 nap per day\n\nThese are general guidelines, and your baby may transition between these stages earlier or later. Watch for signs that your baby is ready to transition to fewer naps, such as consistently fighting a nap, taking a very long time to fall asleep, or the current nap schedule interfering with night sleep.",
        pediatricianAttribution: "Dr. Sarah Williams, Pediatrician",
        lastUpdatedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        category: "Naps"
      },
      {
        id: "faq_4",
        question: "What should I do about the 4-month sleep regression?",
        answer: "The 4-month sleep regression isn't actually a regression but a permanent change in how your baby sleeps. Around 3-5 months, babies develop more adult-like sleep cycles, which can lead to more night wakings as they transition between cycles.\n\nTo help your baby through this transition:\n\n1. Ensure the sleep environment is conducive to sleep (dark, cool, quiet)\n2. Begin establishing a consistent bedtime routine if you haven't already\n3. Work on putting your baby down drowsy but awake to help them learn to fall asleep independently\n4. Consider introducing a lovey or comfort object (for babies over 12 months)\n5. Be patient and consistent - this phase will pass as your baby learns new sleep skills",
        pediatricianAttribution: "Dr. Emily Nguyen, Pediatric Sleep Medicine",
        lastUpdatedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
        category: "Sleep Regressions"
      },
      {
        id: "faq_5",
        question: "Is white noise safe for my baby?",
        answer: "White noise can be safe and beneficial for babies when used correctly. It can help mask household sounds and create a consistent sleep environment. However, there are important safety considerations:\n\n1. Volume: Keep the white noise at a reasonable level (around 50 decibels, about the sound of a quiet shower). Never place the sound machine directly next to the crib.\n\n2. Duration: It's generally fine to use white noise all night, but some experts recommend turning it off once your baby is asleep to allow exposure to normal household sounds.\n\n3. Dependency: Some babies may become dependent on white noise to sleep. If this concerns you, you might occasionally have naps or bedtimes without it.\n\nOverall, when used at a safe volume and distance from your baby, white noise can be a helpful sleep tool.",
        pediatricianAttribution: "Dr. James Wilson, ENT Specialist and Pediatrician",
        lastUpdatedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
        category: "Sleep Environment"
      }
    ];
    
    // Basic filtering for mock service
    let filtered = allFAQs;
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(faq => faq.category === filters.category);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm) || 
        faq.answer.toLowerCase().includes(searchTerm)
      );
    }
    return filtered;
  }
};

const FAQPage = () => {
  // const { isPremiumUser } = useContext(AppContext);
  const isPremiumUser = true; // Assuming premium for now

  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: "all", search: "" });

  // Mock categories - in a real app, these might come from a config or API
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Night Sleep", name: "Night Sleep" },
    { id: "Naps", name: "Naps" },
    { id: "Sleep Training", name: "Sleep Training" },
    { id: "Sleep Regressions", name: "Sleep Regressions" },
    { id: "Sleep Environment", name: "Sleep Environment" }
  ];

  useEffect(() => {
    if (!isPremiumUser) return;

    const fetchFAQs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const fetchedFAQs = await apiService.getFAQs(filters);
        const fetchedFAQs = await mockApiService.getFAQs(filters);
        setFaqs(fetchedFAQs);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Could not load FAQs. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchFAQs();
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
        <p className="text-lg text-gray-700">Access expert answers to common sleep questions by upgrading to premium.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">Expert Sleep FAQ</h2>
      <p className="text-center text-gray-600 mb-8">
        Common sleep questions answered by pediatricians and sleep specialists
      </p>

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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-1">Search Questions:</label>
            <input 
              type="search"
              id="search-filter"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="e.g., naps, regression, white noise"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>
      </form>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading FAQs...</p>
        </div>
      )}
      {error && <p className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-md">{error}</p>}
      
      {!isLoading && !error && faqs.length === 0 && (
        <div className="text-center py-10 bg-white shadow-md rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No FAQs Found</h3>
          <p className="text-gray-500">No questions match your search criteria. Try broadening your search or selecting a different category.</p>
        </div>
      )}

      {!isLoading && !error && faqs.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {faqs.map(faq => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
        <p className="text-sm text-yellow-700">
          Have a question not answered here? Submit it through our support channel, and our pediatric sleep experts may address it in future updates.
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
