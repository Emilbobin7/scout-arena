import { Home, User, Video, TrendingUp, Award, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

const Sidebar = ({ user, logout }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'My Profile', path: '/dashboard/profile', icon: User },
        { name: 'My Videos', path: '/dashboard/videos', icon: Video },
        { name: 'Achievements', path: '/dashboard/achievements', icon: Award },
        { name: 'Analytics', path: '/dashboard/analytics', icon: TrendingUp },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 bg-slate-900 h-screen fixed left-0 top-0 border-r border-white/10">
            <div className="flex items-center justify-center h-20 border-b border-white/10">
                <Link to="/">
                    <Logo className="h-10 w-auto" showText={true} />
                </Link>
            </div>

            <div className="p-6">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm">{user?.name || 'Athlete Name'}</p>
                        <p className="text-gray-500 text-xs">{user?.sport || 'Sport'}</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
