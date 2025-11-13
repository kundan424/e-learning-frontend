import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/authService';
import Header from '../components/Header';
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { loginAction } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await login(username, password);
            loginAction(data);
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen font-Inter bg-peach ">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.02]">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 bg-">
                    Welcome Back 
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:outline-none transition"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:outline-none transition"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && (
                        <p className="text-red-600 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-custom-blue text-white py-2 rounded-lg font-semibold hover:bg-dark-blue transition-all shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-6">
                    Don’t have an account?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-custom-bluew font-semibold hover:underline cursor-pointer"
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
