import React from 'react';

// Soldier / Personnel Bust Icon (matches TOTAL SOLDIERS card)
export const SoldierIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-7 h-7', size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Head / Helmet Silhouette */}
    <circle cx="16" cy="9.5" r="4.8" />
    {/* Shoulders & Chest Body Silhouette */}
    <path d="M7 26C7 21 10.8 17.5 16 17.5C21.2 17.5 25 21 25 26V27H7V26Z" />
  </svg>
);

// Military Battle Tank Icon (matches FIRE TANKS card)
export const TankIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 28"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Long Gun Barrel */}
    <rect x="23" y="7" width="11" height="2.2" rx="0.8" />
    <circle cx="34.5" cy="8.1" r="1.2" />
    
    {/* Turret */}
    <path d="M12 6.5C12 5.2 13.2 4.2 15 4.2H21C22.8 4.2 24 5.2 24 6.5V10.5H12V6.5Z" />
    <rect x="15.5" y="2.8" width="3.5" height="1.6" rx="0.5" />
    
    {/* Chassis Hull */}
    <path d="M5.5 12C5.5 10.8 6.6 10 8.2 10H25.8C27.4 10 28.5 10.8 28.5 12L27.5 16H4.5L5.5 12Z" />
    
    {/* Continuous Tracks / Treads */}
    <rect x="2" y="16" width="30" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Road Wheels */}
    <circle cx="6.5" cy="20" r="2.2" />
    <circle cx="12.2" cy="20" r="2.2" />
    <circle cx="17.9" cy="20" r="2.2" />
    <circle cx="23.6" cy="20" r="2.2" />
    <circle cx="28" cy="20" r="1.6" />
  </svg>
);

// Artillery Field Gun / Cannon Icon (matches MISSION GUNS card)
export const ArtilleryGunIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 32"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* High Angle Long Cannon Barrel */}
    <line x1="12" y1="20" x2="27" y2="4.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="27.5" cy="4" r="1.8" />
    
    {/* Breech / Recoil Mechanism */}
    <path d="M9 18L13.5 13.5L17.5 17.5L13 22Z" />
    
    {/* Carriage Trails / Stabilization Legs */}
    <line x1="14" y1="20" x2="4" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="20" x2="21" y2="28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    
    {/* Carriage Big Wheel with Rim and Center Hub */}
    <circle cx="14" cy="21" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="14" cy="21" r="2.2" />
    <line x1="14" y1="15" x2="14" y2="27" stroke="currentColor" strokeWidth="1.2" />
    <line x1="8" y1="21" x2="20" y2="21" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

// Tactical Quadcopter Drone Icon (matches DRONES card)
export const DroneIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Center Sensor Pod Body */}
    <circle cx="18" cy="16" r="3.5" fill="currentColor" fillOpacity="0.8" />
    
    {/* 4 Diagonal Rotor Arms */}
    <line x1="15" y1="13.5" x2="7.5" y2="7.5" strokeWidth="2.2" />
    <line x1="21" y1="13.5" x2="28.5" y2="7.5" strokeWidth="2.2" />
    <line x1="15" y1="18.5" x2="7.5" y2="24.5" strokeWidth="2.2" />
    <line x1="21" y1="18.5" x2="28.5" y2="24.5" strokeWidth="2.2" />
    
    {/* 4 Propeller Rotors */}
    <line x1="3" y1="7.5" x2="12" y2="7.5" strokeWidth="2.5" />
    <line x1="24" y1="7.5" x2="33" y2="7.5" strokeWidth="2.5" />
    <line x1="3" y1="24.5" x2="12" y2="24.5" strokeWidth="2.5" />
    <line x1="24" y1="24.5" x2="33" y2="24.5" strokeWidth="2.5" />
    
    {/* Landing Skids */}
    <path d="M13 21L11 27H15" strokeWidth="1.8" />
    <path d="M23 21L25 27H21" strokeWidth="1.8" />
  </svg>
);

// Target / Mission Crosshair Icon (matches TOTAL MISSIONS card)
export const TargetMissionIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Ring */}
    <circle cx="16" cy="16" r="11" strokeWidth="2" />
    {/* Middle Ring */}
    <circle cx="16" cy="16" r="6" strokeWidth="1.6" />
    {/* Center Dot */}
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    {/* 4 Crosshairs */}
    <line x1="16" y1="2" x2="16" y2="8" strokeWidth="2" />
    <line x1="16" y1="24" x2="16" y2="30" strokeWidth="2" />
    <line x1="2" y1="16" x2="8" y2="16" strokeWidth="2" />
    <line x1="24" y1="16" x2="30" y2="16" strokeWidth="2" />
  </svg>
);

