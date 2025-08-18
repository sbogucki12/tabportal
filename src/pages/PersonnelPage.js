<<<<<<< HEAD
// src/pages/PersonnelPage.js - Updated with dummy dashboards for Hiring and Attrition
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
=======
// src/pages/PersonnelPage.js - Updated with proper layout and styling
import React, { useContext } from 'react';
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus,
  faUserMinus,
  faLaptopHouse,
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
  const { loading, error, addDashboard, getDashboardById } = useContext(DashboardContext);
  
  // Dummy dashboard data for Hiring and Attrition
  useEffect(() => {
    // Add dummy dashboards if they don't exist
    const hiringDashboard = getDashboardById('hiring-dashboard');
    const attritionDashboard = getDashboardById('attrition-dashboard');
    
    if (!hiringDashboard) {
      addDashboard({
        id: "hiring-dashboard",
        title: "FAA Hiring Data",
        description: "This dashboard provides metrics for onboarding personnel to the FAA and a geospatial representation of employee location",
        owner: "Finance and Management",
        ownerAbbr: "AFN",
        category: "People",
        tags: ["Finance and Management", "AFN", "Human Resources", "HR"],
        dataSource: "Enterprise Data Repository",
        updateFrequency: "Monthly",
        createdAt: "2024-05-11T09:30:00Z",
        updatedAt: "2025-03-15T10:20:00Z",
        contactName: "Emily Rodriguez",
        contactEmail: "emily.rodriguez@faa.gov",
        contactPhone: "(202) 555-8765",
        dashboardType: "Tableau",
        accessLevel: "Public",
        dashboardUrl: "https://example.com/dashboard/airport-capacity",
        thumbnailUrl: "/media/us_hexagonal.jpg",
        imageUrl: "/media/us_hexagonal.jpg",
        isVideo: false,
        views: 289,
        isFeatured: false
      });
    }
    
    if (!attritionDashboard) {
      addDashboard({
        id: "attrition-dashboard",
        title: "Attrition Reporting",
        description: "This dashboard provides management a view of resource losses as well as statistical projections of upcoming resources losses.",
        owner: "Finance and Management",
        ownerAbbr: "AFN",
        category: "People",
        tags: ["Finance and Management", "AFN", "Human Resources", "HR"],
        dataSource: "Federal Information Processing Standards",
        updateFrequency: "Weekly",
        createdAt: "2024-06-15T14:20:00Z",
        updatedAt: "2025-03-22T09:15:00Z",
        contactName: "Sarah Johnson",
        contactEmail: "sarah.johnson@faa.gov",
        contactPhone: "(202) 555-4321",
        dashboardType: "Tableau",
        accessLevel: "Public",
        dashboardUrl: "https://example.com/dashboard/safety-metrics",
        thumbnailUrl: "/media/google_trends.jpg",
        imageUrl: "/media/google_trends.jpg",
        isVideo: false,
        views: 4328,
        isFeatured: false
      });
    }
  }, [addDashboard, getDashboardById]);
  
  // Handle card navigation
  const handleCardClick = (category) => {
    if (category.name === 'Hiring') {
      navigate('/dashboard/hiring-dashboard');
    } else if (category.name === 'Attrition') {
      navigate('/dashboard/attrition-dashboard');
    } else {
      navigate('/coming-soon');
    }
  };
  // Define the Personnel/HR subcategories with relevant icons and active status
  const personnelCategories = [
    { name: 'Hiring', icon: faUserPlus, color: 'personnel-hiring', isActive: true },
    { name: 'Attrition', icon: faUserMinus, color: 'personnel-attrition', isActive: true },
    { name: 'Telework', icon: faLaptopHouse, color: 'personnel-telework', isActive: false },
    { name: 'Workforce Composition', icon: faChartPie, color: 'personnel-composition', isActive: false },
    { name: 'Employee Engagement', icon: faHeart, color: 'personnel-engagement', isActive: false },
    { name: 'Performance Management', icon: faChartLine, color: 'personnel-performance', isActive: false },
    { name: 'Training & Development', icon: faGraduationCap, color: 'personnel-training', isActive: false },
    { name: 'Workforce Planning', icon: faClipboardList, color: 'personnel-planning', isActive: false },
    { name: 'Succession Planning', icon: faUserCog, color: 'personnel-succession', isActive: false },
    { name: 'Leave & Attendance', icon: faCalendarAlt, color: 'personnel-attendance', isActive: false },
    { name: 'Benefits & Compensation', icon: faDollarSign, color: 'personnel-benefits', isActive: false },
    { name: 'Onboarding', icon: faHandshake, color: 'personnel-onboarding', isActive: false },
    { name: 'Employee Relations', icon: faComments, color: 'personnel-relations', isActive: false },
    { name: 'Employee Mobility', icon: faExchangeAlt, color: 'personnel-mobility', isActive: false },
    { name: 'Workplace Safety', icon: faHardHat, color: 'personnel-safety', isActive: false }
  ];
  
<<<<<<< HEAD
  if (loading) {
    return <div className="loading-container"><p className="loading-text">Loading...</p></div>;
  }
  
  if (error) {
    return <div className="loading-container"><p className="error-text">Error: {error}</p></div>;
=======
  // Handle category selection - navigate to All Dashboards with People category filter
  const handleCategoryClick = (categoryName) => {
    // Store the People category and specific subcategory
    sessionStorage.setItem('selectedCategory', 'People');
    sessionStorage.setItem('selectedSubcategory', categoryName);
    
    // Navigate to all dashboards with People category filter
    window.location.href = `/all-dashboards?category=${encodeURIComponent('People')}&subcategory=${encodeURIComponent(categoryName)}`;
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
                      <h4 className="header-subtitle">Personnel / HR Analytics</h4>
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
                      <div className="logo-text">EIM</div>
                    </div>
                    <div className="vl"></div>
                    <div className="header-content">
                      <h1 className="header-main-title">Enterprise Information Management</h1>
                      <h4 className="header-subtitle">Personnel / HR Analytics</h4>
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
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
  }

  return (
    <div className="personnel-page page-background">
      <Header />
      <NavigationHeader />
      
<<<<<<< HEAD
=======
      {/* Main Content with White Card - Same structure as HomePage */}
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
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
<<<<<<< HEAD
                <h2 className="section-title">People Data Factory</h2>
=======
                <h2 className="section-title">Personnel / HR Analytics Categories</h2>
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
                <div className="category-cards-grid">
                  {personnelCategories.map((category, index) => (
                    <div 
                      key={index} 
<<<<<<< HEAD
                      className={`category-nav-card category-${'blue'} ${!category.isActive ? 'category-inactive' : ''}`}
                      onClick={() => handleCardClick(category)}                     
=======
                      className={`category-nav-card category-${category.color}`}
                      onClick={() => handleCategoryClick(category.name)}
>>>>>>> 6ccb58903ad4d6b7ecccd4a6ae002c197a439b15
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