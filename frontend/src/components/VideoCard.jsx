export default function VideoCard({ src, score }) {
    return (
        <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition transform">
            <video controls src={src} className="w-full aspect-video object-cover" />
            <div className="p-4">
                <p className="text-blue-400 font-semibold">Skill Score: {score ?? 88}</p>
            </div>
        </div>
    );
}
