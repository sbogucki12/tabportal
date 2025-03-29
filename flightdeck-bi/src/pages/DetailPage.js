import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import DashboardDetail from '../components/dashboard/DashboardDetail';
import { DashboardContext } from '../context/DashboardContext';
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
      <div className="loading-container">
        <div className="loading-text">Loading dashboard details...</div>
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
  
  if (!dashboard && !loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Dashboard not found. Redirecting to home page...</div>
      </div>
    );
  }
  
  return (
    <div className="detail-page">
      <Header />
      
      <main className="detail-main">
        <div className="detail-container">
          <DashboardDetail 
            dashboard={dashboard} 
            relatedDashboards={relatedDashboards}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DetailPage;