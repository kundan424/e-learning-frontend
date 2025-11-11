
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAnnouncementContent } from '../services/announcementService';
import { Link } from 'react-router-dom';

function AnnouncementPage() {

    const { announcementId } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                console.log("Fetching announcement ID:", announcementId);
                setLoading(true);
                const data = await getAnnouncementContent(announcementId);
                console.log("Fetched announcement data:", data);
                setAnnouncement(data);
            } catch (err) {
                console.error("Error fetching announcement:", err);
                setError('Failed to load announcement.');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [announcementId]);

    function parseJavaDate(dateTimeArray) {
        if (!Array.isArray(dateTimeArray) || dateTimeArray.length < 6) { return new Date(); }
        return new Date(dateTimeArray[0], dateTimeArray[1] - 1, dateTimeArray[2], dateTimeArray[3], dateTimeArray[4], dateTimeArray[5]);
    }

    if (loading) return <p className="p-8 text-center text-lg text-gray-500">Loading...</p>;
    if (error) return <p className="p-8 text-center bg-green-400 text-lg text-red-500">{error}</p>;
    if (!announcement) return <p className="p-8 text-center text-lg text-gray-500">Announcement not found.</p>;


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
               
                <h1 className="text-3xl font-bold text-gray-800">{announcement.courseTitle}</h1>

                <p className="mt-2 text-sm text-gray-500">
                    Posted by <span className="font-medium">{announcement.instructorName}</span> on{' '}
                    {parseJavaDate(announcement.createdAt).toLocaleString()}
                </p>
                
                <hr className="my-6" />

                {/* Render the announcement content */}
                <div className="prose max-w-none text-gray-700">
                    {announcement.content}
                </div>
            
                <Link
                    to={`/course/${announcement.courseId}`}
                    className="mt-8 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                    &larr; Back to Course
                </Link>
            </div>
        </div>
    )
}

export default AnnouncementPage

