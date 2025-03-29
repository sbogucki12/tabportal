import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
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
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import '../styles/CategoriesPage.css';

const CategoriesPage = () => {
  const { dashboards, loading, error } = useContext(DashboardContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
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
  
  // Handle category click - now shows a modal instead of navigating
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowModal(true);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading categories...</div>
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
  
  return (
    <div className="categories-page">
      <Header />
      
      <main className="categories-main">
        <div className="page-banner">
          <div className="page-banner-container">
            <h1 className="page-title">Dashboard Categories</h1>
            <p className="page-description">
              Browse our dashboard categories. Click on a category to see details.
            </p>
            <div style={{ 
              backgroundColor: 'white', 
              borderLeft: '4px solid #005ea2', 
              padding: '12px 15px', 
              borderRadius: '4px',
              marginTop: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <p style={{ 
                color: '#005ea2', 
                fontWeight: '500',
                margin: 0
              }}>
                Note: Category filtering is temporarily disabled. Please use the search filters on the All Dashboards page.
              </p>
            </div>
          </div>
        </div>
        
        <section className="categories-container">
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="category-header">
                  <div className={`category-icon-container ${getCategoryClass(category.name)}`}>
                    <FontAwesomeIcon icon={getCategoryIcon(category.name)} className="category-icon" />
                  </div>
                  <h2 className="category-title">{category.name}</h2>
                </div>
                
                <p className="category-count">
                  {category.count} {category.count === 1 ? 'dashboard' : 'dashboards'}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Maintenance Modal */}
      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-container" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <FontAwesomeIcon 
                icon={faInfoCircle} 
                style={{ 
                  color: '#005ea2', 
                  fontSize: '40px',
                  marginBottom: '15px'
                }}
              />
              <h3 style={{ 
                fontSize: '22px', 
                margin: '0 0 10px',
                color: '#333' 
              }}>
                Category: {selectedCategory}
              </h3>
            </div>
            
            <p style={{
              margin: '20px 0',
              color: '#333',
              lineHeight: '1.5',
              fontSize: '16px'
            }}>
              Category filtering is currently under maintenance. Please visit the All Dashboards page and use the search filters there instead.
            </p>
            
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <button
                onClick={() => navigate('/all-dashboards')}
                style={{
                  backgroundColor: '#005ea2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Go to All Dashboards
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;