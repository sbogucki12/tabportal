// src/context/DashboardContext.js - Enhanced search algorithm with ownerAbbr fix
import React, { createContext, useState, useEffect } from 'react';
import { sampleDashboards } from '../data/sampleData';

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
        
        setDashboards(sampleDashboards);
        
        // Set the first featured dashboard
        const featured = sampleDashboards.find(d => d.isFeatured);
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

  /**
   * Enhanced search algorithm that searches across multiple fields with improved scoring
   * @param {string} query - Text search query
   * @param {object} filters - Filter object with category, organization, etc.
   * @returns {Array} - Filtered and scored dashboard results
   */
  const searchDashboards = (query, filters = {}) => {
    console.log('🔍 Search called with:', { query, filters });
    console.log('📊 Total dashboards:', dashboards.length);
    
    // If no query and no filters, return all dashboards
    if (!query && Object.keys(filters).length === 0) {
      console.log('✅ No search/filters - returning all dashboards');
      return dashboards;
    }

    const normalizedQuery = query ? query.toLowerCase().trim() : '';
    console.log('🔤 Normalized query:', normalizedQuery);
    
    const results = dashboards.filter(dashboard => {
      // === TEXT SEARCH (Lexical Search) ===
      let matchesQuery = true;
      
      if (normalizedQuery) {
        // FIXED: Create searchable text from multiple fields INCLUDING ownerAbbr
        const searchableFields = [
          dashboard.title,
          dashboard.description,
          dashboard.dataSource,
          dashboard.owner,
          dashboard.ownerAbbr,     // ✅ FIXED: Added this missing field!
          dashboard.contactName,
          dashboard.dashboardType,
          ...dashboard.tags
        ].filter(Boolean); // Remove any undefined/null values
        
        // Split query into words for better matching
        const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
        console.log('🔎 Query words:', queryWords);
        
        // Check if ALL query words are found somewhere in the searchable fields
        matchesQuery = queryWords.every(word => {
          const found = searchableFields.some(field => 
            field && field.toLowerCase().includes(word)
          ) || 
          // Also check individual tags for exact matches
          dashboard.tags.some(tag => 
            tag.toLowerCase().includes(word)
          ) ||
          // Check data source specifically
          (dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(word)) ||
          // ✅ FIXED: Also explicitly check ownerAbbr
          (dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(word));
          
          if (!found) {
            console.log(`❌ Word "${word}" not found in dashboard:`, dashboard.title);
            console.log('   Searched in:', {
              title: dashboard.title,
              owner: dashboard.owner,
              ownerAbbr: dashboard.ownerAbbr,
              tags: dashboard.tags,
              dataSource: dashboard.dataSource
            });
          } else {
            console.log(`✅ Word "${word}" FOUND in dashboard:`, dashboard.title);
          }
          return found;
        });
        
        // Boost relevance for exact title matches
        const titleMatch = dashboard.title.toLowerCase().includes(normalizedQuery);
        const tagMatch = dashboard.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
        const dataSourceMatch = dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(normalizedQuery);
        const ownerMatch = dashboard.owner.toLowerCase().includes(normalizedQuery);
        const ownerAbbrMatch = dashboard.ownerAbbr && dashboard.ownerAbbr.toLowerCase().includes(normalizedQuery);
        
        // If we have matches in important fields, prioritize them
        if (titleMatch || tagMatch || dataSourceMatch || ownerMatch || ownerAbbrMatch) {
          matchesQuery = true;
        }
        
        if (matchesQuery) {
          console.log('✅ Query match for:', dashboard.title);
        }
      }

      // === CATEGORY FILTER ===
      const matchesCategory = !filters.category || 
        dashboard.tags.some(tag => 
          tag.toLowerCase() === filters.category.toLowerCase()
        );
      
      if (filters.category && !matchesCategory) {
        console.log(`❌ Category "${filters.category}" not found in dashboard:`, dashboard.title, 'Tags:', dashboard.tags);
      }

      // === ORGANIZATION FILTER ===
      // Check both ownerAbbr and full owner name for flexibility
      const matchesOrg = !filters.organization || 
        dashboard.ownerAbbr === filters.organization ||
        dashboard.owner === filters.organization ||
        dashboard.owner.toLowerCase().includes(filters.organization.toLowerCase());

      if (filters.organization && !matchesOrg) {
        console.log(`❌ Organization "${filters.organization}" not found in dashboard:`, dashboard.title, 'Owner:', dashboard.owner, 'OwnerAbbr:', dashboard.ownerAbbr);
      }

      // === DATA SOURCE FILTER (if we add this to UI later) ===
      const matchesDataSource = !filters.dataSource ||
        (dashboard.dataSource && dashboard.dataSource.toLowerCase().includes(filters.dataSource.toLowerCase()));

      // === DASHBOARD TYPE FILTER (if we add this to UI later) ===
      const matchesDashboardType = !filters.dashboardType ||
        (dashboard.dashboardType && dashboard.dashboardType.toLowerCase() === filters.dashboardType.toLowerCase());

      const finalMatch = matchesQuery && matchesCategory && matchesOrg && matchesDataSource && matchesDashboardType;
      
      if (finalMatch) {
        console.log('✅ Dashboard matches all criteria:', dashboard.title);
      }
      
      return finalMatch;
    }).sort((a, b) => {
      // === RELEVANCE SCORING for search results ===
      if (!normalizedQuery) return 0; // No sorting if no text query
      
      let scoreA = 0;
      let scoreB = 0;
      
      // Score boost for title matches (highest priority)
      if (a.title.toLowerCase().includes(normalizedQuery)) scoreA += 100;
      if (b.title.toLowerCase().includes(normalizedQuery)) scoreB += 100;
      
      // Score boost for exact tag matches (high priority)
      const tagMatchA = a.tags.some(tag => tag.toLowerCase() === normalizedQuery);
      const tagMatchB = b.tags.some(tag => tag.toLowerCase() === normalizedQuery);
      if (tagMatchA) scoreA += 75;
      if (tagMatchB) scoreB += 75;
      
      // Score boost for partial tag matches (medium priority)
      const tagPartialA = a.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
      const tagPartialB = b.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
      if (tagPartialA && !tagMatchA) scoreA += 50;
      if (tagPartialB && !tagMatchB) scoreB += 50;
      
      // ✅ FIXED: Score boost for owner abbreviation matches (high priority)
      if (a.ownerAbbr && a.ownerAbbr.toLowerCase().includes(normalizedQuery)) scoreA += 80;
      if (b.ownerAbbr && b.ownerAbbr.toLowerCase().includes(normalizedQuery)) scoreB += 80;
      
      // Score boost for owner name matches (medium priority)
      if (a.owner.toLowerCase().includes(normalizedQuery)) scoreA += 60;
      if (b.owner.toLowerCase().includes(normalizedQuery)) scoreB += 60;
      
      // Score boost for data source matches (medium priority)
      if (a.dataSource && a.dataSource.toLowerCase().includes(normalizedQuery)) scoreA += 40;
      if (b.dataSource && b.dataSource.toLowerCase().includes(normalizedQuery)) scoreB += 40;
      
      // Score boost for description matches (lower priority)
      if (a.description.toLowerCase().includes(normalizedQuery)) scoreA += 20;
      if (b.description.toLowerCase().includes(normalizedQuery)) scoreB += 20;
      
      // Score boost for view count (popularity)
      scoreA += Math.log10(a.views + 1);
      scoreB += Math.log10(b.views + 1);
      
      // Sort by relevance score (descending)
      return scoreB - scoreA;
    });
    
    console.log('📋 Search results:', results.length, 'dashboards found');
    console.log('📋 Result titles:', results.map(d => d.title));
    
    return results;
  };

  /**
   * Advanced search for specific field targeting (future enhancement)
   * @param {object} searchCriteria - Object with field-specific search terms
   * @returns {Array} - Filtered dashboard results
   */
  const advancedSearch = (searchCriteria = {}) => {
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
      advancedSearch
    }}>
      {children}
    </DashboardContext.Provider>
  );
};