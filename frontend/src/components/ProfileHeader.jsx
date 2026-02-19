export default function ProfileHeader({ name, photo, sport }) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-10 rounded-xl flex items-center gap-6">
            <img
                src={photo || "https://ui-avatars.com/api/?name=" + (name || "User") + "&background=0f172a&color=60a5fa&size=96"}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
            <div>
                <h1 className="text-2xl font-bold mt-1">{name || "Athlete"}</h1>
                {sport && <p className="text-blue-100 text-sm mt-1">{sport}</p>}
            </div>
        </div>
    );
}
