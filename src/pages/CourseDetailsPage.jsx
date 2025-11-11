import React, { useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { getCourseById } from '../services/courseService';
import { useEnrollment } from '../context/EnrollmentContext'
import { useProgress } from '../context/ProgressContext';
import CourseInfo from '../components/CourseInfo';
import CourseLessons from '../components/CourseLessons';
import CourseChat from '../components/CourseChat';
import InstructorAnnouncement from '../components/InstructorAnnouncement'
import DiscussionForum from '../components/DiscussionForum';


function CourseDetailsPage() {

  const { courseId } = useParams();
  const { user } = useAuth();

  const { isEnrolled, loadingEnrollments } = useEnrollment();
  const { loadingProgress } = useProgress();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isUserEnrolled = isEnrolled(courseId);
  const isInstructor = user?.authorities?.[0] === 'INSTRUCTOR';


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(courseId);
        setCourse(data);
        setError(null);
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);  // Re-run if the courseId in the URL changes

  if (loading || loadingEnrollments || loadingProgress) {
    return <p className="p-8 text-center text-lg text-gray-500">Loading course...</p>;
  }

  if (error) return <p className="p-8 text-center text-lg text-red-500">{error}</p>;
  if (!course) return <p className="p-8 text-center text-lg text-gray-500">Course not found.</p>;


  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* COURSE INFO */}
      <CourseInfo
        course={course}
        user={user}
        isUserEnrolled={isUserEnrolled}
        isInstructor={isInstructor}
      />

      {isInstructor && course.instructorName === user.sub && (
        <div className="mx-auto mb-6 max-w-4xl">
          <InstructorAnnouncement courseId={courseId} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Lesson List */}
        <CourseLessons
          course={course}
          isUserEnrolled={isUserEnrolled}
          isInstructor={isInstructor}
        />

        {/* Right Column: Chat & Discussions (Placeholders) */}
        <CourseChat
          courseId={courseId}
        />

        <div className="rounded-lg bg-white p-6 shadow-md">
          <DiscussionForum
            courseId={courseId}
            isEnrolled={isEnrolled}
            isInstructor={isInstructor}
          />
        </div>
      
      </div>
    </div>
  )
}

export default CourseDetailsPage
