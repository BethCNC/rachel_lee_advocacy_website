import React from 'react';
import NavBar from './NavBar';
import './Header.css';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="/assets/videos/zen_sand_raking_1080k.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
      <NavBar />
      <div className="content">
        <div className="column-one">
          <h1 className="heading-primary">
            Your Health.
            <br />
            Your Voice.
            <br />
            Your Advocate.
          </h1>
          <div className="cta-buttons">
            <a href="#services" className="btn-primary">Our Services</a>
            <a href="#contact" className="btn-secondary">Get in Touch</a>
          </div>
        </div>
        <div className="column-two">
          <img 
            src="/assets/logo/logo-stackedWordmark--light.svg" 
            alt="Rachel Lee Patient Advocacy" 
            className="wordmark"
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 