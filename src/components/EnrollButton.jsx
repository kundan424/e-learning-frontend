import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";
import { useState } from "react";
function EnrollButton({ courseId }) {
    const { enroll } = useEnrollment();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        try {
            await enroll(courseId);
            // Success is handled by the context, which will re-render the page
        } catch (err) {
            setError('Enrollment failed. You may already be enrolled.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={loading}
                className="w-1/6 rounded-lg bg-custom-blue px-6 py-3 text-lg font-bold text-white shadow-md transition-all hover:bg-dark-blue disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? 'Enrolling...' : 'Enroll Now'}
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}

export default EnrollButton;