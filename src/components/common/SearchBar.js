// src/components/common/SearchBar.js - Updated with new category structure
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [searchQuery, setSearchQuery] = useState(initialValues.query || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [organization, setOrganization] = useState(initialValues.organization || '');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check if any filters are active
  const hasActiveFilters = category !== '' || organization !== '';

  // Update state when initialValues change (for URL parameters)
  useEffect(() => {
    setSearchQuery(initialValues.query || '');
    setCategory(initialValues.category || '');
    setOrganization(initialValues.organization || '');
  }, [initialValues]);

  // Handle category dropdown change - redirect to AllDashboards with filter
  const handleCategoryChange = (selectedCategory) => {
    console.log('Category selected:', selectedCategory);
    setCategory(selectedCategory);
    
    if (selectedCategory) {
      // Special handling for People - redirect to personnel page
      if (selectedCategory === 'People') {
        navigate('/personnel');
        return;
      }
      
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
    onSearch({
      query: searchQuery,
      category: category,
      organization: organization
    });
  };

  const handleClearFilters = () => {
    setCategory('');
    setOrganization('');
    onSearch({
      query: searchQuery,
      category: '',
      organization: ''
    });
  };

  return (
    <section className="search-section-mui search-section-homepage">
      <div className="search-container-mui">
        <form onSubmit={handleSubmit} className="search-form-mui">
          <div className="search-input-container-mui">
            {/* Search Input with Icon - RESTORED ORIGINAL STRUCTURE */}
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
              className={`filter-toggle-button ${filtersExpanded ? 'active' : ''} ${hasActiveFilters ? 'active' : ''}`}
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
                  <option value="Aeronautical">Aeronautical</option>
                  <option value="Aircraft">Aircraft</option>
                  <option value="Airport">Airport</option>
                  <option value="Airspace">Airspace</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Finance">Finance</option>
                  <option value="Flight">Flight</option>
                  <option value="Geospatial">Geospatial</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="International">International</option>
                  <option value="People">People</option>
                  <option value="Safety">Safety</option>
                  <option value="Weather">Weather</option>
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
                  <option value="ANG">NextGen (ANG)</option>
                  <option value="AGC">General Counsel (AGC)</option>
                  <option value="AGI">Government and Industry Affairs (AGI)</option>
                  <option value="AFN">Finance and Management (AFN)</option>
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