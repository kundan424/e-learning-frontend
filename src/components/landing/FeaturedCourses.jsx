import React, { useState, useEffect, useMemo } from 'react';
import { getAllCourses } from '../../services/courseService';
import CourseCard from '.././CourseCard';


const SearchIcon = () => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
        <path
            d="M8 13c-1.389 0-2.57-.486-3.542-1.458C3.486 10.569 3 9.389 3 8c0-1.389.486-2.57 1.458-3.542C5.431 3.486 6.611 3 8 3c1.389 0 2.57.486 3.542 1.458C12.514 5.431 13 6.611 13 8.001a4.78 4.78 0 01-.26 1.587 5.204 5.204 0 01-.72 1.37l4.46 4.459c.152.152.228.326.228.52a.718.718 0 01-.229.521.73.73 0 01-1.062 0l-4.459-4.437a5.204 5.204 0 01-1.37.719A4.78 4.78 0 018 13zm0-1.5c.972 0 1.799-.34 2.48-1.02.68-.681 1.02-1.508 1.02-2.48s-.34-1.799-1.02-2.48C9.798 4.84 8.971 4.5 8 4.5s-1.799.34-2.48 1.02C4.84 6.202 4.5 7.029 4.5 8s.34 1.799 1.02 2.48c.681.68 1.508 1.02 2.48 1.02z"
            fill="currentColor"
        ></path>
    </svg>
);


function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')

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


    // filtered list based on searchterm
    const filteredCourses = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();

        if (!lowerCaseSearch) {
            return courses;
        }

        return courses.filter(course =>
            course.title.toLowerCase().includes(lowerCaseSearch) ||
            course.description.toLowerCase().includes(lowerCaseSearch)
        );

    }, [searchTerm, courses]);


    if (loading) return <p className="text-center text-gray-500">Loading courses...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (courses.length === 0) return <p className="text-center text-gray-500">No courses available yet.</p>;

    return (
        <div className='my-10'>
            <p className='text-4xl font-Roboto font-medium text-center mb-10' >Search 100+ learning programs</p>
            <div className="mb-8 flex w-full justify-center">
                <div className="relative w-full max-w-6xl">
                    <SearchIcon />
                    <input
                        type="text"
                        className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-lg focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue hover:bg-blue-50"
                        placeholder="e.g. Machine Learning"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>


            <div className="flex flex-wrap justify-center">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No courses match your search.</p>
                )}
            </div>
        </div>
    );
}

export default CourseList;

