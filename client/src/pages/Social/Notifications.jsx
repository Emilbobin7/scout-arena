import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import api from '../../utils/api';
import Loader from '../../components/Loader';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data);
        } catch (error) {
            console.error('Notifications error:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAllRead = async () => {
        try {
            await api.put('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Mark all read error:', error);
        }
    };

    const markRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (error) {
            console.error('Mark read error:', error);
        }
    };

    if (loading) return <Loader text="Loading notifications..." />;

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllRead}
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
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
                        <div
                            key={notification._id}
                            className={`glass rounded-xl p-4 border transition-all cursor-pointer ${notification.read
                                    ? 'border-white/5 opacity-60'
                                    : 'border-blue-500/30 bg-blue-500/5'
                                }`}
                            onClick={() => !notification.read && markRead(notification._id)}
                        >
                            <div className="flex items-start gap-3">
                                <img
                                    src={notification.fromUser?.profilePhoto || 'https://via.placeholder.com/36'}
                                    alt={notification.fromUser?.name}
                                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                                />
                                <div className="flex-1">
                                    <p className="text-white text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
