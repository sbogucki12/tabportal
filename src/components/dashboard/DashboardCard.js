import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faUser, faCalendar, faVideo, faImage } from '@fortawesome/free-solid-svg-icons';
import '../../styles/DashboardCard.css';

const DashboardCard = ({ dashboard }) => {
  
  return (
    <div className="dashboard-card">
      <div className="card-image-container">
        {dashboard.isVideo ? (
          <video 
            src={dashboard.thumbnailUrl} 
            alt={dashboard.title} 
            className="card-image"
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          <img 
            src={dashboard.thumbnailUrl} 
            alt={dashboard.title} 
            className="card-image"
          />
        )}
        <div className="card-media-type">
          <FontAwesomeIcon icon={dashboard.isVideo ? faVideo : faImage} />
        </div>
        <div className="card-expand-button">
          <a href={`/dashboard/${dashboard.id}`}>
            <FontAwesomeIcon icon={faExpand} />
          </a>
        </div>
      </div>
      
      <div className="card-content">
        <a href={`/dashboard/${dashboard.id}`}>
          <h3 className="card-title">{dashboard.title}</h3>
        </a>
        
        <p className="card-description">
          {dashboard.description}
        </p>
        
        <div className="card-tags">
          {dashboard.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="card-tag">
              {tag}
            </span>
          ))}
          {dashboard.tags.length > 3 && (
            <span className="card-tag">
              +{dashboard.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="card-meta">
          <span className="card-meta-item">
            <FontAwesomeIcon icon={faUser} className="card-meta-icon" /> 
            {dashboard.ownerAbbr}
          </span>
          <span className="card-meta-item">
            <FontAwesomeIcon icon={faCalendar} className="card-meta-icon" /> 
            {dashboard.updateFrequency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;