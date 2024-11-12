import { useState, useEffect } from 'react';
import { scrapeSite, analyzeData, getSuggestions } from '../services/api';
import AnalysisComponent from './AnalysisComponent';
import SuggestionsComponent from './SuggestionsComponent.jsx';

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
      
      setSuggestions(suggestionsArray); // Update the state with the suggestions
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
    <div className="flex h-screen p-4 bg-gray-100">
      <div className="flex flex-col w-1/2 space-y-4">
        <div className="p-4 bg-white rounded shadow-md h-64 overflow-y-auto">
          <h2 className="text-xl font-semibold">Scraped Data</h2>
          <p className="mt-2 text-gray-700">
            {loading ? 'Loading...' : data || 'No data to display'}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold">Sentiment Analysis</h2>
          {analysisResult ? (
            <AnalysisComponent analysis={analysisResult} />
          ) : (
            <p>No analysis available.</p>
          )}
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold">Improvement Suggestions</h2>
          {suggestions.length > 0 ? (
            <SuggestionsComponent suggestions={suggestions} />
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>

      <div className="w-1/2 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Enter URL</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleScrape}
          className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
        >
          Scrape
        </button>
      </div>
    </div>
  );
}

export default Scraper;
