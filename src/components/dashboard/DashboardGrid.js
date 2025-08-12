import React from 'react';
import DashboardCard from './DashboardCard';
import '../../styles/DashboardGrid.css';

const DashboardGrid = ({ dashboards, title = "Browse Intelligence Dashboards" }) => {
  // Check if title is a React element or a string
  const renderTitle = () => {
    if (React.isValidElement(title)) {
      // If it's already a React element (like <h2>), render it directly
      return title;
    } else {
      // If it's a string, wrap it in the default h2
      return <h2 className="section-title">{title}</h2>;
    }
  };

  return (
    <section className="dashboard-grid-container">
      {renderTitle()}
      
      {dashboards.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No dashboards found matching your criteria.</p>
          <p className="empty-state-subtitle">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {dashboards.map(dashboard => (
            <DashboardCard key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardGrid;