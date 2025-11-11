import React from 'react'
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

function CourseLessons({ course, isUserEnrolled, isInstructor }) {
    const { isLessonComplete } = useProgress();

    if (!course.lessons || course.lessons.length === 0) {
        return (
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Lessons</h2>
                <p className="text-gray-500">No lessons have been added to this course yet.</p>
            </div>
        );
    }
    
    return (
        <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Lessons</h2>
            <ul className="space-y-3">
                {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson) => {
                        const isComplete = isLessonComplete(lesson.id);
                        return (
                            <li
                                key={lesson.id}
                                className="flex items-center justify-between rounded-md border border-gray-200 p-4"
                            >
                                <div className="flex items-center">
                                    {/* This UI is correct per your request */}
                                    {isComplete ? (
                                        <span className="text-2xl text-green-500">✅</span>
                                    ) : (
                                        <span className="mr-3 text-2xl text-gray-400">◻️</span>
                                    )}
                                    <span className={`text-lg ${isComplete ? 'text-gray-500 ' : 'text-gray-700'}`}>
                                        {lesson.title}
                                    </span>
                                </div>

                                {(isUserEnrolled || isInstructor) ? (
                                    <Link
                                        to={`/course/${course.id}/lesson/${lesson.id}`}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        {isComplete ? 'Review' : 'Start'}
                                    </Link>
                                ) : (
                                    <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-500">Locked 🔒</span>
                                )}
                            </li>
                        )
                    })
                ) : (
                    <p className="text-gray-500">No lessons have been added to this course yet.</p>
                )}
            </ul>
        </div>
    )
}

export default CourseLessons
