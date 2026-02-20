import React from 'react';

const Logo = ({ className = "w-12 h-12", showText = true }) => {
    return (
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 200 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            >
                {/* Definitions for Glow Filters */}
                <defs>
                    <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Stadium Structure - Neon Blue */}
                <path
                    d="M40 120 C 40 120, 100 140, 160 120"
                    stroke="#22d3ee"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#glow-blue)"
                />
                <path
                    d="M40 120 L 50 150 L 150 150 L 160 120"
                    stroke="#22d3ee"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow-blue)"
                />
                {/* Vertical Pillars */}
                <line x1="65" y1="123" x2="70" y2="148" stroke="#22d3ee" strokeWidth="3" filter="url(#glow-blue)" />
                <line x1="90" y1="125" x2="90" y2="148" stroke="#22d3ee" strokeWidth="3" filter="url(#glow-blue)" />
                <line x1="110" y1="125" x2="110" y2="148" stroke="#22d3ee" strokeWidth="3" filter="url(#glow-blue)" />
                <line x1="135" y1="123" x2="130" y2="148" stroke="#22d3ee" strokeWidth="3" filter="url(#glow-blue)" />

                {/* Roof / Upper Structure - Zig Zag */}
                <path
                    d="M35 110 L 55 90 L 70 110 L 85 90 L 100 110 L 115 90 L 130 110 L 145 90 L 162 110 L 165 "
                    stroke="#22d3ee"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow-blue)"
                    opacity="0.9"
                />

                {/* Fireworks / Lights - Neon Pink & Cyan */}
                {/* Center Burst */}
                <g filter="url(#glow-pink)">
                    <line x1="100" y1="80" x2="100" y2="50" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="100" y1="80" x2="80" y2="60" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="100" y1="80" x2="120" y2="60" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Left Burst */}
                <g filter="url(#glow-pink)">
                    <line x1="50" y1="80" x2="30" y2="60" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
                    <line x1="50" y1="80" x2="30" y2="80" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
                    <line x1="50" y1="80" x2="40" y2="50" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Right Burst */}
                <g filter="url(#glow-pink)">
                    <line x1="150" y1="80" x2="170" y2="60" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
                    <line x1="150" y1="80" x2="170" y2="80" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
                    <line x1="150" y1="80" x2="160" y2="50" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Light Beams (Yellow/Cyan accents) */}
                <line x1="65" y1="100" x2="60" y2="50" stroke="#facc15" strokeWidth="2" strokeOpacity="0.8" filter="url(#glow-yellow)" />
                <line x1="135" y1="100" x2="140" y2="50" stroke="#facc15" strokeWidth="2" strokeOpacity="0.8" filter="url(#glow-yellow)" />

                {/* Text */}
                {showText && (
                    <text x="100" y="175" textAnchor="middle" fill="#22d3ee" fontSize="18" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2" filter="url(#glow-blue)">
                        SCOUT ARENA
                    </text>
                )}
            </svg>
        </div>
    );
};

export default Logo;
