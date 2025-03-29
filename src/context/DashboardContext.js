import React, { createContext, useState, useEffect } from 'react';
import { sampleDashboards } from '../data/sampleData';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredDashboard, setFeaturedDashboard] = useState(null);

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, we'll use the sample data
    try {
      setDashboards(sampleDashboards);
      // Set the first dashboard as featured for now
      setFeaturedDashboard(sampleDashboards.find(dash => dash.isFeatured) || sampleDashboards[0]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboards');
      setLoading(false);
    }
  }, []);

  const getDashboardById = (id) => {
    return dashboards.find(dashboard => dashboard.id === id);
  };

  const getRelatedDashboards = (id, limit = 3) => {
    const dashboard = getDashboardById(id);
    if (!dashboard) return [];

    // Find dashboards with similar tags
    return dashboards
      .filter(d => d.id !== id && d.tags.some(tag => dashboard.tags.includes(tag)))
      .slice(0, limit);
  };

  const addDashboard = (newDashboard) => {
    // In a real app, we would send to an API
    const dashboardWithId = {
      ...newDashboard,
      id: Math.random().toString(36).substr(2, 9), // Simple ID generation
      createdAt: new Date().toISOString()
    };
    
    setDashboards([...dashboards, dashboardWithId]);
    return dashboardWithId;
  };

  const updateDashboard = (id, updatedData) => {
    const updatedDashboards = dashboards.map(dashboard => 
      dashboard.id === id ? { ...dashboard, ...updatedData } : dashboard
    );
    setDashboards(updatedDashboards);
  };

  const deleteDashboard = (id) => {
    setDashboards(dashboards.filter(dashboard => dashboard.id !== id));
  };

  const setAsFeatured = (id) => {
    const dashboard = getDashboardById(id);
    if (dashboard) {
      // First reset any currently featured dashboard
      const updatedDashboards = dashboards.map(d => 
        ({...d, isFeatured: d.id === id})
      );
      setDashboards(updatedDashboards);
      setFeaturedDashboard(dashboard);
    }
  };

  const searchDashboards = (query, filters = {}) => {
    if (!query && Object.keys(filters).length === 0) return dashboards;

    return dashboards.filter(dashboard => {
      // Search by text
      const matchesQuery = !query || 
        dashboard.title.toLowerCase().includes(query.toLowerCase()) ||
        dashboard.description.toLowerCase().includes(query.toLowerCase());

      // Filter by category/tag
      const matchesCategory = !filters.category || 
        dashboard.tags.includes(filters.category);

      // Filter by organization
      const matchesOrg = !filters.organization || 
        dashboard.owner === filters.organization;

      return matchesQuery && matchesCategory && matchesOrg;
    });
  };

  return (
    <DashboardContext.Provider value={{
      dashboards,
      loading,
      error,
      featuredDashboard,
      getDashboardById,
      getRelatedDashboards,
      addDashboard,
      updateDashboard,
      deleteDashboard,
      setAsFeatured,
      searchDashboards
    }}>
      {children}
    </DashboardContext.Provider>
  );
};