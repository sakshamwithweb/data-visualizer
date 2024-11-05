import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Line_Chart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Line Chart Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  });

  // Function to parse CSV data into x and y values
  const parseCSV = (csv) => {
    const rows = csv.trim().split('\n');
    const labels = [];
    const values = [];
    
    rows.forEach((row) => {
      const [label, value] = row.split(',').map(item => item.trim());
      labels.push(label);
      values.push(parseFloat(value));
    });

    return { labels, values };
  };

  useEffect(() => {
    if (data) {
      const { labels, values } = parseCSV(data);

      const lineChartData = {
        labels: labels,
        datasets: [{
          label: 'Line Chart Data',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4, // Smooth curve
        }],
      };

      setChartData(lineChartData);
    }
  }, [data]);

  return (
    <div className="w-full">
      {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'X Axis Labels',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Values',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>No data available to display the line chart.</p>
      )}
    </div>
  );
};

export default Line_Chart;
