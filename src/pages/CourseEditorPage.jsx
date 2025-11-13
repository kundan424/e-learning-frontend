
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getCourseById } from '../services/courseService'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import AddLessonForm from '../components/AddLessonForm'
function CourseEditorPage() {

    const { courseId } = useParams();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const data = await getCourseById(courseId);
                setCourse(data);
                setError(null);
            } catch (error) {
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    // check if logged in user is "instructor" or not
    const isInstructor = user?.sub === course?.instructorName;

    const handleLessonAdded = (newLesson) => {
        // add the new lesson to list 
        setCourse(prevCourse => ({
            ...prevCourse,
            lessons: [...prevCourse.lessons, newLesson]
        }));
    };

    if (loading) return <p className="p-8 text-center text-lg text-gray-500">Loading course...</p>;
    if (error) return <p className="p-8 text-center text-lg text-red-500">{error}</p>;
    if (!course) return <p className="p-8 text-center text-lg text-gray-500">Course not found.</p>;

    if (!isInstructor) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="text-lg text-gray-600">You are not authorized to edit this course.</p>
                <Link to="/" className="mt-4 inline-block text-blue-600">Go to Homepage</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
         
            <main className="container mx-auto p-8">
                <Link to="/instructor/dashboard" className="mb-4 inline-block text-blue-600 hover:underline">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
                <p className="mt-2 text-lg text-gray-600">{course.description}</p>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <AddLessonForm courseId={course.id} onLessonAdded={handleLessonAdded} />

                    {/* Right Column: Existing Lessons */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-2xl font-semibold">Existing Lessons ({course.lessons.length})</h3>
                        <ul className="space-y-3">
                            {course.lessons.length > 0 ? (
                                course.lessons.map(lesson => (
                                    <li key={lesson.id} className="rounded-md border border-gray-200 p-3">
                                        <p className="font-medium text-gray-700">{lesson.title}</p>
                                        <span className="text-sm text-gray-500">
                                            {lesson.videoUrl ? 'Video' : 'Text'}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No lessons yet.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CourseEditorPage
