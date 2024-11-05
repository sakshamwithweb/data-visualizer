"use client";
import { useState } from 'react';
import React from 'react';

const dynamicImport = (wayName) => {
    return import(`@/components/charts/${wayName}`).then((module) => module.default);
};

export default function Page({ params }) {
    const [inputData, setInputData] = useState('');
    const [ChartComponent, setChartComponent] = useState(null);
    const [chartExamples] = useState([
        {
            type: "Bar_Chart",
            csvExample: "Category,Value\nA,10\nB,20\nC,30\nD,25\nE,15"
        },
        {
            type: "Line_Chart",
            csvExample: "January,10\nFebruary,20\nMarch,30\nApril,25\nMay,35"
        },
        {
            type: "Pie_Chart",
            csvExample: "Red,10\nBlue,20\nYellow,30\nGreen,15\nPurple,25"
        },
        {
            type: "Histogram",
            csvExample: "Range,Count\n0-10,5\n10-20,15\n20-30,25\n30-40,10"
        },
        {
            type: "Scatter_Plot",
            csvExample: "1,2\n2,3\n3,5\n4,7\n5,11"
        },
        {
            type: "Area_Chart",
            csvExample: "Month,Value\nJan,30\nFeb,20\nMar,40\nApr,50\nMay,60"
        },
        {
            type: "Box_Plot",
            csvExample: "Group,Value\nA,10\nA,15\nA,20\nB,20\nB,25\nB,30"
        },
        {
            type: "Heat_Map",
            csvExample: "X,Y,Value\n1,1,10\n1,2,20\n2,1,30\n2,2,40"
        }
    ]);

    const wayName = React.use(params).wayy.replace(/ /g, '');

    // Find the corresponding example for the current wayName
    const chartExample = chartExamples.find(example => example.type === wayName);

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted with data:", inputData);

        try {
            const component = await dynamicImport(wayName);
            console.log("Dynamic import successful:", component);
            setChartComponent(() => component);
        } catch (error) {
            console.error("Error loading the chart component:", error);
            setChartComponent(null);
        }
    };

    const handleExampleClick = () => {
        if (chartExample) {
            setInputData(chartExample.csvExample);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900">{wayName}</h1>
            <div className="mb-4">
                {chartExample && !ChartComponent? (
                    <div>
                        <span className="text-gray-700">Example CSV Data: </span>
                        <span
                            onClick={handleExampleClick}
                            className="text-blue-500 cursor-pointer underline hover:text-blue-700"
                        >
                            {chartExample.csvExample} 
                        </span>
                        <span>{" "}👈 Click here</span>
                    </div>
                ):(null)}
            </div>
            {ChartComponent ? (
                <div className="mt-8 w-full">
                    <ChartComponent data={inputData} />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    <textarea
                        value={inputData}
                        onChange={handleInputChange}
                        className="border min-h-[200px] border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out hover:border-blue-400"
                        placeholder={`Only CSV`}
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
