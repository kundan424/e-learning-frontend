import { useState } from "react";
import { postNewQuestion } from "../services/discussionService";

const AskQuestionModal = ({ courseId, onClose, onQuestionPosted }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const newQuestion = await postNewQuestion(courseId, title, content);
            onQuestionPosted(newQuestion); // Add new question to the list
            onClose(); // Close the modal
        } catch (err) {
            setError('Failed to post question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <h3 className="mb-4 text-2xl font-semibold">Ask a New Question</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Question Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4 w-full rounded-md border border-gray-300 p-2"
                        required
                    />
                    <textarea
                        placeholder="Describe your question..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mb-4 w-full rounded-md border border-gray-300 p-2"
                        rows="5"
                        required
                    />
                    {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                            {loading ? 'Posting...' : 'Post Question'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AskQuestionModal;