// src/components/HeroSection.jsx
import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
    // Define custom colors for consistency
    const indigoPrimary = 'text-[#6366F1]'; // Indigo-500
    const purpleAccent = 'text-[#A78BFA]'; // Violet-400
    const buttonHoverGlow = 'hover:shadow-[0_0_20px_0_rgba(99,102,241,0.7)]';

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen-70 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* 1. Base Background: Deep Black (Uniform with About section) */}
            <div className="absolute inset-0 bg-black z-0"></div>

            {/* 2. Dynamic Background Effect (Subtle, large, glowing circles) */}
            <div className="absolute inset-0 z-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        {/* Soft, wide indigo glow - Adjusted for a darker feel */}
                        <radialGradient id="gradHero" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                            <stop offset="0%" style={{stopColor: 'rgba(99, 102, 241, 0.4)'}} />
                            <stop offset="100%" style={{stopColor: 'rgba(0,0,0,0)'}} />
                        </radialGradient>
                    </defs>
                    <rect x="0" y="0" width="100" height="100" fill="url(#gradHero)" />

                    {/* Subtle background circles for dynamic feel (using the accent purple) */}
                    <circle cx="20" cy="20" r="15" fill="rgba(167, 139, 250, 0.1)" className="animate-pulse duration-5000 delay-1000" />
                    <circle cx="80" cy="70" r="20" fill="rgba(167, 139, 250, 0.15)" className="animate-pulse duration-6000 delay-2000" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tighter">
                    Find Your Dream <br className="hidden sm:inline" />
                    {/* Accent Color: Electric Purple for contrast */}
                    <span className={`${purpleAccent} inline-block filter drop-shadow-lg`}>Internship</span>
                </h1>

                <p className="text-xl sm:text-2xl md:text-3xl mb-10 opacity-90 font-light leading-snug">
                    Connect with **top-tier companies** and launch your career with impactful
                    opportunities in tech, finance, design, and more.
                </p>

                {/* Search Bar / CTA Block - Primary Focus */}
                <div className="w-full max-w-2xl mx-auto">
                    {/* Search Input Simulation with Glassmorphism */}
                    <div className="flex bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-2xl border border-gray-700/50">
                        <input
                            type="text"
                            placeholder="Search by role, skill, or location (e.g., 'React developer, remote')"
                            className="flex-grow p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                        />
                        <button
                            className={`flex items-center space-x-2 px-6 py-3 bg-white ${indigoPrimary} font-bold rounded-lg shadow-xl transition duration-300 transform hover:scale-[1.03] ${buttonHoverGlow} text-lg`}
                        >
                            <Search className="w-5 h-5" />
                            <span>Search Now</span>
                        </button>
                    </div>

                    {/* Subtle info below the search bar */}
                    <p className="mt-4 text-sm text-gray-400">
                        Trusted by students from over 100+ universities globally.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;