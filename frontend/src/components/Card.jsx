export default function Card({ title, value }) {
    return (
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:scale-105 transition transform cursor-default">
            <h2 className="text-gray-400 text-sm mb-1">{title}</h2>
            <p className="text-3xl font-bold text-blue-400">{value}</p>
        </div>
    );
}
