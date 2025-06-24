import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from './Card';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BookmarkTrends = () => {
  const monthlyBookmarks = {
    Jan: 4,
    Feb: 6,
    Mar: 3,
    Apr: 8,
    May: 5,
    Jun: 7,
  };

  const data = {
    labels: Object.keys(monthlyBookmarks),
    datasets: [
      {
        label: 'Bookmarks Added',
        data: Object.values(monthlyBookmarks),
        fill: false,
        borderColor: 'rgba(139, 92, 246, 1)',   // purple
        backgroundColor: 'rgba(139, 92, 246, 0.3)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for custom height
    plugins: {
      title: { display: true, text: 'Bookmark Trends (Monthly)' },
      legend: { display: true },
    },
  };

  return (
    <Card title="Bookmark Trends">
      <div style={{ width: '100%', maxWidth: '600px', height: '300px', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default BookmarkTrends;
