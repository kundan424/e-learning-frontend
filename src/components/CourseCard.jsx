import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <div className="m-4 w-80 transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      {/* You can add an image here later */}
      {/* <img className="h-48 w-full object-cover" src={course.imageUrl} alt={course.title} /> */}

      <div className="p-6">
        <h3 className="mb-2 truncate text-2xl font-bold text-gray-800" title={course.title}>
          {course.title}
        </h3>
        <p className="mb-4 h-20 overflow-hidden text-sm text-gray-600">
          {course.description}
        </p>
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Instructor: <span className="font-medium text-gray-700">{course.instructorName}</span>
          </p>
        </div>
        <Link
          to={`/course/${course.id}`}
          className="inline-block rounded-md bg-custom-blue px-4 py-2 text-center font-semibold text-white transition-colors duration-200 hover:bg-dark-blue"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;