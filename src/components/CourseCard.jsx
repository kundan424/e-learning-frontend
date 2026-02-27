import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        <img 
          src={course.imageUrl || "https://via.placeholder.com/400x300"} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <div className="bg-white/90 p-3 rounded-full shadow-lg">
                <svg className="w-5 h-5 ml-1 text-[#49BBBD]" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
            </div>
        </div>
      </div>

      {/* Meta Info (Category & Duration) */}
      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-3">
        <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2l2 2h5a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
            <span>{course.category || 'Design'}</span>
        </div>
        <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{course.duration || '3 Month'}</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-[#2D3436] mb-2 line-clamp-2 leading-snug" title={course.title}>
        {course.title}
      </h3>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-grow">
        {course.description}
      </p>

      {/* Footer / Instructor & Pricing */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <img 
            src={course.instructorAvatar || "https://via.placeholder.com/40"} 
            alt={course.instructorName} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-[#2D3436]">
            {course.instructorName || 'Unknown Instructor'}
          </span>
        </div>
        <div className="flex flex-col items-end">
            {course.oldPrice && <span className="text-xs text-gray-400 line-through">${course.oldPrice}</span>}
            <span className="text-lg font-bold text-[#49BBBD]">${course.price || 'Free'}</span>
        </div>
      </div>
      
      {/* Clickable Overlay */}
      <Link to={`/course/${course.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Details for {course.title}</span>
      </Link>
    </div>
  );
}

export default CourseCard;