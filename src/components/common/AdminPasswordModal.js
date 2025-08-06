// src/components/common/AdminPasswordModal.js - Password protection for admin access
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock,
  faEye,
  faEyeSlash,
  faTimes,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const AdminPasswordModal = ({ isOpen, onClose, onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate a brief loading delay for security feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isValid = onAuthenticate(password);
    
    if (isValid) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Invalid admin password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        minWidth: '400px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: '#666',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '3rem',
            color: '#005ea2',
            marginBottom: '1rem'
          }}>
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#005ea2',
            marginBottom: '0.5rem',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            Admin Access Required
          </h2>
          
          <p style={{
            fontSize: '1rem',
            color: '#525252',
            margin: '0',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            Please enter the administrator password to access the admin console.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '8px',
              fontFamily: '"Open Sans", sans-serif'
            }}>
              Administrator Password
            </label>
            
            <div style={{
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                fontSize: '18px',
                zIndex: 2
              }}>
                <FontAwesomeIcon icon={faLock} />
              </div>
              
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 45px',
                  border: error ? '2px solid #d83933' : '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: '"Open Sans", sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!error) e.target.style.borderColor = '#005ea2';
                }}
                onBlur={(e) => {
                  if (!error) e.target.style.borderColor = '#e0e0e0';
                }}
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '0',
                  width: '20px',
                  height: '20px'
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            
            {error && (
              <p style={{
                color: '#d83933',
                fontSize: '14px',
                marginTop: '8px',
                marginBottom: '0',
                fontFamily: '"Open Sans", sans-serif'
              }}>
                {error}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#666',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                fontFamily: '"Open Sans", sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.borderColor = '#ccc';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              style={{
                padding: '12px 24px',
                backgroundColor: isLoading || !password.trim() ? '#ccc' : '#005ea2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading || !password.trim() ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                fontFamily: '"Open Sans", sans-serif',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseOver={(e) => {
                if (!isLoading && password.trim()) {
                  e.target.style.backgroundColor = '#004a82';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading && password.trim()) {
                  e.target.style.backgroundColor = '#005ea2';
                }
              }}
            >
              {isLoading ? 'Authenticating...' : 'Access Admin'}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e9ecef'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#666',
            margin: '0',
            textAlign: 'center',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            <FontAwesomeIcon icon={faLock} style={{ marginRight: '6px' }} />
            Admin access is restricted to authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordModal;