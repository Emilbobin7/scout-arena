import { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Trash2, Plus } from 'lucide-react';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', year: '', description: '' });

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // Using dashboard endpoint data or we could make a dedicated one.
            // But we have GET /api/dashboard which returns achievements.
            // Or we can add a specific GET route. Let's assume we use the dashboard one for now or add a route.
            // Actually, my plan said GET /api/achievements (mapped in dashboard routes?)
            // Wait, dashboardRoutes.js has `router.post('/achievement')` but GET is inside `getDashboardData`.
            // Let's just use `getDashboardData` to get the list for now to save a route or just filter from there.
            // Better yet, let's just fetch dashboard data and extract achievements.
            // Fetch achievements directly
            const { data } = await axios.get('/api/achievements', config);
            setAchievements(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching achievements:", error);
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.post('/api/achievements', formData, config);
            setAchievements([data, ...achievements]);
            setShowForm(false);
            setFormData({ title: '', year: '', description: '' });
        } catch (error) {
            console.error("Failed to add achievement:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this achievement?")) return;
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`/api/achievements/${id}`, config);
            setAchievements(achievements.filter(a => a._id !== id));
        } catch (error) {
            console.error("Failed to delete achievement:", error);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Achievements</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} /> Add Achievement
                </button>
            </div>

            {showForm && (
                <div className="glass p-6 rounded-xl border border-white/10 mb-8 animate-fade-in">
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Achievement Title (e.g. MVP Regional Finals)"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded px-3 py-2 w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded px-3 py-2 w-full h-24"
                            required
                        ></textarea>
                        <div className="flex gap-3">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Save</button>
                            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {achievements.map((item) => (
                    <div key={item._id} className="glass p-6 rounded-xl border border-white/10 flex justify-between items-center group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-400 mt-1">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-blue-400 text-sm mb-1">{item.year}</p>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
                {!loading && achievements.length === 0 && (
                    <p className="text-gray-500 text-center py-10">No achievements recorded yet.</p>
                )}
            </div>
        </div>
    );
};

export default Achievements;
