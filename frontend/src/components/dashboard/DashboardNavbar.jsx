import { Search, Bell, ChevronDown } from 'lucide-react';

const DashboardNavbar = ({ user }) => {
    return (
        <header className="h-20 bg-slate-900 border-b border-white/10 flex items-center justify-between px-8 ml-64">
            <div className="flex items-center bg-slate-800 rounded-lg px-4 py-2 w-96 border border-white/5 focus-within:border-blue-500 transition-colors">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search stats, players, or scouts..."
                    className="bg-transparent border-none focus:outline-none text-white ml-2 w-full placeholder-gray-500"
                />
            </div>

            <div className="flex items-center space-x-6">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-green-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{user?.name?.charAt(0)}</span>
                        </div>
                    </div>
                    <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-white" />
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