// Surveillance CCTV Camera Icon (matches TOTAL CCTV card)
export const CctvIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 32"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wall Mount Bracket on Left */}
    <rect x="3" y="14" width="3" height="12" rx="1.5" />
    <path d="M5 19H10C11 19 12 18 12 17V15H8V18H5V19Z" />
    
    {/* Swivel Pivot Arm */}
    <circle cx="12" cy="15" r="2.5" />
    
    {/* Camera Cylinder Body angled down to right */}
    <path d="M12 13L25 6.5C26.5 5.8 28 6.5 28.5 8L30.5 12C31 13.5 30.2 15 28.7 15.8L15.7 22.3C14.2 23 12.7 22.2 12.2 20.8L10.2 16.8C9.7 15.2 10.5 13.8 12 13Z" />
    
    {/* Front Lens */}
    <ellipse cx="29.5" cy="10" rx="2" ry="3.5" transform="rotate(25 29.5 10)" fill="#00ffff" />
    <circle cx="29.7" cy="10.2" r="1.2" fill="#FFFFFF" />
    
    {/* Sun Shield Top Hood */}
    <path d="M11 12L28 3.5L30.5 8.5L13.5 17Z" opacity="0.6" />
  </svg>
);

// Tactical Clock Icon (matches clock indicator)
export const TacticalClockIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="12" />
    {/* Hour Hand at 11 o'clock */}
    <line x1="16" y1="16" x2="12" y2="10" strokeWidth="2.5" />
    {/* Minute Hand at 42 min / 8.5 o'clock */}
    <line x1="16" y1="16" x2="8.5" y2="20" strokeWidth="2" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

// Tactical GPS Location Pin Icon (matches LIVE LOCATION card)
export const TacticalGpsPinIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Radar Ring */}
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2" opacity="0.7" />
    {/* Crosshair ticks */}
    <line x1="16" y1="1" x2="16" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="27" x2="16" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="27" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Inner Target Pin */}
    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="16" r="2.5" fill="currentColor" />
  </svg>
);

// Tactical Compass Rose (top right of map)
export const CompassRose: React.FC<{ className?: string; size?: number }> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Circles */}
    <circle cx="32" cy="32" r="28" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 3" />
    <circle cx="32" cy="32" r="22" stroke="#06B6D4" strokeWidth="0.8" strokeOpacity="0.6" />
    {/* Crosshairs */}
    <line x1="32" y1="4" x2="32" y2="60" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="4" y1="32" x2="60" y2="32" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
    {/* North Arrow (Amber/Red) */}
    <polygon points="32,10 35.5,30 32,27" fill="#F59E0B" />
    <polygon points="32,10 28.5,30 32,27" fill="#D97706" />
    {/* South Arrow (Cyan) */}
    <polygon points="32,54 35.5,34 32,37" fill="#0891B2" />
    <polygon points="32,54 28.5,34 32,37" fill="#06B6D4" />
    {/* East Arrow */}
    <polygon points="54,32 34,35.5 37,32" fill="#0E7490" />
    <polygon points="54,32 34,28.5 37,32" fill="#06B6D4" />
    {/* West Arrow */}
    <polygon points="10,32 30,35.5 27,32" fill="#0E7490" />
    <polygon points="10,32 30,28.5 27,32" fill="#06B6D4" />
    {/* Compass Labels */}
    <text x="32" y="7.5" fill="#F59E0B" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
    <text x="32" y="63" fill="#38BDF8" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
    <text x="61" y="33.5" fill="#38BDF8" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">E</text>
    <text x="4" y="33.5" fill="#38BDF8" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">W</text>
  </svg>
);

// Holographic Wireframe Rotating Globe (bottom left of map)
export const TacticalGlobe: React.FC<{ className?: string; size?: number }> = ({ className = 'w-16 h-16', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    className={`${className} animate-spin-slow`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Glow Circle */}
    <circle cx="40" cy="40" r="36" stroke="#06B6D4" strokeWidth="1.2" strokeOpacity="0.8" />
    <circle cx="40" cy="40" r="36" fill="#06B6D4" fillOpacity="0.05" />
    {/* Latitudes */}
    <ellipse cx="40" cy="40" rx="36" ry="12" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <ellipse cx="40" cy="40" rx="36" ry="24" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <line x1="4" y1="40" x2="76" y2="40" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.7" />
    {/* Longitudes */}
    <ellipse cx="40" cy="40" rx="12" ry="36" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <ellipse cx="40" cy="40" rx="24" ry="36" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <line x1="40" y1="4" x2="40" y2="76" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.7" />
    {/* India Coordinates Indicator Dot */}
    <circle cx="50" cy="30" r="2.5" fill="#F59E0B" className="animate-ping" />
    <circle cx="50" cy="30" r="1.5" fill="#FEF08A" />
  </svg>
);
