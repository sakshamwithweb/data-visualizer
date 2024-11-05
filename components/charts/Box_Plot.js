import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Box_Plot = ({ data }) => {
  const [chartData, setChartData] = useState({ datasets: [] });

  const parseCSV = (csv) => {
    const lines = csv.trim().split('\n');
    const labels = lines[0].split(',').map(label => label.trim());
    const values = lines.slice(1).map(line => {
      return line.split(',').map(value => parseFloat(value.trim()));
    });

    return { labels, values };
  };

  useEffect(() => {
    if (data) {
      const { labels, values } = parseCSV(data);
      
      const boxPlotData = {
        labels: labels,
        datasets: values.map((valueSet, index) => ({
          label: `Dataset ${index + 1}`,
          data: [
            {
              // Each dataset contains 5 elements: min, Q1, median, Q3, max
              y: getPercentile(valueSet, 50), // Median
              x: index, // Use index as the x-position
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              type: 'bar',
            },
            {
              y: getPercentile(valueSet, 25), // Q1
              x: index - 0.1, // Shift a bit for better visibility
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              y: getPercentile(valueSet, 75), // Q3
              x: index + 0.1, // Shift a bit for better visibility
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              y: Math.min(...valueSet), // Min
              x: index - 0.2, // Shift a bit for better visibility
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
              y: Math.max(...valueSet), // Max
              x: index + 0.2, // Shift a bit for better visibility
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        })),
      };

      setChartData(boxPlotData);
    }
  }, [data]);

  // Function to calculate the nth percentile
  const getPercentile = (values, percentile) => {
    const sorted = [...values].sort((a, b) => a - b);
    const index = (percentile / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = lower + 1;
    if (upper >= sorted.length) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
  };

  return (
    <div className="w-full">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              stacked: true,
              ticks: {
                autoSkip: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Box_Plot;
