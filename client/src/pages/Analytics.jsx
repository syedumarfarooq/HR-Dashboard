import React from 'react';
import ChartComponent from '../components/ChartComponent'; // path as per your structure
import BookmarkTrends from '../components/BookmarkTrends';

import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div>
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50 left-0">
        <Link to="/" className="text-xl font-bold text-blue-900">HR Dashboard</Link>
        <div className="flex gap-4">
          <Link to="/bookmarks" className="text-black-700 hover:underline font-medium">Bookmarks</Link>
          <Link to="/analytics" className="text-black-700 hover:underline font-medium">Analytics</Link>
          <Link to="/promote" className="text-black-700 hover:underline font-medium">Promote</Link>
        </div>
      </nav>
    <div className="pt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <ChartComponent />
      <BookmarkTrends />
    </div>
    </div>
  );
};

export default Analytics;
