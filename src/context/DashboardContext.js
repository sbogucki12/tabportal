// src/context/DashboardContext.js - Enhanced with data source switching capability
import React, { createContext, useState, useEffect } from 'react';

// Data source imports
import { sampleDashboards } from '../data/sampleData';
//import { realDashboards } from '../data/realData'; // Uncomment for real data

// DATA SOURCE CONFIGURATION
// Toggle between sample and real data by commenting/uncommenting the line below
//const USE_REAL_DATA = true; // Set to true to use realData.js
const USE_REAL_DATA = false // Uncomment this line and comment above to use real data

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredDashboard, setFeaturedDashboard] = useState(null);

  useEffect(() => {
    const loadDashboards = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Select data source based on configuration
        let dashboardData;
        if (USE_REAL_DATA) {
          // When switching to real data, uncomment the import above and this line:
          //dashboardData = realDashboards;
          
          // For now, fallback to sample data if real data not available
          dashboardData = sampleDashboards;
          console.log('Real data source selected, but realData.js import is commented out. Using sample data as fallback.');
        } else {
          dashboardData = sampleDashboards;
          console.log('Using sample data source');
        }
        
        setDashboards(dashboardData);
        
        // Set the first featured dashboard
        const featured = dashboardData.find(d => d.isFeatured);
        if (featured) {
          setFeaturedDashboard(featured);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load dashboards');
        console.error('Error loading dashboards:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboards();
  }, []);

  const getDashboardById = (id) => {
    return dashboards.find(dashboard => dashboard.id === id);
  };

  const getRelatedDashboards = (currentId) => {
    const currentDashboard = getDashboardById(currentId);
    if (!currentDashboard) return [];
    
    // Get related dashboards based on shared tags or same owner
    return dashboards
      .filter(dashboard => 
        dashboard.id !== currentId && (
          dashboard.owner === currentDashboard.owner ||
          dashboard.tags.some(tag => currentDashboard.tags.includes(tag))
        )
      )
      .slice(0, 3);
  };

  const addDashboard = (dashboardData) => {
    const newDashboard = {
      id: `dash-${Date.now()}`,
      ...dashboardData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      isFeatured: false
    };
    
    setDashboards([...dashboards, newDashboard]);
    return newDashboard;
  };

  const updateDashboard = (id, updatedData) => {
    const updatedDashboards = dashboards.map(dashboard =>
      dashboard.id === id 
        ? { ...dashboard, ...updatedData, updatedAt: new Date().toISOString() }
        : dashboard
    );
    
    setDashboards(updatedDashboards);
    
    // Update featured dashboard if it was the one being updated
    if (featuredDashboard && featuredDashboard.id === id) {
      setFeaturedDashboard({ ...featuredDashboard, ...updatedData });
    }
  };

  const deleteDashboard = (id) => {
    const updatedDashboards = dashboards.filter(dashboard => dashboard.id !== id);
    setDashboards(updatedDashboards);
    
    // Clear featured dashboard if it was deleted
    if (featuredDashboard && featuredDashboard.id === id) {
      setFeaturedDashboard(updatedDashboards.find(d => d.isFeatured) || null);
    }
  };

  const setAsFeatured = (id) => {
    const updatedDashboards = dashboards.map(dashboard => ({
      ...dashboard,
      isFeatured: dashboard.id === id
    }));
    
    setDashboards(updatedDashboards);
    setFeaturedDashboard(getDashboardById(id));
  };

  // Enhanced search functionality
  const searchDashboards = (query) => {
    if (!query.trim()) return dashboards;

    const searchTerm = query.toLowerCase();
    return dashboards.filter(dashboard => 
      dashboard.title.toLowerCase().includes(searchTerm) ||
      dashboard.description.toLowerCase().includes(searchTerm) ||
      dashboard.owner.toLowerCase().includes(searchTerm) ||
      (dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(searchTerm)) ||
      dashboard.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(searchTerm))
    );
  };

  // Advanced search with multiple criteria
  const advancedSearch = (searchCriteria) => {
    return dashboards.filter(dashboard => {
      // Title search
      const matchesTitle = !searchCriteria.title ||
        dashboard.title.toLowerCase().includes(searchCriteria.title.toLowerCase());
      
      // Description search  
      const matchesDescription = !searchCriteria.description ||
        dashboard.description.toLowerCase().includes(searchCriteria.description.toLowerCase());
      
      // Tag search (exact match)
      const matchesTags = !searchCriteria.tags || 
        searchCriteria.tags.every(tag => 
          dashboard.tags.some(dashTag => 
            dashTag.toLowerCase() === tag.toLowerCase()
          )
        );
      
      // Data source search
      const matchesDataSource = !searchCriteria.dataSource ||
        (dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(searchCriteria.dataSource.toLowerCase()));
      
      // Owner search (includes ownerAbbr)
      const matchesOwner = !searchCriteria.owner ||
        dashboard.owner.toLowerCase().includes(searchCriteria.owner.toLowerCase()) ||
        (dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(searchCriteria.owner.toLowerCase()));
      
      // Dashboard type search
      const matchesDashboardType = !searchCriteria.dashboardType ||
        (dashboard.dashboardType && dashboard.dashboardType.toLowerCase() === searchCriteria.dashboardType.toLowerCase());
      
      // Access level search
      const matchesAccessLevel = !searchCriteria.accessLevel ||
        dashboard.accessLevel.toLowerCase() === searchCriteria.accessLevel.toLowerCase();
      
      return matchesTitle && matchesDescription && matchesTags && 
             matchesDataSource && matchesOwner && matchesDashboardType && matchesAccessLevel;
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
      searchDashboards,
      advancedSearch,
      dataSource: USE_REAL_DATA ? 'real' : 'sample' // For debugging/info purposes
    }}>
      {children}
    </DashboardContext.Provider>
  );
};