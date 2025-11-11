import api from "../api/api";

export const getMyNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data; // Returns List<Notification>   
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await api.post(`/notifications/${notificationId}/read`);
        return response.data;
    } catch (error) {
        console.error(`Error marking notification as read:`, error);
        throw error;
    }
}