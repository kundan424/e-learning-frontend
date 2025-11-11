import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import CreateCourseForm from '../components/CreateCourseForm';
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../services/courseService';

function InstructorDashboard() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourse = async () => {
      if (!user) return; // don't fetch if user isn't loaded

      try {
        setLoading(true);
        const allCourses = await getAllCourses();
        const filteredCourses = allCourses.filter(
          (course) => course.instructorName === user.sub
        );
        setMyCourses(filteredCourses);
      } catch (error) {
        console.error("Failed to fetch instructor's courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourse();
  }, [user])

  const handleCourseCreated = (newCourse) => {
    setMyCourses((prevCourses) => [newCourse, ...prevCourses]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="my-6 text-center text-4xl font-bold text-gray-800">
          Instructor Dashboard
        </h2>

        {/* Form for creating new courses */}
        <CreateCourseForm onCourseCreated={handleCourseCreated} />

        {/* List of existing courses */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-2xl font-semibold">My Courses</h3>
          {loading ? (
            <p>Loading your courses...</p>
          ) : myCourses.length === 0 ? (
            <p>You have not created any courses yet.</p>
          ) : (
            <ul className="space-y-3">
              {myCourses.map((course) => (
                <li
                  key={course.id}
                  className="flex flex-col items-start justify-between rounded-md border p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h4 className="text-xl font-semibold">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.description.substring(0, 100)}...</p>
                  </div>
                  <Link
                    to={`/instructor/course/${course.id}/edit`}
                    className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700 sm:mt-0 sm:w-auto"
                  >
                    Manage Course
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )


}

export default InstructorDashboard
