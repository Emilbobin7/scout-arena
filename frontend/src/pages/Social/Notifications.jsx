import { useState, useEffect } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const getConfig = () => {
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    useEffect(() => { fetchNotifications(); }, []);

    const fetchNotifications = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/notifications`, getConfig());
            setNotifications(data);
        } catch (error) {
            console.error('Notifications error:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAllRead = async () => {
        try {
            await axios.put(`${API_URL}/api/notifications/read-all`, {}, getConfig());
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Mark all read error:', error);
        }
    };

    const markRead = async (id) => {
        try {
            await axios.put(`${API_URL}/api/notifications/${id}/read`, {}, getConfig());
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (error) {
            console.error('Mark read error:', error);
        }
    };

    if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <CheckCheck size={16} />
                        Mark all as read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center border border-white/10">
                    <Bell size={48} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No notifications yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div key={notification._id}
                            className={`glass rounded-xl p-4 border transition-all cursor-pointer ${notification.read ? 'border-white/5 opacity-60' : 'border-blue-500/30 bg-blue-500/5'}`}
                            onClick={() => !notification.read && markRead(notification._id)}>
                            <div className="flex items-start gap-3">
                                <img src={notification.fromUser?.profilePhoto || 'https://via.placeholder.com/36'} alt={notification.fromUser?.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                                <div className="flex-1">
                                    <p className="text-white text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                                </div>
                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
