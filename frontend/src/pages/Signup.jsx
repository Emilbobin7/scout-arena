import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User, Mail, Lock, Activity, Briefcase, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: roleParam === 'scout' ? 'scout' : 'athlete',
        sport: '',
        position: '',
    });

    useEffect(() => {
        if (roleParam && (roleParam === 'athlete' || roleParam === 'scout')) {
            setFormData(prev => ({ ...prev, role: roleParam }));
        }
    }, [roleParam]);

    const [error, setError] = useState('');

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const res = await register(formData);
        if (res.success) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo?.role === 'scout') {
                navigate('/scout-dashboard');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
            {/* Background Image - Athlete Training */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop')"
                }}
            >
                {/* Slate Overlay */}
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg px-4 animate-fade-in-up">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 tracking-tight mb-2">
                        JOIN SCOUT ARENA
                    </h1>
                    <p className="text-gray-300 font-medium">Create your profile and start your legacy</p>
                </div>

                <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl rounded-full pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl rounded-full pointer-events-none"></div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-3 rounded-lg mb-6 text-sm text-center relative z-10">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-gray-400 group-focus-within:text-green-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-green-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-green-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm"
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-green-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="p-1 bg-white/5 rounded-xl flex gap-1">
                            <label className={`flex-1 cursor-pointer py-2 rounded-lg text-center text-sm font-semibold transition-all ${formData.role === 'athlete' ? 'bg-blue-600 shadow-lg text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                <input type="radio" name="role" value="athlete" checked={formData.role === 'athlete'} onChange={handleChange} className="hidden" />
                                I'm an Athlete
                            </label>
                            <label className={`flex-1 cursor-pointer py-2 rounded-lg text-center text-sm font-semibold transition-all ${formData.role === 'scout' ? 'bg-green-600 shadow-lg text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                <input type="radio" name="role" value="scout" checked={formData.role === 'scout'} onChange={handleChange} className="hidden" />
                                I'm a Scout
                            </label>
                        </div>

                        {/* Additional Info for Athletes */}
                        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${formData.role === 'athlete' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Activity className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="sport"
                                        placeholder="Sport"
                                        value={formData.sport}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        required={formData.role === 'athlete'}
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        required={formData.role === 'athlete'}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-gray-100 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                        >
                            Create Account
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
