import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDatabase, faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';
import '../../styles/FeaturedDashboard.css';

const FeaturedDashboard = ({ dashboard }) => {
  if (!dashboard) return null;
  
  // Format current month and year
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  return (
    <section className="featured-dashboard-section">
      <div className="featured-dashboard-container">
        <div className="featured-dashboard">
          <div className="featured-header">
            <h2 className="featured-title">Intelligence Visualization of the Month</h2>
            <span>{currentMonth} {currentYear}</span>
          </div>
          
          <div className="featured-content">
            <div className="featured-image">
              <Link to={`/dashboard/${dashboard.id}`}>
                <img 
                  src={dashboard.imageUrl} 
                  alt={dashboard.title}
                />
              </Link>
            </div>
            
            <div className="featured-details">
              <Link to={`/dashboard/${dashboard.id}`}>
                <h3>{dashboard.title}</h3>
              </Link>
              
              <p>
                {dashboard.description}
              </p>
              
              <div className="featured-meta">
                <div className="featured-meta-item">
                  <FontAwesomeIcon icon={faUser} className="featured-meta-icon" />
                  {dashboard.owner}
                </div>
                
                <div className="featured-meta-item">
                  <FontAwesomeIcon icon={faDatabase} className="featured-meta-icon" />
                  {dashboard.dataSource}
                </div>
                
                <div className="featured-meta-item">
                  <FontAwesomeIcon icon={faCalendar} className="featured-meta-icon" />
                  Updated {dashboard.updateFrequency}
                </div>
                
                {dashboard.tags.slice(0, 2).map((tag, index) => (
                  <div key={index} className="featured-meta-item">
                    <FontAwesomeIcon icon={faTag} className="featured-meta-icon" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDashboard;  