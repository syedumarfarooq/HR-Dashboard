import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookmarks`);
      console.log('API response:', res.data);
      setBookmarks(res.data);
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/bookmarks/${id}`);
      setBookmarks(prev => prev.filter(user => user.id !== id));
      
    } catch (err) {
      console.error('Error deleting bookmark:', err);
    }
  };

  const handlePromote = async (user) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/promote`, user);
      alert(`${user.firstName} has been promoted!`);
    } catch (err) {
      console.error('Error promoting user:', err);
    }
  };

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
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10 pt-20"> Bookmarked Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.length === 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          bookmarks.map(user => (
            <Card key={user.id} title={`${user.firstName} ${user.lastName}`}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <div className="mt-4 gap-2 space-x-2">
                <Button onClick={() => handleDelete(user.id)}> Remove Bookmark</Button>
                <Button onClick={() => handlePromote(user)}>Promote</Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
