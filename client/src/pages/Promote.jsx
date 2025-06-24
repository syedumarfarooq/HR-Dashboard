import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Promote = () => {
  const [promoted, setPromoted] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/promote`)
      .then(res => setPromoted(res.data))
      .catch(err => console.error('Error loading promoted users:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-6">
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50 left-0">
        <Link to="/" className="text-xl font-bold text-blue-900">HR Dashboard</Link>
        <div className="flex gap-4">
          <Link to="/bookmarks" className="text-black-700 hover:underline font-medium">Bookmarks</Link>
          <Link to="/analytics" className="text-black-700 hover:underline font-medium">Analytics</Link>
          <Link to="/promote" className="text-black-700 hover:underline font-medium">Promote</Link>
        </div>
      </nav>
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10 pt-20"> Promoted Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoted.length === 0 ? (
          <p>No promoted users found.</p>
        ) : (
          promoted.map(user => (
            <Card key={user.id} title={`${user.firstName} ${user.lastName}`}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Performance:</strong> {'⭐'.repeat(user.rating)}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Promote;
