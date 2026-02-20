import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Eye, TrendingUp, Activity, Video, Award, UserPlus, Zap } from 'lucide-react';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import FollowedAthletes from '../../components/FollowedAthletes';

const ACTIVITY_ICONS = {
    video: <Video className="w-4 h-4 text-blue-400" />,
    follow: <UserPlus className="w-4 h-4 text-purple-400" />,
    achievement: <Award className="w-4 h-4 text-yellow-400" />,
    join: <Users className="w-4 h-4 text-green-400" />,
};

const formatTime = (dateString) => {
    const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

const ScoutDashboard = () => {
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

        const fetchAll = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    axios.get(`${API_URL}/api/scout/stats`, config),
                    axios.get(`${API_URL}/api/activity`, config).catch(() => ({ data: [] })),
                ]);
                setStats(statsRes.data);
                setActivity(activityRes.data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-8 space-y-10">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                        <Users className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Network Access</p>
                        <h3 className="text-2xl font-bold text-white">{stats?.totalAthletes || 0} Athletes</h3>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                        <Eye className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Following</p>
                        <h3 className="text-2xl font-bold text-white">{stats?.followingCount || 0} Profiles</h3>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                        <Activity className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Recent Activity</p>
                        <h3 className="text-2xl font-bold text-white">
                            {activity.length > 0 ? formatTime(activity[0]?.createdAt) : 'None yet'}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions + Recent Activity side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                    <Link to="/scout-dashboard/explore" className="group glass p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Explore Athletes</h3>
                            <p className="text-gray-400 text-sm mt-1">Search and filter our database of talent</p>
                        </div>
                        <TrendingUp className="h-7 w-7 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    </Link>

                    <Link to="/scout-dashboard/profile" className="group glass p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Manage Profile</h3>
                            <p className="text-gray-400 text-sm mt-1">Update your scout credentials and details</p>
                        </div>
                        <Users className="h-7 w-7 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </Link>
                </div>

                {/* Recent Platform Activity */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-400" />
                        Recent Activity
                    </h2>
                    <div className="glass rounded-xl border border-white/10 overflow-hidden">
                        {activity.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                <Activity className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                No recent platform activity yet
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {activity.map(item => (
                                    <div key={item._id} className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-400">
                                            {item.userId?.name?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white">
                                                <Link to={`/profile/${item.userId?._id}`} className="font-semibold hover:text-blue-400 transition-colors">
                                                    {item.userId?.name || 'Unknown'}
                                                </Link>
                                                <span className="text-gray-400 font-normal ml-1">{item.text}</span>
                                            </p>
                                            <p className="text-xs text-gray-600 mt-0.5">{formatTime(item.createdAt)}</p>
                                        </div>
                                        <div className="flex-shrink-0 mt-0.5">
                                            {ACTIVITY_ICONS[item.type] || <Zap className="w-4 h-4 text-gray-500" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Followed Athletes */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" /> Athletes You Follow
                </h2>
                <FollowedAthletes />
            </div>
        </div>
    );
};

export default ScoutDashboard;
