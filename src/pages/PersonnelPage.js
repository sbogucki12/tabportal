// src/pages/PersonnelPage.js
import React, { useContext } from 'react';
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

const PersonnelPage = () => {
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
  
  // Handle category selection - navigate to All Dashboards with specific subcategory filter
  const handleCategoryClick = (categoryName) => {
    // Store the category name in localStorage for the search to pick up
    localStorage.setItem('selectedCategory', 'Personnel / HR');
    localStorage.setItem('selectedSubcategory', categoryName);
    sessionStorage.setItem('selectedCategory', 'Personnel / HR');
    sessionStorage.setItem('selectedSubcategory', categoryName);
    
    // Add a timestamp to identify this navigation
    localStorage.setItem('categoryNavigationTime', new Date().getTime());
    
    // Navigate to all dashboards with both category and subcategory
    window.location.href = `/all-dashboards?category=${encodeURIComponent('Personnel / HR')}&subcategory=${encodeURIComponent(categoryName)}`;
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
                  <div className="loading-text">Loading personnel categories...</div>
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
                  <div className="error-text">Error loading personnel categories: {error}</div>
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
      
      {/* Main Content with White Card - Same structure as HomePage and CategoriesPage */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            {/* Light Gray Content Card - wraps ALL content */}
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
                    <h4 className="header-subtitle">Personnel / HR Analytics</h4>
                  </div>
                </div>
              </div>
              
              {/* Personnel Categories Content */}
              <section className="categories-container">
                <div className="categories-grid">
                  {personnelCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`category-card category-${category.color}`}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {/* Category Background Overlay - like dashboard overlay */}
                      <div className="category-background"></div>
                      
                      {/* Category Icon */}
                      <div className="category-icon">
                        <FontAwesomeIcon icon={category.icon} />
                      </div>
                      
                      {/* Category Title */}
                      <h3 className="category-title">{category.name}</h3>
                      
                      {/* Category Arrow - matches dashboard arrow positioning */}
                      <div className="category-arrow">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
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