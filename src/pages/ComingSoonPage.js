// src/pages/ComingSoonPage.js - Coming Soon page component
import React from 'react';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock,
  faTools,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout

const ComingSoonPage = () => {
  return (
    <div className="home-page">
      <Header />
      <NavigationHeader />
      
      {/* Main Content with White Card Layout - Same as other pages */}
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
                    <h4 className="header-subtitle">Feature Coming Soon</h4>
                  </div>
                </div>
              </div>
              
              {/* Coming Soon Content */}
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div style={{
                  fontSize: '4rem',
                  color: '#005ea2',
                  marginBottom: '2rem'
                }}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#005ea2',
                  marginBottom: '1rem',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  Coming Soon
                </h2>
                
                <p style={{
                  fontSize: '1.2rem',
                  color: '#525252',
                  marginBottom: '3rem',
                  lineHeight: '1.6',
                  fontFamily: '"Open Sans", sans-serif'
                }}>
                  This feature is currently under development and will be available in a future release of the 
                  Enterprise Information Management system.
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '3rem',
                  marginBottom: '3rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#525252'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      color: '#d4b76a',
                      marginBottom: '0.5rem'
                    }}>
                      <FontAwesomeIcon icon={faTools} />
                    </div>
                    <div style={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontWeight: '600'
                    }}>
                      In Development
                    </div>
                  </div>
                  
                  <div style={{
                    textAlign: 'center',
                    color: '#525252'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      color: '#d4b76a',
                      marginBottom: '0.5rem'
                    }}>
                      <FontAwesomeIcon icon={faRocket} />
                    </div>
                    <div style={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontWeight: '600'
                    }}>
                      Launch Ready
                    </div>
                  </div>
                </div>
                
                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '0.95rem',
                    color: '#525252',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    <strong>What's Available Now:</strong> Browse and search aviation intelligence dashboards, 
                    view detailed dashboard information, and access administrative functions through the main navigation.
                  </p>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => window.location.href = '/'}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#005ea2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '16px',
                      fontFamily: '"Open Sans", sans-serif',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#004a82'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#005ea2'}
                  >
                    Return to Home
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/all-dashboards'}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#d4b76a',
                      color: '#1A1A1A',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '16px',
                      fontFamily: '"Open Sans", sans-serif',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c4a75a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#d4b76a'}
                  >
                    Browse Dashboards
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComingSoonPage;