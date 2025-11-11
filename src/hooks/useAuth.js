import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// A custom hook that simplifies accessing the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};