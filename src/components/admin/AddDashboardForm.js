// src/components/admin/AddDashboardForm.js - Updated with new category structure
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

  // Organization abbreviation mapping - UPDATED VALUES
  const organizationMapping = {
    'AVS': 'AVS',
    'ATO': 'ATO', 
    'ARP': 'ARP',
    'AST': 'AST',
    'ANG': 'ANG',  // NextGen (was AFN)
    'AGC': 'AGC',
    'AGI': 'AGI',  // Government and Industry Affairs (was ANG)
    'AFN': 'AFN',  // Finance and Management (new)
    'APL': 'APL',
    'AIT': 'AIT',
    'ASH': 'ASH'
  };

  // NEW CATEGORIES - Available category options
  const availableCategories = [
    'Aeronautical',
    'Aircraft', 
    'Airport',
    'Airspace',
    'Facilities',
    'Finance',
    'Flight',
    'Geospatial',
    'Information Technology',
    'International',
    'People',
    'Safety',
    'Weather'
  ];

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

  // Add category from dropdown
  const addCategoryTag = (categoryName) => {
    if (categoryName && !formData.tags.includes(categoryName)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, categoryName]
      }));
    }
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
      // Add the dashboard
      addDashboard(formData);
      
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
                <option value="ANG">ANG</option>
                <option value="AGC">AGC</option>
                <option value="AGI">AGI</option>
                <option value="AFN">AFN</option>
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
              placeholder="Enter detailed description of the dashboard"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Tags & Categories Section - UPDATED */}
        <div className="form-section">
          <h3 className="form-section-title">
            Tags & Categories
          </h3>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="categorySelect">
                Add Category
              </label>
              <select
                id="categorySelect"
                className="form-select"
                onChange={(e) => {
                  if (e.target.value) {
                    addCategoryTag(e.target.value);
                    e.target.value = ''; // Reset dropdown
                  }
                }}
              >
                <option value="">Select a category to add</option>
                {availableCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="tags">
                Custom Tags <span className="required-field">*</span>
              </label>
              <div className="tag-input-container">
                <input
                  type="text"
                  id="tags"
                  className="form-input"
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                />
                <button
                  type="button"
                  className="add-tag-button"
                  onClick={addTag}
                >
                  Add Tag
                </button>
              </div>
            </div>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="tags-display">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                  <button
                    type="button"
                    className="remove-tag-button"
                    onClick={() => removeTag(tag)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Dashboard Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            Dashboard Information
          </h3>
          
          <div className="form-grid form-grid-2">
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
                <option value="Public">Public</option>
                <option value="Restricted">Restricted</option>
                <option value="Internal">Internal</option>
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
                placeholder="https://example.com/dashboard"
                value={formData.dashboardUrl}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="thumbnailUrl">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                id="thumbnailUrl"
                name="thumbnailUrl"
                className="form-input"
                placeholder="/media/thumbnail.jpg"
                value={formData.thumbnailUrl}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="imageUrl">
                Full Image/Video URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="form-input"
                placeholder="/media/full-image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isVideo"
                  checked={formData.isVideo}
                  onChange={handleChange}
                />
                <span className="checkbox-text">This is a video file</span>
              </label>
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
                placeholder="Enter contact name"
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
                placeholder="contact@faa.gov"
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
                placeholder="(202) 555-1234"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="form-section">
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