import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="main-footer">
      <div className="footer-text">
        FlightDeck BI - Aviation Intelligence Hub {currentYear}. 
        This platform provides access to aviation business intelligence dashboards for authorized personnel only.
      </div>
    </footer>
  );
};

export default Footer;