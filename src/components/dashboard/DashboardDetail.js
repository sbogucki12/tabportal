import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faDownload, 
  faExpand, 
  faExternalLinkAlt, 
  faStar, 
  faUser, 
  faCalendarAlt,
  faSync, 
  faEye, 
  faChartPie,
  faDatabase,
  faUserTie,
  faEnvelope,
  faPhone,
  faTag,
  faVideo,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/DashboardDetail.css';

const DashboardDetail = ({ dashboard, relatedDashboards }) => {
  const [imageEnlarged, setImageEnlarged] = useState(false);
  
  if (!dashboard) {
    return <div>Dashboard not found</div>;
  }
  
  // Format dates to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const createdDate = formatDate(dashboard.createdAt);
  
  return (
    <div className="dashboard-detail">
      {/* Featured-style header matching "Intelligence Visualization of the Month" */}
      <div className="detail-header-featured">
        <h2 className="detail-title-featured">Dashboard Details</h2>
        <Link to="/" className="back-link-featured">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          Back to Dashboards
        </Link>
      </div>
      
      <div className="detail-content">
        {/* Dashboard Image or Video */}
        <div className="dashboard-image-container">
          {dashboard.isVideo ? (
            <video 
              src={imageEnlarged ? dashboard.imageUrl : dashboard.thumbnailUrl} 
              className="dashboard-image"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={imageEnlarged ? dashboard.imageUrl : dashboard.thumbnailUrl} 
              alt={dashboard.title} 
              className="dashboard-image"
            />
          )}
          <div className="media-type-indicator">
            <FontAwesomeIcon icon={dashboard.isVideo ? faVideo : faImage} />
            {dashboard.isVideo ? 'Video Dashboard' : 'Dashboard Screenshot'}
          </div>
          <div className="image-controls">
            <button 
              className="image-control-button"
              onClick={() => setImageEnlarged(!imageEnlarged)}
              title={imageEnlarged ? "View thumbnail" : "View full size"}
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <a 
              href={dashboard.imageUrl} 
              className="image-control-button"
              download={`${dashboard.title}-screenshot.jpg`}
              title="Download image"
            >
              <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
        </div>
        
        {/* Main Content Grid - Two Column Layout */}
        <div className="detail-main-grid">
          {/* Left Column - Primary Information */}
          <div className="detail-left-column">
            {/* Dashboard Title and Description */}
            <div className="dashboard-header-info">
              <h1 className="dashboard-info-title">{dashboard.title}</h1>
              <p className="dashboard-info-description">{dashboard.description}</p>
              
              {/* Tags */}
              <div className="dashboard-tags">
                {dashboard.tags.map((tag, index) => (
                  <span key={index} className="dashboard-tag">
                    <FontAwesomeIcon icon={faTag} className="tag-icon" />
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="action-buttons">
                <a 
                  href={dashboard.dashboardUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  View Dashboard
                </a>
                <button className="btn btn-secondary">
                  <FontAwesomeIcon icon={faStar} />
                  Add to Favorites
                </button>
              </div>
            </div>
            
            {/* Contact Information Card */}
            <div className="metadata-card">
              <h3 className="metadata-title">
                <FontAwesomeIcon icon={faUserTie} className="metadata-title-icon" />
                Contact Information
              </h3>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faUserTie} className="metadata-icon" />
                <div className="metadata-label">Contact:</div>
                <div className="metadata-value">{dashboard.contactName}</div>
              </div>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faEnvelope} className="metadata-icon" />
                <div className="metadata-label">Email:</div>
                <div className="metadata-value">
                  <a href={`mailto:${dashboard.contactEmail}`} className="email-link">
                    {dashboard.contactEmail}
                  </a>
                </div>
              </div>
              
              {dashboard.contactPhone && (
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faPhone} className="metadata-icon" />
                  <div className="metadata-label">Phone:</div>
                  <div className="metadata-value">{dashboard.contactPhone}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Metadata Cards */}
          <div className="detail-right-column">
            {/* General Information */}
            <div className="metadata-card">
              <h3 className="metadata-title">
                <FontAwesomeIcon icon={faChartPie} className="metadata-title-icon" />
                Dashboard Details
              </h3>
              
              <div className="metadata-grid">
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faUser} className="metadata-icon" />
                  <div className="metadata-label">Owner:</div>
                  <div className="metadata-value">{dashboard.owner}</div>
                </div>
                
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faChartPie} className="metadata-icon" />
                  <div className="metadata-label">Type:</div>
                  <div className="metadata-value">{dashboard.dashboardType}</div>
                </div>
                
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faCalendarAlt} className="metadata-icon" />
                  <div className="metadata-label">Created:</div>
                  <div className="metadata-value">{createdDate}</div>
                </div>
                
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faSync} className="metadata-icon" />
                  <div className="metadata-label">Updates:</div>
                  <div className="metadata-value">{dashboard.updateFrequency}</div>
                </div>
                
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faEye} className="metadata-icon" />
                  <div className="metadata-label">Views:</div>
                  <div className="metadata-value">{dashboard.views.toLocaleString()}</div>
                </div>
                
                <div className="metadata-item">
                  <FontAwesomeIcon icon={faDatabase} className="metadata-icon" />
                  <div className="metadata-label">Data Source:</div>
                  <div className="metadata-value">{dashboard.dataSource}</div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Card */}
            <div className="metadata-card stats-card">
              <h3 className="metadata-title">
                <FontAwesomeIcon icon={faEye} className="metadata-title-icon" />
                Usage Statistics
              </h3>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{dashboard.views.toLocaleString()}</div>
                  <div className="stat-label">Total Views</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="stat-label">This Month</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">
                    {Math.floor(Math.random() * 20) + 5}
                  </div>
                  <div className="stat-label">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Dashboards */}
        {relatedDashboards && relatedDashboards.length > 0 && (
          <div className="related-section">
            <h2 className="related-title">Related Dashboards</h2>
            <div className="related-grid">
              {relatedDashboards.map(related => (
                <Link 
                  key={related.id} 
                  to={`/dashboard/${related.id}`}
                  className="related-card"
                >
                  <img 
                    src={related.thumbnailUrl} 
                    alt={related.title}
                    className="related-image"
                  />
                  <div className="related-info">
                    <h4 className="related-card-title">{related.title}</h4>
                    <p className="related-description">
                      {related.description.length > 100 
                        ? `${related.description.substring(0, 100)}...` 
                        : related.description
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDetail;