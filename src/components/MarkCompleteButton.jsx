
import React from 'react'
import { useState } from 'react';
import { useProgress } from '../context/ProgressContext'


function MarkCompleteButton({ lessonId }) {

    const { isLessonComplete, markLessonComplete } = useProgress();
    const [loading, setLoading] = useState(false);

    const isComplete = isLessonComplete(lessonId);

    const handleClick = async () => {
        setLoading(true);
        try {
            await markLessonComplete(lessonId);
        } catch (error) {
            console.error("Failed to mark complete", error);
        } finally {
            setLoading(false);
        }
    };

    if (isComplete) {
        return (
            <div className="mt-6 rounded-md bg-green-100 p-4 text-center font-semibold text-green-700">
                ✅ Lesson Completed
            </div>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? "Saving..." : "Mark as Complete"}
        </button>
    );
}

export default MarkCompleteButton;
