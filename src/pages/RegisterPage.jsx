import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { register } from '../services/authService';

// Replace with your actual image path
import RegisterImage from '../assets/register-bg.jpg';

function RegisterPage() {
    // Added email state to match the UI mockup
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('STUDENT'); // Default role
    const [error, setError] = useState(null);

    const { loginAction } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Note: If your backend needs the email, you can add it to the register function call here.
            const data = await register(username, password, role);
            loginAction(data);
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Username might already be taken.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-white font-sans">
            <div className="max-w-[1100px] w-full flex flex-col lg:flex-row gap-10 lg:gap-20">

                {/* Left Side: Image & Overlay */}
                <div className="hidden lg:flex w-1/2 relative rounded-[40px] overflow-hidden">
                    <img
                        src={RegisterImage}
                        alt="Young students raising hands in class"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Text Overlay */}
                    <div className="absolute bottom-12 left-10 text-white space-y-2 pr-8">
                        <h2 className="text-4xl font-bold tracking-wide">
                            Start Your Journey
                        </h2>
                        <p className="text-lg text-gray-200 font-light">
                            Join TOTC today and unlock a world of knowledge.
                        </p>
                    </div>
                </div>

                {/* Right Side: Registration Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center py-8 lg:pr-12">

                    {/* Greeting */}
                    <p className="text-center text-gray-600 mb-6 font-medium">
                        Welcome to CTOC!
                    </p>

                    {/* Custom Toggle Switch */}
                    <div className="bg-[#E0F5F4] rounded-full p-1.5 flex mb-10 w-full max-w-sm mx-auto">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex-1 text-[#49BBBD] py-2.5 rounded-full font-medium hover:bg-white/50 transition-all"
                        >
                            Login
                        </button>
                        <button className="flex-1 bg-[#49BBBD] text-white py-2.5 rounded-full font-medium shadow-sm transition-all">
                            Register
                        </button>
                    </div>

                    {/* Description Text */}
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed text-left">
                        Create an account to enroll in courses, interact with instructors, and start your personalized learning path.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Input (Added to match UI mockup) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 pl-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-6 py-3.5 border border-[#49BBBD] rounded-full focus:ring-2 focus:ring-[#49BBBD]/50 focus:border-[#49BBBD] focus:outline-none transition-all text-sm placeholder-gray-400"
                                placeholder="Enter your Email Address"
                            />
                        </div>

                        {/* Username Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 pl-2">
                                User name
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-6 py-3.5 border border-[#49BBBD] rounded-full focus:ring-2 focus:ring-[#49BBBD]/50 focus:border-[#49BBBD] focus:outline-none transition-all text-sm placeholder-gray-400"
                                placeholder="Enter your User name"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 pl-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-6 py-3.5 border border-[#49BBBD] rounded-full focus:ring-2 focus:ring-[#49BBBD]/50 focus:border-[#49BBBD] focus:outline-none transition-all text-sm placeholder-gray-400"
                                    placeholder="Enter your Password"
                                />
                                {/* Eye Icon Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Role Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 pl-2">
                                I am signing up as a...
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-6 py-3.5 border border-[#49BBBD] rounded-full focus:ring-2 focus:ring-[#49BBBD]/50 focus:border-[#49BBBD] focus:outline-none transition-all text-sm bg-white text-gray-600 appearance-none cursor-pointer"
                            >
                                <option value="STUDENT">Student</option>
                                <option value="INSTRUCTOR">Instructor</option>
                            </select>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm pl-2">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="bg-[#49BBBD] text-white px-14 py-3 rounded-full font-medium hover:bg-[#3FA1A3] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49BBBD]"
                            >
                                Register
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;