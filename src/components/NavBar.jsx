import React, { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="container">
        <div className="logo">
          <img src="/assets/logo/logo-longHorizontal-light.svg" alt="Rachel Lee Patient Advocacy" />
        </div>
        
        {!isMobile && (
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#resources">Resources</a>
            <a href="#contact" className="btn-contact">Contact</a>
          </div>
        )}
        
        {isMobile && (
          <button 
            className="mobile-menu-button" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        )}
      </div>
      
      {isMobile && isMenuOpen && (
        <div className="mobile-menu">
          <div className="nav-links nav-open">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#resources">Resources</a>
            <a href="#contact" className="btn-contact">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 