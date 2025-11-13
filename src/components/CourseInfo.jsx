import React from 'react'
import EnrollButton from './EnrollButton'
import { Link, Links } from 'react-router-dom'

function CourseInfo({ course, user, isUserEnrolled, isInstructor }) {
  return (
    <div className="mb-6 rounded-lg p-6 ">
      <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
      <p className="mt-2 text-lg text-gray-600">{course.description}</p>
      <p className="mt-4 text-gray-700">
        Instructor: <span className="font-semibold">{course.instructorName}</span>
      </p>

      {user && !isUserEnrolled && !isInstructor && (
        <div className="mt-6">
          <EnrollButton courseId={course.id} />
        </div>
      )}

      {user && isUserEnrolled && (
        <Link to={`/course/${course.id}`}>
        <p className="w-1/6 mt-4 rounded-md bg-custom-blue p-3 text-center font-semibold text-white">
          Go to course
        </p>
        </Link>
      )}
    </div>
  )
}

export default CourseInfo
