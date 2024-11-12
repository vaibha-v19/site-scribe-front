import React from 'react';

const SuggestionsComponent = ({ suggestions }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold">Suggestions</h2>
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        <ul className="mt-2 text-gray-700">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="mb-2">
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-500">No suggestions available.</p>
      )}
    </div>
  );
};

export default SuggestionsComponent;
