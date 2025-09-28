import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// A component to render a placeholder "logo" with a symbol
const CompanyLogo = ({ symbol, colorClass }) => (
  <div className="relative w-16 h-16 flex-shrink-0"> {/* Adjusted logo size */}
    {/* Attractive Gradient Background for the logo */}
    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center shadow-lg transform rotate-2 scale-105`}></div>
    {/* White/Main Logo Area - Using a simple symbol to represent the brand */}
    <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center shadow-inner border border-gray-100">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 text-gray-800" // Adjusted SVG size
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        {/* Placeholder SVG paths for a professional look */}
        {symbol === 'Amazon' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H8v-8h3v8zm4 0h-3v-8h3v8z"/>}
        {symbol === 'Google' && <path d="M21.37 12.87c.07-.36.13-.73.13-1.1s-.06-.74-.13-1.1H12v2.2h4.94c-.18 1.05-.75 1.98-1.7 2.61v1.65h2.15c1.33-1.22 2.1-3 2.1-4.86z"/>}
        {symbol === 'Microsoft' && <path d="M11.5 22h-3v-3h3v3zm1-12h-3v3h3v-3zm1 7h-3v3h3v-3zm1-10h-3v3h3v-3zm1-7h-3v3h3v-3zm1 7h-3v3h3v-3zm1 7h-3v3h3v-3z"/>}
        {symbol === 'Meta' && <path d="M18.89 12.01l-1.92 5.05c-.06.15-.22.25-.39.25h-.75l-1.39-3.79-1.39 3.79h-.75c-.17 0-.33-.1-.39-.25l-1.92-5.05L6.05 17.3h-.71c-.16 0-.32-.09-.38-.23L3 12.01l1.92-5.04c.06-.15.22-.25.39-.25h.75l1.39 3.79 1.39-3.79h.75c.17 0 .33.1.39.25l1.92 5.05 1.92-5.05c.06-.15.22-.25.39-.25h.75l1.39 3.79 1.39-3.79h.75c.17 0 .33.1.39.25l1.92 5.04z"/>}
      </svg>
    </div>
  </div>
);


const JobCard = () => {
  const [companyIndex, setCompanyIndex] = useState(0);
  const [direction, setDirection] = useState(1); 
  
  const companies = [
    { name: 'Amazon', role: 'Full Stack Developer', location: 'Seattle, WA', logoSymbol: 'Amazon', logoColor: 'from-orange-400 to-yellow-500' },
    { name: 'Google', role: 'Software Engineer', location: 'Mountain View, CA', logoSymbol: 'Google', logoColor: 'from-green-400 to-lime-500' },
    { name: 'Microsoft', role: 'Cloud Engineer', location: 'Redmond, WA', logoSymbol: 'Microsoft', logoColor: 'from-blue-400 to-cyan-500' },
    { name: 'Meta', role: 'Data Scientist', location: 'Menlo Park, CA', logoSymbol: 'Meta', logoColor: 'from-purple-400 to-pink-500' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCompanyIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % companies.length;
        setDirection(1); 
        return newIndex;
      });
    }, 3000); 
    return () => clearInterval(interval);
  }, [companies.length]);

  const currentCompany = companies[companyIndex];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%', 
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    // Main container - Adjusted padding to match the image's overall height
    <div className="relative overflow-hidden w-full max-w-5xl mx-auto my-2 py-3 px-4 bg-white">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-gray-50 to-purple-50 opacity-40 -z-10 rounded-xl"></div>
      
      {/* Fixed-Height Container to prevent jumping. Adjusted min-h for precise fit. */}
      {/* The `min-h-[4.5rem]` (approx 72px) here matches the visual height including padding. */}
      <div className="relative overflow-hidden min-h-[4.5rem] flex items-center"> 
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={companyIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 40 },
              opacity: { duration: 0.3 },
            }}
            // Absolute positioning for overlapping animation. No extra padding here as it's on parent.
            className="flex items-center space-x-4 absolute inset-0" 
          >
            {/* Company Logo Component */}
            <CompanyLogo symbol={currentCompany.logoSymbol} colorClass={currentCompany.logoColor} />

            {/* Job Details Section - Compact Layout */}
            {/* Increased space-x for better visual separation as in the image */}
            <div className="flex items-center space-x-5 flex-grow text-sm sm:text-base">
              
              {/* NOW HIRING Tag - Exact styling as in the image */}
              <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium shadow-sm text-sm flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.717c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  NOW HIRING
              </span>

              {/* Company Name & Role - Font sizes matched to image */}
              <span className="text-blue-600 text-lg font-semibold flex-shrink-0"> {/* Matched font size and weight */}
                  {currentCompany.name}
              </span>
              <span className="text-gray-600 text-lg flex-shrink-0"> {/* Matched font size */}
                  • needs {currentCompany.role}
              </span>
              
              {/* Location */}
              {/* Hidden on small screens, shown on medium and up, as in image */}
              <div className="flex items-center text-gray-500 text-sm flex-shrink-0 hidden md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {currentCompany.location}
              </div>

              {/* Just Posted */}
              {/* Hidden on small screens, shown on medium and up, as in image */}
              <div className="flex items-center text-green-500 text-sm flex-shrink-0 hidden md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Just posted
              </div>

              {/* Final Indicator Dot */}
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-lg flex-shrink-0 ml-auto animate-pulse"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobCard;