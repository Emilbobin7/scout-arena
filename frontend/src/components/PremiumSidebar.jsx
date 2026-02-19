import { FaHome, FaUser, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PremiumSidebar() {
    return (
        <div className="w-64 h-screen bg-white/5 backdrop-blur-lg p-6 border-r border-white/10 flex-shrink-0">
            <div className="space-y-6">
                <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-400 transition cursor-pointer">
                    <FaHome /> Dashboard
                </Link>
                <Link to="/dashboard/profile" className="flex items-center gap-3 hover:text-blue-400 transition cursor-pointer">
                    <FaUser /> Profile
                </Link>
                <Link to="/dashboard/videos" className="flex items-center gap-3 hover:text-blue-400 transition cursor-pointer">
                    <FaVideo /> Videos
                </Link>
            </div>
        </div>
    );
}
