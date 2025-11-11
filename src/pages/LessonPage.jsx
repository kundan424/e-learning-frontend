import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getLessonDetails } from '../services/courseService';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../components/YouTubeEmbed'
import MarkCompleteButton from '../components/MarkCompleteButton'

function LessonPage() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                const data = await getLessonDetails(courseId, lessonId);
                setLesson(data);
            } catch (err) {
                setError('Failed to load lesson. You may not be enrolled.');
                if (err.response && err.response.status === 403) {
                    navigate(`/course/${courseId}`);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [courseId, lessonId, navigate]);



    if (loading) return <p className="p-8 text-center text-lg text-gray-500">Loading lesson...</p>;
    if (error) return <p className="p-8 text-center text-lg text-red-600">{error}</p>;
    if (!lesson) return <p className="p-8 text-center text-lg text-gray-500">Lesson not found.</p>;

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <div className="mx-auto max-w-4xl">
                <Link
                    to={`/course/${courseId}`}
                    className="mb-4 inline-block text-blue-600 hover:underline"
                >
                    &larr; Back to Course
                </Link>
                <h1 className="text-4xl font-bold text-gray-800">{lesson.title}</h1>
                <hr className="my-6" />

                <div className='rounded-lg bg-white p-6 shadow-md'>
                    {lesson.videoUrl && (
                        <div className="mb-6">
                            <YouTubeEmbed url={lesson.videoUrl} />
                        </div>
                    )}
                    
                    {lesson.contentText && (
                        <div className="prose max-w-none text-gray-700 leading-relaxed">
                            {lesson.contentText}
                        </div>
                    )}
                    <MarkCompleteButton lessonId={lesson.id} />
                </div>
            </div>
        </div>
    );
}

export default LessonPage
