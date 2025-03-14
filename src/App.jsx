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
              <h2 className="text-2xl font-bold mb-4">Button Component</h2>
              <p className="text-xl mb-8">A demonstration of the Button component in various configurations</p>
              <ButtonExample />
            </div>
          </section>
          
          <section id="services" className="section">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold mb-4">Our Services</h2>
              <p className="text-xl mb-8">Comprehensive support for your healthcare journey</p>
              {/* Service cards will be added here */}
            </div>
          </section>
          
          <section id="about" className="section">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold mb-4">About Rachel Lee</h2>
              <p className="text-xl mb-8">Dedicated to patient advocacy and healthcare navigation</p>
              {/* About content will be added here */}
            </div>
          </section>
          
          <section id="resources" className="section">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              <p className="text-xl mb-8">Helpful information to empower your healthcare decisions</p>
              {/* Resources content will be added here */}
            </div>
          </section>
          
          <section id="contact" className="section">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-xl mb-8">Get in touch for personalized support</p>
              {/* Contact form will be added here */}
            </div>
          </section>
        </main>
        
        <footer className="footer bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <p className="text-center">&copy; {new Date().getFullYear()} Rachel Lee Patient Advocacy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 