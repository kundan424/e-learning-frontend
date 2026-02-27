import React from 'react';
import { Link } from 'react-router-dom';

function TOTCFooter() {
    return (
        <footer className="bg-[#252641] text-center py-14 px-6">
            {/* Top: Logo + tagline */}
            <div className="flex items-center justify-center gap-5 mb-10">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-totc-teal flex items-center justify-center">
                        <span className="text-white font-bold text-xs">⟨</span>
                    </div>
                    <span className="text-2xl font-bold text-white">CTOC</span>
                </div>
                <div className="w-px h-10 bg-gray-500"></div>
                <p className="text-gray-400 text-sm font-semibold leading-snug text-left">
                    Virtual Class<br />for Zoom
                </p>
            </div>

            {/* Subscribe */}
            <h3 className="text-white text-lg font-semibold mb-4">Subscribe to get our Newsletter</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 max-w-md mx-auto">
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full sm:flex-1 px-6 py-3 rounded-full bg-[#3D3F7D] text-white placeholder-gray-400 text-sm border-none outline-none focus:ring-2 focus:ring-totc-teal"
                />
                <button className="px-7 py-3 bg-totc-teal text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition whitespace-nowrap">
                    Subscribe
                </button>
            </div>

            {/* Links */}
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm mb-4">
                <Link to="#" className="hover:text-white transition">Careers</Link>
                <span>|</span>
                <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
                <span>|</span>
                <Link to="#" className="hover:text-white transition">Terms & Conditions</Link>
            </div>

            <p className="text-gray-500 text-xs">© 2021 Class Technologies Inc.</p>
        </footer>
    );
}

export default TOTCFooter;