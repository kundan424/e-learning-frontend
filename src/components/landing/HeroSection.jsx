import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function HeroSection() {
    const { user } = useAuth();

    return (
        <div className="bg-white">
            <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
                {/* Text Content */}
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
                <div className="hidden md:block">
                    {/* Use a high-quality, free image from unDraw, Pexels, etc. */}
                    <img
                        src="/Hero.jpg"
                        alt="Person learning at a computer"
                        className="rounded-lg shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;