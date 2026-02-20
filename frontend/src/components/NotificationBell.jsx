import { useState, useEffect, useRef, useCallback } from 'react';
import { Bell, Check, CheckCheck, UserPlus, MessageSquare, Trophy, Heart, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const POLL_INTERVAL = 30000; // 30s polling

const TYPE_META = {
    follow: { icon: UserPlus, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/20' },
    message: { icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-500/15 border-green-500/20' },
    like: { icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/15 border-pink-500/20' },
    system: { icon: Bell, color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/20' },
    comment: { icon: Trophy, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/20' },
};

const getTypeMeta = (type) => TYPE_META[type] || TYPE_META.system;

const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
};

const getConfig = () => {
    const token = JSON.parse(localStorage.getItem('userInfo') || 'null')?.token;
    return { headers: { Authorization: `Bearer ${token}` } };
};

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const unread = notifications.filter(n => !n.read).length;

    const fetchNotifications = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/notifications`, getConfig());
            setNotifications(data);
        } catch { /* silent */ }
    }, []);

    // Fetch on mount + poll every 30s
    useEffect(() => {
        fetchNotifications();
        const id = setInterval(fetchNotifications, POLL_INTERVAL);
        return () => clearInterval(id);
    }, [fetchNotifications]);

    // Close on click outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const markRead = async (id) => {
        try {
            await axios.put(`${API_URL}/api/notifications/${id}/read`, {}, getConfig());
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch { /* silent */ }
    };

    const markAllRead = async () => {
        try {
            setLoading(true);
            await axios.put(`${API_URL}/api/notifications/read-all`, {}, getConfig());
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch { /* silent */ }
        finally { setLoading(false); }
    };

    const handleNotificationClick = (n) => {
        if (!n.read) markRead(n._id);
        // Navigate based on type
        const myInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const base = myInfo?.role === 'scout' ? '/scout-dashboard' : '/dashboard';
        if (n.type === 'message') navigate(`${base}/messages`);
        setOpen(false);
    };

    const goToAllNotifications = () => {
        const myInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const base = myInfo?.role === 'scout' ? '/scout-dashboard' : '/dashboard';
        navigate(`${base}/notifications`);
        setOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setOpen(prev => !prev)}
                className={`relative p-2 rounded-xl transition-all ${open
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                aria-label="Notifications"
            >
                <Bell size={20} className={unread > 0 ? 'animate-[wiggle_0.5s_ease-in-out]' : ''} />
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-lg shadow-red-500/40 ring-2 ring-slate-900">
                        {unread > 99 ? '99+' : unread}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Bell size={15} className="text-blue-400" />
                            <span className="font-bold text-white text-sm">Notifications</span>
                            {unread > 0 && (
                                <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                                    {unread} new
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {unread > 0 && (
                                <button
                                    onClick={markAllRead}
                                    disabled={loading}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-blue-400 transition-all"
                                    title="Mark all as read"
                                >
                                    <CheckCheck size={14} />
                                </button>
                            )}
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                            <div className="py-10 text-center">
                                <Bell size={32} className="mx-auto text-gray-700 mb-2" />
                                <p className="text-gray-500 text-sm">All caught up!</p>
                            </div>
                        ) : (
                            notifications.slice(0, 10).map((n) => {
                                const { icon: Icon, color, bg } = getTypeMeta(n.type);
                                return (
                                    <div
                                        key={n._id}
                                        onClick={() => handleNotificationClick(n)}
                                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-white/5 last:border-0 transition-all ${n.read
                                            ? 'hover:bg-white/3 opacity-60'
                                            : 'bg-blue-500/5 hover:bg-blue-500/10'
                                            }`}
                                    >
                                        {/* Sender avatar or icon */}
                                        <div className={`w-9 h-9 rounded-full flex-shrink-0 border flex items-center justify-center ${bg}`}>
                                            {n.fromUser?.profilePhoto && !n.fromUser.profilePhoto.includes('placeholder') ? (
                                                <img src={n.fromUser.profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <Icon size={15} className={color} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white leading-snug">
                                                {n.fromUser?.name && (
                                                    <span className="font-semibold">{n.fromUser.name} </span>
                                                )}
                                                <span className="text-gray-300">{n.message}</span>
                                            </p>
                                            <p className="text-xs text-gray-600 mt-0.5">{timeAgo(n.createdAt)}</p>
                                        </div>

                                        {/* Unread dot */}
                                        {!n.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 shadow-lg shadow-blue-500/50" />
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-white/10">
                            <button
                                onClick={goToAllNotifications}
                                className="w-full text-center text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors py-1"
                            >
                                View all notifications →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
