import React, { useState } from 'react';
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
  
  if (!dashboard) return <div>Dashboard not found</div>;
  
  // Format dates to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const createdDate = formatDate(dashboard.createdAt);
  
  return (
    <div className="dashboard-detail">
      <div className="detail-header">
        <h2 className="detail-title">Dashboard Details</h2>
        <a href="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          Back to Dashboards
        </a>
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
            {dashboard.isVideo ? ' Video' : ' Image'}
          </div>
          <div className="image-controls">
            <button 
              className="image-control-button"
              onClick={() => window.open(dashboard.imageUrl, '_blank')}
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
            <button 
              className="image-control-button"
              onClick={() => setImageEnlarged(!imageEnlarged)}
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
          </div>
        </div>
        
        {/* Dashboard Content Grid */}
        <div className="detail-grid">
          {/* Main Content - 2/3 width on large screens */}
          <div>
            <h1 className="dashboard-info-title">{dashboard.title}</h1>
            
            <p className="dashboard-info-description">
              {dashboard.description}
            </p>
            
            <div className="dashboard-tags">
              {dashboard.tags.map((tag, index) => (
                <div key={index} className="dashboard-tag">
                  <FontAwesomeIcon icon={faTag} className="tag-icon" />
                  {tag}
                </div>
              ))}
            </div>
            
            <div className="action-buttons">
              <a 
                href={dashboard.dashboardUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} style={{marginRight: '0.5rem'}} />
                Access Dashboard
              </a>
              
              <button className="btn btn-secondary">
                <FontAwesomeIcon icon={faStar} style={{marginRight: '0.5rem'}} />
                Add to Favorites
              </button>
            </div>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div>
            {/* Dashboard Information */}
            <div className="metadata-card">
              <h3 className="metadata-title">
                Dashboard Information
              </h3>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faUser} className="metadata-icon" />
                <div className="metadata-label">Owner:</div>
                <div className="metadata-value">{dashboard.owner}</div>
              </div>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="metadata-icon" />
                <div className="metadata-label">Created:</div>
                <div className="metadata-value">{createdDate}</div>
              </div>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faSync} className="metadata-icon" />
                <div className="metadata-label">Updated:</div>
                <div className="metadata-value">{dashboard.updateFrequency}</div>
              </div>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faEye} className="metadata-icon" />
                <div className="metadata-label">Views:</div>
                <div className="metadata-value">{dashboard.views.toLocaleString()}</div>
              </div>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faChartPie} className="metadata-icon" />
                <div className="metadata-label">Dashboard Type:</div>
                <div className="metadata-value">{dashboard.dashboardType}</div>
              </div>
            </div>
            
            {/* Data Sources */}
            <div className="metadata-card">
              <h3 className="metadata-title">
                Data Sources
              </h3>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faDatabase} className="metadata-icon" />
                <div className="metadata-label">Primary:</div>
                <div className="metadata-value">{dashboard.dataSource}</div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="metadata-card">
              <h3 className="metadata-title">
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
        </div>
        
        {/* Related Dashboards */}
        {relatedDashboards && relatedDashboards.length > 0 && (
          <div className="related-section">
            <h2 className="related-title">Related Dashboards</h2>
            
            <div className="related-grid">
              {relatedDashboards.map(related => (
                <a 
                  key={related.id} 
                  href={`/dashboard/${related.id}`} 
                  className="related-card"
                >
                  <div className="related-image">
                    {related.isVideo ? (
                      <video 
                        src={related.thumbnailUrl} 
                        muted 
                        autoPlay 
                        loop 
                        playsInline
                      />
                    ) : (
                      <img 
                        src={related.thumbnailUrl} 
                        alt={related.title}
                      />
                    )}
                    <div className="related-media-type">
                      <FontAwesomeIcon icon={related.isVideo ? faVideo : faImage} />
                    </div>
                  </div>
                  
                  <div className="related-content">
                    <h3 className="related-content-title">{related.title}</h3>
                    
                    <div className="related-tags">
                      {related.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="related-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDetail;