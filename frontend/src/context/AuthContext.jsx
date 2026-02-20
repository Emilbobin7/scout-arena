import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // API_URL is imported from config

    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) setUser(userInfo);
        } catch {
            localStorage.removeItem('userInfo');
        }
        setLoading(false);
    }, []);

    // Flatten { token, user: {...} } into a single flat object
    const buildUserInfo = (token, userObj) => ({
        token,
        _id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        role: userObj.role,
    });

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            // data = { token, user: {...} }
            const userInfo = buildUserInfo(data.token, data.user);
            setUser(userInfo);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed. Is the backend server running?'
            };
        }
    };

    const register = async (userData) => {
        try {
            // Step 1: Register the account
            await axios.post(`${API_URL}/api/auth/register`, userData);

            // Step 2: Auto-login to get a token
            const { data } = await axios.post(`${API_URL}/api/auth/login`, {
                email: userData.email,
                password: userData.password,
            });
            const userInfo = buildUserInfo(data.token, data.user);
            setUser(userInfo);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed. Is the backend server running?'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
