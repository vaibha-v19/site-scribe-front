import './index.css';
import Scraper from './components/Scraper';
import AnalysisComponent from './components/AnalysisComponent';
import SuggestionsComponent from './components/SuggestionsComponent';

function App() {
  return (
    <div>
      <Scraper />
      <AnalysisComponent />
      <SuggestionsComponent />
    </div>
  );
}

export default App;
