"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [ways] = useState([
    {
      name: "Bar Chart",
      description: "Displays data using rectangular bars representing different categories. The length of each bar corresponds to its value."
    },
    {
      name: "Line Chart",
      description: "Connects individual data points with lines, showing trends over time."
    },
    {
      name: "Pie Chart",
      description: "A circular chart divided into slices to illustrate numerical proportions."
    },
    {
      name: "Histogram",
      description: "Similar to a bar chart but used to represent the distribution of numerical data by dividing the range into intervals (bins)."
    },
    {
      name: "Scatter Plot",
      description: "Uses dots to represent values for two different variables, revealing any correlation or pattern."
    },
    {
      name: "Area Chart",
      description: "Similar to a line chart, but the area below the line is filled, showing cumulative totals over time."
    },
    {
      name: "Box Plot",
      description: "Displays the distribution of data based on a five-number summary: minimum, first quartile, median, third quartile, and maximum."
    },
    {
      name: "Heat Map",
      description: "Represents data values in a matrix format, using colors to indicate different levels of intensity."
    }
  ]);

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-12 text-gray-900 tracking-tight text-center">
        Chart Types
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {ways.map((way, index) => (
          <Link
            href={`/way/${way.name.replace(/ /g, '_')}`}
            key={index}
            className="relative p-8 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 bg-white group"
          >
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 cursor-pointer">
              {way.name}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-2">{way.shortDescription}</p>
            <span
              className="tooltip opacity-0 group-hover:opacity-100 absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-sm p-3 rounded-lg z-20 transition-opacity duration-300 shadow-lg pointer-events-none"
            >
              {way.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
  
}
