import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="/assets/videos/zen_sand_raking_1080k.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
      
      {/* Navbar with glass effect - exactly as per Figma design */}
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <a href="/">
              <img src="/assets/logo/logo-longHorizontal-light.svg" alt="Rachel Lee Patient Advocacy" />
            </a>
          </div>
          {/* Navigation Links - Using exact text from Figma */}
          <div className="nav-links">
            <a href="#link-one" className="label-label-lg">Link One</a>
            <a href="#link-two" className="label-label-lg">Link Two</a>
            <a href="#link-three" className="label-label-lg">Link Three</a>
            <a href="#link-four" className="label-label-lg">Link Four</a>
            <a href="#link-five" className="label-label-lg">Link Five</a>
          </div>
        </div>
      </nav>
      
      {/* Main header content */}
      <div className="content">
        <div className="column-one">
          <h1 className="heading-heading-7xl">Your Health. Your Voice. Your Advocate.</h1>
          <p className="body-body-lg">Navigating healthcare shouldn't be a solo journey. I provide personalized advocacy, education, and support to help you make informed decisions about your care.</p>
        </div>
        <div className="column-two">
          <div className="logo-large">
            <img src="/assets/logo/logo-stackedWordmark--light.svg" alt="Rachel Lee Patient Advocacy" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 