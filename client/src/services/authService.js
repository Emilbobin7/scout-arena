import api from '../utils/api';

export const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
};

export const register = async (userData) => {
    const { data } = await api.post('/auth/signup', userData);
    return data;
};

export const getMe = async () => {
    const { data } = await api.get('/auth/me');
    return data;
};
