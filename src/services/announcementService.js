import api from "../api/api";

export const getAnnouncementContent = async (announcementId) => {
    try {
        const response = await api.get(`/announcements/${announcementId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching announcement ${announcementId}:`, error);
        throw error;
    }
}
