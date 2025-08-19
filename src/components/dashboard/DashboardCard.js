// src/components/dashboard/DashboardCard.js - FIXED: Replace href with React Router navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faPlane, 
  faRocket, 
  faBuilding, 
  faDollarSign, 
  faEarthAmericas, 
  faMicrochip, 
  faGlobe, 
  faPerson, 
  faShield, 
  faCloud,
  faChartLine,
  faSatellite,
  faPlaneDeparture
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/DashboardCard.css';

const DashboardCard = ({ dashboard }) => {
  const navigate = useNavigate();
  
  // ADDED: Handle click navigation to detail page
  const handleCardClick = () => {
    console.log('🎯 DashboardCard clicked:', dashboard.title, 'ID:', dashboard.id);
    navigate(`/dashboard/${dashboard.id}`);
  };
  
  // Map categories to appropriate FontAwesome icons
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Aeronautical': faPlaneDeparture,
      'Aircraft': faRocket,
      'Airport': faPlane,
      'Airspace': faSatellite,
      'Facilities': faBuilding,
      'Finance': faDollarSign,
      'Flight': faPlane,
      'Geospatial': faEarthAmericas,
      'Information Technology': faMicrochip,
      'International': faGlobe,
      'People': faPerson,
      'Safety': faShield,
      'Weather': faCloud,
      'Analytics': faChartLine,
      'Default': faChartLine
    };
    
    return iconMap[category] || iconMap['Default'];
  };

  // Get primary category for icon
  const primaryCategory = dashboard.category || dashboard.tags?.[0] || 'Analytics';
  const categoryIcon = getCategoryIcon(primaryCategory);

  return (
    <div 
      className={`dashboard-card ${dashboard.featured ? 'featured' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Full background thumbnail */}
      {dashboard.thumbnailUrl && (
        dashboard.isVideo ? (
          <video 
            src={dashboard.thumbnailUrl} 
            className="dashboard-thumbnail"
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          <img 
            src={dashboard.thumbnailUrl} 
            alt={dashboard.title}
            className="dashboard-thumbnail"
          />
        )
      )}
      
      {/* Dark blue overlay */}
      <div className="dashboard-overlay"></div>
      
      {/* Icon - top left */}
      <FontAwesomeIcon icon={categoryIcon} className="dashboard-icon" />
      
      {/* Title - bottom left - FIXED: Removed href, using onClick instead */}
      <div className="dashboard-title">
        {dashboard.title}
      </div>
      
      {/* Arrow - bottom right - FIXED: Removed href, using onClick instead */}
      <FontAwesomeIcon icon={faArrowRight} className="dashboard-arrow" />
    </div>
  );
};

export default DashboardCard;