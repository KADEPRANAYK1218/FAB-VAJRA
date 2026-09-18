import React, { useState, useEffect } from 'react';
import { 
  Camera, Video, Radio, Eye, Crosshair, Maximize2, 
  AlertTriangle, Shield, CheckCircle2, CloudRain, 
  Wind, Lock, ArrowRight, Plane, Anchor, Building2, 
  Sliders, RefreshCw, Download, Check, Volume2, Sparkles,
  Layers, ChevronRight, X
} from 'lucide-react';
import { LiveOperationalMap } from '../dashboard/LiveOperationalMap';
import { DroneIcon, CctvIcon } from '../dashboard/TacticalIcons';

// Images for Feeds
import patrolInfiltrationImg from '../../assets/images/patrol_infiltration_valley_1788709882772.jpg';
import locDroneRoadImg from '../../assets/images/satellite_recon_vehicle_1788709405351.jpg';
import thermalFlirImg from '../../assets/images/thermal_flir_punjab_1788709390279.jpg';
import navalPortImg from '../../assets/images/naval_port_view_1789542279834.jpg';
import citySurveillanceImg from '../../assets/images/city_surveillance_1789542296084.jpg';

interface LiveFeedItem {
  id: string;
  category: 'CCTV' | 'DRONE' | 'THERMAL' | 'SATELLITE' | 'CITY' | 'PORT';
  filterTag: 'CCTV' | 'Drone' | 'Satellite' | 'Ground Sensor' | 'Social';
  title: string;
  badge: 'LIVE';
  badgeColor: 'red' | 'green';
  camId: string;
  timeOffset: number; // seconds ago
  imageSrc: string;
  icon: React.ElementType;
  telemetry?: {
    alt?: string;
    spd?: string;
    zoom?: string;
  };
  hasThermalScale?: boolean;
  boundingBoxes: Array<{
    top: string;
    left: string;
    width: string;
    height: string;
    label: string;
    color: 'red' | 'cyan' | 'emerald';
  }>;
}

interface VajraLiveFeedsViewProps {
  onNavigateToThreats?: () => void;
}

