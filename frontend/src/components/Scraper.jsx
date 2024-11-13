// Scraper.jsx
import { useState } from 'react';
import { scrapeSite, analyzeData, getSuggestions } from '../services/api';
import AnalysisComponent from './AnalysisComponent';
import SuggestionsComponent from './SuggestionsComponent.jsx';
import Navbar from './Navbar';

function Scraper() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (scrapedData) => {
    try {
      // Call the getSuggestions API and process the response
      const suggestionsResponse = await getSuggestions(scrapedData);
      const suggestionsArray = suggestionsResponse.data.suggestions
        ? suggestionsResponse.data.suggestions.split('\n').filter(s => s.trim() !== '')
        : [];
      setSuggestions(suggestionsArray);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleScrape = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);
    setSuggestions([]);
    try {
      // Call the scrape API
      const response = await scrapeSite(url);
      const scrapedData = response.data.data;
      setData(scrapedData);

      // Call the analyze API only if scrape data is available
      const analysisResponse = await analyzeData(scrapedData);
      setAnalysisResult(analysisResponse.data);

      // Fetch and display suggestions based on scraped data
      fetchSuggestions(scrapedData);
    } catch (error) {
      setData(`Error: ${error.response ? error.response.data.detail : "An unknown error occurred"}`);
      setAnalysisResult(null);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <Navbar /> {/* Add the Navbar at the top */}
      
      {/* Main Layout */}
      <div className="flex h-screen p-4">
        {/* Left: Hero Section */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-indigo-600 text-white p-8">
          <h2 className="text-4xl font-bold mb-4">Site Scribe</h2>
          <p className="text-lg mb-4">Analyze and improve your website's content easily with sentiment analysis and AI-driven suggestions.</p>
        </div>

        {/* Right: Card with URL input and Scrape Button */}
        <div className="w-1/2 p-8">
          <div className="bg-white rounded shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Scrape a Site</h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleScrape}
              className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 w-full"
            >
              Scrape
            </button>
          </div>
        </div>
      </div>

      {/* Display scraped data and sentiment analysis */}
      <div className="flex flex-col items-center space-y-4 p-8">
        <div className="bg-white rounded shadow-md w-full max-w-3xl p-4 overflow-auto" style={{ maxHeight: '400px' }}>
          <h3 className="text-xl font-semibold">Scraped Data</h3>
          <p className="mt-2 text-gray-700">{loading ? 'Loading...' : data || 'No data to display'}</p>
        </div>

        <div className="bg-white rounded shadow-md w-full max-w-3xl p-4">
          <h3 className="text-xl font-semibold">Sentiment Analysis</h3>
          {analysisResult ? (
            <AnalysisComponent analysis={analysisResult} />
          ) : (
            <p>No analysis available.</p>
          )}
        </div>

        <div className="bg-white rounded shadow-md w-full max-w-3xl p-4">
          <h3 className="text-xl font-semibold">Improvement Suggestions</h3>
          {suggestions.length > 0 ? (
            <SuggestionsComponent suggestions={suggestions} />
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Scraper;
