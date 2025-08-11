// src/components/common/NavigationHeader.js - Reverted to backup style without "Dashboards" text
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/NavigationHeader.css';

const NavigationHeader = () => {
  const location = useLocation();
  
  // Helper to determine active tab
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <div className="navigation-header" data-testid="navigation-section">
      <div className="nav-container">
        {/* Left Section - Only Tabs (removed title) */}
        <div className="nav-left-section">
          <div className="nav-title-section">
            <div className="nav-tabs">
              <div className="nav-tabs-container" role="tablist" aria-label="Navigation">
                <Link 
                  to="/" 
                  className={`nav-tab ${isActive('/') ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive('/')}
                >
                  Visualization Showcase
                </Link>
                <Link 
                  to="/all-dashboards" 
                  className={`nav-tab ${isActive('/all-dashboards') ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive('/all-dashboards')}
                >
                  All Dashboards
                </Link>
                <Link 
                  to="/categories" 
                  className={`nav-tab ${isActive('/categories') ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive('/categories')}
                >
                  Browse by Category
                </Link>
              </div>
              <div className="nav-tab-indicator"></div>
            </div>
          </div>
        </div>
        
        {/* Right Section - Page Info */}
        <div className="nav-right-section">
          <div className="page-info">
            <h1 className="page-title">              
              {location.pathname === '/' && 'Visualization Showcase'}
              {location.pathname === '/all-dashboards' && 'All Dashboards'}
              {location.pathname === '/categories' && 'Browse by Category'}
              {location.pathname === '/personnel' && 'Personnel / HR Analytics'}
              {location.pathname === '/admin' && 'Dashboard Administration'}
              {location.pathname.startsWith('/dashboard/') && 'Dashboard Details'}
            </h1>
            <span className="page-subtitle" aria-label=""></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;