// src/pages/HomePage.js - Reverted to backup style with new categories
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import FeaturedDashboard from '../components/dashboard/FeaturedDashboard';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight,
  faChartLine,
  faUsers,
  faPlane,
  faShield,
  faCloud,
  faRocket,
  faBalanceScale,
  faGlobe,
  faDollarSign,
  faNetworkWired,
  faLock,
  faCogs,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css';

const HomePage = () => {
  const { dashboards, loading, error, featuredDashboard, searchDashboards } = useContext(DashboardContext);
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  const location = useLocation();
  
  // NEW: Updated categories with modern information domains
  const standardCategories = [
    { name: 'Operational Analytics', icon: faChartLine, color: 'blue' },
    { name: 'People', icon: faUsers, color: 'green' },
    { name: 'Aviation Operations', icon: faPlane, color: 'blue' },
    { name: 'Safety & Compliance', icon: faShield, color: 'red' },
    { name: 'Weather & Environment', icon: faCloud, color: 'cyan' },
    { name: 'NextGen Technology', icon: faRocket, color: 'purple' },
    { name: 'Regulatory & Legal', icon: faBalanceScale, color: 'yellow' },
    { name: 'International Affairs', icon: faGlobe, color: 'green' },
    { name: 'Financial Management', icon: faDollarSign, color: 'yellow' },
    { name: 'Infrastructure & Systems', icon: faNetworkWired, color: 'gray' },
    { name: 'Security', icon: faLock, color: 'red' },
    { name: 'Maintenance & Engineering', icon: faCogs, color: 'gray' },
    { name: 'Executive & Strategic', icon: faUserTie, color: 'purple' }
  ];
  
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
          const defaultResults = dashboards.filter(d => d.id !== featuredDashboard.id);
          setFilteredDashboards(defaultResults);
          setSearchApplied(false);
        } else {
          // Show all dashboards if no featured dashboard
          setFilteredDashboards(dashboards);
          setSearchApplied(false);
        }
      }
    }
  }, [dashboards, featuredDashboard, location.search, searchDashboards]);

  const handleSearch = (searchData) => {
    const results = searchDashboards(searchData.query, {
      category: searchData.category,
      organization: searchData.organization
    });
    setFilteredDashboards(results);
    setSearchApplied(true);
  };

  const handleCategoryClick = (categoryName) => {
    // Special case: People should go to /personnel page
    if (categoryName === 'People') {
      window.location.href = '/personnel';
      return;
    }
    
    // Store category in session storage for transfer to next page
    sessionStorage.setItem('selectedCategory', categoryName);
    // Navigate to all dashboards page
    window.location.href = '/all-dashboards';
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
              
              {/* Search Section */}
              <div className="search-section-homepage">
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
              
              {/* Dashboard Grid */}
              {filteredDashboards.length > 0 && (
                <DashboardGrid 
                  dashboards={filteredDashboards} 
                  title={searchApplied ? "Search Results" : "Recent Dashboards"} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;