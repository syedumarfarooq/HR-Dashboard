import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const departments = ['Engineering', 'HR', 'Design', 'Marketing', 'Sales'];

const getRandomDepartment = () => {
  const idx = Math.floor(Math.random() * departments.length);
  return departments[idx];
};

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const handleBookmark = async (user) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/bookmarks`, user);
    alert('Bookmarked!');
  } catch (err) {
    console.error('Error bookmarking:', err);
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
  

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();

      const enhancedUsers = data.users.map(user => ({
        ...user,
        department: getRandomDepartment(),
        rating: getRandomRating()
      }));

      setUsers(enhancedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100">
      
      {/* ✅ Top Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">HR Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/bookmarks" className="text-blue-700 hover:underline font-medium">🔖 Bookmarks</Link>
          <Link to="/analytics" className="text-blue-700 hover:underline font-medium">📊 Analytics</Link>
          <Link to="/promote" className="text-blue-700 hover:underline font-medium">Promote</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="py-10 px-4 max-w-[1440px] mx-auto">
        <h2 className="text-5xl font-bold text-blue-900 mb-12 text-center">
          Employee Performance Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {users.map(user => (
            <div key={user.id} className="hover:scale-[1.01] transition duration-300">
              <Card title={`${user.firstName} ${user.lastName}`}>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
                  <p className="text-sm text-gray-600"><strong>Age:</strong> {user.age}</p>
                  <p className="text-sm text-gray-600"><strong>Department:</strong> <Badge text={user.department} /></p>
                  <p className="text-sm text-gray-600"><strong>Performance:</strong> <span className="text-yellow-500 text-lg">{'⭐'.repeat(user.rating)}</span></p>
                </div>

                <div className="flex justify-center gap-1 mt-4">
                  <Button onClick={() => navigate(`/employee/${user.id}`)}>View</Button>
                  <Button onClick={() => handleBookmark(user)}>Bookmark</Button>
                  <Button onClick={() => handlePromote(user)}>Promote</Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
