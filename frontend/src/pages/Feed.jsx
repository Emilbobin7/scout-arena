import { useEffect, useState } from "react";
import axios from "axios";
import { Activity, User, Video, Award, UserPlus, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Feed() {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const { data } = await axios.get("/api/activity");
                setFeed(data);
            } catch (error) {
                console.error("Failed to fetch feed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
        // Poll every 30 seconds for new activity
        const interval = setInterval(fetchFeed, 30000);
        return () => clearInterval(interval);
    }, []);

    const getActivityIcon = (type) => {
        switch (type) {
            case "video": return <Video className="w-5 h-5 text-blue-400" />;
            case "follow": return <UserPlus className="w-5 h-5 text-purple-400" />;
            case "achievement": return <Award className="w-5 h-5 text-yellow-400" />;
            case "join": return <User className="w-5 h-5 text-green-400" />;
            default: return <Zap className="w-5 h-5 text-gray-400" />;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Activity className="text-blue-500" /> Activity Feed
                </h1>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Live Updates
                </div>
            </div>

            <div className="space-y-4">
                {feed.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-white/5 rounded-xl border border-white/10">
                        <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No recent activity. Be the first to start something!</p>
                    </div>
                ) : (
                    feed.map((item) => (
                        <div key={item._id} className="bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-xl border border-white/10 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Avatar / Icon */}
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
                                    {item.userId?.profilePhoto && !item.userId.profilePhoto.includes("placeholder") ? (
                                        <img
                                            src={item.userId.profilePhoto}
                                            alt={item.userId.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-bold text-lg text-gray-400">
                                            {item.userId?.name?.[0]?.toUpperCase() || "?"}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1 border border-white/10">
                                    {getActivityIcon(item.type)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className="text-white text-lg">
                                        <Link
                                            to={item.userId?._id ? `/profile/${item.userId._id}` : "#"}
                                            className="font-semibold hover:text-blue-400 transition-colors"
                                        >
                                            {item.userId?.name || "Unknown User"}
                                        </Link>
                                        <span className="text-gray-300 font-light ml-2">
                                            {item.text}
                                        </span>
                                    </p>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                        {formatTime(item.createdAt)}
                                    </span>
                                </div>

                                {/* Contextual content based on type could go here */}
                                {item.type === 'video' && (
                                    <div className="mt-2 text-sm text-blue-400 flex items-center gap-1">
                                        <Video size={14} /> Available to watch on profile
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
