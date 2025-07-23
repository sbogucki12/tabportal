import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SearchFilter.css';

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [searchQuery, setSearchQuery] = useState(initialValues.query || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [organization, setOrganization] = useState(initialValues.organization || '');
  const location = useLocation();
  
  // Effect to handle URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const organizationParam = queryParams.get('organization');
    
    if (categoryParam) {
      setCategory(categoryParam);
    }
    
    if (organizationParam) {
      setOrganization(organizationParam);
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
    }
    if (initialValues.organization) {
      setOrganization(initialValues.organization);
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
  
  return (
    <section className="search-section">
      <div className="search-container">
        <h2 className="search-title">Find Aviation Intelligence</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search dashboards..."
              className="form-input search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <select
              className="form-select search-select"
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
            
            <select
              className="form-select search-select"
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
            
            <button
              type="submit"
              className="search-button"
            >
              <FontAwesomeIcon icon={faSearch} />
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;