import { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import api from '../../utils/api';
import Loader from '../../components/Loader';

const Feed = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const { data } = await api.get('/social/activity');
                setActivities(data);
            } catch (error) {
                console.error('Feed error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    if (loading) return <Loader text="Loading feed..." />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Activity Feed</h1>

            {activities.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center border border-white/10">
                    <MessageSquare size={48} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400 text-lg mb-2">Your feed is empty</p>
                    <p className="text-gray-600 text-sm">Follow athletes and scouts to see their activity here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity._id} className="glass rounded-xl p-4 border border-white/10 flex items-start gap-4">
                            <img
                                src={activity.userId?.profilePhoto || 'https://via.placeholder.com/40'}
                                alt={activity.userId?.name}
                                className="w-10 h-10 rounded-full object-cover border border-white/10"
                            />
                            <div className="flex-1">
                                <p className="text-white">
                                    <span className="font-semibold">{activity.userId?.name || 'Someone'}</span>
                                    {' '}<span className="text-gray-400">{activity.description}</span>
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {new Date(activity.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Feed;
