import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudUploadAlt, 
  faTimes,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { DashboardContext } from '../../context/DashboardContext';
import '../../styles/AddDashboardForm.css';

const AddDashboardForm = () => {
  const { addDashboard } = useContext(DashboardContext);
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
    ownerAbbr: '',
    description: '',
    tags: [],
    dataSource: '',
    updateFrequency: '',
    dashboardType: '',
    accessLevel: 'Public',
    dashboardUrl: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  
  // Map owner to abbreviation
  const getOwnerAbbr = (owner) => {
    switch(owner) {
      case 'FAA Headquarters':
        return 'FAA';
      case 'Air Traffic Organization':
        return 'ATO';
      case 'Aviation Safety':
        return 'AVS';
      case 'Airports':
        return 'ARP';
      case 'Security & Hazardous Materials':
        return 'ASH';
      case 'Policy & Innovation':
        return 'AGI';
      default:
        return '';
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'owner') {
      setFormData({
        ...formData,
        [name]: value,
        ownerAbbr: getOwnerAbbr(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };
  
  const handleTagInputKeyDown = (e) => {
    // Add tag on Enter or comma
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      owner: '',
      ownerAbbr: '',
      description: '',
      tags: [],
      dataSource: '',
      updateFrequency: '',
      dashboardType: '',
      accessLevel: 'Public',
      dashboardUrl: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });
    setTagInput('');
    setImagePreview('');
    setImageFile(null);
    setSubmitMessage({ type: '', text: '' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.owner || !formData.dataSource || !formData.dashboardUrl) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fill in all required fields.'
      });
      return;
    }
    
    if (formData.tags.length === 0) {
      setSubmitMessage({
        type: 'error',
        text: 'Please add at least one category tag.'
      });
      return;
    }
    
    if (!imageFile) {
      setSubmitMessage({
        type: 'error',
        text: 'Please upload a dashboard screenshot.'
      });
      return;
    }
    
    // In a real app, we would upload the image file to a storage service
    // and get back a URL. For now, we'll just use the preview URL
    const newDashboard = {
      ...formData,
      thumbnailUrl: imagePreview,
      imageUrl: imagePreview,
      views: 0,
      isFeatured: false,
      createdAt: new Date().toISOString()
    };
    
    // Add the dashboard
    try {
      addDashboard(newDashboard);
      
      setSubmitMessage({
        type: 'success',
        text: 'Dashboard added successfully!'
      });
      
      // Reset form after successful submission
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Error adding dashboard. Please try again.'
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
                <option value="FAA Headquarters">FAA Headquarters</option>
                <option value="Air Traffic Organization">Air Traffic Organization</option>
                <option value="Aviation Safety">Aviation Safety</option>
                <option value="Airports">Airports</option>
                <option value="Security & Hazardous Materials">Security & Hazardous Materials</option>
                <option value="Policy & Innovation">Policy & Innovation</option>
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
              <span className="form-hint">Press Enter or comma to add a tag</span>
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
        
        {/* Dashboard Image */}
        <div className="form-section">
          <h3 className="form-section-title">
            Dashboard Image
          </h3>
          
          <div className="form-group">
            <label>
              Upload Dashboard Screenshot <span className="required-field">*</span>
            </label>
            
            <div
              className="upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              {!imagePreview ? (
                <>
                  <FontAwesomeIcon 
                    icon={faCloudUploadAlt} 
                    className="upload-icon"
                  />
                  <p>Drag & drop a screenshot here, or click to browse</p>
                  <p className="form-hint">Recommended size: 1200×600px, Max size: 5MB</p>
                </>
              ) : (
                <div className="upload-preview">
                  <img 
                    src={imagePreview} 
                    alt="Dashboard preview" 
                    className="preview-image"
                  />
                  <span 
                    className="preview-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview('');
                      setImageFile(null);
                      document.getElementById('fileInput').value = '';
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </div>
              )}
              
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
        
        {/* Form Buttons */}
        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDashboardForm;