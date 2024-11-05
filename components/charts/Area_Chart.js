import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Area_Chart = ({ data }) => {
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
      try {
        const { labels, values } = parseCSV(data);
        const areaChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Area Chart Data',
              data: values.map(value => value[0]),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        };

        setChartData(areaChartData);
      } catch (error) {
        console.error("Error parsing CSV data: ", error);
      }
    }
  }, [data]);

  return (
    <div className="w-full">
      <Line
        data={chartData}
        options={{
          responsive: true,
          animation: {
            duration: 1000,
          },
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

export default Area_Chart;