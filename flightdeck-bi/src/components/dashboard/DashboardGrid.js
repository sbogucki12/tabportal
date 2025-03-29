import React from 'react';
import DashboardCard from './DashboardCard';
import '../../styles/DashboardGrid.css';

const DashboardGrid = ({ dashboards, title = "Browse Intelligence Dashboards" }) => {
  return (
    <section className="dashboard-grid-container">
      <h2 className="dashboard-grid-title">{title}</h2>
      
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