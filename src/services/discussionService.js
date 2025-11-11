import api from '../api/api'

export const getQuestionsForCourse = async (courseId) => {
    try {
        const response = await api.get(`/discussions/course/${courseId}/questions`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching questions for course ${courseId}:`, error);
        throw error;
    }
};

// post a new question 
export const postNewQuestion = async (courseId, title, content) => {
    try {
        const response = await api.post(`/discussions/course/${courseId}/questions`, {
            title,
            content
        });
        return response.data;  // Returns the new QuestionSummaryDTO
    } catch (error) {
        console.error('Error posting new question:', error);
        throw error;
    }
};

export const getQuestionDetails = async (questionId) => {
    try {
        const response = await api.get(`/discussions/questions/${questionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching question ${questionId}:`, error);
        throw error;
    }
};

export const postAnswerToQuestion = async (questionId, content) => {
    try {
        const response = await api.post(`/discussions/questions/${questionId}/answers`, {
            content
        });
        return response.data;
    } catch (error) {
        console.error('Error posting new answer:', error);
        throw error;
    }
};
