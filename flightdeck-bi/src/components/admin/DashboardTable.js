import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faStar, 
  faSearch,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { DashboardContext } from '../../context/DashboardContext';
import '../../styles/DashboardTable.css';

const DashboardTable = () => {
  const { dashboards, deleteDashboard, setAsFeatured } = useContext(DashboardContext);
  const [search, setSearch] = useState('');
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dashboardsPerPage = 5;
  
  useEffect(() => {
    const results = dashboards.filter(dashboard => 
      dashboard.title.toLowerCase().includes(search.toLowerCase()) ||
      dashboard.owner.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDashboards(results);
    setCurrentPage(1); // Reset to first page on search
  }, [dashboards, search]);
  
  // Pagination
  const indexOfLastDashboard = currentPage * dashboardsPerPage;
  const indexOfFirstDashboard = indexOfLastDashboard - dashboardsPerPage;
  const currentDashboards = filteredDashboards.slice(indexOfFirstDashboard, indexOfLastDashboard);
  const totalPages = Math.ceil(filteredDashboards.length / dashboardsPerPage);
  
  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle dashboard deletion
  const handleDeleteConfirm = () => {
    if (showDeleteConfirm) {
      deleteDashboard(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };
  
  // Handle set as featured
  const handleSetFeatured = (id) => {
    setAsFeatured(id);
  };
  
  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">Manage Dashboards</h3>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Search dashboards..."
            className="form-input search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      
      {filteredDashboards.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No dashboards found</p>
          <p className="empty-state-subtitle">Try adjusting your search or add a new dashboard</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th width="80">Image</th>
                  <th>Title</th>
                  <th>Owner</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th width="100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDashboards.map(dashboard => (
                  <tr key={dashboard.id}>
                    <td>
                      {dashboard.isVideo ? (
                        <video 
                          src={dashboard.thumbnailUrl} 
                          alt={dashboard.title} 
                          className="card-image"
                          muted
                          autoPlay
                          loop
                          playsInline
                        />
                      ) : (
                        <img 
                          src={dashboard.thumbnailUrl} 
                          alt={dashboard.title} 
                          className="card-image"
                        />
                      )}
                      {/*<img 
                        src={dashboard.thumbnailUrl} 
                        alt={dashboard.title} 
                        className="thumbnail"
                      />*/}
                    </td>
                    <td>{dashboard.title}</td>
                    <td>{dashboard.ownerAbbr}</td>
                    <td>{formatDate(dashboard.createdAt)}</td>
                    <td>
                      {dashboard.isFeatured ? (
                        <span className="status-badge status-featured">Featured</span>
                      ) : (
                        <span className="status-badge status-published">Published</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="action-button edit-button"
                          title="Edit Dashboard"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        
                        <button 
                          className="action-button feature-button"
                          title={dashboard.isFeatured ? 'Currently Featured' : 'Set as Featured'}
                          onClick={() => handleSetFeatured(dashboard.id)}
                          disabled={dashboard.isFeatured}
                        >
                          <FontAwesomeIcon icon={dashboard.isFeatured ? faCheck : faStar} />
                        </button>
                        
                        <button 
                          className="action-button delete-button"
                          title="Delete Dashboard"
                          onClick={() => setShowDeleteConfirm(dashboard.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  className={`page-button ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">Confirm Deletion</h3>
            <p className="modal-content">
              Are you sure you want to delete this dashboard? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--error-red)' }}
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;