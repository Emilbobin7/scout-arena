import { useState } from 'react';
import { UserPlus, UserCheck } from 'lucide-react';
import { followUser, unfollowUser } from '../services/followService';

const FollowButton = ({ targetUserId, initialFollowing = false, onToggle }) => {
    const [following, setFollowing] = useState(initialFollowing);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            if (following) {
                await unfollowUser(targetUserId);
                setFollowing(false);
            } else {
                await followUser(targetUserId);
                setFollowing(true);
            }
            if (onToggle) onToggle(!following);
        } catch (error) {
            console.error('Follow toggle error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${following
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {following ? <UserCheck size={16} /> : <UserPlus size={16} />}
            {loading ? 'Loading...' : following ? 'Following' : 'Follow'}
        </button>
    );
};

export default FollowButton;
