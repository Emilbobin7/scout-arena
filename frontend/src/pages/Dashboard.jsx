import { useState, useEffect, useContext } from 'react';
import { Home, User, Video, TrendingUp, Award, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import ProfileSummary from '../components/dashboard/ProfileSummary';
import SkillStats from '../components/dashboard/SkillStats';
import VideoGallery from '../components/dashboard/VideoGallery';
import Achievements from '../components/dashboard/Achievements';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState({
        profile: null,
        videos: [],
        achievements: []
    });
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get('http://localhost:5000/api/dashboard', config);
            setDashboardData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white flex">
            <Sidebar user={user} logout={logout} />

            <div className="flex-1 ml-0 md:ml-64 transition-all duration-300">
                <DashboardNavbar user={user} />

                <main className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column (Profile & Stats) */}
                        <div className="space-y-8 lg:col-span-1">
                            <ProfileSummary profile={dashboardData.profile} />
                            <SkillStats videos={dashboardData.videos} />
                        </div>

                        {/* Right Column (Videos & Achievements) - Wider */}
                        <div className="space-y-8 lg:col-span-2">
                            <VideoGallery videos={dashboardData.videos} onVideoChange={fetchDashboardData} />
                            <Achievements achievements={dashboardData.achievements} onAchievementChange={fetchDashboardData} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
