import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Scatter_Plot = ({ data }) => {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: 'Scatter Plot Data',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  });

  // Function to parse CSV data
  const parseCSV = (csv) => {
    const rows = csv.trim().split('\n');
    const dataPoints = [];
    
    rows.forEach((row) => {
      const [x, y] = row.split(',').map(item => parseFloat(item.trim()));
      if (!isNaN(x) && !isNaN(y)) {
        dataPoints.push({ x, y });
      }
    });

    return dataPoints;
  };

  useEffect(() => {
    if (data) {
      const scatterData = parseCSV(data);

      const scatterChartData = {
        datasets: [{
          label: 'Scatter Plot Data',
          data: scatterData,
          backgroundColor: 'rgba(75, 192, 192, 1)',
        }],
      };

      setChartData(scatterChartData);
    }
  }, [data]);

  return (
    <div className="w-full">
      {chartData.datasets[0].data.length > 0 ? (
        <Scatter
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'X Axis',
                },
                beginAtZero: true,
              },
              y: {
                title: {
                  display: true,
                  text: 'Y Axis',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>No data available to display the scatter plot.</p>
      )}
    </div>
  );
};

export default Scatter_Plot;
