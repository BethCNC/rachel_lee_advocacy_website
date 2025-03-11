import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header" role="banner">
      {/* Video Background */}
      <div className="video-background" aria-hidden="true">
        <video autoPlay muted loop playsInline>
          <source src="/assets/videos/zen_sand_raking_1080k.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
      
      {/* Navbar with glass effect - exactly as per Figma design */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="Rachel Lee Patient Advocacy home">
            <img src="/assets/logo/logo-longHorizontal-light.svg" alt="Rachel Lee Patient Advocacy" />
          </Link>
          
          {/* Navigation Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'nav-open' : ''}`} role="navigation">
            <Link to="/about" className="label-label-lg">About</Link>
            <Link to="/services" className="label-label-lg">Services</Link>
            <Link to="/resources" className="label-label-lg">Resources</Link>
            <Link to="/success-stories" className="label-label-lg">Success Stories</Link>
            <Link to="/blog" className="label-label-lg">Blog</Link>
            <Link to="/contact" className="label-label-lg">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>
      
      {/* Main header content */}
      <div className="content">
        <div className="column-one">
          <h1 className="heading-heading-7xl">Your Health. Your Voice. Your Advocate.</h1>
          <p className="body-body-lg">Navigating healthcare shouldn't be a solo journey. I provide personalized advocacy, education, and support to help you make informed decisions about your care.</p>
          <div className="header-links">
            <Link to="/services" className="label-label-lg primary-link">Explore Services</Link>
            <Link to="/contact" className="label-label-lg">Schedule Consultation</Link>
          </div>
        </div>
        <div className="column-two">
          <div className="logo-large" aria-hidden="true">
            <img src="/assets/logo/logo-stackedWordmark--light.svg" alt="" role="presentation" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 