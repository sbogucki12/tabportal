// src/pages/HomePage.js - Updated with new category structure
import React, { useContext, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import FeaturedDashboard from '../components/dashboard/FeaturedDashboard';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlane,
  faFighterJet,
  faCity,
  faGlobe,
  faBuilding,
  faMoneyBillWave,
  faPlaneDeparture,
  faMap,
  faLaptopCode,
  faFlag,
  faUsers,
  faShieldAlt,
  faCloud,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css';

const HomePage = () => {
  const { featuredDashboard, loading, error } = useContext(DashboardContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define the new standard categories with icons - UPDATED CATEGORIES
  const standardCategories = [
    { name: 'Aeronautical', icon: faPlane, color: 'aeronautical' },
    { name: 'Aircraft', icon: faFighterJet, color: 'aircraft' },
    { name: 'Airport', icon: faCity, color: 'airport' },
    { name: 'Airspace', icon: faGlobe, color: 'airspace' },
    { name: 'Facilities', icon: faBuilding, color: 'facilities' },
    { name: 'Finance', icon: faMoneyBillWave, color: 'finance' },
    { name: 'Flight', icon: faPlaneDeparture, color: 'flight' },
    { name: 'Geospatial', icon: faMap, color: 'geospatial' },
    { name: 'Information Technology', icon: faLaptopCode, color: 'information-technology' },
    { name: 'International', icon: faFlag, color: 'international' },
    { name: 'People', icon: faUsers, color: 'people' },
    { name: 'Safety', icon: faShieldAlt, color: 'safety' },
    { name: 'Weather', icon: faCloud, color: 'weather' }
  ];
  
  // Check for URL parameters and redirect to AllDashboards if search params exist
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hasSearchParams = queryParams.has('query') || queryParams.has('category') || queryParams.has('organization');
    
    if (hasSearchParams) {
      // Redirect to AllDashboards page with all search parameters intact
      navigate(`/all-dashboards${location.search}`, { replace: true });
    }
  }, [location, navigate]);
  
  // Handle category clicks - redirect to AllDashboards with category filter
  const handleCategoryClick = useCallback((categoryName) => {
    console.log('Category clicked:', categoryName);
    
    // Special handling for People - navigate to dedicated personnel page
    if (categoryName === 'People') {
      navigate('/personnel');
      return;
    }
    
    // For all other categories, navigate to AllDashboards with category filter
    navigate(`/all-dashboards?category=${encodeURIComponent(categoryName)}`);
  }, [navigate]);

  // Handle search - redirect to AllDashboards page
  const handleSearch = useCallback((searchTerms) => {
    console.log('Search initiated from HomePage:', searchTerms);
    
    // Build search URL parameters
    const params = new URLSearchParams();
    if (searchTerms.query) params.set('query', searchTerms.query);
    if (searchTerms.category) params.set('category', searchTerms.category);
    if (searchTerms.organization) params.set('organization', searchTerms.organization);
    
    // Redirect to AllDashboards page with search parameters
    navigate(`/all-dashboards?${params.toString()}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="home-page">
        <Header />
        <NavigationHeader />
        <main className="home-main">
          <div className="content-card">
            <div className="content-card-inner">
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
                      <h4 className="header-subtitle">Visualization Showcase</h4>
                    </div>
                  </div>
                </div>
                
                <div className="loading-container">
                  <div className="loading-text">Loading dashboards...</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <Header />
        <NavigationHeader />
        <main className="home-main">
          <div className="content-card">
            <div className="content-card-inner">
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
                      <h4 className="header-subtitle">Visualization Showcase</h4>
                    </div>
                  </div>
                </div>
                
                <div className="loading-container">
                  <div className="error-text">{error}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header />
      <NavigationHeader />
      
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
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
                    <h4 className="header-subtitle">Visualization Showcase</h4>
                  </div>
                </div>
              </div>
              
              {/* Search Section - Custom styling to hide headers and make it compact */}
              <div className="search-section-custom">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {/* Featured Dashboard */}
              {featuredDashboard && (
                <FeaturedDashboard dashboard={featuredDashboard} />
              )}
              
              {/* Browse by Information Domain Section */}
              <section className="category-navigation-section">
                <h2 className="section-title">Browse by Information Domain</h2>
                <div className="category-cards-grid">
                  {standardCategories.map((category, index) => (
                    <div 
                      key={index} 
                      className={`category-nav-card category-${category.color}`}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div className="category-nav-background"></div>
                      <FontAwesomeIcon icon={category.icon} className="category-nav-icon" />
                      <h3 className="category-nav-title">{category.name}</h3>
                      <FontAwesomeIcon icon={faArrowRight} className="category-nav-arrow" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;