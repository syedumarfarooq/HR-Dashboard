import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const departments = ['Engineering', 'HR', 'Design', 'Marketing', 'Sales'];

const getRandomDepartment = () => {
  const index = Math.floor(Math.random() * departments.length);
  return departments[index];
};

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        data.department = getRandomDepartment();
        data.rating = getRandomRating();
        setUser(data);
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
              <p><strong>Performance:</strong> <span className="text-yellow-500 text-lg">{'⭐'.repeat(user.rating)}</span></p>
              <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
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
