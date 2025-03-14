import React from 'react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header 
      className="relative w-full min-h-screen flex flex-col items-center bg-transparent overflow-hidden" 
      role="banner"
    >
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden">
        <video 
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
        >
          <source src="/assets/videos/zen_sand_raking_1080k.mp4" type="video/mp4" />
          <source src="/assets/videos/zen_sand_raking_1080k.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <NavBar />
      
      {/* Main content section */}
      <div className="w-full max-w-7xl h-screen flex relative p-12 md:p-16">
        {/* Left column with heading */}
        <div className="absolute top-[30%] left-4 md:left-16 w-full md:w-1/2 flex flex-col justify-start self-start">
          <h1 className="font-sans font-semibold text-4xl md:text-6xl text-black flex flex-col m-0 leading-tight">
            <span className="block">Your Health.</span>
            <span className="block">Your Voice.</span>
            <span className="block">Your Advocate.</span>
          </h1>
        </div>
        
        {/* Right column with logo */}
        <div className="absolute bottom-4 md:bottom-16 right-4 md:right-16 flex flex-col items-end">
          <img 
            src="/assets/logo/logo-stackedWordmark--light.svg" 
            alt="Rachel Lee Patient Advocacy" 
            className="max-w-[200px] md:max-w-[320px] h-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 