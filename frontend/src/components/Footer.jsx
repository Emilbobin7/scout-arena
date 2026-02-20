import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <Logo className="w-12 h-12" />
                            <span className="text-2xl font-black text-white tracking-widest">SCOUT ARENA</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Empowering the next generation of athletes through AI-driven analytics and global exposure.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
                        <ul className="space-y-4">
                            {['About Us', 'How It Works', 'Pricing', 'Success Stories', 'For Scouts'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Support</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Terms of Service', 'Privacy Policy', 'Data Protection', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                                <span>Kollanoor House,<br />Kakkanad, Kerala<br /> 682030</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>+91 7907273674</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>support@scoutarena.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2026 Scout Arena. All rights reserved.</p>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                        Designed for <span className="text-blue-500 font-bold">Greatness</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
