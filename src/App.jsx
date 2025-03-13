import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import ButtonExample from './components/ButtonExample';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content mt-20">
          {/* Button Example for demonstration */}
          <section id="button-example" className="section">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-heading-2xl mb-4">Button Component</h2>
              <p className="text-body-xl mb-8">A demonstration of the Button component in various configurations</p>
              <ButtonExample />
            </div>
          </section>
          
          <section id="services" className="section">
            <div className="container">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">Comprehensive support for your healthcare journey</p>
              {/* Service cards will be added here */}
            </div>
          </section>
          
          <section id="about" className="section">
            <div className="container">
              <h2 className="section-title">About Rachel Lee</h2>
              <p className="section-subtitle">Dedicated to patient advocacy and healthcare navigation</p>
              {/* About content will be added here */}
            </div>
          </section>
          
          <section id="resources" className="section">
            <div className="container">
              <h2 className="section-title">Resources</h2>
              <p className="section-subtitle">Helpful information to empower your healthcare decisions</p>
              {/* Resources content will be added here */}
            </div>
          </section>
          
          <section id="contact" className="section">
            <div className="container">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">Get in touch for personalized support</p>
              {/* Contact form will be added here */}
            </div>
          </section>
        </main>
        
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Rachel Lee Patient Advocacy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 