import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookmarks`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10"> Bookmarked Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.length === 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          bookmarks.map(user => (
            <Card key={user.id} title={`${user.firstName} ${user.lastName}`}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <div className="mt-4">
                <Button onClick={() => handleDelete(user.id)}> Remove Bookmark</Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
