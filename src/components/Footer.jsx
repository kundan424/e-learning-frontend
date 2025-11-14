import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">E-learning</h2>

        </div>

        {/* Learning Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Learning</h3>
          <ul className="space-y-2 text-sm">
            {/* Note: The hover/cursor styles are moved from <li> to <Link>.
      The 'to' prop defines the path.
    */}
            <li>
              <Link to="/" className="hover:text-white cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white cursor-pointer">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white cursor-pointer">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white cursor-pointer">
                Certifications
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Terms of Use</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
