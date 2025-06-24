import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Promote from './pages/Promote';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import EmployeeDetail from './pages/EmployeeDetail';

import { BookmarkProvider } from './context/BookmarkContext';

const App = () => (
  <div className="h-full w-full bg-gradient-to-br from-blue-100 via-white to-purple-100">
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/promote" element={<Promote />} />
        </Routes>
      </Router>
  </BookmarkProvider>
  </div>
  
);

export default App;
