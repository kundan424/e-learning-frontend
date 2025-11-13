import React from 'react';
import FeaturesSection from '../components/landing/FeaturesSection'
import FeaturedCourses from '../components/landing/FeaturedCourses'
import HeroSection from '../components/landing/HeroSection';


function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <FeaturedCourses />
        </>
    );
}

export default HomePage;