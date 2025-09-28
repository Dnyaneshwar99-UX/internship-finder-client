import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
    Search, MapPin, Briefcase, Building, Users, CheckCircle, TrendingUp, BookOpen, Heart, Filter, Star, ArrowRight, DollarSign, Calendar, Menu, X, Clock, Flame, Settings, LayoutDashboard, Cloud, Code, Twitter, Globe, Github, Link, Image as ImageIcon, UserCircle, Mail, Lock, Eye, EyeOff, UserPlus, Linkedin, KeyRound
} from 'lucide-react';

// --- Data Definitions ---
const fields = ["All Fields", "Technology", "Marketing", "Design", "Finance", "Data Science", "Content", "Engineering", "Business"];
const featuredCompanies = ["Google", "Microsoft", "Amazon", "Tesla", "Salesforce", "Netflix"];

const sampleInternships = [
    {
        id: 1, title: "Backend Developer", company: "Google", location: "Mountain View, CA", type: "Full-time", duration: "3 months", stipend: "$2,500/month", salary: "$120k - $180k", field: "Technology",
        logo: { type: 'image', src: 'https://cdn.iconscout.com/icon/free/png-256/google-2981832-2475043.png' }, posted: "2 days ago", applications: 245, rating: 4.8, skills: ["Python", "Go", "Kubernetes", "GCP"], description: "Join our backend team to build scalable systems that serve billions of users worldwide."
    },
    {
        id: 2, title: "Data Scientist", company: "Microsoft", location: "Seattle, WA", type: "Full-time", duration: "6 months", stipend: "$2,000/month", salary: "$130k - $200k", field: "Data Science",
        logo: { type: 'image', src: 'https://cdn.iconscout.com/icon/free/png-256/microsoft-283187.png' }, posted: "1 day ago", applications: 189, rating: 4.5, skills: ["Python", "ML", "Azure", "SQL"], description: "Drive data-driven insights across Microsoft products."
    },
    {
        id: 3, title: "Cloud Solutions Architect", company: "Amazon", location: "Seattle, WA", type: "Full-time", duration: "4 months", stipend: "$3,000/month", salary: "$140k - $220k", field: "Technology",
        logo: { type: 'text', text: 'A', bgColor: 'bg-orange-500' }, posted: "3 days ago", applications: 120, rating: 4.9, skills: ["AWS", "Cloud", "DevOps", "Java"], description: "Design and implement scalable, high-performance cloud solutions for our global infrastructure."
    },
    {
        id: 4, title: "UX/UI Designer", company: "Apple", location: "Cupertino, CA", type: "Full-time", duration: "3 months", stipend: "$2,200/month", salary: "$110k - $160k", field: "Design",
        logo: { type: 'icon', icon: <Heart className="w-8 h-8 text-white" />, bgColor: 'bg-gray-900' }, posted: "4 days ago", applications: 95, rating: 4.7, skills: ["Figma", "Sketch", "Prototyping", "User Research"], description: "Craft intuitive and beautiful user interfaces for Apple products."
    },
    {
        id: 5, title: "Financial Analyst Intern", company: "JPMorgan Chase", location: "New York, NY", type: "Full-time", duration: "6 months", stipend: "$2,800/month", salary: "$90k - $130k", field: "Finance",
        logo: { type: 'text', text: 'JPM', bgColor: 'bg-blue-800' }, posted: "5 days ago", applications: 150, rating: 4.6, skills: ["Excel", "Financial Modeling", "Market Research"], description: "Assist in financial analysis, reporting, and strategic planning."
    },
    {
        id: 6, title: "Software Engineer Intern", company: "Netflix", location: "Los Gatos, CA", type: "Full-time", duration: "3 months", stipend: "$3,200/month", salary: "$150k - $250k", field: "Technology",
        logo: { type: 'text', text: 'N', bgColor: 'bg-red-600' }, posted: "6 days ago", applications: 300, rating: 4.9, skills: ["Java", "Spring Boot", "Microservices", "Kafka"], description: "Contribute to the development of cutting-edge streaming technologies and infrastructure."
    }
];

