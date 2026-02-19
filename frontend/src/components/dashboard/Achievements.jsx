import { Award, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const Achievements = ({ achievements, onAchievementChange }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        year: new Date().getFullYear().toString(),
        description: ''
    });

    const handleChange = (e) => {
        setNewAchievement({ ...newAchievement, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('/api/dashboard/achievement', newAchievement, config);
            setIsAdding(false);
            setNewAchievement({ title: '', year: new Date().getFullYear().toString(), description: '' });
            if (onAchievementChange) onAchievementChange();
        } catch (error) {
            console.error("Error adding achievement:", error);
        }
    };

    return (
        <div className="bg-slate-900 rounded-xl border border-white/10 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Achievements
                </h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
            </div>

            {isAdding && (
                <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-white/10 animate-fadeIn space-y-3">
                    <div className="flex gap-2">
                        <input
                            name="title"
                            placeholder="Title (e.g., MVP)"
                            value={newAchievement.title}
                            onChange={handleChange}
                            className="flex-1 bg-slate-900 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                        />
                        <input
                            name="year"
                            placeholder="Year"
                            value={newAchievement.year}
                            onChange={handleChange}
                            className="w-20 bg-slate-900 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                        />
                    </div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newAchievement.description}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-20"
                    />
                    <button
                        onClick={handleAdd}
                        disabled={!newAchievement.title}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Achievement
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {achievements && achievements.length > 0 ? (
                    achievements.map((item) => (
                        <div key={item._id || item.id} className="flex gap-4 p-4 bg-slate-800/50 rounded-lg border border-white/5 hover:border-yellow-500/30 transition-colors group">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform">
                                    <Award className="w-6 h-6 text-yellow-500" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-start">
                                    <h4 className="text-white font-bold">{item.title}</h4>
                                    <span className="text-xs text-gray-500 bg-slate-900 px-2 py-1 rounded border border-white/10">{item.year}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-4">
                        No achievements added yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;
