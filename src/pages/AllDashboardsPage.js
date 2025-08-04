import React, { useContext, useCallback } from 'react';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding,
  faPlane,
  faCity,
  faRocket,
  faWifi,
  faBalanceScale,
  faHandshake,
  faGlobe,
  faServer,
  faShieldAlt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/AllDashboardsPage.css'; // Additional styles

const AllDashboardsPage = () => {
  const { loading, error } = useContext(DashboardContext);
  
  // Define the standard organizations with icons
  const standardOrganizations = [
    { name: 'AVS', fullName: 'Aviation Safety', icon: faShieldAlt, color: 'org-avs' },
    { name: 'ATO', fullName: 'Air Traffic Organization', icon: faPlane, color: 'org-ato' },
    { name: 'ARP', fullName: 'Airports', icon: faCity, color: 'org-arp' },
    { name: 'AST', fullName: 'Commercial Space Transportation', icon: faRocket, color: 'org-ast' },
    { name: 'AFN', fullName: 'NextGen', icon: faWifi, color: 'org-afn' },
    { name: 'AGC', fullName: 'General Counsel', icon: faBalanceScale, color: 'org-agc' },
    { name: 'ANG', fullName: 'Government & Industry Affairs', icon: faHandshake, color: 'org-ang' },
    { name: 'APL', fullName: 'Policy & International Affairs', icon: faGlobe, color: 'org-apl' },
    { name: 'AIT', fullName: 'Information & Technology', icon: faServer, color: 'org-ait' },
    { name: 'ASH', fullName: 'Security & Hazardous Materials', icon: faBuilding, color: 'org-ash' }
  ];
  
  // Handle organization card clicks
  const handleOrganizationClick = useCallback((organizationName) => {
    // Store the organization name in both localStorage and sessionStorage
    localStorage.setItem('selectedOrganization', organizationName);
    sessionStorage.setItem('selectedOrganization', organizationName);
    
    // Add a timestamp to identify this navigation
    localStorage.setItem('organizationNavigationTime', new Date().getTime());
    
    // Use the most direct navigation approach
    window.location.href = `/all-dashboards?organization=${encodeURIComponent(organizationName)}`;
  }, []);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading organizations...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="loading-container">
        <div className="error-text">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="home-page">
      <Header />
      <NavigationHeader />
      
      {/* Main Content with White Card - Same structure as other pages */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            {/* Light Gray Content Card - wraps ALL content */}
            <div className="content-inner-card">
              {/* EIM Header Section */}
              <div className="page-header-section">
                <div className="header-first">
                  <div className="logo">
                    <div className="logo-text">EIM</div>
                  </div>
                  <div className="vl"></div>
                  <div className="header-content">
                    <h1 className="header-main-title">Enterprise Information Management</h1>
                    <h4 className="header-subtitle">All Dashboards</h4>
                  </div>
                </div>
              </div>

              {/* Organization Navigation Section */}
              <section className="category-navigation-section">
                <h2 className="section-title">Browse by Organization</h2>
                <div className="category-cards-grid">
                  {standardOrganizations.map((organization, index) => (
                    <div
                      key={index}
                      className={`category-nav-card category-${organization.color}`}
                      onClick={() => handleOrganizationClick(organization.name)}
                    >
                      {/* Organization Background Overlay */}
                      <div className="category-nav-background"></div>
                      
                      {/* Organization Icon */}
                      <FontAwesomeIcon 
                        icon={organization.icon} 
                        className="category-nav-icon" 
                      />
                      
                      {/* Organization Title */}
                      <h3 className="category-nav-title">{organization.name}</h3>
                      
                      {/* Organization Full Name */}
                      <p className="organization-full-name">{organization.fullName}</p>
                      
                      {/* Arrow Icon */}
                      <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className="category-nav-arrow" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllDashboardsPage;