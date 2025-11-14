import React from 'react';
import { Link } from 'react-router-dom';


function FeaturesSection() {
    return (
        <div className="bg-blue-50 py-10 px-4 md:px-12"> {/* Added responsive padding */}

            
            <div className='container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
                <div className="flex flex-col justify-center text-center lg:text-left">
                    <h2 className="text-4xl font-bold text-gray-800 md:text-5xl">
                        Need help with
                        <br />
                        <span className="text-custom-green">Learning Roadmaps?</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Connect with trusted experts, anytime. Get real answers,
                        real guidance, in real time.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/courses"
                            className="inline-block rounded-lg bg-custom-blue px-8 py-3 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105"
                        >
                            Explore Now
                        </Link>
                    </div>
                </div>

                {/* Right-side Image (Uncommented) */}
                <div className="flex items-center justify-center">
                    <img src="/featureSection.svg" alt="Feature illustration" className="w-full max-w-md" />
                </div>
            </div>

            {/* --- Bottom Feature Cards --- */}
            <div className="container mx-auto mt-16">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className=' flex gap-3  justify-center bg-soft-purple p-2 '>
                        <img src="/one-to-one.svg" alt="1-on-1" className="h-8 w-8" />
                        <span>1:1 Doubt clearance</span>
                    </div>

                    <div className='flex gap-3  justify-center bg-soft-pink p-2'>
                        <img src="/Personalized-feed.svg" alt="1-on-1" className="h-8 w-8" />
                        <span>Personalized feed</span>
                    </div>
                    
                    <div className='flex gap-3  justify-center bg-soft-blue p-2'>
                        <img src="/affordable.svg" alt="1-on-1" className="h-8 w-8" />
                        <span>flexible learning</span>
                    </div>
                    
                    <div className='flex gap-3  justify-center bg-soft-orange p-2'>
                        <img src="/one-to-one.svg" alt="1-on-1" className="h-8 w-8" />
                        <span>community disscussion</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FeaturesSection;