import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import '../styles/AllDashboardsPage.css';

const AllDashboardsPage = () => {
  const { dashboards, loading, error, searchDashboards } = useContext(DashboardContext);
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Get query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const organizationParam = queryParams.get('organization');
    
    if (dashboards.length > 0) {
      // If category parameter exists, filter by it
      if (categoryParam || organizationParam) {
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
  }, [dashboards, location.search, searchDashboards]);
  
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
  const getPageTitle = () => {
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
      return "All Intelligence Dashboards";
    }
  };
  
  return (
    <div className="all-dashboards-page">
      <Header />
      
      <main className="all-dashboards-main">
        <div className="page-banner">
          <div className="page-banner-container">
            <h1 className="page-title">All Dashboards</h1>
            <p className="page-description">
              Browse our complete collection of aviation intelligence dashboards.
            </p>
          </div>
        </div>
        
        <SearchBar 
          onSearch={handleSearch} 
          initialValues={{
            query: '',
            category: new URLSearchParams(location.search).get('category') || '',
            organization: new URLSearchParams(location.search).get('organization') || ''
          }} 
        />
        
        <DashboardGrid 
          dashboards={filteredDashboards} 
          title={getPageTitle()} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default AllDashboardsPage;