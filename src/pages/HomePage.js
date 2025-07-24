import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
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
          setFilteredDashboards(
            dashboards
              .filter(dash => dash.id !== featuredDashboard.id)
              .slice(0, 6)  // Show only first 6 dashboards on homepage
          );
          setSearchApplied(false);
        }
      }
    }
  }, [dashboards, featuredDashboard, location.search, searchDashboards]);
  
  const handleSearch = (searchParams) => {
    const results = searchDashboards(
      searchParams.query,
      {
        category: searchParams.category,
        organization: searchParams.organization
      }
    );
    
    setFilteredDashboards(results);
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
      
      {/* Fixed Search Banner */}
      <div className="search-banner-fixed">
        <SearchBar 
          onSearch={handleSearch} 
          initialValues={{
            query: '',
            category: new URLSearchParams(location.search).get('category') || '',
            organization: new URLSearchParams(location.search).get('organization') || ''
          }} 
        />
      </div>
      
      {/* Main Content with White Card */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            {!searchApplied && featuredDashboard && (
              <FeaturedDashboard dashboard={featuredDashboard} />
            )}
            
            <DashboardGrid 
              dashboards={filteredDashboards} 
              title={getGridTitle()} 
            />
            
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;