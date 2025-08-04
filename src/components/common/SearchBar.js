import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [organization, setOrganization] = useState('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query: searchQuery,
      category,
      organization
    });
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
                  onChange={(e) => setOrganization(e.target.value)}
                >
                  <option value="">All Organizations</option>
                  <option value="AVS">AVS</option>
                  <option value="ATO">ATO</option>
                  <option value="ARP">ARP</option>
                  <option value="AST">AST</option>
                  <option value="AFN">AFN</option>
                  <option value="AGC">AGC</option>
                  <option value="ANG">ANG</option>
                  <option value="APL">APL</option>
                  <option value="AIT">AIT</option>
                  <option value="ASH">ASH</option>
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