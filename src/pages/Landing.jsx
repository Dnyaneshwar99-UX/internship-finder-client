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
// 3. NAVBAR (The previously undefined component)
// -----------------------------------------------------------------

const Navbar = ({ isMenuOpen, setIsMenuOpen, handleScrollTo, openSignIn, openSignUp }) => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-extrabold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">IF</span>
                        <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">Dynamic Internship Finder</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => handleScrollTo('home')} className="text-gray-700 hover:text-blue-600 font-medium">Home</button>
                        <button onClick={() => handleScrollTo('about')} className="text-gray-700 hover:text-blue-600 font-medium">About</button>
                        <button onClick={() => handleScrollTo('helpcenter')} className="text-gray-700 hover:text-blue-600 font-medium">Help Center</button>
                        <button onClick={() => handleScrollTo('team')} className="text-gray-700 hover:text-blue-600 font-medium">Team</button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Search className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
                        <Clock className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer" />

                        <button
                            onClick={openSignIn}
                            className="text-blue-600 border border-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition duration-200 font-medium"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={openSignUp}
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                        >
                            Sign Up
                        </button>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600 hover:text-blue-600">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// -----------------------------------------------------------------
// 4. OTHER SECTION COMPONENTS (Required for Landing to run)
// -----------------------------------------------------------------

