// src/pages/HomePage.js - Fixed to keep homepage clean, redirect search to AllDashboards
import React, { useContext, useState, useEffect, useCallback } from 'react';
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
  const { dashboards, loading, error, featuredDashboard } = useContext(DashboardContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define the new standard categories with icons
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
      console.log('🔀 Redirecting to AllDashboards with search params');
      navigate(`/all-dashboards${location.search}`, { replace: true });
    }
  }, [location.search, navigate]);
  
  // Handle search - redirect to AllDashboards page with search parameters
  const handleSearch = useCallback((searchParams) => {
    console.log('🔍 Search initiated on HomePage:', searchParams);
    
    // Build query string for AllDashboards page
    const queryParams = new URLSearchParams();
    if (searchParams.query) queryParams.set('query', searchParams.query);
    if (searchParams.category) queryParams.set('category', searchParams.category);
    if (searchParams.organization) queryParams.set('organization', searchParams.organization);
    
    const queryString = queryParams.toString();
    const targetUrl = queryString ? `/all-dashboards?${queryString}` : '/all-dashboards';
    
    console.log('🔀 Navigating to:', targetUrl);
    navigate(targetUrl);
  }, [navigate]);
  
  // Handle category card clicks - Special handling for Personnel / HR
  const handleCategoryClick = useCallback((categoryName) => {
    // Special case: Personnel / HR goes to dedicated Personnel page
    if (categoryName === 'Personnel / HR') {
      window.location.href = '/personnel';
      return;
    }
    
    // For all other categories, navigate to All Dashboards with filter
    // Store the category name in sessionStorage for AllDashboards page
    sessionStorage.setItem('selectedCategory', categoryName);
    
    // Navigate to AllDashboards with category filter
    const targetUrl = `/all-dashboards?category=${encodeURIComponent(categoryName)}`;
    console.log('🏷️ Category selected, navigating to:', targetUrl);
    navigate(targetUrl);
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
  
  console.log('🏠 Rendering clean HomePage with featured dashboard and categories');
  
  return (
    <div className="home-page">
      <Header />
      <NavigationHeader />
      
      {/* Main Content with White Card Layout */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            <div className="content-inner-card">
              
              {/* Search Bar - redirects to AllDashboards on search */}
              <SearchBar 
                onSearch={handleSearch} 
                initialValues={{
                  query: '',
                  category: '',
                  organization: ''
                }} 
              />
              
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