import api from "../api/api";
import { useState } from "react";
export const getMyEnrolledCourses = async () => {
    try {
        const response = await api.get('/enroll/my-courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        throw error;
    }
};


export const enrollInCourse = async (courseId) => {
    try {
        const response = await api.post(`/enroll/${courseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error enrolling in course ${courseId}:`, error);
        throw error;
    }
};