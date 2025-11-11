import React from 'react'
import EnrollButton from './EnrollButton'

function CourseInfo({ course, user, isUserEnrolled, isInstructor }) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
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
        <p className="mt-4 rounded-md bg-green-100 p-3 text-center font-semibold text-green-700">
          You are enrolled in this course.
        </p>
      )}
    </div>
  )
}

export default CourseInfo
