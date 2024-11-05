import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Bar_Chart = ({ data }) => {
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
      const barChartData = {
        labels: labels,
        datasets: values.map((valueSet, index) => ({
          label: `Dataset ${index + 1}`, 
          data: valueSet,
          backgroundColor: `rgba(${(index + 1) * 50}, ${100 + index * 30}, 150, 0.5)`, 
          borderColor: `rgba(${(index + 1) * 50}, ${100 + index * 30}, 150, 1)`,
          borderWidth: 1,
        })),
      };

      setChartData(barChartData);
    }
  }, [data]);

  return (
    <div className="w-full">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Bar_Chart;