export const VajraLiveFeedsView: React.FC<VajraLiveFeedsViewProps> = ({ onNavigateToThreats }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'CCTV' | 'Drone' | 'Satellite' | 'Ground Sensor' | 'Social'>('All');
  const [selectedFeed, setSelectedFeed] = useState<LiveFeedItem | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('21:47:32');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAiBoxesActive, setIsAiBoxesActive] = useState<boolean>(true);
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);

  // Sync clock seconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timePart = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timePart);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quick Action Notification helper
  const triggerQuickAction = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Exact 6 Live Feeds from the screenshot
  const liveFeeds: LiveFeedItem[] = [
    {
      id: 'feed-1',
      category: 'CCTV',
      filterTag: 'CCTV',
      title: 'Border Sector 7 (J&K) – CCTV',
      badge: 'LIVE',
      badgeColor: 'red',
      camId: 'J&K-07',
      timeOffset: 0,
      imageSrc: patrolInfiltrationImg,
      icon: Video,
      boundingBoxes: [
        { top: '48%', left: '38%', width: '12%', height: '38%', label: 'PERSONNEL 01', color: 'cyan' },
        { top: '50%', left: '52%', width: '10%', height: '34%', label: 'PERSONNEL 02', color: 'cyan' }
      ]
    },
    {
      id: 'feed-2',
      category: 'DRONE',
      filterTag: 'Drone',
      title: 'LOC Road – Drone Feed',
      badge: 'LIVE',
      badgeColor: 'red',
      camId: 'DRN-12',
      timeOffset: 4,
      imageSrc: locDroneRoadImg,
      icon: Plane,
      telemetry: {
        alt: '482 m',
        spd: '62 km/h',
        zoom: '3.5x'
      },
      boundingBoxes: [
        { top: '48%', left: '44%', width: '14%', height: '18%', label: 'TRACKED VEHICLE', color: 'red' }
      ]
    },
    {
      id: 'feed-3',
      category: 'THERMAL',
      filterTag: 'Ground Sensor',
      title: 'Kargil Sector – Thermal',
      badge: 'LIVE',
      badgeColor: 'red',
      camId: 'THM-12',
      timeOffset: 7,
      imageSrc: thermalFlirImg,
      icon: Crosshair,
      hasThermalScale: true,
      boundingBoxes: [
        { top: '42%', left: '26%', width: '14%', height: '35%', label: '37.1°C', color: 'red' },
        { top: '38%', left: '52%', width: '16%', height: '42%', label: '36.9°C', color: 'red' }
      ]
    },
    {
      id: 'feed-4',
      category: 'PORT',
      filterTag: 'CCTV',
      title: 'Naval Base – Port View',
      badge: 'LIVE',
      badgeColor: 'green',
      camId: 'NAV-01',
      timeOffset: 1,
      imageSrc: navalPortImg,
      icon: Anchor,
      boundingBoxes: [
        { top: '54%', left: '34%', width: '42%', height: '24%', label: 'INS DESTROYER - SECURE', color: 'emerald' }
      ]
    },
    {
      id: 'feed-5',
      category: 'SATELLITE',
      filterTag: 'Satellite',
      title: 'Satellite Feed – Northern Sector',
      badge: 'LIVE',
      badgeColor: 'green',
      camId: 'SAT-02',
      timeOffset: 12,
      imageSrc: '/satellite_feed_sector4.jpg',
      icon: Radio,
      boundingBoxes: [
        { top: '25%', left: '32%', width: '36%', height: '38%', label: 'HIGH-ALTITUDE PASS 14,800 FT', color: 'cyan' }
      ]
    },
    {
      id: 'feed-6',
      category: 'CITY',
      filterTag: 'Social',
      title: 'City Surveillance – Delhi',
      badge: 'LIVE',
      badgeColor: 'green',
      camId: 'CITY-05',
      timeOffset: 14,
      imageSrc: citySurveillanceImg,
      icon: Building2,
      boundingBoxes: [
        { top: '48%', left: '30%', width: '16%', height: '20%', label: 'TRANSIT BUS', color: 'cyan' },
        { top: '58%', left: '50%', width: '14%', height: '16%', label: 'AUTO-RICKSHAW', color: 'cyan' },
        { top: '64%', left: '22%', width: '8%', height: '14%', label: 'PEDESTRIAN', color: 'cyan' }
      ]
    }
  ];

  // Filter feeds based on active tag
  const filteredFeeds = activeFilter === 'All' 
    ? liveFeeds 
    : liveFeeds.filter(f => f.filterTag === activeFilter);

  // Compute timestamp relative to base
  const formatFeedTime = (offset: number) => {
    // Offset slightly for dynamic realism
    return currentTime;
  };

  return (
    <div className="w-full flex flex-col space-y-3.5 sm:space-y-4" id="vajra-live-feeds-view">
      {/* Toast alert message */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2 rounded-xl bg-cyan-950/95 border border-cyan-400 text-cyan-300 text-xs font-mono-code shadow-2xl flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* ======================= LEFT 8 COLUMNS: LIVE FEEDS + MAP & THREATS ======================= */}
        <div className="lg:col-span-8 flex flex-col space-y-3.5 sm:space-y-4">
          {/* 1. TOP LIVE FEEDS CONTAINER */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/35 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl flex flex-col space-y-3.5">
            {/* Header: Title, Category Filter Pills, Live Badge, Maximize */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-cyan-500/25">
              {/* Left Title */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Camera className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-tech font-bold text-white tracking-wider flex items-center gap-2">
                  LIVE FEEDS
                </h2>
              </div>

              {/* Center-Right Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {(['All', 'CCTV', 'Drone', 'Satellite', 'Ground Sensor', 'Social'] as const).map(tag => {
                  const isSelected = activeFilter === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveFilter(tag)}
                      className={`px-3 py-1 rounded-full text-[11px] font-tech font-bold tracking-wide transition cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-[#0070f3] text-white shadow-[0_0_12px_rgba(0,112,243,0.5)] border border-cyan-300'
                          : 'bg-[#031530] text-slate-300 hover:text-white hover:bg-slate-800/80 border border-cyan-500/20'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Far Right: Live Status Badge & Fullscreen */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#021833] border border-emerald-500/40 text-emerald-400 text-[11px] font-mono-code font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Live</span>
                </div>

                <button
                  onClick={() => setIsFullscreenMode(!isFullscreenMode)}
                  title="Expand Live Feeds"
                  className="w-7 h-7 rounded-lg bg-[#021833] border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3x2 Grid of Feeds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
              {filteredFeeds.map(feed => {
                const FeedIcon = feed.icon;
                return (
                  <div
                    key={feed.id}
                    onClick={() => setSelectedFeed(feed)}
                    className="group relative rounded-xl bg-[#010816] border border-cyan-500/30 hover:border-cyan-400 overflow-hidden flex flex-col transition duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    {/* Top Bar of Feed Tile */}
                    <div className="px-2.5 py-1.5 bg-[#020d24]/90 border-b border-cyan-500/20 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                        <FeedIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-tech font-bold text-slate-200 truncate group-hover:text-cyan-300">
                          {feed.title}
                        </span>
                      </div>

                      {/* Red or Green LIVE Badge */}
                      <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-mono-code font-black tracking-wider uppercase shrink-0 ${
                        feed.badgeColor === 'red'
                          ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.6)]'
                          : 'bg-emerald-600 text-white shadow-[0_0_8px_rgba(5,150,105,0.6)]'
                      }`}>
                        {feed.badge}
                      </span>
                    </div>

                    {/* Feed Video / Image Frame */}
                    <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
                      <img
                        src={feed.imageSrc}
                        alt={feed.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle Ambient Scanline */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none animate-pulse" />

                      {/* Drone Telemetry Overlay on LOC Road */}
                      {feed.telemetry && (
                        <div className="absolute top-1.5 right-1.5 bg-black/70 border border-cyan-400/40 px-2 py-1 rounded text-[8.5px] font-mono-code text-cyan-300 leading-tight space-y-0.5 pointer-events-none backdrop-blur-xs">
                          <div>ALT: {feed.telemetry.alt}</div>
                          <div>SPD: {feed.telemetry.spd}</div>
                          <div>ZOOM: {feed.telemetry.zoom}</div>
                        </div>
                      )}

                      {/* Thermal Scale on Kargil Sector */}
                      {feed.hasThermalScale && (
                        <div className="absolute top-1.5 right-1.5 bottom-1.5 flex flex-col items-center justify-between text-[7px] font-mono-code text-white bg-black/70 px-1 py-0.5 rounded border border-red-500/40 pointer-events-none">
                          <span className="text-red-400 font-bold">Hot</span>
                          <div className="w-1.5 h-12 rounded bg-gradient-to-b from-red-600 via-amber-400 to-blue-900 my-0.5" />
                          <span className="text-blue-400 font-bold">Cold</span>
                        </div>
                      )}

                      {/* AI Detection Bounding Boxes */}
                      {isAiBoxesActive && feed.boundingBoxes.map((box, idx) => (
                        <div
                          key={idx}
                          style={{
                            top: box.top,
                            left: box.left,
                            width: box.width,
                            height: box.height
                          }}
                          className={`absolute border-2 pointer-events-none transition-all duration-300 ${
                            box.color === 'red'
                              ? 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                              : box.color === 'emerald'
                              ? 'border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]'
                          }`}
                        >
                          <span className={`absolute -top-3.5 left-0 px-1 py-0.2 text-[7.5px] font-mono-code font-bold uppercase rounded ${
                            box.color === 'red'
                              ? 'bg-red-950 text-red-300 border border-red-500/50'
                              : box.color === 'emerald'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                              : 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                          }`}>
                            {box.label}
                          </span>
                        </div>
                      ))}

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-tech font-bold text-white pointer-events-none">
                        <Maximize2 className="w-4 h-4 text-cyan-400" />
                        <span>INSPECT FEED</span>
                      </div>
                    </div>

                    {/* Bottom Status Bar of Feed Tile */}
                    <div className="px-2.5 py-1 bg-[#020b1c] border-t border-cyan-500/20 flex items-center justify-between text-[9.5px] font-mono-code text-slate-400">
                      <span className="text-cyan-400 font-semibold">
                        {formatFeedTime(feed.timeOffset)}
                      </span>
                      <span className="text-slate-400">
                        Cam ID: <strong className="text-slate-200">{feed.camId}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. BOTTOM SECTION: LIVE OPERATIONAL MAP (UNTOUCHED!) & THREAT SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Left: LIVE OPERATIONAL MAP - PRESERVED EXACTLY AS MANDATED */}
            <div className="w-full">
              <LiveOperationalMap />
            </div>

            {/* Right: THREAT SUMMARY WIDGET */}
            <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="threat-summary-widget">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 fill-red-500/20" />
                    <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                      THREAT SUMMARY
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono-code text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    REAL-TIME INTEL
                  </span>
                </div>

                {/* Donut Chart and Breakdown */}
                <div className="flex items-center justify-around gap-3 bg-[#010816]/70 rounded-xl p-3 border border-cyan-500/20 mb-3">
                  {/* Donut Center */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#0f172a" strokeWidth="6" />
                      {/* High (Red) - 25% */}
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#ef4444" strokeWidth="6" strokeDasharray="150.8" strokeDashoffset="113.1" />
                      {/* Medium (Amber) - 42% */}
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="150.8" strokeDashoffset="75.4" className="rotate-[90deg] origin-center" />
                      {/* Low (Cyan) - 33% */}
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="150.8" strokeDashoffset="100.5" className="rotate-[240deg] origin-center" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-lg font-display font-black text-white leading-none">12</span>
                      <span className="text-[7.5px] font-mono-code text-slate-400 uppercase leading-none mt-0.5">Active Threats</span>
                    </div>
                  </div>

                  {/* Threat Count Legend */}
                  <div className="space-y-1.5 text-xs font-tech">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-slate-300">High</span>
                      </div>
                      <span className="font-mono-code font-bold text-red-400">3</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-slate-300">Medium</span>
                      </div>
                      <span className="font-mono-code font-bold text-amber-300">5</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-slate-300">Low</span>
                      </div>
                      <span className="font-mono-code font-bold text-cyan-300">4</span>
                    </div>
                  </div>
                </div>

                {/* Top Threats List */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono-code text-cyan-400 font-bold tracking-wider uppercase mb-1">
                    TOP THREATS
                  </div>

                  {[
                    { title: 'Drone Activity – LOC', level: 'HIGH', time: '21:46', levelColor: 'bg-red-950 text-red-300 border-red-500/60' },
                    { title: 'Unusual Movement – Sector 7', level: 'HIGH', time: '21:43', levelColor: 'bg-red-950 text-red-300 border-red-500/60' },
                    { title: 'Border Breach Attempt', level: 'MEDIUM', time: '21:38', levelColor: 'bg-amber-950 text-amber-300 border-amber-500/60' },
                    { title: 'Intrusion Alert – J&K', level: 'MEDIUM', time: '21:26', levelColor: 'bg-amber-950 text-amber-300 border-amber-500/60' },
                    { title: 'Weather Impact – Kargil', level: 'INFO', time: '21:18', levelColor: 'bg-blue-950 text-blue-300 border-blue-500/60' }
                  ].map((threat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-2 py-1 rounded bg-[#01091a]/80 border border-slate-800 text-[11px] font-tech"
                    >
                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                        <AlertTriangle className={`w-3 h-3 shrink-0 ${threat.level === 'HIGH' ? 'text-red-400' : threat.level === 'MEDIUM' ? 'text-amber-400' : 'text-blue-400'}`} />
                        <span className="text-slate-200 truncate">{threat.title}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono-code font-bold border ${threat.levelColor}`}>
                          {threat.level}
                        </span>
                        <span className="text-[10px] font-mono-code text-slate-400">
                          {threat.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View All Incidents Button */}
              <button
                onClick={onNavigateToThreats}
                className="mt-3 w-full py-1.5 px-3 rounded-lg bg-[#021833] hover:bg-[#03244d] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>View All Incidents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================= RIGHT 4 COLUMNS: LIVE FEED STATUS & SUPPORT WIDGETS ======================= */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5 sm:space-y-4">
          {/* Widget 1: LIVE FEED STATUS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                LIVE FEED STATUS
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Radial Donut 6/6 Online */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#0a192f" strokeWidth="6" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray="163.3"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-display font-black text-emerald-400 leading-none">6/6</span>
                  <span className="text-[8px] font-mono-code text-slate-300 uppercase mt-0.5">Online</span>
                </div>
              </div>

              {/* Feed Breakdown Counts */}
              <div className="flex-1 space-y-1 text-xs font-tech">
                {[
                  { name: 'CCTV', count: '2/2', dot: 'bg-emerald-400' },
                  { name: 'DRONE', count: '1/1', dot: 'bg-amber-400' },
                  { name: 'SATELLITE', count: '1/1', dot: 'bg-cyan-400' },
                  { name: 'GROUND SENSOR', count: '1/1', dot: 'bg-purple-400' },
                  { name: 'SOCIAL', count: '1/1', dot: 'bg-blue-400' }
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className="text-slate-300 text-[11px]">{item.name}</span>
                    </div>
                    <span className="font-mono-code font-bold text-white text-[11px]">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Widget 2: RECENT LIVE EVENTS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2.5">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                RECENT LIVE EVENTS
              </h3>
              <span className="text-[10px] font-mono-code text-cyan-400">SYNCED</span>
            </div>

            <div className="space-y-2">
              {[
                { time: '21:47:32', title: 'Drone detected – LOC Road', level: 'HIGH', badgeBg: 'bg-red-950 text-red-300 border-red-500/70', icon: Plane, iconColor: 'text-red-400' },
                { time: '21:46:18', title: 'Movement near Border Fence', level: 'MEDIUM', badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/70', icon: Eye, iconColor: 'text-amber-400' },
                { time: '21:42:11', title: 'Weather change – Kargil', level: 'INFO', badgeBg: 'bg-blue-950 text-blue-300 border-blue-500/70', icon: CloudRain, iconColor: 'text-blue-400' },
                { time: '21:38:05', title: 'Vehicle spotted – NH 44', level: 'LOW', badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-500/70', icon: Crosshair, iconColor: 'text-emerald-400' },
                { time: '21:32:40', title: 'Unusual signal – Sector 7', level: 'MEDIUM', badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/70', icon: Radio, iconColor: 'text-amber-400' }
              ].map((ev, idx) => {
                const EvIcon = ev.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-[#01091a]/80 hover:bg-[#02132d] border border-slate-800 transition"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <EvIcon className={`w-3.5 h-3.5 shrink-0 ${ev.iconColor}`} />
                      <div className="min-w-0">
                        <div className="text-[11px] font-tech text-slate-200 truncate font-semibold">
                          {ev.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9.5px] font-mono-code text-slate-400">
                        {ev.time}
                      </span>
                      <span className={`px-1 py-0.2 rounded text-[8px] font-mono-code font-bold border ${ev.badgeBg}`}>
                        {ev.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Widget 3: QUICK ACTIONS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase mb-2.5">
              QUICK ACTIONS
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('All');
                  triggerQuickAction('SHOWING ALL LIVE FEEDS');
                }}
                className="py-2.5 px-2 rounded-xl bg-[#021833] hover:bg-[#032852] border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 text-[10px] font-tech font-bold transition cursor-pointer"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="text-center leading-tight">View All Feeds</span>
              </button>

              <button
                type="button"
                onClick={() => triggerQuickAction('DRONE PATROL RECON REQUESTED (ALPHA-7 DISPATCHED)')}
                className="py-2.5 px-2 rounded-xl bg-[#021833] hover:bg-[#032852] border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 text-[10px] font-tech font-bold transition cursor-pointer"
              >
                <Plane className="w-4 h-4 text-cyan-400" />
                <span className="text-center leading-tight">Request Drone</span>
              </button>

              <button
                type="button"
                onClick={() => triggerQuickAction('SECURITY SNAPSHOT CAPTURED & AUDITED')}
                className="py-2.5 px-2 rounded-xl bg-[#021833] hover:bg-[#032852] border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 text-[10px] font-tech font-bold transition cursor-pointer"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="text-center leading-tight">Save Snapshot</span>
              </button>
            </div>
          </div>

          {/* Widget 4: WEATHER & ENVIRONMENT */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2.5">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                WEATHER & ENVIRONMENT
              </h3>
              <span className="text-[10px] font-mono-code text-cyan-400">Srinagar, J&K</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-400/40 flex items-center justify-center text-blue-400">
                  <CloudRain className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-white leading-none">11°C</div>
                  <div className="text-[10.5px] font-tech text-slate-300 mt-0.5">Partly Cloudy</div>
                </div>
              </div>

              <div className="text-[10.5px] font-mono-code space-y-0.5 text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Humidity</span>
                  <span className="font-bold text-white">68%</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Wind</span>
                  <span className="font-bold text-white">12 km/h</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Visibility</span>
                  <span className="font-bold text-white">8 km</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800">
              <div className="flex-1 py-1 px-1.5 rounded bg-blue-950/50 border border-blue-500/40 text-blue-300 text-[9px] font-mono-code flex items-center justify-center gap-1">
                <CloudRain className="w-3 h-3 text-blue-400" />
                <span className="truncate">+ Rain Alert</span>
              </div>
              <div className="flex-1 py-1 px-1.5 rounded bg-amber-950/50 border border-amber-500/40 text-amber-300 text-[9px] font-mono-code flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-amber-400" />
                <span className="truncate">Wind Advisory</span>
              </div>
              <div className="flex-1 py-1 px-1.5 rounded bg-slate-900/80 border border-slate-700 text-slate-300 text-[9px] font-mono-code flex items-center justify-center gap-1">
                <Eye className="w-3 h-3 text-slate-400" />
                <span className="truncate">Fog Alert</span>
              </div>
            </div>
          </div>

          {/* Widget 5: MISSION STATUS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase mb-2">
              MISSION STATUS
            </h3>

            <div className="flex items-center gap-4 bg-[#010816]/70 p-2.5 rounded-xl border border-cyan-500/20">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#0a192f" strokeWidth="4" />
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="4"
                    strokeDasharray="138.2"
                    strokeDashoffset="18"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">
                  87%
                </div>
              </div>

              <div className="space-y-1 text-xs font-tech">
                <div className="text-[11px] font-mono-code text-cyan-400 font-bold uppercase leading-none">
                  OPERATIONAL READINESS
                </div>
                <div className="text-[11px] text-slate-300">
                  MISSION : <strong className="text-white">NORTHERN SHIELD</strong>
                </div>
                <div className="text-[11px] text-slate-300">
                  STATUS : <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 6: COMMUNICATIONS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                COMMUNICATIONS
              </h3>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-code text-slate-300">ENCRYPTED CHANNEL</div>
                  <div className="text-xs font-tech font-bold text-emerald-400">ACTIVE</div>
                </div>
              </div>

              {/* Animated Audio Signal Wave */}
              <div className="w-24 h-6 flex items-center justify-end gap-0.5">
                {[4, 12, 8, 16, 22, 14, 26, 18, 10, 14, 20, 8, 5].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 bg-emerald-400/80 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Detail / Zoom Inspection Modal */}
      {selectedFeed && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#020c24] border border-cyan-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#031438] border-b border-cyan-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <selectedFeed.icon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-tech font-bold text-white tracking-wider">
                  {selectedFeed.title} — HIGH-RESOLUTION INSPECT
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono-code font-bold uppercase">
                  {selectedFeed.badge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAiBoxesActive(!isAiBoxesActive)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-code border transition cursor-pointer ${
                    isAiBoxesActive
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  AI Bounding Boxes: {isAiBoxesActive ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setSelectedFeed(null)}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Video Feed */}
            <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedFeed.imageSrc}
                alt={selectedFeed.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Tactical Crosshair Reticle in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-32 h-32 border border-cyan-400/50 rounded-full" />
                <div className="absolute w-48 h-px bg-cyan-400/40" />
                <div className="absolute h-48 w-px bg-cyan-400/40" />
              </div>

              {/* Bounding Boxes */}
              {isAiBoxesActive && selectedFeed.boundingBoxes.map((box, idx) => (
                <div
                  key={idx}
                  style={{
                    top: box.top,
                    left: box.left,
                    width: box.width,
                    height: box.height
                  }}
                  className={`absolute border-2 pointer-events-none ${
                    box.color === 'red'
                      ? 'border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                      : box.color === 'emerald'
                      ? 'border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                      : 'border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                  }`}
                >
                  <span className={`absolute -top-4 left-0 px-1.5 py-0.5 text-[8.5px] font-mono-code font-bold uppercase rounded ${
                    box.color === 'red'
                      ? 'bg-red-950 text-red-300 border border-red-500'
                      : box.color === 'emerald'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                  }`}>
                    {box.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3 bg-[#020d26] border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono-code">
              <div className="flex items-center gap-4 text-slate-300">
                <span>FPS: <strong className="text-emerald-400">60.0</strong></span>
                <span>Bitrate: <strong className="text-cyan-400">8.4 Mbps</strong></span>
                <span>Resolution: <strong className="text-white">3840x2160 UHD</strong></span>
                <span>Latency: <strong className="text-cyan-300">14 ms</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerQuickAction(`SNAPSHOT CAPTURED FOR ${selectedFeed.camId}`)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-400 text-white font-tech font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Frame</span>
                </button>

                <button
                  onClick={() => setSelectedFeed(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-tech transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
