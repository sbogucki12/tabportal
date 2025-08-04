// src/App.js - Updated with Personnel Page route
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';
import AllDashboardsPage from './pages/AllDashboardsPage';
import CategoriesPage from './pages/CategoriesPage';
import PersonnelPage from './pages/PersonnelPage'; // Import new Personnel page
import { DashboardProvider } from './context/DashboardContext';
import PasswordModal from './components/common/PasswordModal';
import './styles/index.css';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('flightdeck-auth');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Add listener for navigation events to clear any search params
  useEffect(() => {
    // This will run every time the pathname changes (not query params)
    const handleNavigation = () => {
      // Force clear search params when user navigates to a different page
      if (location.pathname !== '/all-dashboards' && location.search !== '') {
        navigate(location.pathname, { replace: true });
      }
    };
    
    handleNavigation();
  }, [location.pathname, location.search, navigate]);

  const handleAuthentication = (password) => {
    // For now, we'll use a simple password check
    // In a real app, this would be handled by a backend service
    if (password === 'aviation2025') {
      localStorage.setItem('flightdeck-auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      <DashboardProvider>
        {!isAuthenticated ? (
          <PasswordModal onAuthenticate={handleAuthentication} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/:id" element={<DetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/all-dashboards" element={<AllDashboardsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/personnel" element={<PersonnelPage />} /> {/* New Personnel page route */}
          </Routes>
        )}
      </DashboardProvider>
    </div>
  );
}

export default App;