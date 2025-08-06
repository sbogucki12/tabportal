// src/components/common/SearchBar.js - Improved with proper category filtering
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [organization, setOrganization] = useState('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const hasActiveFilters = category || organization;
  
  const handleClearFilters = () => {
    setCategory('');
    setOrganization('');
    setSearchQuery('');
    onSearch({
      query: '',
      category: '',
      organization: ''
    });
  };
  
  // Effect to handle initial values
  useEffect(() => {
    if (initialValues.category) {
      setCategory(initialValues.category);
    }
    if (initialValues.organization) {
      setOrganization(initialValues.organization);
    }
    if (initialValues.query) {
      setSearchQuery(initialValues.query);
    }
  }, [initialValues]);
  
  // Effect to handle session storage
  useEffect(() => {
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    if (selectedCategory) {
      setCategory(selectedCategory);
      
      // Trigger search with category from session storage
      onSearch({
        query: searchQuery,
        category: selectedCategory,
        organization: organization
      });
      
      // Don't remove session storage here - the AllDashboardsPage will handle that
    }
  }, [onSearch, searchQuery, organization]);

  // Handle category dropdown change - redirect to AllDashboards with filter
  const handleCategoryChange = (selectedCategory) => {
    console.log('Category selected:', selectedCategory);
    setCategory(selectedCategory);
    
    if (selectedCategory) {
      // If we're not already on AllDashboards page, navigate there with category filter
      if (location.pathname !== '/all-dashboards') {
        navigate(`/all-dashboards?category=${encodeURIComponent(selectedCategory)}`);
      } else {
        // If we're already on AllDashboards, just trigger the search
        onSearch({
          query: searchQuery,
          category: selectedCategory,
          organization: organization
        });
      }
    } else {
      // Clear category filter
      onSearch({
        query: searchQuery,
        category: '',
        organization: organization
      });
    }
  };

  // Handle organization dropdown change - redirect to AllDashboards with filter  
  const handleOrganizationChange = (selectedOrganization) => {
    console.log('Organization selected:', selectedOrganization);
    setOrganization(selectedOrganization);
    
    if (selectedOrganization) {
      // If we're not already on AllDashboards page, navigate there with organization filter
      if (location.pathname !== '/all-dashboards') {
        navigate(`/all-dashboards?organization=${encodeURIComponent(selectedOrganization)}`);
      } else {
        // If we're already on AllDashboards, just trigger the search
        onSearch({
          query: searchQuery,
          category: category,
          organization: selectedOrganization
        });
      }
    } else {
      // Clear organization filter
      onSearch({
        query: searchQuery,
        category: category,
        organization: ''
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If we have search terms or filters, redirect to AllDashboards with all parameters
    if (searchQuery || category || organization) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('query', searchQuery);
      if (category) params.set('category', category);
      if (organization) params.set('organization', organization);
      
      if (location.pathname !== '/all-dashboards') {
        navigate(`/all-dashboards?${params.toString()}`);
      } else {
        // If we're already on AllDashboards, just trigger the search
        onSearch({
          query: searchQuery,
          category,
          organization
        });
      }
    }
  };
    
  return (
    <section className="search-section-mui search-section-homepage">
      <div className="search-container-mui">
        <form onSubmit={handleSubmit} className="search-form-mui">
          <div className="search-input-container-mui">
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-input-icon" />
              <input
                type="text"
                placeholder="Search dashboards, descriptions, or keywords..."
                className="search-input-mui"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-input-button"
                  onClick={() => setSearchQuery('')}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
            
            <button
              type="button"
              className={`filter-toggle-button ${hasActiveFilters ? 'active' : ''}`}
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
              {hasActiveFilters && <span className="filter-badge"></span>}
            </button>
            
            <button
              type="submit"
              className="search-submit-button"
            >
              <FontAwesomeIcon icon={faSearch} />
              Search
            </button>
          </div>
          
          <div className={`filters-container ${filtersExpanded ? 'expanded' : ''}`}>
            <div className="filters-grid">
              <div className="filter-group-mui">
                <label className="filter-label-mui" htmlFor="category-select">
                  Category
                </label>
                <select
                  id="category-select"
                  className="filter-select-mui"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Aviation Safety">Aviation Safety</option>
                  <option value="Personnel / HR">Personnel / HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Aviation Operations">Aviation Operations</option>
                  <option value="IT">IT</option>
                  <option value="Oversight / Compliance & Enforcement">Oversight / Compliance & Enforcement</option>
                  <option value="Air Traffic">Air Traffic</option>
                  <option value="Airports">Airports</option>
                  <option value="Weather">Weather</option>
                  <option value="Geospatial / Maps / Charts">Geospatial / Maps / Charts</option>
                </select>
              </div>
              
              <div className="filter-group-mui">
                <label className="filter-label-mui" htmlFor="organization-select">
                  Organization
                </label>
                <select
                  id="organization-select"
                  className="filter-select-mui"
                  value={organization}
                  onChange={(e) => handleOrganizationChange(e.target.value)}
                >
                  <option value="">All Organizations</option>
                  <option value="AVS">Aviation Safety (AVS)</option>
                  <option value="ATO">Air Traffic Organization (ATO)</option>
                  <option value="ARP">Airports (ARP)</option>
                  <option value="AST">Commercial Space Transportation (AST)</option>
                  <option value="AFN">NextGen (AFN)</option>
                  <option value="AGC">General Counsel (AGC)</option>
                  <option value="ANG">Government and Industry Affairs (ANG)</option>
                  <option value="APL">Policy, International Affairs and Environment (APL)</option>
                  <option value="AIT">Information and Technology (AIT)</option>
                  <option value="ASH">Security and Hazardous Materials Safety (ASH)</option>
                </select>
              </div>
              
              {hasActiveFilters && (
                <div className="filter-actions">
                  <button
                    type="button"
                    className="clear-filters-button"
                    onClick={handleClearFilters}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;