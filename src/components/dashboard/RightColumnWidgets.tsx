import React, { useState } from 'react';
import { 
  AlertTriangle, CloudRain, Wind, Eye, ArrowRight, 
  Crosshair, ShieldCheck, CloudSun, CheckCircle2, 
  Info, Check, X, Bell, HeartPulse, Activity, Users
} from 'lucide-react';

// 1. RECENT INCIDENTS WIDGET
export const RecentIncidentsWidget: React.FC<{ onSelectIncident?: (incident: any) => void }> = ({ onSelectIncident }) => {
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  const incidents = [
    {
      id: 'inc-1',
      time: '17:32',
      title: 'Drone detected - Sector 7 (J&K)',
      severity: 'HIGH',
      badgeClass: 'bg-red-950/80 border-red-500/80 text-red-300',
      icon: AlertTriangle,
      iconClass: 'text-red-400 fill-red-500/30'
    },
    {
      id: 'inc-2',
      time: '16:48',
      title: 'Unusual movement near LOC',
      severity: 'MEDIUM',
      badgeClass: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
      icon: AlertTriangle,
      iconClass: 'text-amber-400 fill-amber-500/30'
    },
    {
      id: 'inc-3',
      time: '15:22',
      title: 'Fire in Sector 4 – Tank unit',
      severity: 'MEDIUM',
      badgeClass: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
      icon: AlertTriangle,
      iconClass: 'text-amber-400 fill-amber-500/30'
    },
    {
      id: 'inc-4',
      time: '14:11',
      title: 'Weather alert – Heavy Rain (J&K)',
      severity: 'INFO',
      badgeClass: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300',
      icon: CloudRain,
      iconClass: 'text-cyan-400'
    },
    {
      id: 'inc-5',
      time: '12:03',
      title: 'Border intrusion attempt (Cancelled)',
      severity: 'RESOLVED',
      badgeClass: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
      icon: CheckCircle2,
      iconClass: 'text-emerald-400'
    }
  ];

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
            RECENT INCIDENTS
          </h3>
        </div>

        <button
          onClick={() => setSelectedIncident(incidents[0])}
          className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Incident Rows */}
      <div className="space-y-1.5">
        {incidents.map(inc => {
          const Icon = inc.icon;
          return (
            <div
              key={inc.id}
              onClick={() => {
                setSelectedIncident(inc);
                onSelectIncident?.(inc);
              }}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-900/40 hover:bg-cyan-950/50 border border-transparent hover:border-cyan-500/30 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] font-mono-code text-slate-400 font-semibold shrink-0">
                  {inc.time}
                </span>
                <Icon className={`w-3.5 h-3.5 shrink-0 ${inc.iconClass}`} />
                <span className="text-[11px] font-tech text-slate-200 truncate group-hover:text-white">
                  {inc.title}
                </span>
              </div>

              {/* Status Badge */}
              <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full border text-[9px] font-mono-code font-bold ${inc.badgeClass}`}>
                {inc.severity}
              </span>
            </div>
          );
        })}
      </div>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${selectedIncident.badgeClass}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-tech font-bold text-white text-base">
                  {selectedIncident.title}
                </h4>
                <p className="text-xs font-mono-code text-slate-400">
                  Logged at {selectedIncident.time} • Priority: {selectedIncident.severity}
                </p>
              </div>
            </div>

            <p className="text-xs font-mono-code text-slate-300 p-3 rounded-lg bg-slate-900/80 border border-slate-800 leading-relaxed">
              Tactical incident verified by Tri-Service Automated Sensor Mesh. Forward patrol units notified; situational telemetry broadcast to Command Staff.
            </p>

            <button
              onClick={() => setSelectedIncident(null)}
              className="mt-4 w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-tech font-bold"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. WEATHER & INTELLIGENCE WIDGET (Modular, Live Location & Accurate Real-Time Feed)
export { WeatherIntelligenceWidget } from './WeatherIntelligenceWidget';

// 3. MISSION STATUS WIDGET (4 Circular Progress Rings)
export const MissionStatusGauges: React.FC = () => {
  const missions = [
    { label: 'Active', value: 84, color: '#10B981', stroke: 'stroke-emerald-400' },
    { label: 'Pending', value: 12, color: '#06B6D4', stroke: 'stroke-cyan-400' },
    { label: 'Completed', value: 3, color: '#F59E0B', stroke: 'stroke-amber-400' },
    { label: 'Delayed', value: 1, color: '#EF4444', stroke: 'stroke-red-400' }
  ];

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
            MISSION STATUS
          </h3>
        </div>

        <button className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer">
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Circular Percentage Rings */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {missions.map(m => {
          const radius = 22;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (m.value / 100) * circumference;

          return (
            <div key={m.label} className="flex flex-col items-center text-center">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  {/* Background Track */}
                  <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="3.5"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke={m.color}
                    strokeWidth="3.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>

                {/* Center Percentage */}
                <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">
                  {m.value}%
                </div>
              </div>

              {/* Label */}
              <span className="text-[10px] font-mono-code text-slate-300 mt-1">
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4. SOLDIER HEALTH WIDGET (4 Circular Bio-Telemetry Gauges + Operational ECG Waveform)
export const SoldierHealthGauges: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const vitals = [
    { label: 'Heart Rate', value: 98, display: '72 BPM', color: '#10B981', note: 'Normal' },
    { label: 'Blood Oxygen', value: 99, display: '99%', color: '#22D3EE', note: 'Optimal' },
    { label: 'Body Temp', value: 98, display: '36.8°C', color: '#38BDF8', note: 'Stable' },
    { label: 'Combat Fit', value: 97, display: '97%', color: '#34D399', note: 'Mission Ready' }
  ];

  const squadTelemetry = [
    { unit: '14 Rashtriya Rifles (LoC Forward)', count: '320 Deployed', hr: '74 BPM', spo2: '99%', temp: '36.8°C', status: 'OPTIMAL', badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50' },
    { unit: '9 Para SF (Special Ops Command)', count: '110 Deployed', hr: '68 BPM', spo2: '99%', temp: '36.7°C', status: 'PEAK FITNESS', badge: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50' },
    { unit: '4 Sikh Regiment (Punjab Sector)', count: '480 Deployed', hr: '76 BPM', spo2: '98%', temp: '36.9°C', status: 'STABLE', badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50' },
    { unit: '11 Gorkha Rifles (High Altitude Sector)', count: '390 Deployed', hr: '78 BPM', spo2: '97%', temp: '36.6°C', status: 'ACCLIMATIZED', badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50' },
    { unit: '21 Rajput Regiment (Western Border)', count: '410 Deployed', hr: '75 BPM', spo2: '98%', temp: '37.1°C', status: 'HYDRATION NORMAL', badge: 'text-amber-400 bg-amber-950/80 border-amber-500/50' },
  ];

  return (
    <>
      <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
              SOLDIER HEALTH
            </h3>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Circular Percentage Gauges */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {vitals.map(v => {
            const radius = 22;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (v.value / 100) * circumference;

            return (
              <div 
                key={v.label} 
                onClick={() => setShowModal(true)}
                className="flex flex-col items-center text-center cursor-pointer group"
                title={`${v.label}: ${v.value}% (${v.note})`}
              >
                <div className="relative w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-105">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    {/* Background Track */}
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="3.5"
                    />
                    {/* Progress Arc */}
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      fill="none"
                      stroke={v.color}
                      strokeWidth="3.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>

                  {/* Center Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">
                    {v.value}%
                  </div>
                </div>

                {/* Label */}
                <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover:text-cyan-300">
                  {v.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Operational Pulse Line */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-[10.5px] font-mono-code text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>18,742 / 18,750 Vitals Stable</span>
          </div>

          {/* Green ECG Waveform */}
          <svg className="w-16 h-4 text-emerald-400" viewBox="0 0 60 16" fill="none">
            <path
              d="M0 8 H15 L20 2 L25 14 L30 4 L35 10 L40 8 H60"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* DETAILED SOLDIER HEALTH MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#020b1c] border border-cyan-500/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-tech font-bold text-white uppercase tracking-wider">
                    SOLDIER COMBAT HEALTH & BIOMETRIC TELEMETRY
                  </h3>
                  <p className="text-[10px] font-mono-code text-cyan-400">
                    REAL-TIME WEARABLE BIOSENSOR ENCLAVE • ZERO CRITICAL CASUALTIES
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono-code px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Overall Vitals Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Avg Pulse Rate</div>
                <div className="text-lg font-tech font-bold text-emerald-400 mt-0.5">72 BPM</div>
                <div className="text-[9.5px] font-mono-code text-emerald-400/80">98% Normal Zone</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Oxygen (SpO2)</div>
                <div className="text-lg font-tech font-bold text-cyan-400 mt-0.5">99.1%</div>
                <div className="text-[9.5px] font-mono-code text-cyan-400/80">Optimal Respiration</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Core Body Temp</div>
                <div className="text-lg font-tech font-bold text-sky-400 mt-0.5">36.8°C</div>
                <div className="text-[9.5px] font-mono-code text-sky-400/80">Thermally Regulated</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Mission Fit Ratio</div>
                <div className="text-lg font-tech font-bold text-emerald-400 mt-0.5">99.9%</div>
                <div className="text-[9.5px] font-mono-code text-emerald-400/80">18,742 Active Fit</div>
              </div>
            </div>

            {/* Regiment & Forward Post Breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-mono-code font-bold text-cyan-300 uppercase tracking-wider">
                DEPLOYED UNITS BIOMETRIC BREAKDOWN
              </div>
              <div className="space-y-1.5 text-xs font-mono-code">
                {squadTelemetry.map(sq => (
                  <div key={sq.unit} className="p-3 rounded-xl bg-[#031533]/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-white font-tech font-bold text-xs">{sq.unit}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-3">
                        <span>{sq.count}</span>
                        <span>• HR: <strong className="text-emerald-300">{sq.hr}</strong></span>
                        <span>• SpO2: <strong className="text-cyan-300">{sq.spo2}</strong></span>
                        <span>• Temp: <strong className="text-sky-300">{sq.temp}</strong></span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className={`px-2 py-0.5 rounded-md border text-[9.5px] font-mono-code font-bold ${sq.badge}`}>
                        {sq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs font-mono-code text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Smart Combat Armor Bio-Mesh: 100% Synced</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs"
              >
                Acknowledge Vitals
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Backward compatibility alias
export const SystemHealthGauges = SoldierHealthGauges;
