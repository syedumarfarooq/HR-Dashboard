import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const departments = ['Engineering', 'HR', 'Design', 'Marketing', 'Sales'];
const tabs = ['Overview', 'Projects', 'Feedback'];

const getRandomDepartment = () => {
  const index = Math.floor(Math.random() * departments.length);
  return departments[index];
};

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const mockPerformanceHistory = () => {
  return Array.from({ length: 3 }, (_, i) => ({
    year: 2020 + i,
    rating: getRandomRating(),
    comment: ['Excellent', 'Good', 'Average', 'Outstanding', 'Needs Improvement'][Math.floor(Math.random() * 5)],
  }));
};

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [performanceHistory, setPerformanceHistory] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        data.department = getRandomDepartment();
        data.rating = getRandomRating();
        data.bio = 'A motivated team player with excellent problem-solving skills and a passion for continuous learning.';
        setUser(data);
        setPerformanceHistory(mockPerformanceHistory());
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card title={`${user.firstName} ${user.lastName}`}>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <img
              src={user.image}
              alt={user.firstName}
              className="w-40 h-40 object-cover rounded-full shadow"
            />
            <div className="text-gray-700 text-sm w-full">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Department:</strong> <Badge text={user.department} /></p>
              <p><strong>Performance:</strong> <span className="text-yellow-500 text-lg">{'⭐'.repeat(user.rating)}</span> <Badge text={`${user.rating}/5`} color="yellow" /></p>
              <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
            </div>
          </div>

          <div className="mt-6 text-gray-700">
            <p><strong>Bio:</strong> {user.bio}</p>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex space-x-4 border-b pb-2 mb-4">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-t text-sm font-medium ${
                    activeTab === tab ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="text-sm text-gray-800">
              {activeTab === 'Overview' && (
                <>
                  <h4 className="font-semibold mb-2">Past Performance History:</h4>
                  <ul className="list-disc list-inside">
                    {performanceHistory.map((item, index) => (
                      <li key={index}>
                        <span className="font-medium">{item.year}:</span> {item.comment} ({'⭐'.repeat(item.rating)})
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'Projects' && (
                <ul className="list-disc list-inside">
                  <li>Project A – Revamped internal HR system</li>
                  <li>Project B – Led frontend redesign for dashboard</li>
                  <li>Project C – Integrated analytics pipeline</li>
                </ul>
              )}
              {activeTab === 'Feedback' && (
                <ul className="list-disc list-inside">
                  <li>"Great mentor and always willing to help" – Peer Review</li>
                  <li>"Consistently delivers high-quality work" – Manager</li>
                  <li>"Creative and proactive in team settings" – Teammate</li>
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate(-1)}>⬅ Back</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetail;
