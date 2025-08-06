// src/pages/AllDashboardsPage.js - Removed Quick Navigation, kept Clear Filters and Back to Home buttons
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/AllDashboardsPage.css';

const AllDashboardsPage = () => {
  const { dashboards, loading, error, searchDashboards } = useContext(DashboardContext);
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  const location = useLocation();
  
  // Effect to clear URL parameters when component unmounts
  useEffect(() => {
    const clearUrlParameters = () => {
      // Remove query parameters from URL without page refresh
      window.history.replaceState({}, '', location.pathname);
    };
    
    return () => {
      // Clean up URL parameters when leaving this page
      clearUrlParameters();
    };
  }, [location.pathname]);
  
  // Function to clear all filters and URL parameters
  const clearAllFilters = () => {
    // First clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
    
    // Reset internal state
    setFilteredDashboards(dashboards);
    setSearchApplied(false);
    
    // Force a complete page reload - most reliable solution
    window.location.reload();
  };
  
  // Function to go back to home
  const escapeToHome = () => {
    window.location.href = '/';
  };
  
  // FIXED: Main useEffect to handle all search parameters including query
  useEffect(() => {
    console.log('🔍 AllDashboards useEffect triggered');
    console.log('📊 Dashboards loaded:', dashboards.length);
    console.log('🔗 Current URL:', location.search);
    
    // Get category from session storage if available
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    
    if (dashboards.length > 0) {
      // If category stored in session, filter by it
      if (selectedCategory) {
        console.log('🗂️ Filtering by session category:', selectedCategory);
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
      // FIXED: Get ALL query parameters from URL including 'query'
      else {
        const queryParams = new URLSearchParams(location.search);
        const queryParam = queryParams.get('query');      // ✅ Added this!
        const categoryParam = queryParams.get('category');
        const organizationParam = queryParams.get('organization');
        
        console.log('🔗 URL Parameters:', { queryParam, categoryParam, organizationParam });
        
        // FIXED: Check for ANY search parameters (including query)
        if (queryParam || categoryParam || organizationParam) {
          console.log('🔍 Filtering by URL parameters');
          const results = searchDashboards(
            queryParam || '', // ✅ FIXED: Pass the actual query text
            {
              category: categoryParam || '',
              organization: organizationParam || ''
            }
          );
          
          console.log('📋 Search results found:', results.length);
          console.log('📋 Result titles:', results.map(d => d.title));
          
          setFilteredDashboards(results);
          setSearchApplied(true);
        } else {
          // Otherwise show all dashboards
          console.log('📋 Showing all dashboards');
          setFilteredDashboards(dashboards);
          setSearchApplied(false);
        }
      }
    }
  }, [dashboards, location.search, searchDashboards]);
  
  const handleSearch = (searchParams) => {
    console.log('🔍 HandleSearch called on AllDashboards with:', searchParams);
    
    const results = searchDashboards(
      searchParams.query,
      {
        category: searchParams.category,
        organization: searchParams.organization
      }
    );
    
    console.log('📋 Search results to display:', results.length);
    
    setFilteredDashboards(results);
    setSearchApplied(true);
    
    // Update URL without triggering new navigation events
    let queryString = '';
    
    if (searchParams.query) {
      queryString += (queryString ? '&' : '?') + `query=${encodeURIComponent(searchParams.query)}`;
    }
    
    if (searchParams.category) {
      queryString += (queryString ? '&' : '?') + `category=${encodeURIComponent(searchParams.category)}`;
    }
    
    if (searchParams.organization) {
      queryString += (queryString ? '&' : '?') + `organization=${encodeURIComponent(searchParams.organization)}`;
    }
    
    // Update URL without triggering navigation
    window.history.replaceState({}, '', `${location.pathname}${queryString}`);
  };
  
  // Get page title based on search parameters
  const getPageTitle = () => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');           // ✅ Added this!
    const category = queryParams.get('category');
    const organization = queryParams.get('organization');
    
    if (query && category && organization) {
      return `"${query}" in ${category} from ${organization}`;
    } else if (query && category) {
      return `"${query}" in ${category}`;
    } else if (query && organization) {
      return `"${query}" from ${organization}`;
    } else if (query) {
      return `Search Results for "${query}"`;        // ✅ Added this!
    } else if (category && organization) {
      return `${category} Dashboards from ${organization}`;
    } else if (category) {
      return `${category} Dashboards`;
    } else if (organization) {
      return `${organization} Dashboards`;
    } else if (searchApplied) {
      return "Search Results";
    } else {
      return "All Intelligence Dashboards";
    }
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
                      <h4 className="header-subtitle">All Dashboards</h4>
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
  
  console.log('🎨 Rendering AllDashboards with:', {
    filteredDashboards: filteredDashboards.length,
    searchApplied,
    pageTitle: getPageTitle()
  });
  
  return (
    <div className="home-page">
      <Header />
      <NavigationHeader />
      
      {/* Main Content with White Card Layout - Same as HomePage */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            <div className="content-inner-card">
              
              {/* Only show Clear All Filters and Back to Home buttons when search applied */}
              {searchApplied && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      onClick={clearAllFilters}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#005ea2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        fontFamily: '"Open Sans", sans-serif'
                      }}
                    >
                      Clear All Filters
                    </button>
                    
                    <button
                      onClick={escapeToHome}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#d4b76a',
                        color: '#1A1A1A',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        fontFamily: '"Open Sans", sans-serif'
                      }}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}
              
              {/* Search Bar */}
              <SearchBar 
                onSearch={handleSearch} 
                initialValues={{
                  query: new URLSearchParams(location.search).get('query') || '',
                  category: new URLSearchParams(location.search).get('category') || '',
                  organization: new URLSearchParams(location.search).get('organization') || ''
                }} 
              />
              
              {/* Dashboard Grid */}
              <DashboardGrid 
                dashboards={filteredDashboards} 
                title={getPageTitle()} 
              />
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllDashboardsPage;