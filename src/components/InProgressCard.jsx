import { Link } from 'react-router-dom';

function InProgressCard({ item }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow relative">
            <div className="w-full h-40 rounded-xl overflow-hidden">
                <img src={item.imageUrl || "https://via.placeholder.com/400x200"} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-[#2D3436] line-clamp-1">{item.title}</h4>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <img src={item.instructorAvatar || "https://via.placeholder.com/40"} alt="Instructor" className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-gray-500">{item.instructorName}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-[#49BBBD] h-1.5 rounded-full" style={{ width: `${item.progress || 0}%` }}></div>
                </div>
                <div className="text-right text-xs text-gray-400 mt-1">Lesson {item.currentLesson} of {item.totalLessons}</div>
            </div>

            <Link to={`/course/${item.id}`} className="absolute inset-0 z-10"><span className="sr-only">Continue Course</span></Link>
        </div>
    );
}

export default InProgressCard;
