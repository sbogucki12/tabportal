import React, { useState, useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faExclamationCircle, 
  faTimes,
  faUpload 
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/AddDashboardForm.css';

const AddDashboardForm = () => {
  const { addDashboard } = useContext(DashboardContext);
  const [tagInput, setTagInput] = useState('');
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    ownerAbbr: '',
    tags: [],
    dataSource: '',
    updateFrequency: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    dashboardType: '',
    accessLevel: 'Public',
    dashboardUrl: '',
    thumbnailUrl: '',
    imageUrl: '',
    isVideo: false
  });

  // Organization abbreviation mapping
  const organizationMapping = {
    'AVS': 'AVS',
    'ATO': 'ATO', 
    'ARP': 'ARP',
    'AST': 'AST',
    'AFN': 'AFN',
    'AGC': 'AGC',
    'ANG': 'ANG',
    'APL': 'APL',
    'AIT': 'AIT',
    'ASH': 'ASH'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'owner') {
      // Auto-populate abbreviation when organization is selected
      setFormData(prev => ({
        ...prev,
        [name]: value,
        ownerAbbr: organizationMapping[value] || value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.owner || 
        !formData.dataSource || !formData.contactName || !formData.contactEmail || 
        !formData.dashboardType || !formData.dashboardUrl || formData.tags.length === 0) {
      setSubmitMessage({
        text: 'Please fill in all required fields.',
        type: 'error'
      });
      return;
    }

    try {
      // Create dashboard object
      const newDashboard = {
        ...formData,
        id: `dash-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        isFeatured: false,
        imageUrl: formData.thumbnailUrl || '/media/default-dashboard.jpg'
      };

      // Add to context
      addDashboard(newDashboard);
      
      setSubmitMessage({
        text: 'Dashboard added successfully!',
        type: 'success'
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        owner: '',
        ownerAbbr: '',
        tags: [],
        dataSource: '',
        updateFrequency: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        dashboardType: '',
        accessLevel: 'Public',
        dashboardUrl: '',
        thumbnailUrl: '',
        imageUrl: '',
        isVideo: false
      });
      setTagInput('');
      
    } catch (error) {
      console.error('Error adding dashboard:', error);
      setSubmitMessage({
        text: 'Error adding dashboard. Please try again.',
        type: 'error'
      });
    }
  };
  
  return (
    <div className="form-container">
      {submitMessage.text && (
        <div className={submitMessage.type === 'success' ? 'form-success' : 'form-error'}>
          <FontAwesomeIcon 
            icon={submitMessage.type === 'success' ? faCheckCircle : faExclamationCircle} 
            style={{ marginRight: '0.5rem' }} 
          />
          {submitMessage.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            Basic Information
          </h3>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="title">
                Dashboard Title <span className="required-field">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Enter dashboard title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="owner">
                Owning Organization <span className="required-field">*</span>
              </label>
              <select
                id="owner"
                name="owner"
                className="form-select"
                value={formData.owner}
                onChange={handleChange}
              >
                <option value="">Select organization</option>
                <option value="AVS">AVS</option>
                <option value="ATO">ATO</option>
                <option value="ARP">ARP</option>
                <option value="AST">AST</option>
                <option value="AFN">AFN</option>
                <option value="AGC">AGC</option>
                <option value="ANG">ANG</option>
                <option value="APL">APL</option>
                <option value="AIT">AIT</option>
                <option value="ASH">ASH</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">
              Dashboard Description <span className="required-field">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Provide a detailed description of the dashboard and its purpose"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="tags">
                Category Tags <span className="required-field">*</span>
              </label>
              <div className="tags-container">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    {tag}
                    <span 
                      className="tag-remove"
                      onClick={() => removeTag(tag)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  className="tag-input"
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  onBlur={addTag}
                />
              </div>
              <span className="form-hint">
                Use categories: Aviation Safety, Personnel / HR, Finance, Aviation Operations, IT, 
                Oversight / Compliance & Enforcement, Air Traffic, Airports, Weather, Geospatial / Maps / Charts
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="dashboardType">
                Dashboard Type <span className="required-field">*</span>
              </label>
              <select
                id="dashboardType"
                name="dashboardType"
                className="form-select"
                value={formData.dashboardType}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="Tableau">Tableau</option>
                <option value="Power BI">Power BI</option>
                <option value="AWS QuickSight">AWS QuickSight</option>
                <option value="Google Looker">Google Looker</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Data & Access Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            Data & Access Information
          </h3>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="dataSource">
                Primary Data Source <span className="required-field">*</span>
              </label>
              <input
                type="text"
                id="dataSource"
                name="dataSource"
                className="form-input"
                placeholder="Enter primary data source"
                value={formData.dataSource}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="updateFrequency">
                Update Frequency
              </label>
              <select
                id="updateFrequency"
                name="updateFrequency"
                className="form-select"
                value={formData.updateFrequency}
                onChange={handleChange}
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="dashboardUrl">
                Dashboard URL <span className="required-field">*</span>
              </label>
              <input
                type="url"
                id="dashboardUrl"
                name="dashboardUrl"
                className="form-input"
                placeholder="Enter the URL to access the dashboard"
                value={formData.dashboardUrl}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="accessLevel">
                Access Level
              </label>
              <select
                id="accessLevel"
                name="accessLevel"
                className="form-select"
                value={formData.accessLevel}
                onChange={handleChange}
              >
                <option value="Public">Public (All FAA)</option>
                <option value="Restricted">Restricted (Specific LOBs)</option>
                <option value="Private">Private (By Request Only)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            Contact Information
          </h3>
          
          <div className="form-grid form-grid-3">
            <div className="form-group">
              <label htmlFor="contactName">
                Contact Name <span className="required-field">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                className="form-input"
                placeholder="Enter contact person's name"
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactEmail">
                Contact Email <span className="required-field">*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className="form-input"
                placeholder="Enter contact email address"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactPhone">
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                className="form-input"
                placeholder="Enter contact phone number"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        {/* Media Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            Media & Preview
          </h3>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="thumbnailUrl">
                Screenshot/Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnailUrl"
                name="thumbnailUrl"
                className="form-input"
                placeholder="Enter URL for dashboard screenshot"
                value={formData.thumbnailUrl}
                onChange={handleChange}
              />
              <span className="form-hint">Upload image to media folder and enter relative path (e.g., /media/dashboard-screenshot.jpg)</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="isVideo">
                <input
                  type="checkbox"
                  id="isVideo"
                  name="isVideo"
                  checked={formData.isVideo}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Media is a video file
              </label>
              <span className="form-hint">Check if the media file is a video (MP4, etc.)</span>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faUpload} style={{ marginRight: '0.5rem' }} />
            Add Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDashboardForm;