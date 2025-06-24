import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const departments = ['Engineering', 'HR', 'Design', 'Marketing', 'Sales'];
const ratings = [1, 2, 3, 4, 5];
const getRandomDepartment = () => departments[Math.floor(Math.random() * departments.length)];
const getRandomRating = () => Math.floor(Math.random() * 5) + 1;



const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', age: '', department: '', rating: '' });
const [error, setError] = useState('');


  const navigate = useNavigate();
  useEffect(() => {
    // Whenever search, selectedDepartments, or selectedRatings change,
    // reset the page back to 1
    setCurrentPage(1);
  }, [search, selectedDepartments, selectedRatings]);
  //fetch users
  const fetchUsers = async () => {
    try {
      // Get dummy JSON data
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();
      const enhancedUsers = data.users.map(user => ({
        ...user,
        department: getRandomDepartment(),
        rating: getRandomRating()
      }));
  
      // Get your DB data
      const dbRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/all-users`);
      const dbUsers = dbRes.data;
  
      // Combine both
      const combined = [...enhancedUsers, ...dbUsers];
      setUsers(combined);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };
  useEffect(() => {
    
    
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const searchMatch = fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());

    const departmentMatch = selectedDepartments.length === 0 || selectedDepartments.includes(user.department);
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(user.rating);

    return searchMatch && departmentMatch && ratingMatch;
  });

  
  //  Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handleBookmark = async (user) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/bookmarks`, user);
      alert('Bookmarked!');
    } catch (err) {
      console.error('Error bookmarking:', err);
    }
  };
  
  const handleAddUser = async () => {
      if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.department || !newUser.rating) {
          setError('All fields are required!');
          return;
        }
      
        try {
          // Add user to the backend
          await axios.post(`${process.env.REACT_APP_API_URL}/user/adduser`, newUser);
          alert(`${newUser.firstName} has been added!`);
      
          // Refetch the user list
          fetchUsers();
      
          // Reset the form, error, and close the modal
          setNewUser({ firstName: '', lastName: '', email: '', age: '', department: '', rating: '' });
          setError('');
          setIsModalOpen(false);
        } catch (error) {
          console.error(error);
          setError('Error adding user. Try again later.');
        }
  }
  const handlePromote = async (user) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/promote`, user);
      alert(`${user.firstName} has been promoted!`);
    } catch (err) {
      console.error('Error promoting user:', err);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* ✅ Top Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">HR Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/bookmarks" className="text-black-700 hover:underline font-medium">Bookmarks</Link>
          <Link to="/analytics" className="text-black-700 hover:underline font-medium">Analytics</Link>
          <Link to="/promote" className="text-black-700 hover:underline font-medium">Promote</Link>
        </div>
      </nav>

      {/* 📝 Title */}
      <div className="text-center py-2">
        <h2 className="text-2xl font-bold text-blue-800">Employee Performance Dashboard</h2>
        <p className="text-gray-600  text-sm mt-2">Search and filter employees by department and performance</p>
      </div>
      

      {/* 🔍 Filter Controls */}
      <div className="px-6 py-6 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4 justify-center">
          
          {/* 🔍 Search */}
          <input
            type="text"
            name='search'
            placeholder="Search by name, mail, or department"
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 🏢 Department Dropdown */}
          <div className="w-full md:w-1/4">
            <select
              onChange={(e) =>
                e.target.value === 'none'
                  ? setSelectedDepartments([])
                  : setSelectedDepartments([e.target.value])
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="none" className="text-gray-500">Filter by Department</option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>

          {/* ⭐ Rating Dropdown */}
          <div className="w-full md:w-1/4">
            <select
              onChange={(e) =>
                e.target.value === 'none'
                  ? setSelectedRatings([])
                  : setSelectedRatings([parseInt(e.target.value)])
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="none" className="text-gray-500">Filter by Rating</option>
              {ratings.map(r => (
                <option key={r} value={r}>{'⭐'.repeat(r)}</option>
              ))}
            </select>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Add New User</Button>
        </div>
      </div>

      {/* 💼 Employee Cards */}
      <div className="px-4 pb-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {currentUsers.map(user => (
            <div key={user.id} className="hover:scale-[1.01] transition duration-300">
              <Card title={`${user.firstName} ${user.lastName}`} >
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

        {/* ⚡️ Pagination Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <span className="self-center">Page {currentPage} of {totalPages}</span>
          
          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-[400px] space-y-4">
      <h3 className="text-xl font-bold">Add New User</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
  placeholder="First Name"
  name="firstName"
  autoComplete="given-name"
  value={newUser.firstName}
  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
  className="w-full border rounded p-2"
/>

<input
  placeholder="Last Name"
  name="lastName"
  autoComplete="family-name"
  value={newUser.lastName}
  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
  className="w-full border rounded p-2"
/>

<input
  placeholder="Email"
  name="email"
  autoComplete="email"
  value={newUser.email}
  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
  className="w-full border rounded p-2"
/>

<input
  placeholder="Age"
  name="age"
  autoComplete="off"
  value={newUser.age}
  onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
  className="w-full border rounded p-2"
  type="number"
/>

      <select
        value={newUser.department}
        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
        className="w-full border rounded p-2"
      >
        <option value="">Select department</option>
        {departments.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
      <select
        value={newUser.rating}
        onChange={(e) => setNewUser({ ...newUser, rating: e.target.value })}
        className="w-full border rounded p-2"
      >
        <option value="">Select rating</option>
        {ratings.map((r) => (
          <option key={r} value={r}>{'⭐'.repeat(r)}</option>
        ))}
      </select>
      <div className="flex justify-end gap-3 mt-4">
        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button onClick={handleAddUser}>Add</Button>
      </div>
    </div>
  </div>
)}
    </div>
    

  );
};

export default Home;
