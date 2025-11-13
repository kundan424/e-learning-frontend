import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../../services/courseService';
import CourseCard from '.././CourseCard';

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

    if (loading) return <p className="text-center text-gray-500">Loading courses...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (courses.length === 0) return <p className="text-center text-gray-500">No courses available yet.</p>;

    return (
        <div className="flex flex-wrap justify-center">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}

export default CourseList;