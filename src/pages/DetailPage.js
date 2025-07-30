import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import DashboardDetail from '../components/dashboard/DashboardDetail';
import { DashboardContext } from '../context/DashboardContext';
import '../styles/HomePage.css'; // Use HomePage styles for consistent layout
import '../styles/DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDashboardById, getRelatedDashboards, loading, error } = useContext(DashboardContext);
  const [dashboard, setDashboard] = useState(null);
  const [relatedDashboards, setRelatedDashboards] = useState([]);
  
  useEffect(() => {
    if (id) {
      const dashboardData = getDashboardById(id);
      
      if (dashboardData) {
        setDashboard(dashboardData);
        setRelatedDashboards(getRelatedDashboards(id));
      } else if (!loading) {
        // Dashboard not found, redirect to home after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }
  }, [id, getDashboardById, getRelatedDashboards, loading, navigate]);
  
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
                  <div className="loading-text">Loading dashboard details...</div>
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
                  <div className="error-text">{error}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!dashboard && !loading) {
    return (
      <div className="home-page">
        <Header />
        <NavigationHeader />
        <main className="home-main">
          <div className="content-card">
            <div className="content-card-inner">
              <div className="content-inner-card">
                <div className="loading-container">
                  <div className="loading-text">Dashboard not found. Redirecting to home page...</div>
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
              
              {/* Dashboard Detail Content */}
              <div className="detail-content-wrapper">
                <DashboardDetail 
                  dashboard={dashboard} 
                  relatedDashboards={relatedDashboards}
                />
              </div>
            </div>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;