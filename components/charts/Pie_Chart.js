import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Pie_Chart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Pie Chart Data',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  });

  // Function to parse CSV data
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

      const pieChartData = {
        labels: labels,
        datasets: [{
          label: 'Pie Chart Data',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 2,
        }],
      };

      setChartData(pieChartData);
    }
  }, [data]);

  return (
    <div className="w-full">
      {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>No data available to display the pie chart.</p>
      )}
    </div>
  );
};

export default Pie_Chart;
