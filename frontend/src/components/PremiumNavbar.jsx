import Logo from "./Logo";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
            <Logo className="h-10 w-auto" showText={true} />
            <div className="flex gap-6 items-center">
                <FaBell size={22} className="cursor-pointer hover:text-blue-400 transition" />
                <FaUser size={22} className="cursor-pointer hover:text-blue-400 transition" />
            </div>
        </div>
    );
}
