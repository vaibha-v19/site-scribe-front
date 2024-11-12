import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements and components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const AnalysisComponent = ({ analysis }) => {
  const getPieData = () => {
    // Check if analysis and its properties are available
    if (!analysis || !analysis.sentiment || analysis.confidence === undefined) {
      return {
        labels: ['Positive', 'Negative'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };
    }

    const isPositive = analysis.sentiment === 'POSITIVE';
    return {
      labels: ['Positive', 'Negative'],
      datasets: [
        {
          data: isPositive
            ? [analysis.confidence, 1 - analysis.confidence]
            : [1 - analysis.confidence, analysis.confidence],
          backgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };
  };

  return (
    <div className="w-64 h-64 mx-auto">
      <Pie data={getPieData()} />
      {analysis && (
        <p>Confidence: {(analysis.confidence * 100).toFixed(2)}%</p>
      )}
    </div>
  );
};

export default AnalysisComponent;
