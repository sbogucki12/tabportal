// src/pages/PersonnelPage.js - Updated with proper layout and styling
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus,
  faUserMinus,
  faLaptopHouse,
  faUsers,
  faChartPie,
  faHeart,
  faChartLine,
  faGraduationCap,
  faClipboardList,
  faUserCog,
  faCalendarAlt,
  faDollarSign,
  faHandshake,
  faComments,
  faExchangeAlt,
  faHardHat,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/CategoriesPage.css'; // Use Categories page styles for cards
import '../styles/PersonnelPage.css'; // Personnel-specific styles

const PersonnelPage = () => {
  const navigate = useNavigate();
  const { loading, error } = useContext(DashboardContext);
  
  // Define the Personnel/HR subcategories with relevant icons
  const personnelCategories = [
    { name: 'Hiring', icon: faUserPlus, color: 'personnel-hiring' },
    { name: 'Attrition', icon: faUserMinus, color: 'personnel-attrition' },
    { name: 'Telework', icon: faLaptopHouse, color: 'personnel-telework' },
    { name: 'Diversity', icon: faUsers, color: 'personnel-diversity' },
    { name: 'Workforce Composition', icon: faChartPie, color: 'personnel-composition' },
    { name: 'Employee Engagement', icon: faHeart, color: 'personnel-engagement' },
    { name: 'Performance Management', icon: faChartLine, color: 'personnel-performance' },
    { name: 'Training & Development', icon: faGraduationCap, color: 'personnel-training' },
    { name: 'Workforce Planning', icon: faClipboardList, color: 'personnel-planning' },
    { name: 'Succession Planning', icon: faUserCog, color: 'personnel-succession' },
    { name: 'Leave & Attendance', icon: faCalendarAlt, color: 'personnel-attendance' },
    { name: 'Competence & Benefits', icon: faDollarSign, color: 'personnel-benefits' },
    { name: 'Onboarding', icon: faHandshake, color: 'personnel-onboarding' },
    { name: 'Employee Relations', icon: faComments, color: 'personnel-relations' },
    { name: 'Workforce Mobility', icon: faExchangeAlt, color: 'personnel-mobility' },
    { name: 'Workforce Safety', icon: faHardHat, color: 'personnel-safety' }
  ];
  
  // Handle category selection - navigate to All Dashboards with People category filter
/*   const handleCategoryClick = (categoryName) => {
    // Store the People category and specific subcategory
    sessionStorage.setItem('selectedCategory', 'People');
    sessionStorage.setItem('selectedSubcategory', categoryName);
    
    // Navigate to all dashboards with People category filter
    navigate(`/all-dashboards?category=${encodeURIComponent('People')}&subcategory=${encodeURIComponent(categoryName)}`);
  }; */
  
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
                      <h4 className="header-subtitle">People Data Factory</h4>
                    </div>
                  </div>
                </div>
                
                <div className="loading-container">
                  <div className="loading-text">Loading personnel categories...</div>
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
                      <h4 className="header-subtitle">People Data Factory</h4>
                    </div>
                  </div>
                </div>
                
                <div className="loading-container">
                  <div className="error-text">Error loading personnel categories: {error}</div>
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
      
      {/* Main Content with White Card - Same structure as HomePage */}
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
                    <h4 className="header-subtitle">People Data Factory</h4>
                  </div>
                </div>
              </div>
              
              {/* Personnel Categories Section */}
              <section className="category-navigation-section">
                <h2 className="section-title">People Data Factory</h2>
                <div className="category-cards-grid">
                  {personnelCategories.map((category, index) => (
                    <div 
                      key={index} 
                      className={`category-nav-card category-${'blue'}`}
                      //onClick={() => handleCategoryClick(category.name)}  
                      onClick={() => navigate('/coming-soon')}                     
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

export default PersonnelPage;