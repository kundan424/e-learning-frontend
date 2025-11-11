import { useState, useEffect } from "react";
import { createContext } from "react";
import { getMyEnrolledCourses, enrollInCourse } from '../services/enrollmentService'
import { useContext } from "react";
import { useAuth } from '../hooks/useAuth'

const EnrollmentContext = createContext();


export const EnrollmentProvider = ({ children }) => {
    const { user } = useAuth();
    // We will store just the IDs in a Set for fast lookups (e.g., O(1) checks)
    const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchEnrollments = async () => {
            setLoading(true);
            if (user) {
                // Only fetch if the user is a STUDENT
                if (user.authorities?.includes('STUDENT')) {
                    try {
                        setLoading(true);
                        const courses = await getMyEnrolledCourses(); // API call
                        const ids = courses.map(course => course.id);
                        setEnrolledCourseIds(new Set(ids));
                    } catch (error) {
                        console.error("Failed to load user's enrollments", error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    // If user is an instructor, they don't have enrollments
                    setEnrolledCourseIds(new Set());
                    setLoading(false);
                }
            } else {
                // No user, clear enrollments
                setEnrolledCourseIds(new Set());
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [user]);

    const isEnrolled = (courseId) => {
        return enrolledCourseIds.has(Number(courseId));
    };

    const enroll = async (courseId) => {
        try {
            await enrollInCourse(courseId);
            // Success! Add the new course ID to our local state
            setEnrolledCourseIds(prevIds => new Set(prevIds).add(Number(courseId)));
        } catch (error) {
            console.error("Enrollment failed:", error);
            throw error;
        }
    };

    return (
        <EnrollmentContext.Provider value={{ isEnrolled, enroll, enrolledCourseIds,  loadingEnrollments: loading }}>
            {children}
        </EnrollmentContext.Provider>
    );
}

export const useEnrollment = () => {
    return useContext(EnrollmentContext);
};