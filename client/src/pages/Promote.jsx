import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const Promote = () => {
  const [promoted, setPromoted] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/promote`)
      .then(res => setPromoted(res.data))
      .catch(err => console.error('Error loading promoted users:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10"> Promoted Employees</h2>
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
