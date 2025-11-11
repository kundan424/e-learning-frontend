import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from './NotificationBell';

function Header() {
    const { user, logoutAction } = useAuth();
    const isStudent = user?.authorities?.includes('STUDENT');
    const isInstructor = user?.authorities?.includes('INSTRUCTOR');

    return (
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">
                <Link to="/">E-Learning</Link>
            </h1>
            <nav>
                {user ? (
                    <div className="flex items-center space-x-6">
                        <NotificationBell />

                        <Link to="/messages" className="font-medium text-gray-600 hover:text-blue-600">
                            Messages
                        </Link>
                        
                        {isStudent && (

                            <Link to="/my-courses" className="font-medium text-gray-600 hover:text-blue-600">
                                My Courses
                            </Link>

                        )}

                        {isInstructor && (
                            <Link to="/instructor/dashboard" className="font-medium text-gray-600 hover:text-blue-600">
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
        </header>
    );
}

export default Header;