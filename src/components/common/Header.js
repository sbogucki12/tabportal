import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faSignOutAlt, 
  faSearch,
  faPlus,
  faTasks,
  faQuestionCircle,
  faUser,
  faHome,
  faThLarge,
  faList,
  faCog
} from '@fortawesome/free-solid-svg-icons';
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
  
  // Get user initials for avatar (placeholder)
  const getUserInitials = () => {
    return 'SB'; // Steven Bogucki placeholder
  };
  
  return (
    <header className="main-header">
      <div className="header-toolbar">
        {/* Left Section - Logo and Divider */}
        <div className="logo-section">
          <Link to="/" className="logo-container">
            <FontAwesomeIcon 
              icon={faChartLine} 
              className="logo-icon" 
            />
            <span className="logo-text">
              Flight<span className="logo-accent">Deck</span> BI
            </span>
          </Link>
          
          <div className="vertical-line"></div>
          
          {/* Applications Button */}
          <button className="nav-icon-button" aria-label="Applications">
            <FontAwesomeIcon icon={faThLarge} />
          </button>
          
          {/* Browse Button */}
          <button className="nav-icon-button" aria-label="Browse">
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
        
        {/* Right Section - Navigation and User Actions */}
        <div className="header-actions">
          {/* Search Button */}
          <button className="search-button-nav" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          
          {/* Create Button */}
          <Link to="/admin" className="nav-icon-button" aria-label="Create">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          
          {/* Tasks Button with Badge */}
          <button className="nav-icon-button nav-badge" data-count="0" aria-label="Tasks">
            <FontAwesomeIcon icon={faTasks} />
          </button>
          
          {/* Activities Button with Badge */}
          <button className="nav-icon-button nav-badge" data-count="0" aria-label="Activities">
            <FontAwesomeIcon icon={faChartLine} />
          </button>
          
          {/* Data Basket Button with Badge */}
          <Link to="/all-dashboards" className="nav-icon-button nav-badge" data-count="0" aria-label="Data Basket">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          
          {/* Help Button */}
          <button className="nav-icon-button" aria-label="Help">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
          
          {/* User Avatar Button */}
          <button className="user-avatar-button" aria-label="User menu">
            <div className="user-avatar">
              {getUserInitials()}
            </div>
          </button>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="logout-button"
            aria-label="Logout"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Hidden navigation for compatibility (if needed) */}
      <nav className="main-nav" style={{ display: 'none' }}>
        <ul>
          <li>
            <Link 
              to="/" 
              className={`nav-link text-button ${isActive('/') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/all-dashboards" 
              className={`nav-link text-button ${isActive('/all-dashboards') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faThLarge} className="nav-icon" />
              <span className="nav-text">All Dashboards</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/categories" 
              className={`nav-link text-button ${isActive('/categories') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faList} className="nav-icon" />
              <span className="nav-text">Categories</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin" 
              className={`nav-link text-button ${isActive('/admin') ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faCog} className="nav-icon" />
              <span className="nav-text">Admin</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;