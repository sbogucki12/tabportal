import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, initialValues = {}, hideHeader = false }) => {
  const [searchQuery, setSearchQuery] = useState(initialValues.query || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [organization, setOrganization] = useState(initialValues.organization || '');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const location = useLocation();
  
  // Effect to handle URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const organizationParam = queryParams.get('organization');
    
    if (categoryParam) {
      setCategory(categoryParam);
      setFiltersExpanded(true);
    }
    
    if (organizationParam) {
      setOrganization(organizationParam);
      setFiltersExpanded(true);
    }
    
    // If we have params in the URL, trigger the search
    if (categoryParam || organizationParam) {
      onSearch({
        query: searchQuery,
        category: categoryParam || '',
        organization: organizationParam || ''
      });
    }
  }, [location.search, onSearch, searchQuery]);
  
  // Effect to handle initialValues prop changes
  useEffect(() => {
    if (initialValues.category) {
      setCategory(initialValues.category);
      setFiltersExpanded(true);
    }
    if (initialValues.organization) {
      setOrganization(initialValues.organization);
      setFiltersExpanded(true);
    }
    if (initialValues.query) {
      setSearchQuery(initialValues.query);
    }
  }, [initialValues]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query: searchQuery,
      category,
      organization
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategory('');
    setOrganization('');
    onSearch({
      query: '',
      category: '',
      organization: ''
    });
  };

  const hasActiveFilters = searchQuery || category || organization;
  
  return (
    <section className="search-section-mui">
      <div className="search-container-mui">
        {/* Conditionally render header based on hideHeader prop */}
        {!hideHeader && (
          <div className="search-header">
            <h2 className="search-title-mui">Find Aviation Intelligence</h2>
            <p className="search-subtitle">Search through our comprehensive dashboard collection</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="search-form-mui">
          {/* Main Search Input */}
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
              className={`filter-toggle-button ${filtersExpanded ? 'active' : ''}`}
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
          
          {/* Expandable Filters */}
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
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Safety">Safety</option>
                  <option value="Operations">Operations</option>
                  <option value="Air Traffic">Air Traffic</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Financial">Financial</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Risk Management">Risk Management</option>
                  <option value="Airports">Airports</option>
                  <option value="Regulatory">Regulatory</option>
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
                  onChange={(e) => setOrganization(e.target.value)}
                >
                  <option value="">All Organizations</option>
                  <option value="FAA Headquarters">FAA Headquarters</option>
                  <option value="Air Traffic Organization">Air Traffic Organization</option>
                  <option value="Aviation Safety">Aviation Safety</option>
                  <option value="Airports">Airports</option>
                  <option value="Security & Hazardous Materials">Security & Hazardous Materials</option>
                  <option value="Policy & Innovation">Policy & Innovation</option>
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