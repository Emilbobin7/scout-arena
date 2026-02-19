import { useState, useEffect } from "react";
import axios from "axios";
import { Users } from "lucide-react";

export default function FollowersCount({ userId }) {
    const [count, setCount] = useState(null);

    useEffect(() => {
        if (!userId) return;
        axios
            .get(`/api/follow/followers/${userId}`)
            .then((res) => setCount(res.data.count))
            .catch(() => setCount(0));
    }, [userId]);

    if (count === null) return null;

    return (
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Users size={14} />
            <span className="font-semibold text-white">{count}</span>
            <span>{count === 1 ? "Follower" : "Followers"}</span>
        </div>
    );
}
