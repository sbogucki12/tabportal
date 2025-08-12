// src/pages/HomePage.js - Updated with proper layout and styling fixes
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import SearchBar from '../components/common/SearchBar';
import FeaturedDashboard from '../components/dashboard/FeaturedDashboard';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
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
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css';

const HomePage = () => {
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
      navigate('/personnel');
      return;
    }
    
    // Store category in session storage for transfer to next page
    sessionStorage.setItem('selectedCategory', categoryName);
    // Navigate to all dashboards page
    navigate('/all-dashboards');
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

              {/* SearchBar Component */}
              <SearchBar onSearch={handleSearch} />

              {/* Featured Dashboard */}
              <FeaturedDashboard dashboard={featuredDashboard} />

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
              <DashboardGrid 
                dashboards={filteredDashboards} 
                title={searchApplied ? <h2 className="section-title">Search Results</h2> : <h2 className="section-title">Recently Added Dashboards</h2>} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;