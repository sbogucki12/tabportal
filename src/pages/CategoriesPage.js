// src/pages/CategoriesPage.js - Updated with new category structure
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
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
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/CategoriesPage.css'; // Additional styles for categories and hide nav title

const CategoriesPage = () => {
  const { loading, error } = useContext(DashboardContext);
  const navigate = useNavigate();
  
  // Use the new standard categories
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
  
  // Handle category clicks - redirect to appropriate page
  const handleCategoryClick = (categoryName) => {
    console.log('Category clicked:', categoryName);
    
    // Special handling for People - navigate to dedicated personnel page
    if (categoryName === 'People') {
      navigate('/personnel');
      return;
    }
    
    // For all other categories, navigate to AllDashboards with category filter
    navigate(`/all-dashboards?category=${encodeURIComponent(categoryName)}`);
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
                  <div className="loading-text">Loading categories...</div>
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;