import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users, MessageSquare } from "lucide-react";
import FollowButton from "./FollowButton";

export default function FollowedAthletes() {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

    useEffect(() => {
        axios
            .get("/api/follow/following", config)
            .then((res) => setFollowing(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (following.length === 0) return (
        <div className="text-center py-8 text-gray-500">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">You haven't followed any athletes yet.</p>
            <Link to="/scout-dashboard/explore" className="text-blue-400 text-sm hover:underline mt-1 inline-block">
                Explore Athletes →
            </Link>
        </div>
    );

    return (
        <div className="space-y-3">
            {following.map((f) => {
                const athlete = f.followingId;
                if (!athlete) return null;
                return (
                    <div key={f._id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition group">
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {athlete.name?.[0]?.toUpperCase() || "?"}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{athlete.name}</p>
                            <p className="text-xs text-gray-500 truncate">{athlete.email}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <Link
                                to={`/scout-dashboard/messages?userId=${athlete._id}&userName=${encodeURIComponent(athlete.name)}`}
                                className="p-2 bg-white/10 hover:bg-blue-500/20 rounded-lg transition"
                                title="Message"
                            >
                                <MessageSquare size={16} />
                            </Link>
                            <Link
                                to={`/profile/${athlete._id}`}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-xs font-medium px-3"
                            >
                                View
                            </Link>
                        </div>

                        <FollowButton userId={athlete._id?.toString()} />
                    </div>
                );
            })}
        </div>
    );
}