const FeaturedJobSpotlight = ({ company, role, location, status }) => {
    const slideVariants = {
        enter: { x: '100%', opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
        exit: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };
    return (
        <div className="flex items-center justify-center py-6 bg-white shadow-sm border-b border-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={company}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-full border border-gray-200 whitespace-nowrap"
                >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-inner">
                        <Settings className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="flex items-center text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        <Flame className="w-4 h-4 mr-1 fill-red-400 stroke-red-600" /> URGENT HIRING
                    </span>
                    <span className="font-bold text-lg text-blue-600">{company}</span>
                    <span className="text-gray-700 font-medium"> • needs {role}</span>
                    <span className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" /> {location}
                    </span>
                    <span className="flex items-center text-green-600 font-medium">
                        <CheckCircle className="w-4 h-4 mr-1 fill-green-400 stroke-green-600" /> {status}
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
        <div id="home" className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-fuchsia-700">
            <motion.div variants={container} initial="hidden" animate="show" className="text-center z-10 max-w-5xl px-4">
                <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
                    <span className="text-white block">Launch Your</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Career Trajectory</span>
                </motion.h1>
                <motion.p variants={item} className="text-lg md:text-xl text-indigo-200 mb-12 max-w-4xl mx-auto font-medium">
                    Seamlessly connect with **1000+ top-tier internship opportunities** worldwide.
                </motion.p>
                <motion.div variants={item} className="bg-white p-1.5 rounded-xl shadow-2xl flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-1 w-full mx-auto">
                    <div className="flex items-center px-4 py-2 md:w-5/12 border-b md:border-b-0 md:border-r border-gray-200">
                        <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                        <input type="text" placeholder="Job Title, Keywords, or Company" className="flex-grow text-gray-800 focus:outline-none placeholder:text-gray-500 text-base" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex items-center px-4 py-2 md:w-4/12 border-b md:border-b-0 md:border-r border-gray-200">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <input type="text" placeholder="Location (e.g., Remote, Seattle)" className="flex-grow text-gray-800 focus:outline-none placeholder:text-gray-500 text-base" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-base hover:bg-blue-700 transition duration-300 flex items-center justify-center md:w-3/12">
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
        <section id="about" className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-10 tracking-tight">Trusted by Top Global Tech Companies</h2>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {companies.map((comp, index) => (
                        <motion.div key={index} variants={itemVariants} className={`flex flex-col items-center justify-center p-4 h-24 w-28 bg-white border-b-4 ${comp.color} rounded-lg shadow-lg opacity-80 hover:opacity-100 transition duration-300 transform hover:scale-105`}>
                            <div className="mb-1">{comp.logo}</div>
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
        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                    {renderLogo(internship.logo)}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{internship.company}</h3>
                        <p className="text-blue-600 font-semibold">{internship.title}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-blue-600"><Heart className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {internship.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
            </div>
            <p className="text-gray-600 text-sm mb-6 flex-grow">{internship.description}</p>
            <div className="space-y-2 text-gray-600 text-sm mb-6">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" /> {internship.location}</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /> {internship.posted}</div>
                <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-500" /> {internship.applications} applicants</div>
            </div>
            <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Salary</span>
                    <span className="text-lg font-bold text-gray-900">{internship.salary}</span>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{internship.type}</span>
            </div>
            <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">
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
        <section id="team" className="py-20 bg-gray-100 border-t border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Meet the Creators</h2>
                    <p className="mt-4 text-xl text-gray-600">The dedicated team behind **Dynamic Internship Finder**.</p>
                </div>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-xl overflow-hidden text-center p-6 border-t-4 border-transparent hover:shadow-2xl transition duration-500" style={{ borderImage: 'linear-gradient(to right, #3B82F6, #8B5CF6) 1', borderImageSlice: 1 }}>
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 bg-gray-50 border-4 border-gray-200">
                                {member.image}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mt-4">{member.name}</h3>
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
    <footer id="helpcenter" className="bg-[#1C202F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                <div className="md:col-span-1">
                    <div className="flex items-center mb-4">
                        <span className="text-xl font-extrabold text-blue-400 bg-blue-700 px-2 py-1 rounded-lg">IF</span>
                        <span className="ml-2 text-xl font-bold text-white">Dynamic Finder</span>
                    </div>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">Connecting talented students with amazing internship opportunities at top companies.</p>
                    <div className="text-gray-300 text-xs mb-3">
                        <h4 className="font-semibold mb-1">Created by:</h4>
                        <div className="grid grid-cols-2 gap-y-1">
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
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition">Browse Internships</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Career Resources</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Resume Builder</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Interview Prep</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3 text-white">For Companies</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition">Post Internships</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Find Talent</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Contact Sales</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3 text-white">Support</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                <p>&copy; 2025 Dynamic Internship Finder. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// -----------------------------------------------------------------
// 5. MAIN LANDING COMPONENT
// -----------------------------------------------------------------

const Landing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [internships, setInternships] = useState([]);
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [spotlightCompany, setSpotlightCompany] = useState(featuredCompanies[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpotlightCompany(prevComp => {
                const currentIndex = featuredCompanies.indexOf(prevComp);
                const nextIndex = (currentIndex + 1) % featuredCompanies.length;
                return featuredCompanies[nextIndex];
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setInternships(sampleInternships);
            setFilteredInternships(sampleInternships);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let filtered = internships;
        if (selectedField && selectedField !== "All Fields") {
            filtered = filtered.filter(i => i.field === selectedField);
        }
        setFilteredInternships(filtered);
    }, [selectedField, internships]);


    const openSignInModal = () => {
        setIsSignUpOpen(false);
        setIsSignInOpen(true);
    }
    const openSignUpModal = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(true);
    }
    const closeModals = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(false);
    }

    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', });
        }
        setIsMenuOpen(false);
    };


    return (
        <div className="min-h-screen font-sans antialiased bg-gray-50">

            {/* 1. Navigation Bar */}
            <Navbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleScrollTo={handleScrollTo}
                openSignIn={openSignInModal}
                openSignUp={openSignUpModal}
            />

            {/* 2. Featured Job Spotlight */}
            <FeaturedJobSpotlight
                company={spotlightCompany}
                role="Backend Developer"
                location="Mountain View, CA"
                status="Just posted"
            />

            {/* 3. Hero Section */}
            <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} location={location} setLocation={setLocation} />

            {/* 4. Trusted By IT Companies */}
            <TrustedBy />

            {/* 5. Main Content / Internship List */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center text-xl text-gray-700 font-medium mb-12">
                    {filteredInternships.length} amazing opportunities waiting for you
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md animate-pulse border border-gray-100 h-96">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                        <div>
                                            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-11/12 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-10/12 mb-6"></div>
                                <div className="space-y-2 text-sm mb-6">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-5">
                                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded-lg mt-6"></div>
                            </div>
                        ))
                    ) : filteredInternships.length === 0 ? (
                        <div className="lg:col-span-2 text-center py-20 bg-white rounded-xl shadow-lg">
                            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No internships found</h3>
                            <p className="text-gray-600">Try adjusting your search criteria or browse all internships.</p>
                        </div>
                    ) : (
                        filteredInternships.map((internship, index) => (
                            <InternshipCard key={internship.id} internship={internship} index={index} />
                        ))
                    )}
                </div>
            </main>

            {/* 6. Team Members Section */}
            <TeamSection />

            {/* 7. Footer */}
            <Footer />

            {/* 8. AUTH MODALS */}
            <AnimatePresence>
                {isSignInOpen && (
                    <SignInModal
                        isOpen={isSignInOpen}
                        onClose={closeModals}
                        onSwitchToSignUp={openSignUpModal}
                    />
                )}
                {isSignUpOpen && (
                    <SignUpModal
                        isOpen={isSignUpOpen}
                        onClose={closeModals}
                        onSwitchToSignIn={openSignInModal}
                    />
                )}
            </AnimatePresence>

            {/* 9. TOASTER COMPONENT */}
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
};

export default Landing;