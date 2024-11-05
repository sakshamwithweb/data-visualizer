import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Histogram = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Histogram',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  // Function to parse CSV data and calculate histogram data
  const parseCSV = (csv) => {
    const values = csv.trim().split('\n').map(line => parseFloat(line.trim()));
    return values;
  };

  const calculateHistogram = (values, numBins) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binSize = (max - min) / numBins;
    const bins = new Array(numBins).fill(0);
    
    values.forEach(value => {
      const binIndex = Math.floor((value - min) / binSize);
      if (binIndex >= 0 && binIndex < numBins) {
        bins[binIndex]++;
      }
    });

    return {
      labels: Array.from({ length: numBins }, (_, i) => {
        const lowerBound = (min + i * binSize).toFixed(2);
        const upperBound = (min + (i + 1) * binSize).toFixed(2);
        return `${lowerBound} - ${upperBound}`;
      }),
      counts: bins,
    };
  };

  useEffect(() => {
    if (data) {
      const values = parseCSV(data);
      const { labels, counts } = calculateHistogram(values, 10); // Calculate histogram with 10 bins

      const histogramData = {
        labels: labels,
        datasets: [{
          label: 'Histogram',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      };

      setChartData(histogramData);
    }
  }, [data]);

  return (
    <div className="w-full">
      {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Value Range',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Frequency',
                },
              },
            },
          }}
        />
      ) : (
        <p>No data available to display the histogram.</p>
      )}
    </div>
  );
};

export default Histogram;
