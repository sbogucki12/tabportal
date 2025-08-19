// src/context/DashboardContext.js - Enhanced with CSV data source support - FIXED CSV PARSING
import React, { createContext, useState, useEffect, useCallback } from 'react';
//import Papa from 'papaparse'; // Uncomment when papaparse is installed
// import { validateDashboardData, logValidationResults, cleanCSVData } from '../utils/csvDataValidator'; // Uncomment when file is created

// Data source imports
import { sampleDashboards } from '../data/sampleData';
//import { realDashboards } from '../data/realData'; // Uncomment for realData.js

// DATA SOURCE CONFIGURATION
// Toggle between data sources by changing the DATA_SOURCE value:
// Options: 'sample', 'csv', 'real'

// const DATA_SOURCE = 'sample'; // Change to 'csv' for production, 'real' for realData.js

// Alternative: Use comment-based switching (comment/uncomment the lines below)
// const DATA_SOURCE = 'sample';  // Development
   const DATA_SOURCE = 'csv';     // Production
// const DATA_SOURCE = 'real';    // Real data

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredDashboard, setFeaturedDashboard] = useState(null);

  // Function to transform CSV data to match sampleData.js schema
  const transformCSVData = (csvData) => {
    return csvData.map(row => {
      // Handle tags - convert from string to array if needed
      let tags = [];
      if (row.tags) {
        if (typeof row.tags === 'string') {
          // If tags are comma-separated string, split them
          tags = row.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        } else if (Array.isArray(row.tags)) {
          tags = row.tags;
        }
      }

      // Ensure boolean fields are properly converted
      const isRestricted = row.isRestricted === true || row.isRestricted === 'true' || row.isRestricted === '1';
      const isVideo = row.isVideo === true || row.isVideo === 'true' || row.isVideo === '1';
      const isFeatured = row.isFeatured === true || row.isFeatured === 'true' || row.isFeatured === '1';

      // Ensure numeric fields are properly converted
      const views = parseInt(row.views) || 0;

      // Transform the data to match sampleData.js schema
      return {
        id: row.id || `dash-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: row.title || '',
        description: row.description || '',
        owner: row.owner || '',
        ownerAbbr: row.ownerAbbr || '',
        category: row.category || '',
        tags: tags,
        dataSource: row.datasource || row.dataSource || '', // Handle both field names
        updateFrequency: row.updateFrequency || 'Unknown', // This field is not in CSV headers but exists in schema
        createdAt: row.createdAt || new Date().toISOString(),
        updatedAt: row.updatedAt || new Date().toISOString(),
        contactName: row.contactName || '',
        contactEmail: row.contactEmail || '',
        contactPhone: row.contactPhone || '',
        dashboardType: row.dashboardType || '',
        accessLevel: row.accessLevel || 'Public',
        dashboardUrl: row.dashboardUrl || '',
        thumbnailUrl: row.thumbnailUrl || '',
        imageUrl: row.imageUrl || '',
        isVideo: isVideo,
        views: views,
        isFeatured: isFeatured,
        isRestricted: isRestricted // Additional field from CSV
      };
    });
  };

  // Function to load CSV data
  const loadCSVData = useCallback(async () => {
    try {
      // Check if papaparse is available
      const Papa = await import('papaparse').catch(() => null);
      if (!Papa) {
        throw new Error('Papaparse is not installed. Please run: npm install papaparse');
      }

      const response = await fetch('/market.csv');
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status}`);
      }
      const csvText = await response.text();
      
      return new Promise((resolve, reject) => {
        Papa.default.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          delimitersToGuess: [',', '\t', '|', ';'],
          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn('CSV parsing warnings:', results.errors);
            }
            
            console.log('Raw CSV parse results:', results.data.length, 'rows');
            
            // FIXED: More targeted filtering - only remove rows that are completely empty or missing required fields
            let cleanedData = results.data.filter(row => {
              // Check if row exists and has at least an ID or title (required fields)
              if (!row) return false;
              
              // Get the trimmed values of key fields
              const id = typeof row.id === 'string' ? row.id.trim() : row.id;
              const title = typeof row.title === 'string' ? row.title.trim() : row.title;
              
              // Keep row if it has either an ID or a title (both are essential)
              return (id && id !== '') || (title && title !== '');
            });
            
            console.log('After filtering empty rows:', cleanedData.length, 'rows');
            
            // Clean individual field values
            cleanedData = cleanedData.map(row => {
              const cleaned = {};
              Object.keys(row).forEach(key => {
                const cleanKey = key.trim();
                let value = row[key];
                
                if (typeof value === 'string') {
                  value = value.trim();
                  
                  // Handle boolean conversions
                  if (['isVideo', 'isFeatured', 'isRestricted'].includes(cleanKey)) {
                    if (value === 'true' || value === '1' || value === 'TRUE' || value === 'True') {
                      value = true;
                    } else if (value === 'false' || value === '0' || value === 'FALSE' || value === 'False' || value === '') {
                      value = false;
                    }
                  }
                  
                  // Handle tags field
                  if (cleanKey === 'tags' && value && typeof value === 'string') {
                    value = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                  }
                }
                
                cleaned[cleanKey] = value;
              });
              return cleaned;
            });
            
            // Transform the cleaned data
            const transformedData = transformCSVData(cleanedData);
            console.log('CSV data loaded and transformed successfully:', transformedData.length, 'dashboards');
            
            // Log the first few transformed items for debugging
            console.log('First 3 transformed dashboards:', transformedData.slice(0, 3));
            console.log('Last 3 transformed dashboards:', transformedData.slice(-3));
            
            resolve(transformedData);
          },
          error: (error) => {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const loadDashboards = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Select data source based on configuration
        let dashboardData;
        
        if (DATA_SOURCE === 'sample') {
          // Development mode - use sample data
          dashboardData = sampleDashboards;
          console.log('Using sample data source');
        } 
        else if (DATA_SOURCE === 'csv') {
          // Production mode - use CSV data
          console.log('Loading data from market.csv...');
          dashboardData = await loadCSVData();
          console.log('Successfully loaded CSV data:', dashboardData.length, 'dashboards');
        }
        else if (DATA_SOURCE === 'real') {
          // Real data mode - use realData.js (if available)
          // When switching to real data, uncomment the import above and this line:
          //dashboardData = realDashboards;
          
          // For now, fallback to sample data if real data not available
          dashboardData = sampleDashboards;
          console.log('Real data source selected, but realData.js import is commented out. Using sample data as fallback.');
        }
        else {
          // Fallback to sample data
          dashboardData = sampleDashboards;
          console.log('Invalid DATA_SOURCE specified, using sample data as fallback');
        }
        
        setDashboards(dashboardData);
        
        // Set the first featured dashboard
        const featured = dashboardData.find(d => d.isFeatured);
        if (featured) {
          setFeaturedDashboard(featured);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load dashboards: ' + err.message);
        console.error('Error loading dashboards:', err);
        
        // Fallback to sample data on error
        setDashboards(sampleDashboards);
        const featured = sampleDashboards.find(d => d.isFeatured);
        if (featured) {
          setFeaturedDashboard(featured);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboards();
  }, [loadCSVData]);

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

  const searchDashboards = (query, filters = {}) => {
    console.log('🔍 DashboardContext searchDashboards called with:', { query, filters });
    console.log('📊 Total dashboards available:', dashboards.length);
    
    // If no query and no filters, return all dashboards
    if (!query && Object.keys(filters).length === 0) {
      console.log('📋 No filters applied, returning all dashboards');
      return dashboards;
    }

    const results = dashboards.filter(dashboard => {
      
      // Search by text query
      const matchesQuery = !query || 
        dashboard.title.toLowerCase().includes(query.toLowerCase()) ||
        dashboard.description.toLowerCase().includes(query.toLowerCase()) ||
        dashboard.owner.toLowerCase().includes(query.toLowerCase()) ||
        (dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(query.toLowerCase())) ||
        dashboard.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        (dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(query.toLowerCase())) ||
        (dashboard.category && dashboard.category.toLowerCase().includes(query.toLowerCase()));
      
      // Category search (exact match)
      const matchesCategory = !filters.category ||
        dashboard.category.toLowerCase() === filters.category.toLowerCase();
      
      // Tags search (exact match)
      const matchesTags = !filters.tags || 
        filters.tags.every(tag => 
          dashboard.tags.some(dashTag => 
            dashTag.toLowerCase() === tag.toLowerCase()
          )
        );
      
      // Data source search
      const matchesDataSource = !filters.dataSource ||
        (dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(filters.dataSource.toLowerCase()));
      
      // Owner/Organization search (handles both filters.owner and filters.organization)
      const matchesOwner = (!filters.owner && !filters.organization) ||
        (filters.owner && (
          dashboard.owner.toLowerCase().includes(filters.owner.toLowerCase()) ||
          (dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(filters.owner.toLowerCase()))
        )) ||
        (filters.organization && (
          dashboard.owner.toLowerCase().includes(filters.organization.toLowerCase()) ||
          (dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(filters.organization.toLowerCase()))
        ));
      
      // Dashboard type search
      const matchesDashboardType = !filters.dashboardType ||
        (dashboard.dashboardType && dashboard.dashboardType.toLowerCase() === filters.dashboardType.toLowerCase());
      
      // Access level search
      const matchesAccessLevel = !filters.accessLevel ||
        dashboard.accessLevel.toLowerCase() === filters.accessLevel.toLowerCase();
      
      return matchesQuery && matchesCategory && matchesTags && 
             matchesDataSource && matchesOwner && matchesDashboardType && matchesAccessLevel;
    });

    console.log('📋 Search results:', results.length);
    return results;
  };

  const advancedSearch = (searchCriteria) => {
    return dashboards.filter(dashboard => {
      // Title search (contains match)
      const matchesTitle = !searchCriteria.title || 
        dashboard.title.toLowerCase().includes(searchCriteria.title.toLowerCase());
      
      // Description search (contains match)
      const matchesDescription = !searchCriteria.description ||
        dashboard.description.toLowerCase().includes(searchCriteria.description.toLowerCase());
      
      // Category search (exact match)
      const matchesCategory = !searchCriteria.category ||
        dashboard.category.toLowerCase() === searchCriteria.category.toLowerCase();
      
      // Tags search (exact match)
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
             matchesDataSource && matchesOwner && matchesDashboardType && matchesAccessLevel && matchesCategory;
    });
  };

  // Determine current data source for debugging
  const getCurrentDataSource = () => {
    return DATA_SOURCE;
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
      dataSource: getCurrentDataSource() // For debugging/info purposes
    }}>
      {children}
    </DashboardContext.Provider>
  );
};