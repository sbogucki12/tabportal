import React, { useState } from 'react';
import '../../styles/SettingsPanel.css';

const SettingsPanel = () => {
  // State to track settings
  const [settings, setSettings] = useState({
    // Display settings
    showFeatured: true,
    dashboardsPerPage: '6',
    defaultSort: 'newest',
    
    // Access settings
    requirePassword: true,
    allowPublicAccess: false,
    
    // Email settings
    sendNotifications: true,
    notificationEmail: 'admin@example.com'
  });
  
  // Handle changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Would send data to backend in a real application
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="settings-container">
      <h3 className="settings-heading">Site Settings</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Display Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Display Settings</h4>
          
          <div className="settings-group">
            <div className="settings-row">
              <div className="settings-label">Show Featured Dashboard</div>
              <div className="settings-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="showFeatured"
                    checked={settings.showFeatured}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="settings-row">
              <div className="settings-label">Dashboards Per Page</div>
              <div className="settings-control">
                <select
                  name="dashboardsPerPage"
                  value={settings.dashboardsPerPage}
                  onChange={handleChange}
                  className="form-select"
                  style={{ width: '100px' }}
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            
            <div className="settings-row">
              <div className="settings-label">Default Sort Order</div>
              <div className="settings-control">
                <select
                  name="defaultSort"
                  value={settings.defaultSort}
                  onChange={handleChange}
                  className="form-select"
                  style={{ width: '200px' }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="popular">Most Viewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Access Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Access Settings</h4>
          
          <div className="settings-group">
            <div className="settings-row">
              <div className="settings-label">Require Password</div>
              <div className="settings-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="requirePassword"
                    checked={settings.requirePassword}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="settings-row">
              <div className="settings-label">Allow Public Access</div>
              <div className="settings-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="allowPublicAccess"
                    checked={settings.allowPublicAccess}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Email Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Notification Settings</h4>
          
          <div className="settings-group">
            <div className="settings-row">
              <div className="settings-label">Send Email Notifications</div>
              <div className="settings-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="sendNotifications"
                    checked={settings.sendNotifications}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="settings-row">
              <div className="settings-label">Notification Email</div>
              <div className="settings-control">
                <input
                  type="email"
                  name="notificationEmail"
                  value={settings.notificationEmail}
                  onChange={handleChange}
                  className="form-input"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="button-row">
          <button type="button" className="btn btn-secondary">
            Reset to Defaults
          </button>
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;