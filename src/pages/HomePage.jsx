import React from 'react';
import Hero from '../components/landing/Hero';
import OurSuccess from '../components/landing/OurSuccess';
import AllInOneCloud from '../components/landing/AllInOneCloud';
import WhatIs from '../components/landing/WhatIs';
import PhysicalClassroom from '../components/landing/PhysicalClassroom';
import OurFeatures from '../components/landing/OurFeatures';
import LatestNews from '../components/landing/LatestNews';
import Testimonials from '../components/landing/Testimonials';

function HomePage() {
    return (
        <>
            <Hero />
            <OurSuccess />
            <AllInOneCloud />
            <WhatIs />
            <PhysicalClassroom />
            <OurFeatures />
            <Testimonials />
            <LatestNews />
        </>
    );
}

export default HomePage;