import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Heart, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActivityFeed = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                const { data } = await axios.get('/api/activity', config);
                setActivities(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching activity:", error);
                setLoading(false);
            }
        };

        fetchActivity();
    }, []);

    if (loading) return <div className="text-gray-400 text-sm">Loading activity...</div>;
    if (activities.length === 0) return <div className="text-gray-400 text-sm">No recent activity. Follow athletes to see updates!</div>;

    const getIcon = (type) => {
        switch (type) {
            case 'follow': return <UserPlus size={16} className="text-blue-400" />;
            case 'like': return <Heart size={16} className="text-red-400" />;
            case 'upload': return <Video size={16} className="text-green-400" />;
            default: return <UserPlus size={16} className="text-gray-400" />;
        }
    };

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity._id} className="flex gap-3 items-start p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition">
                    <div className="mt-1 p-2 bg-slate-800 rounded-full">
                        {getIcon(activity.type)}
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">
                            <span className="font-bold text-white">{activity.userId?.name || 'Someone'}</span>
                            {' '}{activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(activity.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityFeed;
