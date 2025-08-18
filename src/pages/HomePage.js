<<<<<<< HEAD
// src/pages/HomePage.js - Updated with proper layout and styling fixes
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
=======
// src/pages/HomePage.js - Reverted to backup style with new categories
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import FeaturedDashboard from '../components/dashboard/FeaturedDashboard';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
<<<<<<< HEAD
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
=======
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
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css';

const HomePage = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const location = useLocation();
  const { dashboards, featuredDashboard, loading, error, searchDashboards } = useContext(DashboardContext);
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  
  // Define the 13 standard information domain categories matching AllDashboards dropdown
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

  useEffect(() => {
    if (dashboards.length > 0) {
      if (featuredDashboard) {
        // Filter out the featured dashboard from the grid and show only first 6
        setFilteredDashboards(
          dashboards
            .filter(dash => dash.id !== featuredDashboard.id)
            .slice(0, 6)  // Show only first 6 dashboards on homepage
        );
        setSearchApplied(false);
      } else {
        // If no featured dashboard, show all dashboards
        setFilteredDashboards(dashboards);
        setSearchApplied(false);
=======
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
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
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
<<<<<<< HEAD
      navigate('/personnel');
=======
      window.location.href = '/personnel';
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
      return;
    }
    
    // Store category in session storage for transfer to next page
    sessionStorage.setItem('selectedCategory', categoryName);
    // Navigate to all dashboards page
<<<<<<< HEAD
    navigate('/all-dashboards');
=======
    window.location.href = '/all-dashboards';
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
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
                      <img 
                        src="/media/logo_small.png" 
                        alt="EIM Logo" 
                        className="logo-image"
                      />
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
                      <img 
                        src="/media/logo_small.png" 
                        alt="EIM Logo" 
                        className="logo-image"
                      />
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
                  <div className="error-text">Error loading dashboards: {error}</div>
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
                      <img 
                        src="/media/logo_small.png" 
                        alt="EIM Logo" 
                        className="logo-image"
                      />
                      <div className="logo-text">EIM</div>
                  </div>
                  <div className="vl"></div>
                  <div className="header-content">
                    <h1 className="header-main-title">Enterprise Information Management</h1>
                    <h4 className="header-subtitle">Visualization Showcase</h4>
                  </div>
                </div>
              </div>
<<<<<<< HEAD

              {/* SearchBar Component */}
              <SearchBar onSearch={handleSearch} />

              {/* Featured Dashboard */}
              <FeaturedDashboard dashboard={featuredDashboard} />

=======
              
              {/* Search Section */}
              <div className="search-section-homepage">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {/* Featured Dashboard */}
              {featuredDashboard && (
                <FeaturedDashboard dashboard={featuredDashboard} />
              )}
              
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
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
<<<<<<< HEAD

              {/* Dashboard Grid */}
              <DashboardGrid 
                dashboards={filteredDashboards} 
                title={searchApplied ? <h2 className="section-title">Search Results</h2> : <h2 className="section-title">Recently Added Dashboards</h2>} 
              />
=======
              
              {/* Dashboard Grid */}
              {filteredDashboards.length > 0 && (
                <DashboardGrid 
                  dashboards={filteredDashboards} 
                  title={searchApplied ? "Search Results" : "Recent Dashboards"} 
                />
              )}
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;