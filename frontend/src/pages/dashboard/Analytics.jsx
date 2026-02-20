import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from 'recharts';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${API_URL}/api/analytics`, config);
            setAnalytics(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching analytics:", error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading Analytics...</div>;

    const data = [
        { subject: 'Speed', A: analytics?.speed || 0, fullMark: 100 },
        { subject: 'Agility', A: analytics?.agility || 0, fullMark: 100 },
        { subject: 'Accuracy', A: analytics?.accuracy || 0, fullMark: 100 },
        { subject: 'Reaction', A: analytics?.reaction || 0, fullMark: 100 },
    ];

    return (
        <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Performance Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <div className="glass p-6 rounded-xl border border-white/10 flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4">Skill Breakdown</h3>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                <PolarGrid stroke="#4b5563" />
                                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" />
                                <Radar
                                    name="Me"
                                    dataKey="A"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.6}
                                />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Progress Bars */}
                <div className="glass p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-6">Detailed Scores</h3>
                    <div className="space-y-6">
                        {data.map((item) => (
                            <div key={item.subject}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-300">{item.subject}</span>
                                    <span className="font-bold text-blue-400">{item.A}/100</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${item.A}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-white/5 rounded-lg">
                        <h4 className="font-bold mb-2 text-white">Analysis Summary</h4>
                        <p className="text-sm text-gray-400">
                            Based on {analytics?.totalVideos || 0} analyzed videos from your training sessions.
                            Keep uploading specific drills to improve your accuracy score.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
