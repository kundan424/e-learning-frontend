import { useState } from "react";
import { useAuth } from '../hooks/useAuth'
import { getQuestionsForCourse } from "../services/discussionService";
import AskQuestionModal from './AskQuestionModal'
import {Link} from 'react-router-dom'

function DiscussionForum({ courseId, isEnrolled, isInstructor }) {

    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useState(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const data = await getQuestionsForCourse(courseId);
                console.log(data)
                setQuestions(data);
            } catch (error) {
                setError('Failed to load questions.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [courseId]);

    // Add the new question to the top of the list
    const handleQuestionPosted = (newQuestion) => {
        setQuestions(prev => [newQuestion, ...prev]);
    };

    if (loading) return <p className="text-gray-500">Loading questions...</p>;
    if (error) return <p className="text-red-600">{error}</p>;


    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Q&A Forum</h2>
            {(isEnrolled || isInstructor) ? (
                <button onClick={() => setShowModal(true)} className="mb-4 w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                    Ask a New Question
                </button>
            ) : (
                <p className="mb-4 text-center text-gray-500">You must be enrolled to ask questions.</p>
            )}

            {showModal && (
                <AskQuestionModal
                    courseId={courseId}
                    onClose={() => setShowModal(false)}
                    onQuestionPosted={handleQuestionPosted}
                />
            )}

            <div className="space-y-4">
                {questions.length === 0 ? (
                    <p className="text-gray-500">No questions have been asked yet.</p>
                ) : (
                    questions.map(q => (
                        <Link
                            key={q.id}
                            to={`/question/${q.id}`} // <-- Use Link
                            className="block rounded-md border border-gray-200 p-4 hover:bg-gray-50"
                        >
                            <h4 className="font-semibold text-blue-700">{q.title}</h4>
                            <p className="text-sm text-gray-600">
                                Asked by {q.authorName} - {q.answerCount} {q.answerCount === 1 ? 'answer' : 'answers'}
                            </p>
                            <span className="mt-2 inline-block text-sm font-medium text-blue-600">
                                View Question &rarr;
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default DiscussionForum;

