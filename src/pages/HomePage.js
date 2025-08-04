import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { dashboards, loading, error, featuredDashboard, searchDashboards } = useContext(DashboardContext);
  const [searchApplied, setSearchApplied] = useState(false);
  const location = useLocation();
  
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
  
  useEffect(() => {
    // Get category from session storage if available
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    
    if (dashboards.length > 0) {
      // If category stored in session, filter by it
      if (selectedCategory) {
        searchDashboards(
          '', // No text query
          {
            category: selectedCategory,
            organization: ''
          }
        );
        setSearchApplied(true);
        
        // Clear session storage after using it
        sessionStorage.removeItem('selectedCategory');
      } 
      // Check for query parameters from URL as fallback
      else {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const organizationParam = queryParams.get('organization');
        
        if (categoryParam || organizationParam) {
          // If URL parameters exist, filter by them
          searchDashboards(
            '', // No text query
            {
              category: categoryParam || '',
              organization: organizationParam || ''
            }
          );
          setSearchApplied(true);
        } else {
          // Set search not applied for default homepage view
          setSearchApplied(false);
        }
      }
    }
  }, [dashboards, featuredDashboard, location.search, searchDashboards]);
  
  const handleSearch = useCallback((searchParams) => {
    searchDashboards(
      searchParams.query,
      {
        category: searchParams.category,
        organization: searchParams.organization
      }
    );
    
    setSearchApplied(true);
    
    // Update URL without triggering new navigation events
    const queryParams = new URLSearchParams();
    if (searchParams.query) queryParams.set('query', searchParams.query);
    if (searchParams.category) queryParams.set('category', searchParams.category);
    if (searchParams.organization) queryParams.set('organization', searchParams.organization);
    
    // Use history.replace to update URL without adding to history stack
    const url = queryParams.toString() ? 
      `${location.pathname}?${queryParams.toString()}` : 
      location.pathname;
      
    window.history.replaceState(null, '', url);
  }, [searchDashboards, location.pathname]);
  
  // Handle category card clicks
  const handleCategoryClick = useCallback((categoryName) => {
    // Store the category name in both localStorage and sessionStorage
    localStorage.setItem('selectedCategory', categoryName);
    sessionStorage.setItem('selectedCategory', categoryName);
    
    // Add a timestamp to identify this navigation
    localStorage.setItem('categoryNavigationTime', new Date().getTime());
    
    // Use the most direct navigation approach
    window.location.href = `/all-dashboards?category=${encodeURIComponent(categoryName)}`;
  }, []);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading dashboards...</div>
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
  
  // Get title based on filter params
/*   const getGridTitle = () => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const organization = queryParams.get('organization');
    
    if (category && organization) {
      return `${category} Dashboards from ${organization}`;
    } else if (category) {
      return `${category} Dashboards`;
    } else if (organization) {
      return `${organization} Dashboards`;
    } else if (searchApplied) {
      return "Search Results";
    } else {
      return "Browse Intelligence Dashboards";
    }
  }; */
  
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

              {/* Search Bar */}
              <SearchBar 
                onSearch={handleSearch} 
                initialValues={{
                  query: '',
                  category: new URLSearchParams(location.search).get('category') || '',
                  organization: new URLSearchParams(location.search).get('organization') || ''
                }} 
              />
              
              {/* Featured Dashboard */}
              {!searchApplied && featuredDashboard && (
                <FeaturedDashboard dashboard={featuredDashboard} />
              )}
              
              {/* Category Navigation Section - Only show when not searching */}
              {!searchApplied && (
                <section className="category-navigation-section">
                  <h2 className="section-title">Browse by Category</h2>
                  <div className="category-cards-grid">
                    {standardCategories.map((category, index) => (
                      <div
                        key={index}
                        className={`category-nav-card category-${category.color}`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {/* Category Background Overlay */}
                        <div className="category-nav-background"></div>
                        
                        {/* Category Icon */}
                        <FontAwesomeIcon 
                          icon={category.icon} 
                          className="category-nav-icon" 
                        />
                        
                        {/* Category Title */}
                        <h3 className="category-nav-title">{category.name}</h3>
                        
                        {/* Arrow Icon */}
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className="category-nav-arrow" 
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;