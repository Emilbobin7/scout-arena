import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationBell from './NotificationBell';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar />
            <div className="ml-64 flex flex-col min-h-screen">
                {/* Top bar */}
                <div className="flex justify-end items-center px-8 py-4 border-b border-white/5">
                    <NotificationBell />
                </div>
                <div className="p-8 pt-6 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
