import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    // undefined or empty data
    if (!data || !data.data) {
        return <p>No data available to display.</p>;
    }

    // Extracting labels and values from the response
    const labels = Object.keys(data.data).map(rate => `${rate}%`); 
    const values = Object.values(data.data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Number of lenders offering rate',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Interest Rates for Your Situation',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
