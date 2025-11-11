import api from "../api/api";

export const getContacts = async () => {
    try {
        const response = await api.get('/users/contacts');
        return response.data; // Returns List<UserDTO>
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

