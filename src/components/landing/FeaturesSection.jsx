import React from 'react';
// You can find free icons from libraries like 'heroicons'
const FeatureCard = ({ title, description, icon }) => (
    <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="mb-4 inline-block rounded-full bg-blue-100 p-4">
            <span className="text-3xl text-blue-600">{icon}</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

function FeaturesSection() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
                    Why Our Platform?
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <FeatureCard
                        icon="💬"
                        title="Live Doubt Clearance"
                        description="Connect 1-on-1 with instructors via private chat and live video."
                    />
                    <FeatureCard
                        icon="⭐"
                        title="Expert Instructors"
                        description="Learn from industry professionals who are passionate about teaching."
                    />
                    <FeatureCard
                        icon="📈"
                        title="Track Your Progress"
                        description="Stay motivated by marking lessons as complete and tracking your progress."
                    />
                </div>
            </div>
        </div>
    );
}

export default FeaturesSection;