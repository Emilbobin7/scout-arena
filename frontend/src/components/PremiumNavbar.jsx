import { FaBell, FaUser } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
            <h1 className="text-2xl font-bold text-blue-400">Scout Arena</h1>
            <div className="flex gap-6 items-center">
                <FaBell size={22} className="cursor-pointer hover:text-blue-400 transition" />
                <FaUser size={22} className="cursor-pointer hover:text-blue-400 transition" />
            </div>
        </div>
    );
}
