import React from 'react';
import CourseList from '../components/CourseList';

function AllCoursesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">All Courses</h1>
                <p className="mt-2 text-gray-600">Browse our extensive library of knowledge.</p>
            </div>

            {/* Reuse the component that fetches and lists everything */}
            <CourseList />
        </div>
    );
}

export default AllCoursesPage;