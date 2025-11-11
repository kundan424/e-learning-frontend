import api from "../api/api";

export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    // Our backend returns a list of CourseResponseDTO
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Re-throw the error so the component can handle it
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    // Our backend returns a CourseDetailsDTO
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    throw error;
  }
};

export const getLessonDetails = async (courseId, lessonId) => {
  try {
    const response = await api.get(`/courses/${courseId}/lessons/${lessonId}`);
    return response.data; // Returns LessonResponseDTO
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId}:`, error);
    throw error;
  }
};


export const makeAnnouncement = async (courseId, content) => {
  try {
    // We send the raw string as the request body
    const response = await api.post(`/courses/${courseId}/announce`, content, {
      // Set the content type to plain text
      headers: { 'Content-Type': 'text/plain' }
    });
    return response.data; // Returns "Announcement sent"
  } catch (error) {
    console.error(`Error making announcement for course ${courseId}:`, error);
    throw error;
  }
};

export const createCourse = async (title, description) => {
  try {
    const response = await api.post('/courses', { title, description });
    return response.data; // Returns the new Course object
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const addLessonToCourse = async (courseId, title, contentText, videoUrl) => {
  try {
    const response = await api.post(`/courses/${courseId}/lessons`, {
      title,
      contentText,
      videoUrl
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding lesson to course ${courseId}:`, error);
    throw error;
  }
};
