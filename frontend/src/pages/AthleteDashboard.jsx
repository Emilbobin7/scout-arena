import { useState } from 'react';
import { Upload, Activity, Award, Video } from 'lucide-react';
import axios from 'axios';

const AthleteDashboard = ({ user }) => {
    // Dummy Data for visual if user data is missing certain fields
    const stats = user.skills || { speed: 0, agility: 0, accuracy: 0, strength: 0 };
    const videos = user.videos || [];

    // State for video upload simulation
    const [uploading, setUploading] = useState(false);
    const [myVideos, setMyVideos] = useState(videos);

    const handleUpload = async () => {
        setUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            const newVideo = {
                _id: Date.now(),
                url: 'https://via.placeholder.com/300x200', // Dummy placeholder
                description: 'New Training Session',
                aiScores: { speed: 88, agility: 92, accuracy: 85, strength: 78 } // Simulated AI result
            };
            setMyVideos([...myVideos, newVideo]);
            setUploading(false);
            alert('Video Analyzed! AI Scores Generated.');
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Athlete Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="glass rounded-xl p-6 border border-white/10">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500 shadow-lg shadow-blue-500/20">
                                <img src={user.profileImage || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-blue-400 font-medium mb-4">{user.sport} • {user.position}</p>

                            <div className="w-full space-y-3 mt-4 text-sm text-gray-300">
                                <div className="flex justify-between"><span>Age:</span> <span className="text-white">{user.age || 'N/A'}</span></div>
                                <div className="flex justify-between"><span>Height:</span> <span className="text-white">{user.height ? `${user.height} cm` : 'N/A'}</span></div>
                                <div className="flex justify-between"><span>Weight:</span> <span className="text-white">{user.weight ? `${user.weight} kg` : 'N/A'}</span></div>
                                <div className="flex justify-between"><span>Location:</span> <span className="text-white">{user.location || 'N/A'}</span></div>
                            </div>

                            <button className="mt-6 w-full py-2 rounded-md border border-white/20 hover:bg-white/5 transition-colors text-sm">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* AI Stats Card */}
                    <div className="glass rounded-xl p-6 border border-white/10 mt-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="text-green-400" />
                            <h3 className="text-xl font-bold">AI Skill Analytics</h3>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(stats).map(([skill, score]) => (
                                <div key={skill}>
                                    <div className="flex justify-between mb-1">
                                        <span className="capitalize text-gray-300">{skill}</span>
                                        <span className="text-white font-bold">{score}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded-full"
                                            style={{ width: `${score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Upload Section */}
                    <div className="glass rounded-xl p-8 border border-white/10 text-center border-dashed border-2 border-gray-600 hover:border-blue-500 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 bg-blue-500/10 rounded-full mb-4">
                                <Upload className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Upload Analysis Video</h3>
                            <p className="text-gray-400 mb-6">Upload game footage or drills to generate new AI scores.</p>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {uploading ? 'Analyzing with AI...' : 'Select Video'}
                            </button>
                        </div>
                    </div>

                    {/* Videos Feed */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Video className="text-blue-400" /> Recent Uploads
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {myVideos.map((vid, idx) => (
                                <div key={idx} className="glass rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all">
                                    <div className="bg-gray-800 h-40 flex items-center justify-center relative group">
                                        {/* Placeholder for video thumbnail */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all cursor-pointer">
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                        <p className="text-gray-500">Video Preview</p>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-lg mb-1">{vid.description}</h4>
                                        <div className="flex gap-2 mt-2">
                                            {vid.aiScores && Object.entries(vid.aiScores).slice(0, 2).map(([k, v]) => (
                                                <span key={k} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 capitalize">
                                                    {k}: {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {myVideos.length === 0 && (
                                <p className="text-gray-500 col-span-2 text-center py-10">No videos uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteDashboard;
