import api from "../api/api";

export const markLessonAsComplete = async (lessonId) => {
    try {
        const response = await api.post(`/progress/lesson/${lessonId}/complete`);
        return response.data; // Returns "Lesson marked as complete"
    } catch (error) {
        console.error(`Error marking lesson ${lessonId} complete:`, error);
        throw error;
    }
}

export const getCourseProgress = async (courseId) => {
  try {
    const response = await api.get(`/progress/course/${courseId}`);
    return response.data; // Returns CourseProgressDTO
  } catch (error) {
    console.error(`Error fetching progress for course ${courseId}:`, error);
    throw error;
  }
};

