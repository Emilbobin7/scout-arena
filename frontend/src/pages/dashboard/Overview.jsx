import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Video, Award } from 'lucide-react';
import ActivityFeed from '../../components/dashboard/ActivityFeed';

const Overview = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const [profileRes, videosRes, achievementsRes] = await Promise.all([
                    axios.get('/api/athlete/profile', config),
                    axios.get('/api/videos', config),
                    axios.get('/api/athlete/achievements', config)
                ]);

                setData({
                    profile: profileRes.data,
                    videos: videosRes.data,
                    achievements: achievementsRes.data
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Handle 404 for profile (new user)
                if (error.response && error.response.status === 404) {
                    setData({ profile: {}, videos: [], achievements: [] });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-white flex justify-center items-center h-64">Loading...</div>;
    // if (!data) return <div className="text-white">Error loading data.</div>; // Handled in catch

    const { profile, videos, achievements } = data || { profile: {}, videos: [], achievements: [] };
    const user = JSON.parse(localStorage.getItem('userInfo'));

    // Calculate average skill score
    let avgSkill = 0;
    if (profile && profile.stats) {
        // Use pre-calculated stats if available
        const { speed, agility, accuracy, reaction } = profile.stats;
        if (speed || agility) {
            avgSkill = Math.round((speed + agility + accuracy + reaction) / 4);
        }
    }

    // Fallback if stats are 0 but we have videos (e.g. legacy or not updated)
    if (avgSkill === 0 && videos && videos.length > 0) {
        const total = videos.reduce((acc, vid) => {
            return acc + ((vid.speedScore + vid.agilityScore + vid.accuracyScore + vid.reactionScore) / 4);
        }, 0);
        avgSkill = Math.round(total / videos.length);
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Welcome back, {profile.name}</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass p-6 rounded-xl border border-white/10 hover:scale-105 transition transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm">Profile Status</p>
                            <h3 className="text-xl font-bold mt-1">Active</h3>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                            <Activity size={24} />
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-white/10 hover:scale-105 transition transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm">Total Videos</p>
                            <h3 className="text-2xl font-bold mt-1">{videos.length}</h3>
                        </div>
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                            <Video size={24} />
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-white/10 hover:scale-105 transition transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm">Achievements</p>
                            <h3 className="text-2xl font-bold mt-1">{achievements.length}</h3>
                        </div>
                        <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
                            <Award size={24} />
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-white/10 hover:scale-105 transition transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm">Avg. Skill Score</p>
                            <h3 className="text-2xl font-bold mt-1">{avgSkill}</h3>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                            <Activity size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-4">Activity Feed</h3>
                    <ActivityFeed />
                </div>

                <div className="glass rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-4">Profile Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400">Sport</span>
                            <span>{profile.sport}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400">Position</span>
                            <span>{profile.position}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400">Location</span>
                            <span>{profile.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
