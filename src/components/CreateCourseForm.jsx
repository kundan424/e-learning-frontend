import React, { useState } from 'react'
import { createCourse } from '../services/courseService'

function CreateCourseForm({ onCourseCreated }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading();

        try {
            const newCourse = await createCourse(title, description);
            onCourseCreated(newCourse);
            setTitle('')
            setDescription('')
        } catch (err) {
            setError('Failed to create course. Please try again.');
        } finally {
            setLoading(false)
        }
    };



    return (
        <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold">Create a New Course</h3>

            <div className="mb-4">
                <label htmlFor="title" className="mb-1 block font-medium text-gray-700">
                    Course Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="mb-1 block font-medium text-gray-700">
                    Course Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    rows="4"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? 'Creating...' : 'Create Course'}
            </button>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
    )
}

export default CreateCourseForm
