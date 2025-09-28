// src/components/About.jsx
import React from 'react';
import { Briefcase, Zap, Users, Compass } from 'lucide-react'; // Using Lucide for modern icons

const About = () => {
    // Define custom colors to match the Hero's Electric Nebula theme
    const primaryColor = 'text-[#6366F1]'; // Indigo-500 for main highlight/icons
    const accentColor = 'text-white'; // White for text over dark background
    const cardBackground = 'bg-gray-900'; // Dark background for contrast
    const sectionBackground = 'bg-black'; // Primary background

    // Features data for easy mapping
    const features = [
        {
            title: 'Extensive Database',
            icon: Briefcase,
            description: 'Access thousands of verified internships across diverse industries and locations, updated in real-time.'
        },
        {
            title: 'Personalized Matches',
            icon: Zap,
            description: 'Our intelligent algorithms analyze your profile to deliver opportunities that perfectly fit your skills and goals.'
        },
        {
            title: 'Easy Application Flow',
            icon: Compass,
            description: 'Streamlined process and direct links simplify applying, letting you focus on securing the interview.'
        },
    ];

    // Team data for dynamic rendering
    const team = [
        { name: 'Jane Doe', role: 'Founder & CEO', initials: 'JD' },
        { name: 'John Smith', role: 'Lead Developer', initials: 'JS' },
        { name: 'Alex Martin', role: 'Career Advisor', initials: 'AM' },
    ];

    return (
        <section className={`py-20 sm:py-32 ${sectionBackground} text-white relative`}>
            {/* Subtle Nebula Effect (Matching the Hero Section) */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <radialGradient id="gradAbout" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style={{stopColor: 'rgba(99, 102, 241, 0.2)'}} /> {/* Indigo Glow */}
                            <stop offset="100%" style={{stopColor: 'rgba(0,0,0,0)'}} />
                        </radialGradient>
                    </defs>
                    <rect x="0" y="0" width="100" height="100" fill="url(#gradAbout)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Block */}
                <div className="text-center mb-16">
                    <p className={`text-sm font-semibold uppercase tracking-wider ${primaryColor}`}>
                        Our Mission
                    </p>
                    <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
                        Empowering Your <span className="text-[#A78BFA]">Career Launch</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400 max-w-4xl mx-auto">
                        We are dedicated to removing the complexity from the internship search,
                        providing a streamlined, intelligent platform for the next generation of professionals.
                    </p>
                </div>

                {/* Core Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${cardBackground} p-8 rounded-xl border border-gray-800 shadow-2xl transition duration-500 ease-in-out transform hover:scale-[1.02] hover:border-[#6366F1]/50`}
                        >
                            <feature.icon className={`w-10 h-10 ${primaryColor} mb-4`} strokeWidth={1.5} />
                            <h3 className="text-2xl font-bold mb-3 tracking-wide">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* For Companies Section (Separated for visual break) */}
                <div className="mt-20 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 ${cardBackground} rounded-xl border border-gray-800 shadow-3xl bg-gray-800/70">
                    <div className="md:w-3/4">
                        <h2 className="text-3xl font-bold mb-4">
                            For Forward-Thinking <span className="text-[#A78BFA]">Companies</span>
                        </h2>
                        <p className="text-lg text-gray-300">
                            Leverage our platform to effortlessly connect with a diverse pool of highly qualified
                            students and recent graduates. Post your openings, manage candidates, and secure
                            the future leaders your organization needs.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 md:ml-10">
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105 whitespace-nowrap">
                            Post an Internship
                        </button>
                    </div>
                </div>


                {/* Meet the Team Section */}
                <div className="mt-24 text-center">
                    <h2 className="text-4xl font-extrabold mb-4">
                        The Driven <span className="text-[#6366F1]">Team</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-16">
                        Meet the dedicated individuals passionate about empowering your career journey.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className={`${cardBackground} p-6 rounded-xl shadow-lg border border-gray-800 transition duration-300 transform hover:shadow-[0_0_20px_0_rgba(99,102,241,0.5)]`}
                            >
                                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-700/50 border-4 border-[#A78BFA]">
                                    <span className="text-3xl font-extrabold text-white">{member.initials}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-1 tracking-wide">{member.name}</h3>
                                <p className={`${primaryColor} font-medium text-sm`}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;