import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from './NotificationBell';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function Header() {
    const { user, logoutAction } = useAuth();
    const isStudent = user?.authorities?.includes('STUDENT');
    const isInstructor = user?.authorities?.includes('INSTRUCTOR');

    
    const [scrolled, setScrolled] = useState(false);
    // This new state is for the mobile menu toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to close the mobile menu
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className={`
                sticky top-0 z-50 flex items-center justify-between bg-gray-100 transparent p-4 
                transition-shadow duration-300
                ${scrolled ? 'shadow-md' : 'shadow-none'}
            `}
        >
            {/* Logo */}
            <h1 className="text-3xl font-bold text-custom-blue">
                <Link to="/" onClick={closeMenu}>E-Learning</Link>
            </h1>

            {/* --- Desktop Navigation (Hidden on Mobile) --- */}
            <nav className="hidden md:flex">
                {user ? (
                    <div className="flex items-center space-x-6">
                        <NotificationBell />
                        <Link to="/messages" className="font-medium text-gray-600 hover:text-custom-blue">
                            Messages
                        </Link>
                        {isStudent && (
                            <Link to="/my-courses" className="font-medium text-gray-600 hover:text-custom-blue">
                                My Courses
                            </Link>
                        )}
                        {isInstructor && (
                            <Link to="/instructor/dashboard" className="font-medium text-gray-600 hover:text-custom-blue">
                                Dashboard
                            </Link>
                        )}
                        <span className="text-gray-700">
                            Hello, <strong className="font-medium">{user.sub}</strong>
                            <span className="ml-1 text-sm text-gray-500">({user.authorities[0]})</span>
                        </span>
                        <button
                            onClick={logoutAction}
                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-x-2">
                        <Link
                            to="/login"
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </nav>

            {/* --- Mobile Menu Button (Hamburger) --- */}
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <XIcon className="h-7 w-7 text-gray-700" />
                    ) : (
                        <MenuIcon className="h-7 w-7 text-gray-700" />
                    )}
                </button>
            </div>

            {/* --- Mobile Menu (Dropdown) --- */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
                    <nav className="flex flex-col space-y-4 p-6">
                        {user ? (
                            <>
                                <div className='mb-2'>
                                    <span className="block text-lg text-gray-700">
                                        Hello, <strong className="font-medium">{user.sub}</strong>
                                    </span>
                                    <span className="block text-sm text-gray-500">({user.authorities[0]})</span>
                                </div>
                                <hr />
                                <Link to="/messages" onClick={closeMenu} className="block rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-100">
                                    Messages
                                </Link>
                                {isStudent && (
                                    <Link to="/my-courses" onClick={closeMenu} className="block rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-100">
                                        My Courses
                                    </Link>
                                )}
                                {isInstructor && (
                                    <Link to="/instructor/dashboard" onClick={closeMenu} className="block rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-100">
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        logoutAction();
                                        closeMenu();
                                    }}
                                    className="w-full rounded-md bg-red-500 px-3 py-2 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="block w-full rounded-md bg-gray-200 px-3 py-2 text-center text-lg font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;