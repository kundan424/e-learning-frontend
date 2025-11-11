import React, {useState} from "react";
import { postAnswerToQuestion } from "../services/discussionService";


const AnswerForm = ({ questionId, onAnswerPosted }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newAnswer = await postAnswerToQuestion(questionId, content);
      onAnswerPosted(newAnswer); // Add new answer to the list
      setContent(''); // Clear the form
    } catch (error) {
      console.error('Failed to post answer', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <h3 className="mb-2 text-lg font-semibold">Post Your Answer</h3>
      <textarea
        placeholder="Type your answer here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-2 w-full rounded-md border border-gray-300 p-2"
        rows="4"
        required
      />
      <button 
        type="submit" 
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Answer'}
      </button>
    </form>
  );
};

export default AnswerForm;