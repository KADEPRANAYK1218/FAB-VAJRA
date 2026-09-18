import React, { useState, useEffect } from 'react';
import { 
  SoldierIcon, 
  CctvIcon, 
  TargetMissionIcon, 
  TankIcon, 
  ArtilleryGunIcon, 
  DroneIcon, 
  TacticalGpsPinIcon 
} from './TacticalIcons';
import { useWeatherLocation } from '../../context/WeatherLocationContext';
import { Navigation, Radio, MapPin } from 'lucide-react';

export const MetricCardsRow: React.FC = () => {
  const { location, requestLiveLocation } = useWeatherLocation();

  // Clock state for Live Location Card
  const [liveLocalTime, setLiveLocalTime] = useState<string>('11:42 AM');
  const [currentDate, setCurrentDate] = useState<string>('18 Apr 2025');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLiveLocalTime(timeStr);
      const dateStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      setCurrentDate(dateStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="w-full rounded-2xl p-2 sm:p-2.5 bg-[#020b1c]/95 border border-[#0055ff]/50 shadow-[0_0_25px_rgba(0,85,255,0.2)] select-none"
      id="vajra-metric-kpi-row"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-2.5 w-full">
        {/* 1. TOTAL SOLDIERS */}
        <div className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-[#0099ff]/80 transition flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 rounded-full border border-cyan-400/60 bg-[#02182b] flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <SoldierIcon size={26} className="text-cyan-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none">
              TOTAL SOLDIERS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight leading-none mt-1.5">
              18,750
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-code font-bold text-[#00e676] mt-1 leading-none">
              <span>▲</span>
              <span>2.4%</span>
            </div>
          </div>
        </div>

        {/* 2. TOTAL CCTV */}
        <div className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-[#0099ff]/80 transition flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 flex items-center justify-center text-cyan-400 shrink-0 drop-shadow-[0_0_12px_rgba(6,182,212,0.45)]">
            <CctvIcon size={34} className="text-cyan-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none">
              TOTAL CCTV
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight leading-none mt-1.5">
              386
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-code font-bold text-[#00e676] mt-1 leading-none">
              <span>▲</span>
              <span>5.2%</span>
            </div>
          </div>
        </div>

        {/* 3. TOTAL MISSIONS */}
        <div className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-[#0099ff]/80 transition flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 rounded-full border border-amber-400/60 bg-[#241300]/90 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <TargetMissionIcon size={24} className="text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none">
              TOTAL MISSIONS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight leading-none mt-1.5">
              128
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-code font-bold text-[#00e676] mt-1 leading-none">
              <span>▲</span>
              <span>1.6%</span>
            </div>
          </div>
        </div>

        {/* 4. FIRE TANKS */}
        <div className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-[#0099ff]/80 transition flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 flex items-center justify-center text-[#00e676] shrink-0 drop-shadow-[0_0_12px_rgba(0,230,118,0.45)]">
            <TankIcon size={34} className="text-[#00e676]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none">
              FIRE TANKS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight leading-none mt-1.5">
              54
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-code font-bold text-[#00e676] mt-1 leading-none">
              <span>▲</span>
              <span>3.8%</span>
            </div>
          </div>
        </div>

        {/* 5. MISSION GUNS */}
        <div className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-[#0099ff]/80 transition flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 flex items-center justify-center text-[#ffca28] shrink-0 drop-shadow-[0_0_12px_rgba(255,202,40,0.45)]">
            <ArtilleryGunIcon size={34} className="text-[#ffca28]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none">
              MISSION GUNS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight leading-none mt-1.5">
              112
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-code font-bold text-[#00e676] mt-1 leading-none">
              <span>▲</span>
              <span>4.5%</span>
            </div>
          </div>
        </div>

        {/* 6. DRONES */}
        <div className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-[#0099ff]/80 transition flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 flex items-center justify-center text-cyan-400 shrink-0 drop-shadow-[0_0_12px_rgba(6,182,212,0.45)]">
            <DroneIcon size={34} className="text-cyan-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none">
              DRONES
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight leading-none mt-1.5">
              63
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-code font-bold text-[#00e676] mt-1 leading-none">
              <span>▲</span>
              <span>7.1%</span>
            </div>
          </div>
        </div>

        {/* 7. LIVE LOCATION & TIME (Replaced Jammu & Kashmir) */}
        <div 
          onClick={() => requestLiveLocation()}
          className="relative rounded-xl p-3 bg-[#030d22] border border-[#0055ff]/40 hover:border-cyan-400 transition flex items-center gap-3 shadow-md cursor-pointer group"
          title="Click to Refresh / Lock Live GPS Location"
        >
          <div className="w-11 h-11 flex items-center justify-center text-cyan-400 shrink-0 drop-shadow-[0_0_12px_rgba(6,182,212,0.45)] group-hover:scale-105 transition-transform">
            <TacticalGpsPinIcon size={34} className="text-cyan-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase leading-none truncate">
                LIVE LOCATION
              </div>
              <span className={`flex items-center gap-1 px-1.5 py-0.2 rounded text-[8px] font-mono-code font-bold ${
                location.isLiveGps 
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50'
              }`}>
                <span className={`w-1 h-1 rounded-full ${location.isLiveGps ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
                <span>{location.isLiveGps ? 'GPS' : 'POST'}</span>
              </span>
            </div>

            <div className="text-sm font-tech font-bold text-cyan-300 tracking-tight leading-none mt-1.5 truncate group-hover:text-white transition-colors uppercase">
              {location.shortName || 'LIVE LOCATION'}
            </div>

            <div className="text-[10px] font-mono-code font-medium text-slate-300 mt-1 leading-none whitespace-nowrap flex items-center gap-1">
              <span>{liveLocalTime}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-[9px]">{currentDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
