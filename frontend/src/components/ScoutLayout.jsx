import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Search, LogOut, MessageSquare, Bell } from 'lucide-react';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import NotificationBell from './NotificationBell';

const ScoutLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5';
    };

    const navItems = [
        { path: '/scout-dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/scout-dashboard/explore', label: 'Explore Athletes', icon: Search },
        { path: '/scout-dashboard/profile', label: 'My Profile', icon: Users },
        { path: '/scout-dashboard/messages', label: 'Messages', icon: MessageSquare },
        { path: '/scout-dashboard/notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="flex min-h-screen bg-slate-900">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-white/10 fixed h-full flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        SCOUT ARENA
                    </h1>
                    <p className="text-xs text-gray-500 tracking-widest mt-1">SCOUT PORTAL</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive(item.path)}`}
                        >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className="font-medium flex-1">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Top bar with notification bell */}
                <div className="flex justify-end items-center px-8 py-4 border-b border-white/5">
                    <NotificationBell />
                </div>
                <div className="p-8 pt-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ScoutLayout;
