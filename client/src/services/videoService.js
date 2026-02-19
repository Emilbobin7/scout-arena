import api from '../utils/api';

export const getMyVideos = async () => {
    const { data } = await api.get('/videos');
    return data;
};

export const getUserVideos = async (userId) => {
    const { data } = await api.get(`/videos/${userId}`);
    return data;
};

export const uploadVideo = async (formData) => {
    const { data } = await api.post('/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
};

export const deleteVideo = async (id) => {
    const { data } = await api.delete(`/videos/${id}`);
    return data;
};
