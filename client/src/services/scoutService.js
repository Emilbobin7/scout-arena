import api from '../utils/api';

export const getScoutProfile = async () => {
    const { data } = await api.get('/scout/profile');
    return data;
};

export const updateScoutProfile = async (formData) => {
    const { data } = await api.put('/scout/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
};

export const getScoutStats = async () => {
    const { data } = await api.get('/scout/stats');
    return data;
};

export const getAthletes = async () => {
    const { data } = await api.get('/scout');
    return data;
};

export const searchAthletes = async (params) => {
    const { data } = await api.get('/scout/search', { params });
    return data;
};
