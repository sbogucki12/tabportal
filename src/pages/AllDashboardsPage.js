import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/AllDashboardsPage.css'; // Additional styles to hide navigation title

const AllDashboardsPage = () => {
  const { dashboards, loading, error, searchDashboards } = useContext(DashboardContext);
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  const location = useLocation();
  //const navigate = useNavigate();
  
  // Function to manually clear URL parameters
  const clearUrlParameters = () => {
    // Remove query parameters from URL without page refresh
    window.history.replaceState({}, '', location.pathname);
  };
  
  // Function to clear all filters and URL parameters - now more aggressive
/*   const clearAllFilters = () => {
    // First clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
    
    // Reset internal state
    setFilteredDashboards(dashboards);
    setSearchApplied(false);
    
    // Force a complete page reload - most reliable solution
    window.location.reload();
  }; */
  
  // Function to go back to home
/*   const escapeToHome = () => {
    window.location.href = '/';
  }; */
  
  // Effect to clear URL parameters when component unmounts
  useEffect(() => {
    return () => {
      // Clean up URL parameters when leaving this page
      clearUrlParameters();
    };
  }, );
  
  useEffect(() => {
    // Get category from session storage if available
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    
    if (dashboards.length > 0) {
      // If category stored in session, filter by it
      if (selectedCategory) {
        console.log('Filtering by session category:', selectedCategory);
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
      // Get query parameters from URL as fallback
      else {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const organizationParam = queryParams.get('organization');
        
        if (categoryParam || organizationParam) {
          // If category parameter exists, filter by it
          console.log('Filtering by URL params:', { categoryParam, organizationParam });
          const results = searchDashboards(
            '', // No text query
            {
              category: categoryParam || '',
              organization: organizationParam || ''
            }
          );
          setFilteredDashboards(results);
          setSearchApplied(true);
        } else {
          // Otherwise show all dashboards
          setFilteredDashboards(dashboards);
          setSearchApplied(false);
        }
      }
    }
  }, [dashboards, location.search, searchDashboards]);
  
  const handleSearch = (searchParams) => {
    console.log('Search triggered with params:', searchParams);
    const results = searchDashboards(
      searchParams.query,
      {
        category: searchParams.category,
        organization: searchParams.organization
      }
    );
    
    setFilteredDashboards(results);
    setSearchApplied(true);
  };
  
  if (loading) {
    return (
      <div className="home-page">
        <Header />
        <NavigationHeader />
        <main className="home-main">
          <div className="content-card">
            <div className="content-card-inner">
              <div className="content-inner-card">
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
                  <div className="error-text">Error loading dashboards: {error}</div>
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
      
      {/* Main Content with White Card - Same structure as HomePage */}
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
                  hideHeader={true}
                />
              </div>
              
              {/* Dashboard Grid */}
              <DashboardGrid 
                dashboards={filteredDashboards} 
                title={searchApplied ? `Search Results (${filteredDashboards.length})` : `All Dashboards (${filteredDashboards.length})`}
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

export default AllDashboardsPage;