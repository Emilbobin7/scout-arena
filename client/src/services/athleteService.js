import api from '../utils/api';

// Profile
export const getProfile = async () => {
    const { data } = await api.get('/athlete/profile');
    return data;
};

export const updateProfile = async (formData) => {
    const { data } = await api.put('/athlete/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
};

export const getProfileByUserId = async (userId) => {
    const { data } = await api.get(`/athlete/profile/${userId}`);
    return data;
};

// Achievements
export const getAchievements = async () => {
    const { data } = await api.get('/athlete/achievements');
    return data;
};

export const addAchievement = async (achievementData) => {
    const { data } = await api.post('/athlete/achievements', achievementData);
    return data;
};

export const deleteAchievement = async (id) => {
    const { data } = await api.delete(`/athlete/achievements/${id}`);
    return data;
};

// Analytics
export const getAnalytics = async () => {
    const { data } = await api.get('/athlete/analytics');
    return data;
};
