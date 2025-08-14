// src/components/dashboard/DashboardDetail.js - Updated to show "Updated" instead of "Created"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faDownload, 
  faExternalLinkAlt, 
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
  //const [imageEnlarged, setImageEnlarged] = useState(false);
  const navigate = useNavigate();
  
  if (!dashboard) {
    return <div>Dashboard not found</div>;
  }
  
  // Format dates to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // CHANGED: Use updatedAt instead of createdAt
  const updatedDate = formatDate(dashboard.updatedAt);

  // Handle back navigation - go to previous page in history
  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <div className="dashboard-detail">
      {/* Featured-style header matching "Intelligence Visualization of the Month" */}
      <div className="detail-header-featured">
        <h2 className="detail-title-featured">Dashboard Details</h2>
          <button 
            onClick={handleBackClick}
            className="back-link-featured"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            Back
          </button>
      </div>
      
      <div className="detail-content">
        {/* Dashboard Image or Video */}
        <div className="dashboard-image-container">
          {dashboard.isVideo ? (
            <video 
              src={dashboard.thumbnailUrl} 
              className="dashboard-image"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={dashboard.thumbnailUrl} 
              alt={dashboard.title} 
              className="dashboard-image"
            />
          )}
          <div className="media-type-indicator">
            <FontAwesomeIcon icon={dashboard.isVideo ? faVideo : faImage} />
            {dashboard.isVideo ? 'Video Dashboard' : 'Dashboard Screenshot'}
          </div>
        </div>
        
        {/* Main Content Grid - Two Column Layout */}
        <div className="detail-main-grid">
          {/* Left Column - Primary Content */}
          <div className="detail-left-column">
            {/* Title and Description Section */}
            <div className="dashboard-header-info">
              <div className="title-section">
                <h1 className="dashboard-info-title">{dashboard.title}</h1>
                <div className="dashboard-tags">
                  {dashboard.tags.map((tag, index) => (
                    <span key={index} className="dashboard-tag">
                      <FontAwesomeIcon icon={faTag} className="tag-icon" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="dashboard-info-description">
                <p>{dashboard.description}</p>
              </div>
              
              {/* Action Buttons */}
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
                <a 
                  href="http://dgc.eim.faa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <FontAwesomeIcon icon={faDownload} style={{ marginRight: '0.5rem' }} />
                  Export Data
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column - Metadata Cards */}
          <div className="detail-right-column">
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
              
              {/* CHANGED: Show "Updated" instead of "Created" */}
              <div className="metadata-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="metadata-icon" />
                <div className="metadata-label">Updated:</div>
                <div className="metadata-value">{updatedDate}</div>
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
                  <a href={`mailto:${dashboard.contactEmail}`}>
                    {dashboard.contactEmail}
                  </a>
                </div>
              </div>
              
              <div className="metadata-item">
                <FontAwesomeIcon icon={faPhone} className="metadata-icon" />
                <div className="metadata-label">Phone:</div>
                <div className="metadata-value">{dashboard.contactPhone}</div>
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