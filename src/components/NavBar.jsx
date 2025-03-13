import React, { useState, useEffect, useRef } from 'react';

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [isMobileConditionsOpen, setIsMobileConditionsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navLinksRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      // Close mobile menu when clicking outside
      if (
        isMenuOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      // Close conditions dropdown when clicking outside
      if (
        isConditionsOpen &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setIsConditionsOpen(false);
      }

      // Close mobile conditions dropdown when clicking outside
      if (
        isMobileConditionsOpen &&
        mobileDropdownRef.current && 
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileConditionsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isConditionsOpen, isMobileConditionsOpen]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsConditionsOpen(false);
        setIsMobileConditionsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Focus management for accessibility
    if (!isMenuOpen && menuRef.current) {
      // When opening menu, set focus to the first menu item after a short delay
      setTimeout(() => {
        const firstLink = menuRef.current.querySelector('a');
        if (firstLink) firstLink.focus();
      }, 100);
    }

    // Close conditions dropdown when closing menu
    if (isMenuOpen) {
      setIsMobileConditionsOpen(false);
    }
  };

  const toggleConditions = (e) => {
    e.preventDefault();
    setIsConditionsOpen(!isConditionsOpen);
  };

  const toggleMobileConditions = (e) => {
    e.preventDefault();
    setIsMobileConditionsOpen(!isMobileConditionsOpen);
  };

  const handleKeyDown = (e) => {
    // Handle arrow key navigation within the menu
    if (isMenuOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const menuLinks = Array.from(menuRef.current.querySelectorAll('a'));
      const currentIndex = menuLinks.indexOf(document.activeElement);
      
      if (e.key === 'ArrowDown') {
        const nextIndex = currentIndex < menuLinks.length - 1 ? currentIndex + 1 : 0;
        menuLinks[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuLinks.length - 1;
        menuLinks[prevIndex].focus();
      }
    }

    // Handle arrow key navigation within the conditions dropdown
    if (isConditionsOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const dropdownLinks = Array.from(dropdownRef.current.querySelectorAll('a'));
      const currentIndex = dropdownLinks.indexOf(document.activeElement);
      
      if (e.key === 'ArrowDown') {
        const nextIndex = currentIndex < dropdownLinks.length - 1 ? currentIndex + 1 : 0;
        dropdownLinks[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : dropdownLinks.length - 1;
        dropdownLinks[prevIndex].focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, isConditionsOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobile]);

  return (
    <nav 
      className={`w-full h-18 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white/10 backdrop-blur-md border border-white/30'} absolute top-0 left-0 right-0 z-[100] transition-all duration-300`}
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="w-full max-w-[1536px] h-[72px] md:h-[72px] mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex justify-start items-center flex-grow relative">
          <a href="/" aria-label="Rachel Lee Patient Advocacy Home">
            {isMobile ? (
              <img src="/assets/logo/logo-monogramMark-light.svg" alt="Rachel Lee Patient Advocacy" className="h-9 w-auto" />
            ) : (
              <img src="/assets/logo/logo-longHorizontal-light.svg" alt="Rachel Lee Patient Advocacy" className="h-[30px] w-auto" />
            )}
          </a>
        </div>
        
        {!isMobile && (
          <div className="flex justify-end items-center self-stretch flex-grow gap-8 px-4">
            <a 
              href="/about" 
              className="text-[var(--background-primary)] font-[var(--font-family-primary)] text-xl font-medium no-underline transition-colors duration-200 relative hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-[var(--foreground-information)] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              About
            </a>
            <a 
              href="/services"
              className="text-[var(--background-primary)] font-[var(--font-family-primary)] text-xl font-medium no-underline transition-colors duration-200 relative hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-[var(--foreground-information)] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              Services
            </a>
            <a 
              href="/resources"
              className="text-[var(--background-primary)] font-[var(--font-family-primary)] text-xl font-medium no-underline transition-colors duration-200 relative hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-[var(--foreground-information)] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              Resources
            </a>
            <a 
              href="/testimonials"
              className="text-[var(--background-primary)] font-[var(--font-family-primary)] text-xl font-medium no-underline transition-colors duration-200 relative hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-[var(--foreground-information)] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              Testimonials
            </a>
            <div className="relative inline-block" ref={dropdownRef}>
              <button 
                className="bg-transparent border-none text-[var(--background-primary)] font-[var(--font-family-primary)] text-xl font-medium p-0 cursor-pointer flex items-center gap-2 transition-colors duration-200 hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md"
                onClick={toggleConditions}
                aria-expanded={isConditionsOpen}
                aria-controls="conditions-dropdown"
              >
                Conditions 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isConditionsOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9L12 15L18 9" stroke="#030712" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              {isConditionsOpen && (
                <div 
                  className="absolute top-full left-0 min-w-[100px] bg-[rgba(248,229,237,0.4)] backdrop-blur-md rounded-lg shadow-sm p-6 z-[110] flex flex-col gap-4 overflow-hidden border border-white/30"
                  id="conditions-dropdown" 
                  role="menu"
                >
                  <a 
                    href="/conditions/ehlers-danlos" 
                    role="menuitem"
                    className="p-0 text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline whitespace-nowrap hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md"
                  >
                    Ehler Danlos
                  </a>
                  <a 
                    href="/conditions/pots" 
                    role="menuitem"
                    className="p-0 text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline whitespace-nowrap hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md"
                  >
                    POTS
                  </a>
                  <a 
                    href="/conditions/mast-cell" 
                    role="menuitem"
                    className="p-0 text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline whitespace-nowrap hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md"
                  >
                    Mast Cell
                  </a>
                  <a 
                    href="/conditions/autism" 
                    role="menuitem"
                    className="p-0 text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline whitespace-nowrap hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md"
                  >
                    Autism
                  </a>
                  <a 
                    href="/conditions/other" 
                    role="menuitem"
                    className="p-0 text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline whitespace-nowrap hover:text-[var(--foreground-information)] focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md"
                  >
                    Other
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        
        {isMobile && (
          <button 
            ref={buttonRef}
            className="bg-transparent border-none cursor-pointer p-3 z-[110] transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--foreground-information)] focus-visible:outline-offset-2 focus-visible:rounded-md" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--background-primary)]">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--background-primary)]">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        )}
      </div>
      
      {isMobile && (
        <div 
          id="mobile-menu"
          ref={menuRef}
          className={`fixed top-0 right-0 bottom-0 w-full md:w-80 bg-white/95 backdrop-blur-md shadow-lg z-[100] transform transition-transform duration-300 ease-in-out pt-20 px-4 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-hidden={!isMenuOpen}
          role="menu"
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col gap-6 text-center">
              <a 
                href="/about"
                className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-xl font-medium no-underline py-2"
              >
                About
              </a>
              <a 
                href="/services"
                className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-xl font-medium no-underline py-2"
              >
                Services
              </a>
              <a 
                href="/resources"
                className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-xl font-medium no-underline py-2"
              >
                Resources
              </a>
              <a 
                href="/testimonials"
                className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-xl font-medium no-underline py-2"
              >
                Testimonials
              </a>
              
              <div className="relative" ref={mobileDropdownRef}>
                <button 
                  onClick={toggleMobileConditions}
                  className="w-full bg-transparent border-none text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-xl font-medium py-2 flex items-center justify-center gap-2"
                  aria-expanded={isMobileConditionsOpen}
                >
                  Conditions
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`transition-transform duration-200 ${isMobileConditionsOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9L12 15L18 9"></path>
                  </svg>
                </button>
                
                {isMobileConditionsOpen && (
                  <div className="flex flex-col gap-2 mt-2 bg-[rgba(248,229,237,0.8)] p-4 rounded-lg">
                    <a 
                      href="/conditions/ehlers-danlos"
                      className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline py-1"
                    >
                      Ehler Danlos
                    </a>
                    <a 
                      href="/conditions/pots"
                      className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline py-1"
                    >
                      POTS
                    </a>
                    <a 
                      href="/conditions/mast-cell"
                      className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline py-1"
                    >
                      Mast Cell
                    </a>
                    <a 
                      href="/conditions/autism"
                      className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline py-1"
                    >
                      Autism
                    </a>
                    <a 
                      href="/conditions/other"
                      className="text-[var(--background-primary-dark)] font-[var(--font-family-primary)] text-lg font-medium no-underline py-1"
                    >
                      Other
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 