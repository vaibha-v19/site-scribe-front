import axios from 'axios';

export const scrapeSite = (url) => axios.post('http://127.0.0.1:8000/scrape/', { url });

export const analyzeData = (data) => axios.post('http://127.0.0.1:8000/analyze/', { data });

export const getSuggestions = (data) => axios.post('http://127.0.0.1:8000/suggestions/', { data });
