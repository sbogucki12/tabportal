// src/pages/HomePage.js - Fixed to keep homepage clean, redirect search to AllDashboards
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
  faShieldAlt,
  faUsers,
  faMoneyBillWave,
  faChartLine,
  faLaptopCode,
  faClipboardCheck,
  faPlane,
  faCity,
  faCloud,
  faMap,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css';

const HomePage = () => {
  const { featuredDashboard, loading, error } = useContext(DashboardContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define the new standard categories with icons - MOVED TO TOP TO ENSURE DEFINITION
  const standardCategories = [
    { name: 'Aviation Safety', icon: faShieldAlt, color: 'aviation-safety' },
    { name: 'Personnel / HR', icon: faUsers, color: 'personnel-hr' },
    { name: 'Finance', icon: faMoneyBillWave, color: 'finance' },
    { name: 'Aviation Operations', icon: faChartLine, color: 'aviation-operations' },
    { name: 'IT', icon: faLaptopCode, color: 'it' },
    { name: 'Oversight / Compliance & Enforcement', icon: faClipboardCheck, color: 'oversight-compliance' },
    { name: 'Air Traffic', icon: faPlane, color: 'air-traffic' },
    { name: 'Airports', icon: faCity, color: 'airports' },
    { name: 'Weather', icon: faCloud, color: 'weather' },
    { name: 'Geospatial / Maps / Charts', icon: faMap, color: 'geospatial' }
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
    
    // Special handling for Personnel / HR - navigate to dedicated page
    if (categoryName === 'Personnel / HR') {
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
                    <h4 className="header-subtitle">Visualization Showcase</h4>
                  </div>
                </div>
              </div>
              
              {/* Search Bar - redirect to AllDashboards on use */}
              <div className="search-section search-section-homepage">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Search dashboards..." 
                  initialValues={{
                    query: '',
                    category: '',
                    organization: ''
                  }} 
                />
              </div>
              
              {/* Featured Dashboard - Always show if available */}
              {featuredDashboard && (
                <FeaturedDashboard dashboard={featuredDashboard} />
              )}
              
              {/* Category Navigation - Always show */}
              <section className="category-section">
                <h2 className="section-title">Browse by Information Domain</h2>
                <div className="category-cards-grid">
                  {standardCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`category-nav-card category-${category.color}`}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div className="category-nav-background"></div>
                      <div className="category-nav-icon">
                        <FontAwesomeIcon icon={category.icon} />
                      </div>
                      <h3 className="category-nav-title">{category.name}</h3>
                      <div className="category-nav-arrow">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
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