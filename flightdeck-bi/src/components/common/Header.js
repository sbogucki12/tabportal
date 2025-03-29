import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Header.css';

const Header = () => {
  const location = useLocation();
  
  // Helper to determine if the link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('flightdeck-auth');
    // Force page reload to show the login modal
    window.location.reload();
  };
  
  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/" className="logo-container">
          <FontAwesomeIcon 
            icon={faChartLine} 
            className="logo-icon" 
          />
          <h1 className="logo-text">
            Flight<span className="logo-accent">Deck</span> BI
          </h1>
        </Link>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/all-dashboards" 
              className={`nav-link ${isActive('/all-dashboards') ? 'active' : ''}`}
            >
              All Dashboards
            </Link>
          </li>
          <li>
            <Link 
              to="/categories" 
              className={`nav-link ${isActive('/categories') ? 'active' : ''}`}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link 
              to="/admin" 
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Admin
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout}
              className="logout-button"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#333',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0'
              }}
            >
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                style={{ marginRight: '0.5rem', color: '#005ea2' }} 
              />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;