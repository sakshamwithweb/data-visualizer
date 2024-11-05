import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(...registerables);

const Heat_Map = ({ data }) => {
  const [chartData, setChartData] = useState({ datasets: [] });

  // Function to parse CSV data
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

      const heatMapData = {
        datasets: [{
          label: 'Heat Map Data',
          data: values.flatMap((row, rowIndex) =>
            row.map((value, colIndex) => ({
              x: colIndex,
              y: rowIndex,
              v: value, // Value for the heat map
              backgroundColor: getColor(value) // Color based on value
            }))
          ),
          pointRadius: 15, // Size of the points
        }],
      };

      setChartData(heatMapData);
    }
  }, [data]);

  // Function to determine color based on value
  const getColor = (value) => {
    const alpha = Math.min(1, Math.max(0, value / 100)); // Normalize to [0, 1]
    return `rgba(255, 99, 132, ${alpha})`; // Color mapping (modify as needed)
  };

  return (
    <div className="w-full">
      <Scatter
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Categories',
              },
              ticks: {
                callback: (value, index) => chartData.labels && chartData.labels[index] // Show labels on x-axis
              },
            },
            y: {
              title: {
                display: true,
                text: 'Rows',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Heat_Map;
