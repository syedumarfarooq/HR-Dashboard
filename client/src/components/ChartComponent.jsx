// src/components/ChartComponent.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Engineering', 'HR', 'Marketing', 'Design', 'Sales'],
  datasets: [
    {
      label: 'Average Rating',
      data: [4.2, 3.8, 4.0, 3.6, 4.4],
      backgroundColor: 'rgba(59, 130, 246, 0.6)', // blue-500
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Department-wise Average Ratings' },
  },
};

const ChartComponent = () => {
    return (
    <div style={{ width: '100%', maxWidth: '600px', height: '300px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>

    );
};

export default ChartComponent;
