import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function HeroSection() {
    const { user } = useAuth();

    return (
        <div className=''>
            <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-12 py-1 md:grid-cols-2 md:py-12">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">
                        Find Your Future.
                        <br />
                        <span className="text-custom-blue">Learn New Skills.</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Join thousands of learners on our platform. Access live chat,
                        video doubt-clearance, and courses from top instructors.
                    </p>
                    <Link
                        to={user ? "/my-courses" : "/register"}
                        className="mt-8 inline-block rounded-lg bg-custom-blue px-8 py-3 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105"
                    >
                        {user ? "Go to Your Courses" : "Join for Free"}
                    </Link>
                </div>

                {/* Image/Graphic */}
                <div className="flex items-center justify-end  md:h-72 lg:h-auto">
                    <img
                        src="/Hero.png"
                        alt="Students learning together"
                        className="w-80 max-h-full object-contain" // h-full and max-h-full
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;


