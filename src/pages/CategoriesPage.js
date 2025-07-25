import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import { DashboardContext } from '../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faPlane, 
  faShieldAlt, 
  faTools, 
  faMoneyBillWave,
  faClipboardCheck,
  faExclamationTriangle,
  faCity,
  faBalanceScale,  
  faTimes,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/CategoriesPage.css'; // Additional styles for categories and hide nav title

const CategoriesPage = () => {
  const { dashboards, loading, error } = useContext(DashboardContext);
  const [categories, setCategories] = useState([]);
  //const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory] = useState("");
  
  useEffect(() => {
    if (dashboards.length > 0) {
      // Extract all unique categories from dashboards
      const allTags = dashboards.flatMap(dashboard => dashboard.tags);
      const uniqueCategories = [...new Set(allTags)];
      
      // Count dashboards per category
      const categoriesWithCount = uniqueCategories.map(category => {
        const count = dashboards.filter(dashboard => 
          dashboard.tags.includes(category)
        ).length;
        
        return { name: category, count };
      });
      
      // Sort by count (descending)
      categoriesWithCount.sort((a, b) => b.count - a.count);
      
      setCategories(categoriesWithCount);
    }
  }, [dashboards]);
  
  // Map categories to icons
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'operations':
        return faChartLine;
      case 'air traffic':
        return faPlane;
      case 'safety':
        return faShieldAlt;
      case 'maintenance':
        return faTools;
      case 'financial':
        return faMoneyBillWave;
      case 'compliance':
        return faClipboardCheck;
      case 'risk management':
        return faExclamationTriangle;
      case 'airports':
        return faCity;
      case 'regulatory':
        return faBalanceScale;
      default:
        return faChartLine;
    }
  };
  
  // Get category CSS class
  const getCategoryClass = (category) => {
    switch(category.toLowerCase()) {
      case 'operations':
        return 'category-operations';
      case 'air traffic':
        return 'category-air-traffic';
      case 'safety':
        return 'category-safety';
      case 'maintenance':
        return 'category-maintenance';
      case 'financial':
        return 'category-financial';
      case 'compliance':
        return 'category-compliance';
      case 'risk management':
        return 'category-risk-management';
      case 'airports':
        return 'category-airports';
      case 'regulatory':
        return 'category-regulatory';
      default:
        return 'category-default';
    }
  };
  
  // Handle category selection - most aggressive approach
  const handleCategoryClick = (categoryName) => {
    // Store the category name in both localStorage and sessionStorage
    localStorage.setItem('selectedCategory', categoryName);
    sessionStorage.setItem('selectedCategory', categoryName);
    
    // Add a timestamp to identify this navigation
    localStorage.setItem('categoryNavigationTime', new Date().getTime());
    
    // Use the most direct navigation approach
    window.location.href = `/all-dashboards?category=${encodeURIComponent(categoryName)}`;
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
                  <div className="error-text">Error loading categories: {error}</div>
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
      
      {/* Main Content with White Card - Same structure as HomePage */}
      <main className="home-main">
        <div className="content-card">
          <div className="content-card-inner">
            {/* Light Gray Content Card - wraps ALL content */}
            <div className="content-inner-card">
              {/* NEW DGC Style Banner Section */}
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
              
              {/* Categories Content */}
              <section className="categories-container">
                <div className="categories-grid">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className={`category-card ${getCategoryClass(category.name)}`}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {/* Category Background Overlay - like dashboard overlay */}
                      <div className="category-background"></div>
                      
                      {/* Category Icon - positioned like dashboard icon */}
                      <FontAwesomeIcon 
                        icon={getCategoryIcon(category.name)} 
                        className="category-icon" 
                      />
                      
                      {/* Category Title - positioned like dashboard title */}
                      <h2 className="category-title">{category.name}</h2>
                      
                      {/* Green Arrow - positioned like dashboard arrow */}
                      <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className="category-arrow" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </main>
      
      {/* Modal for category info */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Category: {selectedCategory}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Click below to view all dashboards in the "{selectedCategory}" category.
              </p>
              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleCategoryClick(selectedCategory)}
                >
                  View {selectedCategory} Dashboards
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;