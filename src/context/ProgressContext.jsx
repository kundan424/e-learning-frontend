import { createContext, use, useContext, useEffect, useState } from "react"
import { useAuth } from '../hooks/useAuth'
import { useEnrollment } from "./EnrollmentContext";
import { getCourseProgress, markLessonAsComplete as apiMarkLesson } from "../services/progressService";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();

    const { enrolledCourseIds, loadingEnrollments } = useEnrollment();
    
    const [completedLessonIds, setCompletedLessonIds] = useState(new Set());
    const [loadingProgress, setLoadingProgress] = useState(true);


    // fetch progress of all enrolled courses when user logs in or enrolls
    useEffect(() => {
        const fetchAllProgress = async () => {

            if (!user || loadingEnrollments) {
                setLoadingProgress(true); // Keep loading
                if (!user) setCompletedLessonIds(new Set()); // Reset on logout
                return;
            }

            setLoadingProgress(true);
            if (enrolledCourseIds.size === 0) {
                setCompletedLessonIds(new Set());
                setLoadingProgress(false);
                return;
            }
            try {
                const allCompletedIds = new Set();
                for (const courseId of enrolledCourseIds) {
                    try {
                        const progress = await getCourseProgress(courseId);
                        if (progress.completedLessonIds) {
                            progress.completedLessonIds.forEach((id) => allCompletedIds.add(id));
                        }
                    } catch (error) {
                        console.error(`Failed to fetch progress for course ${courseId}`, error);
                    }
                }
                setCompletedLessonIds(allCompletedIds);
            } catch (error) {
                console.error("Failed to fetch user progress", error);
                setCompletedLessonIds(new Set());
            } finally {
                setLoadingProgress(false);
            }
        };

        fetchAllProgress();
    }, [user, enrolledCourseIds, loadingEnrollments]);


    // check if a lesson in completed
    const isLessonComplete = (lessonId) => {
        return completedLessonIds.has(Number(lessonId));
    }

    // Add a newly completed lesson to the set
    const markLessonComplete = async (lessonId) => {
        try {
            await apiMarkLesson(lessonId);
            setCompletedLessonIds((prev) => new Set(prev).add(Number(lessonId)));
        } catch (error) {
            console.error("Failed to mark lesson complete", error);
        }
    };

    return (
        <ProgressContext.Provider value={{ isLessonComplete, markLessonComplete, loadingProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    return useContext(ProgressContext);
}
