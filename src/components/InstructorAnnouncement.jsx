import React from 'react'
import { makeAnnouncement } from '../services/courseService';
import { useState } from 'react';

function InstructorAnnouncement({ courseId }) {

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await makeAnnouncement(courseId, message);
            setSuccess('Announcement sent successfully!');
            setMessage('');
        } catch (err) {
            setError('Failed to send announcement.');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
        }
    };

    return (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-6 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">Instructor Panel</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="announcement" className="mb-2 block font-medium text-gray-700">
                    Make an Announcement
                </label>
                <textarea
                    id="announcement"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your announcement here... (e.g., 'Live class in 10 minutes!')"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="mt-4 w-full rounded-lg bg-yellow-300 px-6 py-2 font-bold text-white shadow-md transition-all hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send to All Students'}
                </button>
                {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
        </div>
    )
}

export default InstructorAnnouncement;