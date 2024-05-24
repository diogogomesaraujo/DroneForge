import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SalesChart = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: '',
                data: [10000, 50000, 150000, 100000],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(153, 102, 255, 0.3)');
                    gradient.addColorStop(1, 'rgba(153, 102, 255, 0.5)');
                    return gradient;
                },
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: 'start',
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 50000, // Ensure four values are shown
                    maxTicksLimit: 4,
                    padding: 20, // Increase space between axis and labels
                    callback: function(value) {
                        return value.toLocaleString(); // Add thousands separator
                    },
                },
                grid: {
                    display: false, // Remove horizontal grid lines
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.raw.toLocaleString()} pieces sold`;
                    },
                },
            },
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Pieces Sold',
                align: 'start',
                padding: {
                    top: -10, // Adjust this value to move the title higher
                    bottom: 10,
                },
                font: {
                    size: 16,
                    weight: 'bold',
                },
                color: 'rgba(0, 0, 0, 0.7)',
            },
        },
    };

    return (
        <div style={{ width: '500px', height: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Line ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default SalesChart;
