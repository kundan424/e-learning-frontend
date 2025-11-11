import React from 'react';
import Header from '../components/Header';
import CourseList from '../components/CourseList';

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto p-4">
                <h2 className="my-6 text-center text-4xl font-bold text-gray-800">
                    Available Courses
                </h2>
                <CourseList />
            </main>
        </div>
    );
}

export default HomePage;