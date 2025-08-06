// src/pages/AdminPage.js - Updated with NavigationHeader for easy navigation
import React, { useState, useContext } from 'react';
import Header from '../components/common/Header';
import NavigationHeader from '../components/common/NavigationHeader';
import Footer from '../components/common/Footer';
import AddDashboardForm from '../components/admin/AddDashboardForm';
import DashboardTable from '../components/admin/DashboardTable';
import SettingsPanel from '../components/admin/SettingsPanel';
import { DashboardContext } from '../context/DashboardContext';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const { loading, error } = useContext(DashboardContext);
  const [activeTab, setActiveTab] = useState('add');
  
  if (loading) {
    return (
      <div className="admin-page">
        <Header />
        <NavigationHeader />
        <main className="admin-main">
          <div className="admin-container">
            <div className="loading-container">
              <div className="loading-text">Loading dashboard data...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="admin-page">
        <Header />
        <NavigationHeader />
        <main className="admin-main">
          <div className="admin-container">
            <div className="loading-container">
              <div className="error-text">{error}</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Render tab content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'add':
        return <AddDashboardForm />;
      case 'manage':
        return <DashboardTable />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <AddDashboardForm />;
    }
  };
  
  return (
    <div className="admin-page">
      <Header />
      <NavigationHeader />
      
      <main className="admin-main">
        <div className="admin-container">
          <div className="admin-header">
            <h2 className="admin-title">Dashboard Administration</h2>
          </div>
          
          <div className="admin-tabs">
            <div className="tab-buttons">
              <button
                type="button"
                className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
                onClick={() => setActiveTab('add')}
              >
                Add New Dashboard
              </button>
              
              <button
                type="button"
                className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage')}
              >
                Manage Dashboards
              </button>
              
              <button
                type="button"
                className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
            
            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;