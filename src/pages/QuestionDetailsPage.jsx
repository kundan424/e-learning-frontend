import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { getQuestionDetails } from '../services/discussionService';
import AnswerForm from '../components/AnswerForm'

// Helper to format the date
function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}

function QuestionDetailsPage() {

    const { questionId } = useParams();
    const { user } = useAuth(); // to check if user can answer


    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                const data = await getQuestionDetails(questionId);
                setQuestion(data);
            } catch (err) {
                setError('Failed to load question.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [questionId]);

    const handleAnswerPosted = (newAnswer) => {
        // Add the new answer to the state to update the UI
        setQuestion(prev => ({ ...prev, answers: [...prev.answers, newAnswer] }))
    };

    if (loading) return <p className="p-8 text-center text-lg text-gray-500">Loading question...</p>;
    if (error) return <p className="p-8 text-center text-lg text-red-500">{error}</p>;
    if (!question) return <p className="p-8 text-center text-lg text-gray-500">Question not found.</p>;



    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-3xl">

                {/* Question Block */}
                <div className="rounded-lg bg-white p-8 shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800">{question.title}</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Asked by <span className="font-medium">{question.authorName}</span> on{' '}
                        {formatDate(question.createdAt)}
                    </p>
                    <hr className="my-6" />
                    <div className="prose max-w-none text-gray-700">
                        {question.content}
                    </div>
                </div>

                {/* Answers List */}
                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                        {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                    </h2>
                    <div className="space-y-6">
                        {question.answers.map(answer => (
                            <div key={answer.id} className="rounded-lg bg-white p-6 shadow-md">
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">{answer.authorName}</span> replied on{' '}
                                    {formatDate(answer.createdAt)}
                                </p>
                                <p className="mt-4 text-gray-700">{answer.content}</p>
                            </div>
                        ))}
                        {question.answers.length === 0 && (
                            <p className="text-gray-500">No answers yet. Be the first to reply!</p>
                        )}
                    </div>
                </div>

                {/* Post Answer Form */}
                {user && ( // Only show form if logged in
                    <AnswerForm
                        questionId={questionId}
                        onAnswerPosted={handleAnswerPosted}
                    />
                )}
            </div>
        </div>
    );
}

export default QuestionDetailsPage
