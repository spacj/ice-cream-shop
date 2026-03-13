'use client';

import { motion } from 'framer-motion';

export default function Logo({ size = 64 }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full glow-pink"
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(255, 107, 157, 0.5)',
            '0 0 40px rgba(255, 107, 157, 0.8)',
            '0 0 20px rgba(255, 107, 157, 0.5)',
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main circle */}
      <div className="absolute inset-0 rounded-full gradient-primary overflow-hidden">
        {/* Inner design */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <defs>
            <radialGradient id="logoGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="100%" stopColor="#C44569" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Ice cream cone shape */}
          <g filter="url(#glow)">
            {/* Cone */}
            <polygon
              points="100,140 70,200 130,200"
              fill="#D2691E"
              opacity="0.9"
            />
            {/* Cone pattern */}
            <line x1="75" y1="160" x2="125" y2="160" stroke="#8B4513" strokeWidth="1" opacity="0.6"/>
            <line x1="72" y1="170" x2="128" y2="170" stroke="#8B4513" strokeWidth="1" opacity="0.6"/>
            <line x1="80" y1="180" x2="120" y2="180" stroke="#8B4513" strokeWidth="1" opacity="0.6"/>
            <line x1="85" y1="190" x2="115" y2="190" stroke="#8B4513" strokeWidth="1" opacity="0.6"/>

            {/* Ice cream scoop */}
            <circle cx="100" cy="100" r="50" fill="url(#logoGradient)" />
            {/* Highlight */}
            <ellipse cx="85" cy="75" rx="15" ry="18" fill="white" opacity="0.3" />
            {/* Stars */}
            <circle cx="60" cy="85" r="3" fill="#FFD700" opacity="0.8"/>
            <circle cx="140" cy="95" r="3" fill="#FFD700" opacity="0.8"/>
            <circle cx="100" cy="50" r="3" fill="#FFD700" opacity="0.8"/>
          </g>
        </svg>
      </div>

      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderColor: 'transparent transparent rgba(255, 215, 0, 0.5) rgba(0, 212, 255, 0.5)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-ice-gold rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
