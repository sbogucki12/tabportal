import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import FeaturedDashboard from '../components/dashboard/FeaturedDashboard';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { dashboards, loading, error, featuredDashboard, searchDashboards } = useContext(DashboardContext);
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Get category from session storage if available
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    
    if (dashboards.length > 0) {
      // If category stored in session, filter by it
      if (selectedCategory) {
        const results = searchDashboards(
          '', // No text query
          {
            category: selectedCategory,
            organization: ''
          }
        );
        setFilteredDashboards(results);
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
          const results = searchDashboards(
            '', // No text query
            {
              category: categoryParam || '',
              organization: organizationParam || ''
            }
          );
          setFilteredDashboards(results);
          setSearchApplied(true);
        } else if (featuredDashboard) {
          // Otherwise show default dashboards (excluding featured)
          const nonFeaturedDashboards = dashboards.filter(d => d.id !== featuredDashboard.id);
          setFilteredDashboards(nonFeaturedDashboards);
        } else {
          // If no featured dashboard, show all
          setFilteredDashboards(dashboards);
        }
      }
    }
  }, [dashboards, featuredDashboard, searchDashboards, location.search]);
  
  const handleSearch = (searchTerm, filters) => {
    const results = searchDashboards(searchTerm, filters);
    setFilteredDashboards(results);
    setSearchApplied(true);
    
    // Update URL with search parameters
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.set('category', filters.category);
    if (filters.organization) queryParams.set('organization', filters.organization);
    
    const url = queryParams.toString() ? 
      `${location.pathname}?${queryParams.toString()}` : 
      location.pathname;
      
    window.history.replaceState(null, '', url);
  };
  
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
  const getGridTitle = () => {
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
  };
  
  return (
    <div className="home-page">
      <Header />
      <NavigationHeader />
      
      {/* Main Content with White Card */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            {/* Light Gray Content Card - wraps ALL content */}
            <div className="content-inner-card">
              {/* NEW DGC Style Banner Section */}
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
              
              {/* Search Section - NO HEADER TEXT */}
              <div className="search-section-custom">
                <SearchBar 
                  onSearch={handleSearch} 
                  initialValues={{
                    query: '',
                    category: new URLSearchParams(location.search).get('category') || '',
                    organization: new URLSearchParams(location.search).get('organization') || ''
                  }} 
                />
              </div>
              
              {/* Featured Dashboard */}
              {!searchApplied && featuredDashboard && (
                <FeaturedDashboard dashboard={featuredDashboard} />
              )}
              
              {/* Dashboard Grid */}
              <DashboardGrid 
                dashboards={filteredDashboards} 
                title={getGridTitle()} 
              />
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