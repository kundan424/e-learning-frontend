import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import Logo from '../../assets/navbar/logo.svg';
import Avatar from '../../assets/navbar/profile-avatar.png';
import Chevron from '../../assets/navbar/chevron.svg';

function Navbar() {
  const { user, logoutAction } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoggedIn = !!user;

  return (
    <nav
      className={`top-0 z-50 font-poppins transition-all duration-300 ${
        isLoggedIn ? 'bg-white shadow-sm' : 'bg-Aqua'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center px-6 py-4 lg:px-12">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <h4 className='text-white font-semibold'>CTOC</h4>
        </Link>

        {/* RIGHT GROUP (Links + Auth together) */}
        <div className="hidden md:flex items-center ml-auto gap-12">

          {/* NAV LINKS */}
          <ul className={`flex items-center gap-10 ${
            isLoggedIn ? 'text-totc-gray' : 'text-white'
          }`}>
            <li><Link to="/" className="text-sm font-medium hover:opacity-80">Home</Link></li>
            <li><Link to="/courses" className="text-sm font-medium hover:opacity-80">Courses</Link></li>
            <li><a href="#careers" className="text-sm font-medium hover:opacity-80">Careers</a></li>
            <li><a href="#blog" className="text-sm font-medium hover:opacity-80">Blog</a></li>
            <li><a href="#about" className="text-sm font-medium hover:opacity-80">About Us</a></li>
          </ul>

          {/* AUTH / PROFILE */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2 rounded-full bg-white text-totc-gray font-medium text-sm shadow-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-white/20 backdrop-blur text-white font-medium text-sm border border-white/30"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={Avatar}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-totc-navy">
                  {user?.name || "Lina"}
                </span>
                <img src={Chevron} alt="" className="w-3 h-3" />
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl py-2 border">
                  <Link
                    to="/my-courses"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Courses
                  </Link>

                  <button
                    onClick={logoutAction}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* MOBILE MENU BTN */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ml-auto text-2xl ${
            isLoggedIn ? 'text-totc-navy' : 'text-white'
          }`}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className={`md:hidden px-6 py-4 space-y-3 ${
          isLoggedIn ? 'bg-white' : 'bg-totc-teal text-white'
        }`}>
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)} className="block">Courses</Link>
          <a href="#careers" onClick={() => setMenuOpen(false)} className="block">Careers</a>
          <a href="#blog" onClick={() => setMenuOpen(false)} className="block">Blog</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="block">About Us</a>

          <hr />

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block text-center py-2 bg-white text-totc-gray rounded-full">
                Login
              </Link>
              <Link to="/register" className="block text-center py-2 bg-white/20 border border-white rounded-full">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-courses" className="block text-center py-2 border rounded-full">
                My Courses
              </Link>
              <button
                onClick={logoutAction}
                className="block w-full text-center py-2 bg-red-500 text-white rounded-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;