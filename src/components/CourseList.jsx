import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../services/courseService';
import CourseCard from './CourseCard';
import InProgressCard from './InProgressCard';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getAllCourses();
                setCourses(data);
                setError(null);
            } catch (err) {
                setError('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Loader and Error States
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <div className="w-12 h-12 border-4 border-[#49BBBD] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500 py-20 bg-[#F8F9FA] min-h-screen">{error}</p>;
    }

    if (courses.length === 0) {
        return <p className="text-center text-gray-500 py-20 bg-[#F8F9FA] min-h-screen">No courses available yet.</p>;
    }

    // Distributing fetched courses into different sections (Fallback to repeating arrays if backend has too few courses)
    const recommendedCourses = courses.slice(0, 4);
    const choiceCourses = courses.slice(4, 8).length > 0 ? courses.slice(4, 8) : courses.slice(0, 4);
    const devCourses = courses.slice(8, 12).length > 0 ? courses.slice(8, 12) : courses.slice(0, 4);
    const viewingCourses = courses.slice(12, 16).length > 0 ? courses.slice(12, 16) : courses.slice(0, 4);

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-24">
                
                {/* 1. Welcome Back Section (Using first 3 courses as mock "in progress") */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-[#2D3436]">Welcome back, ready for your next lesson?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.slice(0, 3).map((course, idx) => (
                            <InProgressCard 
                                key={`prog-${course.id}`} 
                                item={{...course, progress: (idx + 1) * 25, currentLesson: idx + 2, totalLessons: 8}} 
                            />
                        ))}
                    </div>
                </section>

                {/* 2. Recommended Courses Row */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-[#2D3436]">Recommended for you</h2>
                        <button className="text-[#49BBBD] font-medium hover:underline">See all</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendedCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>

                {/* 3. Get Choice of your course */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-[#2D3436]">Get choice of your course</h2>
                        <button className="text-[#49BBBD] font-medium hover:underline">See all</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {choiceCourses.map(course => (
                            <CourseCard key={`choice-${course.id}`} course={course} />
                        ))}
                    </div>
                </section>

                {/* 4. Promotional Banner */}
                <section className="bg-[#2D3436] rounded-3xl p-12 text-center text-white space-y-6 shadow-xl">
                    <h2 className="text-3xl font-bold">Online coaching lessons for remote learning.</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Enhance your skills with our top-tier curriculum. Learn from industry experts at your own pace from anywhere in the world.
                    </p>
                    <button className="bg-[#49BBBD] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3FA1A3] transition-colors duration-300">
                        Start learning now
                    </button>
                </section>

                {/* 5. Personal Development Row */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-[#2D3436]">The course in personal development</h2>
                        <button className="text-[#49BBBD] font-medium hover:underline">See all</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {devCourses.map(course => (
                            <CourseCard key={`dev-${course.id}`} course={course} />
                        ))}
                    </div>
                </section>
                
                {/* 6. Students are viewing Row */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-[#2D3436]">Student are viewing</h2>
                        <button className="text-[#49BBBD] font-medium hover:underline">See all</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {viewingCourses.map(course => (
                            <CourseCard key={`view-${course.id}`} course={course} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default CourseList;