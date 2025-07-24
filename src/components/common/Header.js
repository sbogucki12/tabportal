import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faQuestionCircle,
  faShoppingBasket,
  faChartLine,
  faTasks,
  faPlus,
  faThLarge,
  faEye,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Header.css';

const Header = () => {
  // const location = useLocation();
  
  // Helper to determine if the link is active
/*   const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('flightdeck-auth');
    // Force page reload to show the login modal
    window.location.reload();
  }; */
  
  return (
    <header className="main-header">
      <div className="header-toolbar">
        {/* Left Section - EIM text, vertical bar, and nav icons */}
        <div className="header-left-section">
          <div className="eim-text">EIM Enterprise Information Management</div>
          <div className="header-vertical-line"></div>
          
          {/* Left Navigation Icons */}
          <div className="left-nav-icons">
            <button className="nav-icon-button" aria-label="Applications">
              <FontAwesomeIcon icon={faThLarge} />
            </button>
            
            <Link to="/all-dashboards" className="nav-icon-button" aria-label="Browse">
              <FontAwesomeIcon icon={faEye} />
            </Link>
            
            <button className="nav-icon-button" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        
        {/* Right Section - User action icons */}
        <div className="header-right-section">
          <Link to="/admin" className="nav-icon-button" aria-label="Create">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          
          <button className="nav-icon-button" aria-label="Tasks">
            <FontAwesomeIcon icon={faTasks} />
          </button>
          
          <button className="nav-icon-button" aria-label="Activities">
            <FontAwesomeIcon icon={faChartLine} />
          </button>
          
          <Link to="/all-dashboards" className="nav-icon-button" aria-label="Shopping Basket">
            <FontAwesomeIcon icon={faShoppingBasket} />
          </Link>
          
          <button className="nav-icon-button" aria-label="Help">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
          
          <button className="nav-icon-button" aria-label="User Profile">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;