import React, { useState } from 'react'
import { addLessonToCourse } from '../services/courseService';

function AddLessonForm({ courseId, onLessonAdded }) {

    const [title, setTitle] = useState('');
    const [contentText, setContentText] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const newLesson = await addLessonToCourse(courseId, title, contentText, videoUrl);
            onLessonAdded(newLesson); // Pass the new lesson up to the parent
            // Clear the form
            setTitle('');
            setContentText('');
            setVideoUrl('');
        } catch (err) {
            setError('Failed to add lesson. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold">Add a New Lesson</h3>

            <div className="mb-4">
                <label htmlFor="lessonTitle" className="mb-1 block font-medium">Lesson Title</label>
                <input
                    id="lessonTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="videoUrl" className="mb-1 block font-medium">YouTube Video URL (Optional)</label>
                <input
                    id="videoUrl"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-md border border-gray-300 p-2"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="contentText" className="mb-1 block font-medium">Text Content (Optional)</label>
                <textarea
                    id="contentText"
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    placeholder="Type your lesson text here..."
                    className="w-full rounded-md border border-gray-300 p-2"
                    rows="6"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Lesson'}
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
    );
}

export default AddLessonForm
