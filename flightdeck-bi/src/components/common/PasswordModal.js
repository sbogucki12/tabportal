import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faKey } from '@fortawesome/free-solid-svg-icons';
import '../../styles/PasswordModal.css';

const PasswordModal = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isAuthenticated = onAuthenticate(password);
    
    if (!isAuthenticated) {
      setError(true);
      // Clear error after 3 seconds
      setTimeout(() => setError(false), 3000);
    }
  };
  
  return (
    <div className="modal-overlay" style={{
      backgroundImage: "url('/assets/images/placeholder-images/aviation-bg.jpg')"
    }}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-logo">
            <FontAwesomeIcon icon={faChartLine} className="modal-logo-icon" />
            <h1 className="modal-logo-text">
              Flight<span className="modal-logo-accent">Deck</span> BI
            </h1>
          </div>
          <p className="modal-subtitle">Aviation Intelligence Hub</p>
        </div>
        
        <div className="modal-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Site password"
                className={`form-input ${error ? 'error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <div className="error-message">
                  Incorrect password. Please try again.
                </div>
              )}
            </div>
            
            <button type="submit" className="modal-button">
              <FontAwesomeIcon icon={faKey} className="modal-button-icon" />
              Access Dashboard
            </button>
          </form>
        </div>
        
        <div className="modal-footer">
          <p>
            Authorized personnel only. Contact your administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;