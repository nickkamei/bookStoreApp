import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Login from './Login';
import Logout from './Logout';

const Navbar = () => {
    const [authUser] = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    const [sticky, setSticky] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const element = document.documentElement;

    // Apply theme to the HTML element and body
    useEffect(() => {
        if (theme === 'dark') {
            element.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark');
        } else {
            element.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            document.body.classList.remove('dark');
        }
    }, [theme]);

    // Handle sticky navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle theme between light and dark
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Close login modal
    const closeLoginModal = () => {
        console.log('Closing login modal'); // Debugging
        setIsLoginModalOpen(false);
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Navbar links
    const navItem = (
        <>
            <li><Link to="/" className="dark:text-white">Home</Link></li>
            <li><Link to="/course" className="dark:text-white">Course</Link></li>
            <li><Link to="/contact" className="dark:text-white">Contact</Link></li>
            <li><Link to="/aboutus" className="dark:text-white">About</Link></li>
        </>
    );

    return (
        <div className={`sticky dark:bg-slate-900 dark:text-white top-0 z-50 ${sticky ? 'sticky-navbar shadow-md bg-base-200 dark:bg-slate-550 dark:text-white duration-300 transition-all ease-in-out' : ''}`}>
            <div className="navbar max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-slate-700 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <a className="text-xl font-bold cursor-pointer">bookStore</a>
                </div>
                <div className="navbar-end space-x-3">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItem}
                        </ul>
                    </div>
                    <div className="hidden md:block">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="input input-bordered w-full max-w-xs dark:bg-slate-700 dark:text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    {/* Conditional Login/Logout Button */}
                    {authUser ? (
                        <Logout />
                    ) : (
                        <div className="dark:bg-slate-900 dark:text-white">
                            <button
                                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div key="login-modal" className="fixed inset-0 z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeLoginModal}></div>
                    <Login 
                        onLoginSuccess={closeLoginModal} 
                        from={location.pathname} 
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;