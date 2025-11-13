import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // We'll re-use the header
import CourseCard from '../components/CourseCard';
import { getMyEnrolledCourses } from '../services/enrollmentService';

function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getMyEnrolledCourses();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError('Failed to load your courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []); // Runs once on mount

  const renderEnrolledCourses = () => {
    if (loading) return <p className="text-center text-gray-500">Loading your courses...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (courses.length === 0) return (
      <p className="text-center text-gray-500">
        You are not enrolled in any courses yet.
      </p>
    );

    return (
      <div className="flex flex-wrap justify-center">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      <main className="container mx-auto p-4">
        <h2 className="my-6 text-center text-4xl font-bold text-gray-800">
          My Enrolled Courses
        </h2>
        {renderEnrolledCourses()}
      </main>
    </div>
  );
}

export default MyCoursesPage;