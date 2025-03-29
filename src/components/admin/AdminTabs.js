import React, { useState } from 'react';
import AddDashboardForm from './AddDashboardForm';
import DashboardTable from './DashboardTable';
import SettingsPanel from './SettingsPanel';
import '../../styles/AdminTabs.css';

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('add');
  
  const handleTabClick = (tabName) => {
    console.log('Tab clicked:', tabName);
    setActiveTab(tabName);
  };
  
  let tabContent;
  if (activeTab === 'add') {
    tabContent = <AddDashboardForm />;
  } else if (activeTab === 'manage') {
    tabContent = <DashboardTable />;
  } else if (activeTab === 'settings') {
    tabContent = <SettingsPanel />;
  }
  
  return (
    <div className="admin-tabs">
      <div className="tab-buttons">
        <button
          type="button"
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => handleTabClick('add')}
        >
          Add New Dashboard
        </button>
        
        <button
          type="button"
          className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => handleTabClick('manage')}
        >
          Manage Dashboards
        </button>
        
        <button
          type="button"
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          Settings
        </button>
      </div>
      
      <div className="tab-content">
        {tabContent}
      </div>
    </div>
  );
};

export default AdminTabs;