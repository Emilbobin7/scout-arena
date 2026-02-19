import { Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Vikram Das',
            role: 'Indian Super League Midfielder',
            image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop',
            quote: 'Scout Arena revolutionized how players like me get noticed. The detailed analytics match what international clubs are looking for.'
        },
        {
            name: 'Priya Sharma',
            role: 'State Cricketer (Ranji Trophy)',
            image: 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a1?q=80&w=1840&auto=format&fit=crop',
            quote: 'Coming from a small district, exposure was always an issue. This platform bridged the gap between my performance and national selectors.'
        },
        {
            name: 'Arjun Singh',
            role: 'Pro Hockey Player',
            image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=2070&auto=format&fit=crop',
            quote: 'The speed and agility metrics are spot on. It helps me track my progress and show concrete data to league coaches.'
        },
    ];

    return (
        <div className="py-24 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-white">What People Are Saying</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 relative hover:bg-slate-800 transition-colors">
                            <Quote className="absolute top-8 right-8 text-blue-500/20 w-10 h-10" />
                            <p className="text-gray-300 italic mb-6 leading-relaxed">"{item.quote}"</p>
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50" />
                                <div className="ml-4">
                                    <h4 className="text-white font-bold">{item.name}</h4>
                                    <p className="text-sm text-blue-400">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
