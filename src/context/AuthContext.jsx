import React, { useEffect, createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                if (decoded.exp * 1000 < Date.now) {
                    localStorage.removeItem('token');
                    setUser(null);
                    setToken(null);
                } else {
                    setUser(decoded);
                    setToken(storedToken);
                }
            } catch (error) {
                // If token is invalid, clear it
                console.error("Invalid token:", error);
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            }
        }
        setLoading(false);
    }, []);

    // Login function
    const loginAction = (data) => {
        const { token } = data;
        const decoded = jwtDecode(token);

        localStorage.setItem('token', token);
        setUser(decoded);
        setToken(token);
    };

    // Logout function
    const logoutAction = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token,loading, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
