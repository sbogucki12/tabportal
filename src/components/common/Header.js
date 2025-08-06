// src/components/common/Header.js - Updated with admin password protection
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import AdminPasswordModal from './AdminPasswordModal';
import '../../styles/Header.css';

const Header = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowAdminModal(true);
  };

  const handleAdminAuthenticate = (password) => {
    // Admin password - different from main app password
    if (password === 'admin2025') {
      navigate('/admin');
      return true;
    }
    return false;
  };

  return (
    <>
      <header className="main-header">
        <div className="header-toolbar">
          {/* Left Section - EIM text, vertical bar, and nav icons */}
          <div className="header-left-section">
            <div className="eim-text">EIM Enterprise Information Management</div>
            <div className="header-vertical-line"></div>
            
            {/* Left Navigation Icons - All redirect to Coming Soon */}
            <div className="left-nav-icons">
              <Link to="/coming-soon" className="nav-icon-button" aria-label="Applications">
                <FontAwesomeIcon icon={faThLarge} />
              </Link>
              
              <Link to="/coming-soon" className="nav-icon-button" aria-label="Browse">
                <FontAwesomeIcon icon={faEye} />
              </Link>
              
              <Link to="/coming-soon" className="nav-icon-button" aria-label="Search">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </div>
          </div>
          
          {/* Right Section - User action icons */}
          <div className="header-right-section">
            <button 
              onClick={handleAdminClick}
              className="nav-icon-button" 
              aria-label="Admin Access"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            
            <Link to="/coming-soon" className="nav-icon-button" aria-label="Tasks">
              <FontAwesomeIcon icon={faTasks} />
            </Link>
            
            <Link to="/coming-soon" className="nav-icon-button" aria-label="Activities">
              <FontAwesomeIcon icon={faChartLine} />
            </Link>
            
            <Link to="/coming-soon" className="nav-icon-button" aria-label="Shopping Basket">
              <FontAwesomeIcon icon={faShoppingBasket} />
            </Link>
            
            <Link to="/coming-soon" className="nav-icon-button" aria-label="Help">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Link>
            
            <Link to="/coming-soon" className="nav-icon-button" aria-label="User Profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Password Modal */}
      <AdminPasswordModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onAuthenticate={handleAdminAuthenticate}
      />
    </>
  );
};

export default Header;