const teamMembers = [
    { name: "Dnyaneshwar Panchal", role: "Full Stack Lead", color: "text-blue-600", image: <UserCircle className="w-full h-full text-blue-500" /> },
    { name: "Mrunal Asutkar", role: "Backend Developer", color: "text-purple-600", image: <UserCircle className="w-full h-full text-purple-500" /> },
    { name: "Krushna Ghime", role: "UX/UI Designer", color: "text-green-600", image: <UserCircle className="w-full h-full text-green-500" /> },
    { name: "Lavanya Rohankar", role: "Frontend Developer", color: "text-orange-600", image: <UserCircle className="w-full h-full text-orange-500" /> },
];

// -----------------------------------------------------------------
// 1. MODAL HELPER COMPONENTS
// -----------------------------------------------------------------

const AuthInput = ({ icon: Icon, type = "text", placeholder, value, onChange, isPassword = false }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="w-5 h-5 text-gray-400" />
            </div>
            <input
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800 transition duration-150 text-sm"
                required
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
        </div>
    );
};

// -----------------------------------------------------------------
// 2. MODAL DEFINITIONS
// -----------------------------------------------------------------

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Signing in...',
                success: (
                    <span className='font-semibold'>
                        Welcome back, **{email.split('@')[0]}**! 🎉
                    </span>
                ),
                error: 'Login failed. Check your credentials.',
            }
        ).then(() => {
            onClose();
            setEmail('');
            setPassword('');
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
             onClick={onClose}>
            <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <motion.div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative border-t-8 border-blue-600"
                initial={{ y: -50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition" aria-label="Close">
                    <X className="w-6 h-6" />
                </button>
                <div className="text-center mb-8">
                    <KeyRound className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
                    <p className="text-sm text-gray-600 mt-1">Sign in to access your saved internships.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <AuthInput icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthInput icon={Lock} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} isPassword />
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="remember" className="ml-2 text-gray-600">Remember Me</label>
                        </div>
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition duration-150 text-sm">Forgot Password?</a>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-md shadow-blue-500/50">
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToSignUp} className="text-purple-600 hover:text-purple-800 font-bold transition duration-150">
                        Sign Up Now
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Creating account...',
                success: (
                    <span className='font-semibold'>
                        Account created! Welcome, **{name.split(' ')[0]}**! 🎉
                    </span>
                ),
                error: 'Registration failed. Try a different email.',
            }
        ).then(() => {
            onClose();
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
             onClick={onClose}>
            <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <motion.div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative border-t-8 border-purple-600"
                initial={{ y: -50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition" aria-label="Close">
                    <X className="w-6 h-6" />
                </button>
                <div className="text-center mb-8">
                    <UserPlus className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Your Account</h2>
                    <p className="text-sm text-gray-600 mt-1">Find your dream internship today.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <AuthInput icon={UserCircle} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <AuthInput icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthInput icon={Lock} placeholder="Password (Min. 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} isPassword />
                    <AuthInput icon={Lock} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isPassword />
                    <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-700 transition duration-300 shadow-md shadow-purple-500/50">
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button onClick={onSwitchToSignIn} className="text-blue-600 hover:text-blue-800 font-bold transition duration-150">
                        Sign In
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// -----------------------------------------------------------------
// 3. NAVBAR (FIXED FOR MOBILE)
// -----------------------------------------------------------------

const Navbar = ({ isMenuOpen, setIsMenuOpen, handleScrollTo, openSignIn, openSignUp }) => {
    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Help Center', id: 'helpcenter' },
        { name: 'Team', id: 'team' },
    ];

    const handleNavClick = (id) => {
        handleScrollTo(id);
        setIsMenuOpen(false); // Close menu on mobile after click
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Name */}
                    <div className="flex items-center flex-shrink-0">
                        <span className="text-2xl font-extrabold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">IF</span>
                        <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight hidden sm:block">Dynamic Internship Finder</span>
                        <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight sm:hidden">DIF</span> {/* Shorter name for small mobile screens */}
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button key={item.id} onClick={() => handleNavClick(item.id)} className="text-gray-700 hover:text-blue-600 font-medium transition duration-150">
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Icons and Auth Buttons */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <Search className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer hidden sm:block" />
                        <Clock className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer hidden sm:block" />

                        <button
                            onClick={openSignIn}
                            className="text-blue-600 border border-blue-600 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg hover:bg-blue-50 transition duration-200 font-medium text-sm sm:text-base"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={openSignUp}
                            className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm sm:text-base hidden sm:block"
                        >
                            Sign Up
                        </button>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600 hover:text-blue-600 p-1">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-gray-50 border-t border-gray-200 shadow-inner"
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className="block w-full text-left px-5 py-2 text-base font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-150"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <div className="px-5 pt-2 border-t border-gray-200">
                                <button
                                    onClick={openSignUp}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm sm:hidden"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// -----------------------------------------------------------------
// 4. OTHER SECTION COMPONENTS (FIXED FOR MOBILE)
// -----------------------------------------------------------------

const FeaturedJobSpotlight = ({ company, role, location, status }) => {
    const slideVariants = {
        enter: { x: '100%', opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
        exit: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };
    // Added flex-wrap and smaller text on mobile
    return (
        <div className="flex items-center justify-center py-4 sm:py-6 bg-white shadow-sm border-b border-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={company}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 p-2 sm:p-4 bg-gray-50 rounded-full border border-gray-200 whitespace-nowrap text-sm sm:text-base"
                >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-inner hidden sm:flex">
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </div>
                    <span className="flex items-center text-xs sm:text-sm font-bold text-red-600 bg-red-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        <Flame className="w-3 h-3 mr-1 fill-red-400 stroke-red-600" /> URGENT
                    </span>
                    <span className="font-bold text-base sm:text-lg text-blue-600">{company}</span>
                    <span className="text-gray-700 font-medium hidden sm:block"> • needs {role}</span>
                    <span className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 mr-1" /> {location}
                    </span>
                    <span className="flex items-center text-green-600 font-medium text-xs sm:text-sm">
                        <CheckCircle className="w-3 h-3 mr-1 fill-green-400 stroke-green-600" /> {status}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Hero = ({ searchTerm, setSearchTerm, location, setLocation }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3, }
        }
    }
    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    }
    return (
        <div id="home" className="relative h-[80vh] sm:h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-fuchsia-700">
            <motion.div variants={container} initial="hidden" animate="show" className="text-center z-10 max-w-5xl px-4">
                <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-snug sm:leading-tight">
                    <span className="text-white block">Launch Your</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Career Trajectory</span>
                </motion.h1>
                <motion.p variants={item} className="text-base sm:text-lg md:text-xl text-indigo-200 mb-8 sm:mb-12 max-w-4xl mx-auto font-medium">
                    Seamlessly connect with **1000+ top-tier internship opportunities** worldwide.
                </motion.p>
                {/* Search Bar - FIXED: Changed flex-col and w-full to be the default, and used md: to revert to row for desktop */}
                <motion.div variants={item} className="bg-white p-3 sm:p-1.5 rounded-xl shadow-2xl flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-1 w-full max-w-lg mx-auto md:max-w-full">
                    <div className="flex items-center px-4 py-2 w-full md:w-5/12 border-b md:border-b-0 md:border-r border-gray-200">
                        <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                        <input type="text" placeholder="Job Title, Keywords, or Company" className="flex-grow text-gray-800 focus:outline-none placeholder:text-gray-500 text-base" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex items-center px-4 py-2 w-full md:w-4/12 border-b md:border-b-0 md:border-r border-gray-200">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <input type="text" placeholder="Location (e.g., Remote, Seattle)" className="flex-grow text-gray-800 focus:outline-none placeholder:text-gray-500 text-base" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 md:py-2 rounded-xl font-bold text-base hover:bg-blue-700 transition duration-300 flex items-center justify-center w-full md:w-3/12">
                        <Search className="w-5 h-5 mr-2" /> Search Now
                    </button>
                </motion.div>
                <motion.div variants={item} className="mt-6 text-sm text-indigo-200">
                    Popular searches: Developer, Data Scientist, UX Designer, Financial Analyst
                </motion.div>
            </motion.div>
        </div>
    );
};

const TrustedBy = () => {
    const companies = [
        { name: "Google", logo: <span className="text-2xl font-black text-blue-500">G</span>, color: "border-blue-500" },
        { name: "Microsoft", logo: <LayoutDashboard className="w-8 h-8 text-green-600" />, color: "border-green-600" },
        { name: "Amazon", logo: <span className="text-2xl font-black text-orange-500">A</span>, color: "border-orange-500" },
        { name: "Salesforce", logo: <Cloud className="w-8 h-8 text-blue-400" />, color: "border-blue-400" },
        { name: "Apple", logo: <Heart className="w-8 h-8 text-gray-900" />, color: "border-gray-900" },
        { name: "Oracle", logo: <Code className="w-8 h-8 text-red-600" />, color: "border-red-600" },
    ];
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    return (
        <section id="about" className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8 sm:mb-10 tracking-tight">Trusted by Top Global Tech Companies</h2>
                {/* FIXED: Reduced gap and size on mobile for better fit */}
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12">
                    {companies.map((comp, index) => (
                        <motion.div key={index} variants={itemVariants} className={`flex flex-col items-center justify-center p-3 h-20 w-24 sm:h-24 sm:w-28 bg-white border-b-4 ${comp.color} rounded-lg shadow-lg opacity-80 hover:opacity-100 transition duration-300 transform hover:scale-105`}>
                            <div className="mb-1 text-xl sm:text-2xl">{comp.logo}</div>
                            <span className="text-xs font-semibold text-gray-600 mt-1">{comp.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const InternshipCard = ({ internship, index }) => {
    const renderLogo = (logo) => {
        if (!logo) return <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold">?</div>;
        if (logo.type === 'image') return <img src={logo.src} alt={internship.company} className="w-12 h-12 rounded-lg object-contain" />;
        if (logo.type === 'icon') return <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${logo.bgColor || 'bg-blue-600'}`}>{logo.icon}</div>;
        if (logo.type === 'text') return <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${logo.bgColor || 'bg-blue-600'} text-white text-xl font-bold`}>{logo.text}</div>;
        return null;
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { y: 0, opacity: 1, transition: { delay: index * 0.15, duration: 0.5, ease: "easeOut" } },
    };
    return (
        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                    {renderLogo(internship.logo)}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{internship.company}</h3>
                        <p className="text-blue-600 font-semibold text-sm">{internship.title}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-blue-600"><Heart className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {internship.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
            </div>
            <p className="text-gray-600 text-sm mb-4 sm:mb-6 flex-grow line-clamp-3">{internship.description}</p>
            <div className="space-y-2 text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" /> {internship.location}</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /> {internship.posted}</div>
                <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-500" /> {internship.applications} applicants</div>
            </div>
            <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Salary</span>
                    <span className="text-base sm:text-lg font-bold text-gray-900">{internship.salary}</span>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{internship.type}</span>
            </div>
            <button className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">
                <span>Apply Now</span>
                <Link className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

const TeamSection = () => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };
    return (
        <section id="team" className="py-16 sm:py-20 bg-gray-100 border-t border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Meet the Creators</h2>
                    <p className="mt-2 sm:mt-4 text-lg sm:text-xl text-gray-600">The dedicated team behind **Dynamic Internship Finder**.</p>
                </div>
                {/* FIXED: Changed grid-cols-1 to be the default for mobile, used sm: for 2 columns, and lg: for 4 columns */}
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-xl overflow-hidden text-center p-6 border-t-4 border-transparent hover:shadow-2xl transition duration-500" style={{ borderImage: 'linear-gradient(to right, #3B82F6, #8B5CF6) 1', borderImageSlice: 1 }}>
                            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full p-1 bg-gray-50 border-4 border-gray-200">
                                {member.image}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-4">{member.name}</h3>
                            <p className={`text-sm font-semibold ${member.color} mb-4`}>{member.role}</p>
                            <div className="flex justify-center space-x-4 mt-4 border-t pt-4 border-gray-100">
                                <a href="#" className="text-gray-400 hover:text-blue-600 transition"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-purple-600 transition"><Mail className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-gray-900 transition"><Github className="w-5 h-5" /></a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

const Footer = () => (
    <footer id="helpcenter" className="bg-[#1C202F] text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* FIXED: Changed grid-cols-2 to grid-cols-2 for mobile and md:grid-cols-4 for desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8">
                <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center mb-4">
                        <span className="text-xl font-extrabold text-blue-400 bg-blue-700 px-2 py-1 rounded-lg">IF</span>
                        <span className="ml-2 text-xl font-bold text-white">Dynamic Finder</span>
                    </div>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">Connecting talented students with amazing internship opportunities at top companies.</p>
                    <div className="text-gray-300 text-xs mb-3">
                        <h4 className="font-semibold mb-1">Created by:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
                            <span>Dnyaneshwar Panchal</span>
                            <span>Mrunal Asutkar</span>
                            <span>Lavanaya Rohankar</span>
                            <span>Krushna Ghime</span>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><Twitter className="w-4 h-4" /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><Globe className="w-4 h-4" /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><Github className="w-4 h-4" /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><ImageIcon className="w-4 h-4" /></a>
                    </div>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3 text-white">For Students</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Find Internships</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Popular Fields</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Career Advice</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Student Login</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3 text-white">For Companies</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Post an Internship</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Employer Login</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Pricing Plans</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Talent Pool</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3 text-white">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Dynamic Internship Finder. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// -----------------------------------------------------------------
// 5. MAIN APP COMPONENT (LANDING)
// -----------------------------------------------------------------

const Landing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0);

    const filteredInternships = sampleInternships.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );

    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 64, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    };

    const openSignInModal = () => { setIsSignUpOpen(false); setIsSignInOpen(true); };
    const closeSignInModal = () => setIsSignInOpen(false);
    const openSignUpModal = () => { setIsSignInOpen(false); setIsSignUpOpen(true); };
    const closeSignUpModal = () => setIsSignUpOpen(false);

    const switchFromSignInToSignUp = () => {
        closeSignInModal();
        openSignUpModal();
    };

    const switchFromSignUpToSignIn = () => {
        closeSignUpModal();
        openSignInModal();
    };

    const spotlightData = [
        { company: "Google", role: "Software Engineers", location: "Remote/Mountain View", status: "Open" },
        { company: "Amazon", role: "Cloud Architects", location: "Seattle/Vancouver", status: "Open" },
        { company: "Netflix", role: "Data Scientists", location: "Los Gatos, CA", status: "Open" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSpotlightIndex(prevIndex =>
                (prevIndex + 1) % spotlightData.length
            );
        }, 5000); // Change spotlight every 5 seconds

        return () => clearInterval(interval);
    }, [spotlightData.length]);


    // Ensure body scroll is managed for modals
    useEffect(() => {
        if (isSignInOpen || isSignUpOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSignInOpen, isSignUpOpen]);


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Toaster position="top-center" />
            <Navbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleScrollTo={handleScrollTo}
                openSignIn={openSignInModal}
                openSignUp={openSignUpModal}
            />

            <FeaturedJobSpotlight {...spotlightData[currentSpotlightIndex]} />

            <main>
                <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} location={location} setLocation={setLocation} />

                <TrustedBy />

                <section id="internships" className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Internship Openings</h2>
                            <p className="mt-4 text-xl text-gray-600">Find the perfect opportunity to kickstart your professional journey.</p>
                        </div>

                        {/* Filter Bar (Placeholder/Simple implementation) */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {fields.map((field, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 text-sm rounded-full font-medium transition duration-150 ${
                                        field === "Technology"
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
                                    }`}
                                >
                                    {field}
                                </button>
                            ))}
                            <button className="flex items-center px-4 py-2 text-sm rounded-full font-medium bg-white text-gray-700 border border-gray-300 hover:border-purple-600 hover:text-purple-600">
                                <Filter className="w-4 h-4 mr-1" /> Filters
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredInternships.slice(0, 6).map((internship, index) => (
                                <InternshipCard key={internship.id} internship={internship} index={index} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-xl flex items-center justify-center mx-auto space-x-2">
                                <span>Browse All Internships ({sampleInternships.length}+)</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                <TeamSection />
            </main>

            <Footer />

            <AnimatePresence>
                {isSignInOpen && (
                    <SignInModal
                        isOpen={isSignInOpen}
                        onClose={closeSignInModal}
                        onSwitchToSignUp={switchFromSignInToSignUp}
                    />
                )}
                {isSignUpOpen && (
                    <SignUpModal
                        isOpen={isSignUpOpen}
                        onClose={closeSignUpModal}
                        onSwitchToSignIn={switchFromSignUpToSignIn}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Landing;