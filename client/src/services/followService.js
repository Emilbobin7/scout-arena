import api from '../utils/api';

export const followUser = async (followingId) => {
    const { data } = await api.post('/follow', { followingId });
    return data;
};

export const unfollowUser = async (followingId) => {
    const { data } = await api.delete('/follow', { data: { followingId } });
    return data;
};

export const getFollowing = async () => {
    const { data } = await api.get('/follow');
    return data;
};

export const likeVideo = async (videoId) => {
    const { data } = await api.post('/like', { videoId });
    return data;
};

export const unlikeVideo = async (videoId) => {
    const { data } = await api.delete('/like', { data: { videoId } });
    return data;
};
