import { useState, useEffect } from "react";
import axios from "axios";
import { UserCheck, UserPlus } from "lucide-react";
import { API_URL } from "../config";

export default function FollowButton({ userId, userName, compact = false }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [working, setWorking] = useState(false);

    const getConfig = () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
        return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
    };

    useEffect(() => {
        if (!userId) return;
        axios
            .get(`${API_URL}/api/follow/status/${userId}`, getConfig())
            .then((res) => setIsFollowing(res.data.isFollowing))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [userId]);

    const handleToggle = async () => {
        if (working) return;
        setWorking(true);
        try {
            if (isFollowing) {
                await axios.delete(`${API_URL}/api/follow`, { ...getConfig(), data: { followingId: userId } });
                setIsFollowing(false);
            } else {
                await axios.post(`${API_URL}/api/follow`, { followingId: userId }, getConfig());
                setIsFollowing(true);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Action failed");
        } finally {
            setWorking(false);
        }
    };

    if (loading) return <div className={`${compact ? 'h-9' : 'h-10'} bg-slate-700/50 rounded-xl animate-pulse w-full`} />;

    if (compact) {
        // Compact mode for athlete cards
        return (
            <button
                onClick={handleToggle}
                disabled={working}
                className={`w-full py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 ${isFollowing
                    ? "bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/15 text-gray-300"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-md shadow-blue-500/20"
                    }`}
            >
                {working ? (
                    <span className="animate-spin">⟳</span>
                ) : isFollowing ? (
                    <><UserCheck size={12} /> Following</>
                ) : (
                    <><UserPlus size={12} /> Follow</>
                )}
            </button>
        );
    }

    // Default (full) mode
    return (
        <button
            onClick={handleToggle}
            disabled={working}
            className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${isFollowing
                ? "bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/20 text-white"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30"
                }`}
        >
            {working
                ? "..."
                : isFollowing
                    ? "Following ✓"
                    : `Follow${userName ? ` ${userName}` : ""}`}
        </button>
    );
}
