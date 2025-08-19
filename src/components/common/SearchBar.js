// src/components/common/SearchBar.js - Fixed button styling and filter toggle
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, initialValues = {}, placeholder = "Search dashboards, descriptions, or keywords..." }) => {
  const [searchQuery, setSearchQuery] = useState(initialValues.query || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [organization, setOrganization] = useState(initialValues.organization || '');
  const [filtersExpanded, setFiltersExpanded] = useState(false); // FIXED: Default to false

  // Check if any filters are active
  const hasActiveFilters = category !== '' || organization !== '';

  // Update internal state when initialValues change
  /* useEffect(() => {
    setSearchQuery(initialValues.query || '');
    setCategory(initialValues.category || '');
    setOrganization(initialValues.organization || '');
  }, [initialValues]); */

useEffect(() => {
  // Only update if there's actually a meaningful initial value from URL
  if (initialValues.query) {
    setSearchQuery(initialValues.query);
  }
  if (initialValues.category) {
    setCategory(initialValues.category);
  }
  if (initialValues.organization) {
    setOrganization(initialValues.organization);
  }
}, [initialValues.query, initialValues.category, initialValues.organization]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    // Auto-submit search when filter changes
    onSearch({
      query: searchQuery,
      category: value,
      organization: organization
    });
  };

  const handleOrganizationChange = (value) => {
    setOrganization(value);
    // Auto-submit search when filter changes
    onSearch({
      query: searchQuery,
      category: category,
      organization: value
    });
  };
  
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('🔍 Search submitted with query:', searchQuery);
  onSearch({
    query: searchQuery,
    category: category,
    organization: organization
  });
};

/*   const handleClearFilters = () => {
    setCategory('');
    setOrganization('');
    onSearch({
      query: searchQuery,
      category: '',
      organization: ''
    });
  }; */
  console.log('SearchBar render - searchQuery value:', searchQuery);
  return (
    <section className="search-section-mui search-section-homepage">
      <div className="search-container-mui">
        <form onSubmit={handleSubmit} className="search-form-mui">
          <div className="search-input-container-mui">
            {/* Search Input with Icon */}
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-input-icon" />
              <input
                type="text"
                placeholder={placeholder}
                className="search-input-mui"
                value={searchQuery}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔍 Typing:', newValue);
                  setSearchQuery(newValue);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
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
            
            {/* FIXED: Filter Toggle Button with proper class names */}
            <button
              type="button"
              className={`filter-toggle-button ${filtersExpanded ? 'active' : ''}`}
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
              {hasActiveFilters && <span className="filter-badge"></span>}
            </button>
            
            {/* FIXED: Search Submit Button with proper class names */}
            <button
              type="submit"
              className="search-submit-button"
            >
              <FontAwesomeIcon icon={faSearch} />
              Search
            </button>
          </div>
          
          {/* FIXED: Filters container - only show when expanded */}
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
              
{/*               {hasActiveFilters && (
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
              )} */}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;