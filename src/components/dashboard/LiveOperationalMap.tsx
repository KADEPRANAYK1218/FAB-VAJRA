import React, { useState, useEffect } from 'react';
import { Radio, AlertTriangle, Shield, Video, Crosshair, Sparkles } from 'lucide-react';
import vajraCyberMap from '../../assets/images/vajra_india_cyber_map_1788188888561.jpg';
import { CompassRose, TacticalGlobe, DroneIcon, CctvIcon, TankIcon } from './TacticalIcons';

interface TacticalItem {
  id: string;
  type: 'ENEMY' | 'FRIENDLY' | 'DRONE' | 'CCTV' | 'MISSION' | 'THREAT_ZONE' | 'TANK';
  label: string;
  coords: { x: number; y: number }; // Percentage inside map container
  sector: string;
  status: string;
}

export const LiveOperationalMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<TacticalItem | null>(null);
  const [radarAngle, setRadarAngle] = useState<number>(0);

  // Rotate the mini surveillance radar needle
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle(prev => (prev + 4) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Tactical markers positioned according to the uploaded reference dashboard
  const tacticalMarkers: TacticalItem[] = [
    // Drones with pulse rings
    { id: 'drone-1', type: 'DRONE', label: 'Drone Alpha-7 (Patrol)', coords: { x: 34, y: 37 }, sector: 'Rajasthan', status: 'Active Patrol 120km/h' },
    { id: 'drone-2', type: 'DRONE', label: 'Drone Falcon-2 (Surveillance)', coords: { x: 38, y: 56 }, sector: 'Central Sector', status: 'Thermal Sweep' },
    { id: 'drone-3', type: 'DRONE', label: 'Drone Garuda-9 (Recon)', coords: { x: 42, y: 22 }, sector: 'Jammu & Kashmir', status: 'High-Altitude Recon' },
    { id: 'drone-4', type: 'DRONE', label: 'Drone Coastal-1 (Maritime)', coords: { x: 38, y: 73 }, sector: 'Peninsular Command', status: 'Signal Intercept' },

    // Enemy Activity Red Triangles
    { id: 'enemy-1', type: 'ENEMY', label: 'Unidentified Ingress Attempt', coords: { x: 41, y: 19 }, sector: 'Sector 7 (J&K)', status: 'HIGH ALERT' },
    { id: 'enemy-2', type: 'ENEMY', label: 'Suspicious Transmission Source', coords: { x: 39, y: 42 }, sector: 'Western Border', status: 'Tracking Frequency' },
    { id: 'enemy-3', type: 'ENEMY', label: 'Anomalous Radar Contact', coords: { x: 47, y: 32 }, sector: 'Northern Outpost', status: 'Verifying Signature' },
    { id: 'enemy-4', type: 'ENEMY', label: 'Perimeter Breaching Attempt', coords: { x: 44, y: 67 }, sector: 'Eastern Corridor', status: 'QRT Dispatched' },

    // Friendly Units
    { id: 'friendly-1', type: 'FRIENDLY', label: 'HQ Strike Force (Unit 12)', coords: { x: 41, y: 49 }, sector: 'Central Command', status: 'Operational Ready' },
    { id: 'friendly-2', type: 'FRIENDLY', label: 'Northern Air Wing (Squadron 10)', coords: { x: 44, y: 26 }, sector: 'Ladakh Air Station', status: 'Combat Air Patrol' },

    // Tanks
    { id: 'tank-1', type: 'TANK', label: 'T-90 Bhishma Armored Unit', coords: { x: 39, y: 69 }, sector: 'Western Desert Command', status: 'Position Secured' },
    { id: 'tank-2', type: 'TANK', label: 'Arjun MBT Patrol Unit', coords: { x: 47, y: 46 }, sector: 'Central Depot', status: 'Standby' },

    // CCTV Cameras
    { id: 'cctv-1', type: 'CCTV', label: 'LOC Border Post High-Res IR', coords: { x: 47, y: 20 }, sector: 'Ladakh High Pass', status: 'Optical Feed Online' },
    { id: 'cctv-2', type: 'CCTV', label: 'Coastal Surveillance Array', coords: { x: 46, y: 59 }, sector: 'Eastern Coastline', status: 'Night-Vision Active' }
  ];

  return (
    <div
      className="relative rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-4 sm:p-5 flex flex-col justify-between overflow-hidden backdrop-blur-xl shadow-2xl h-[420px] lg:h-[470px] xl:h-[510px]"
      id="vajra-live-operational-map"
    >
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <Radio className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm sm:text-base font-tech font-bold text-white tracking-widest uppercase">
            LIVE OPERATIONAL MAP
          </h2>
        </div>

        {/* Selected Marker Quick Intel Banner */}
        {selectedMarker && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-cyan-950/90 border border-cyan-400/50 rounded-lg text-xs font-mono-code text-cyan-300 shadow-lg animate-fade-in">
            <span className="text-amber-400 font-bold">{selectedMarker.sector}:</span>
            <span>{selectedMarker.label}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
              {selectedMarker.status}
            </span>
            <button
              onClick={() => setSelectedMarker(null)}
              className="ml-1 text-slate-400 hover:text-white"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Main Map Visual Canvas with Overlays */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden my-1">
        {/* Background Cybernetic India Map with Glowing Borders */}
        <img
          src={vajraCyberMap}
          alt="Operational Geospatial Map of India"
          className="absolute inset-0 w-full h-full object-contain object-center filter brightness-110 contrast-125 select-none pointer-events-none"
        />

        {/* Tactical Sector Labels on the Map */}
        <div className="absolute top-[16%] left-[28%] text-[10px] sm:text-[11px] font-tech font-bold text-cyan-300/80 tracking-widest pointer-events-none select-none">
          JAMMU & KASHMIR
        </div>
        <div className="absolute top-[15%] right-[48%] text-[10px] sm:text-[11px] font-tech font-bold text-cyan-300/80 tracking-widest pointer-events-none select-none">
          LADAKH
        </div>
        <div className="absolute top-[39%] left-[32%] text-[10px] sm:text-[11px] font-tech font-bold text-cyan-300/80 tracking-widest pointer-events-none select-none">
          RAJASTHAN
        </div>
        <div className="absolute top-[49%] left-[42%] text-xs sm:text-sm font-tech font-bold text-cyan-400/90 tracking-widest pointer-events-none select-none">
          INDIA
        </div>

        {/* Mission Area Green Glowing Circle Overlay */}
        <div className="absolute top-[31%] left-[33%] w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-emerald-500/40 bg-emerald-500/5 pointer-events-none animate-pulse" />
        
        {/* Threat Zone Red Glowing Perimeter Overlay */}
        <div className="absolute top-[14%] left-[36%] w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-red-500/50 bg-red-500/5 pointer-events-none animate-pulse" />

        {/* Tactical Markers Dynamic Overlay */}
        {tacticalMarkers.map(marker => {
          const isSelected = selectedMarker?.id === marker.id;

          return (
            <div
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              style={{ left: `${marker.coords.x}%`, top: `${marker.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Drone with Concentric Radar Wave Rings */}
              {marker.type === 'DRONE' && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
                  <div className="absolute w-12 h-12 rounded-full border border-cyan-400/20 pointer-events-none" />
                  <div className="p-1 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 group-hover:scale-125 transition-transform shadow-lg shadow-cyan-500/30">
                    <DroneIcon className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
              )}

              {/* Enemy Threat Triangle */}
              {marker.type === 'ENEMY' && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                  <div className="p-1 rounded bg-red-950/90 border border-red-500 text-red-400 group-hover:scale-125 transition-transform shadow-lg shadow-red-500/40">
                    <AlertTriangle className="w-3.5 h-3.5 fill-red-500/40 text-red-400" />
                  </div>
                </div>
              )}

              {/* Friendly Unit Shield */}
              {marker.type === 'FRIENDLY' && (
                <div className="p-1 rounded-full bg-amber-950/90 border border-amber-400 text-amber-300 group-hover:scale-125 transition-transform shadow-lg shadow-amber-500/30">
                  <Shield className="w-3.5 h-3.5 fill-amber-400/30 text-amber-300" />
                </div>
              )}

              {/* Tank Icon */}
              {marker.type === 'TANK' && (
                <div className="p-1 rounded bg-emerald-950/90 border border-emerald-400 text-emerald-300 group-hover:scale-125 transition-transform shadow-lg shadow-emerald-500/30">
                  <TankIcon className="w-4 h-4 text-emerald-300" />
                </div>
              )}

              {/* CCTV Icon */}
              {marker.type === 'CCTV' && (
                <div className="p-1 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-300 group-hover:scale-125 transition-transform shadow-lg shadow-cyan-500/30">
                  <CctvIcon className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              )}

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-1 bg-slate-900/95 border border-cyan-500/50 rounded text-[10px] font-mono-code text-white whitespace-nowrap z-30 shadow-xl pointer-events-none">
                {marker.label}
              </div>
            </div>
          );
        })}

        {/* Top-Left Tactical HUD: Telemetry Bars & Rotating Globe */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2 pointer-events-none select-none">
          {/* Diagnostic telemetry bars */}
          <div className="px-2.5 py-2 rounded-lg bg-slate-950/80 border border-cyan-500/20 backdrop-blur-sm hidden sm:block">
            <div className="text-[9px] font-mono-code text-cyan-400 mb-1">TELEMETRY GRID</div>
            <div className="space-y-1 w-20">
              <div className="h-1 bg-cyan-500/20 rounded overflow-hidden">
                <div className="h-full bg-cyan-400 w-3/4 animate-pulse" />
              </div>
              <div className="h-1 bg-cyan-500/20 rounded overflow-hidden">
                <div className="h-full bg-amber-400 w-1/2" />
              </div>
              <div className="h-1 bg-cyan-500/20 rounded overflow-hidden">
                <div className="h-full bg-emerald-400 w-5/6" />
              </div>
            </div>
          </div>

          {/* 3D Wireframe Globe */}
          <div className="hidden md:block">
            <TacticalGlobe className="w-14 h-14" />
          </div>
        </div>

        {/* Top-Right Tactical HUD: Compass Rose & Map Legend */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-2 pointer-events-none select-none">
          {/* Compass Rose */}
          <CompassRose className="w-10 h-10 sm:w-12 sm:h-12" />

          {/* Map Legend (matches uploaded picture legend exactly) */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md text-[9px] sm:text-[10px] font-mono-code space-y-1.5 shadow-xl">
            <div className="flex items-center gap-2 text-slate-300">
              <AlertTriangle className="w-3 h-3 text-red-500 fill-red-500/30" />
              <span>Enemy Activity</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-300" />
              <span>Friendly Unit</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <DroneIcon className="w-3 h-3 text-cyan-400" />
              <span>Drone</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CctvIcon className="w-3 h-3 text-cyan-400" />
              <span>CCTV</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full border border-emerald-400 bg-emerald-400/30" />
              <span>Mission Area</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full border border-red-500 bg-red-500/30" />
              <span>Threat Zone</span>
            </div>
          </div>
        </div>

        {/* Bottom-Right Tactical HUD: Real-Time Surveillance Radar Scanner */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-3 p-2 sm:p-2.5 rounded-xl bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md shadow-xl select-none">
          {/* Animated Mini Radar Sweep Needle */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-emerald-500/60 bg-emerald-950/30 flex items-center justify-center overflow-hidden">
            {/* Concentric Grid Rings */}
            <div className="absolute w-3/4 h-3/4 rounded-full border border-emerald-500/30" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-emerald-500/30" />
            <div className="absolute w-full h-[1px] bg-emerald-500/30" />
            <div className="absolute h-full w-[1px] bg-emerald-500/30" />

            {/* Rotating Radar Needle */}
            <div
              className="absolute inset-0 origin-center pointer-events-none"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-emerald-400/40" />
              <div className="w-1/2 h-[2px] bg-emerald-300 shadow-[0_0_8px_#34d399]" />
            </div>

            {/* Radar Blip */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Surveillance Text & Waveform */}
          <div>
            <div className="text-[10px] sm:text-[11px] font-tech font-bold text-emerald-400 tracking-wider">
              REAL-TIME SURVEILLANCE
            </div>
            {/* Waveform graphic bars */}
            <div className="flex items-center gap-0.5 h-3 my-1">
              {[8, 14, 6, 12, 18, 10, 16, 7, 13, 9, 15, 11].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-cyan-400/80 rounded-full"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <div className="text-[9px] font-mono-code text-emerald-300 font-semibold tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SCANNING...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
