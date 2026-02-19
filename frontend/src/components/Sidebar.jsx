import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Video, Award, BarChart2, Settings, LogOut, MessageSquare, Activity, Bell } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch unread notification count on mount
    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                if (!token) return;
                const { data } = await axios.get('/api/notifications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUnreadCount(data.filter(n => !n.read).length);
            } catch {
                // Silently fail — badge just won't show
            }
        };
        fetchUnread();
    }, []);

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/feed', label: 'Activity Feed', icon: Activity },
        { path: '/dashboard/profile', label: 'My Profile', icon: User },
        { path: '/dashboard/videos', label: 'My Videos', icon: Video },
        { path: '/dashboard/achievements', label: 'Achievements', icon: Award },
        { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
        { path: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
        { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
        { path: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    const isActive = (path) => {
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="h-screen w-64 bg-gray-900 border-r border-white/10 fixed left-0 top-0 flex flex-col pt-20">
            <div className="px-6 mb-8">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    SCOUT ARENA
                </h2>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => item.path.includes('notifications') && setUnreadCount(0)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium flex-1">{item.label}</span>
                        {item.badge > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                                {item.badge > 99 ? '99+' : item.badge}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
