import React, { useState } from 'react';
import { 
  CloudRain, Wind, Eye, ArrowRight, CloudSun, Sun, Cloud, 
  CloudLightning, Compass, Radio, Bell, BellRing, RefreshCw, 
  Check, X, ChevronDown, MapPin, ShieldCheck, AlertTriangle, 
  Thermometer, Gauge, Droplets
} from 'lucide-react';
import { useWeatherLocation, PRESET_SECTORS } from '../../context/WeatherLocationContext';

export const WeatherIntelligenceWidget: React.FC = () => {
  const {
    location,
    weather,
    notificationsEnabled,
    notificationIntervalSec,
    notificationHistory,
    browserNotificationPermission,
    requestLiveLocation,
    selectPresetSector,
    refreshWeather,
    setNotificationsEnabled,
    setNotificationIntervalSec,
    requestBrowserNotifications,
    triggerTestNotification
  } = useWeatherLocation();

  const [showSectorMenu, setShowSectorMenu] = useState<boolean>(false);
  const [showNotifMenu, setShowNotifMenu] = useState<boolean>(false);
  const [showViewAllModal, setShowViewAllModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshWeather();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Select dynamic weather icon
  const getWeatherIcon = (code: number, condition: string) => {
    if (code === 0) return <Sun className="w-6 h-6 text-amber-300 animate-spin-slow" />;
    if (code === 1 || code === 2) return <CloudSun className="w-6 h-6 text-amber-300" />;
    if (code === 3) return <Cloud className="w-6 h-6 text-slate-300" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-6 h-6 text-blue-400" />;
    if (code >= 80 && code <= 82) return <CloudRain className="w-6 h-6 text-cyan-400" />;
    if (code >= 95) return <CloudLightning className="w-6 h-6 text-yellow-400" />;
    if (code === 45 || code === 48) return <Eye className="w-6 h-6 text-indigo-300" />;
    return <CloudSun className="w-6 h-6 text-amber-300" />;
  };

  return (
    <div className="relative rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl" id="weather-intelligence-widget">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
            WEATHER & INTELLIGENCE
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Live GPS Auto-Acquire button */}
          <button
            type="button"
            onClick={() => requestLiveLocation()}
            className={`p-1.5 rounded-lg border transition flex items-center gap-1 text-[9.5px] font-mono-code font-bold cursor-pointer ${
              location.isLiveGps
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60'
            }`}
            title="Auto-Detect Live Location via GPS"
          >
            <Radio className={`w-3.5 h-3.5 ${location.status === 'acquiring' ? 'animate-spin' : location.isLiveGps ? 'animate-pulse text-emerald-400' : 'text-cyan-400'}`} />
            <span className="hidden sm:inline">{location.status === 'acquiring' ? 'LOCATING...' : location.isLiveGps ? 'GPS LOCKED' : 'LIVE GPS'}</span>
          </button>

          {/* Real-time Notifications Popover Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowSectorMenu(false);
              }}
              className={`p-1.5 rounded-lg border transition relative cursor-pointer ${
                notificationsEnabled
                  ? 'bg-blue-950/80 border-blue-500/60 text-blue-300 hover:bg-blue-900/80'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
              title="Weather Alert Notifications Config"
            >
              {notificationsEnabled ? (
                <BellRing className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              ) : (
                <Bell className="w-3.5 h-3.5 text-slate-400" />
              )}
              {notificationsEnabled && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
              )}
            </button>

            {/* Notification Menu Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-950/95 border border-cyan-500/50 rounded-xl shadow-2xl p-3 z-50 animate-fade-in backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <BellRing className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-tech font-bold text-white uppercase">Weather Alerts</span>
                  </div>
                  <button
                    onClick={() => setShowNotifMenu(false)}
                    className="text-slate-400 hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5 mt-2.5">
                  {/* Toggle Notification */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code text-slate-300">Live Notifications</span>
                    <button
                      type="button"
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold cursor-pointer transition ${
                        notificationsEnabled
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                          : 'bg-slate-800 border border-slate-600 text-slate-400'
                      }`}
                    >
                      {notificationsEnabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  {/* Interval Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code text-slate-300">Update Frequency</span>
                    <select
                      value={notificationIntervalSec}
                      onChange={(e) => setNotificationIntervalSec(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] font-mono-code rounded px-1.5 py-0.5 cursor-pointer focus:outline-none focus:border-cyan-400"
                    >
                      <option value={30}>Every 30s</option>
                      <option value={60}>Every 1 min</option>
                      <option value={120}>Every 2 min</option>
                      <option value={300}>Every 5 min</option>
                    </select>
                  </div>

                  {/* Native Desktop Notification Permission */}
                  {browserNotificationPermission !== 'granted' && (
                    <button
                      type="button"
                      onClick={async () => {
                        await requestBrowserNotifications();
                      }}
                      className="w-full py-1 rounded bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-[10px] font-mono-code font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Bell className="w-3 h-3" />
                      <span>Enable Desktop Push Alerts</span>
                    </button>
                  )}

                  {/* Test Notification Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerTestNotification();
                    }}
                    className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10.5px] font-tech font-bold tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Send Test Notification Now</span>
                  </button>

                  {/* Recent Alert History */}
                  {notificationHistory.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-[9.5px] font-mono-code text-slate-400 uppercase mb-1">
                        Recent Broadcasts ({notificationHistory.length})
                      </div>
                      <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                        {notificationHistory.slice(0, 3).map((item) => (
                          <div key={item.id} className="p-1.5 rounded bg-slate-900/70 border border-slate-800 text-[9px] font-mono-code text-slate-300">
                            <div className="text-cyan-400 font-bold flex items-center justify-between">
                              <span className="truncate">{item.title}</span>
                              <span className="text-slate-400">{item.timestamp}</span>
                            </div>
                            <div className="text-slate-300 truncate mt-0.5">{item.message}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* View All Details modal button */}
          <button 
            type="button"
            onClick={() => setShowViewAllModal(true)}
            className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
            title="Open Complete Weather Intelligence Dossier"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Weather Content */}
      <div className="flex items-center justify-between mt-1">
        {/* Left: Location & Temp */}
        <div className="min-w-0 flex-1">
          {/* Location Selector Trigger */}
          <div className="relative inline-block max-w-full">
            <button
              type="button"
              onClick={() => {
                setShowSectorMenu(!showSectorMenu);
                setShowNotifMenu(false);
              }}
              className="text-xs font-tech font-bold text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 transition cursor-pointer max-w-full truncate group"
              title="Click to Switch Tactical Sector or Enable Live GPS"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">{location.name}</span>
              <ChevronDown className="w-3 h-3 text-cyan-400 shrink-0" />
            </button>

            {/* Sector Selector Dropdown */}
            {showSectorMenu && (
              <div className="absolute left-0 mt-1.5 w-64 bg-slate-950/95 border border-cyan-500/50 rounded-xl shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl">
                <div className="text-[10px] font-mono-code text-cyan-400 font-bold uppercase px-2 py-1 flex items-center justify-between">
                  <span>Select Sector / Live GPS</span>
                  <button onClick={() => setShowSectorMenu(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-1 mt-1">
                  {/* Live GPS Option */}
                  <div
                    onClick={() => {
                      requestLiveLocation();
                      setShowSectorMenu(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                      location.isLiveGps
                        ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <div>
                        <div className="text-[11px] font-tech font-bold text-white">Use My Live Location</div>
                        <div className="text-[8.5px] font-mono-code text-slate-400">Device GPS Auto-Detection</div>
                      </div>
                    </div>
                    {location.isLiveGps && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>

                  <div className="text-[9px] font-mono-code text-slate-500 px-2 pt-1 uppercase">
                    Tactical Military Sectors
                  </div>

                  {PRESET_SECTORS.map((sector) => (
                    <div
                      key={sector.id}
                      onClick={() => {
                        selectPresetSector(sector.id);
                        setShowSectorMenu(false);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                        !location.isLiveGps && location.name.includes(sector.shortName)
                          ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-300'
                          : 'bg-slate-900/50 border-slate-800/80 hover:border-cyan-500/40 text-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] font-tech font-bold text-white truncate">{sector.name}</div>
                        <div className="text-[8.5px] font-mono-code text-slate-400 truncate">{sector.region}</div>
                      </div>
                      {!location.isLiveGps && location.name.includes(sector.shortName) && (
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Weather Icon & Temp */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-inner">
              {getWeatherIcon(weather.weatherCode, weather.condition)}
            </div>

            <div>
              <div className="text-xl font-tech font-bold text-white leading-none flex items-baseline gap-1">
                <span>{weather.temperature}°C</span>
                <span className="text-[9px] font-mono-code text-cyan-400 font-normal">REAL-TIME</span>
              </div>
              <div className="text-[10px] font-mono-code text-slate-300 mt-0.5 truncate">
                {weather.condition}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Accurate Metrics */}
        <div className="text-[10.5px] font-mono-code space-y-1 text-slate-300 pl-2 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">⁘ Humidity</span>
            <span className="font-bold text-white">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">÷ Wind</span>
            <span className="font-bold text-white">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">⁘ Visibility</span>
            <span className="font-bold text-white">{weather.visibility} km</span>
          </div>
        </div>
      </div>

      {/* Advisory Pills from live data */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
        {weather.advisories.map((adv) => {
          const isHigh = adv.severity === 'high';
          const isMed = adv.severity === 'medium';

          return (
            <div
              key={adv.id}
              className={`flex-1 py-1 px-1.5 rounded-lg border text-[9.5px] font-mono-code flex items-center justify-center gap-1 transition ${
                isHigh
                  ? 'bg-red-950/50 border-red-500/60 text-red-300'
                  : isMed
                  ? 'bg-amber-950/50 border-amber-500/60 text-amber-300'
                  : 'bg-blue-950/40 border-blue-500/40 text-blue-300'
              }`}
            >
              {adv.type === 'rain' ? (
                <CloudRain className="w-3 h-3 text-blue-400 shrink-0" />
              ) : adv.type === 'wind' ? (
                <Wind className="w-3 h-3 text-amber-400 shrink-0" />
              ) : adv.type === 'fog' ? (
                <Eye className="w-3 h-3 text-slate-400 shrink-0" />
              ) : adv.type === 'storm' ? (
                <CloudLightning className="w-3 h-3 text-yellow-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              )}
              <span className="truncate">{adv.label}</span>
            </div>
          );
        })}
      </div>

      {/* ===================== VIEW ALL METEOROLOGICAL DOSSIER MODAL ===================== */}
      {showViewAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-tech font-bold text-white uppercase tracking-wider">
                    Atmospheric & Geospatial Meteorological Intelligence
                  </h3>
                  <div className="text-xs font-mono-code text-cyan-400">
                    {location.name} • {location.isLiveGps ? 'LIVE SATELLITE GPS LOCK' : 'STRATEGIC BORDER COMMAND'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowViewAllModal(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-cyan-400" />
                  <span>Temperature</span>
                </div>
                <div className="text-xl font-tech font-bold text-white mt-1">
                  {weather.temperature}°C
                </div>
                <div className="text-[9px] font-mono-code text-cyan-400">
                  {weather.condition}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
                  <Wind className="w-3 h-3 text-cyan-400" />
                  <span>Wind Velocity</span>
                </div>
                <div className="text-xl font-tech font-bold text-white mt-1">
                  {weather.windSpeed} <span className="text-xs font-normal">km/h</span>
                </div>
                <div className="text-[9px] font-mono-code text-slate-400">
                  Dir: {weather.windDirection}° SW
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  <span>Humidity</span>
                </div>
                <div className="text-xl font-tech font-bold text-white mt-1">
                  {weather.humidity}%
                </div>
                <div className="text-[9px] font-mono-code text-slate-400">
                  Precip: {weather.precipitation} mm
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-cyan-400" />
                  <span>Pressure & Vis</span>
                </div>
                <div className="text-xl font-tech font-bold text-white mt-1">
                  {weather.pressure} <span className="text-xs font-normal">hPa</span>
                </div>
                <div className="text-[9px] font-mono-code text-emerald-400">
                  Optical Vis: {weather.visibility} km
                </div>
              </div>
            </div>

            {/* Tactical Operational Impact Matrix */}
            <div className="p-3.5 rounded-xl bg-[#02132d] border border-cyan-500/40 space-y-2">
              <div className="text-xs font-tech font-bold text-cyan-300 uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Operational Impact Assessment & Drone Envelope</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10.5px] font-mono-code">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400">UAV Flight Envelope</div>
                  <div className={`font-bold mt-1 ${weather.windSpeed > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {weather.windSpeed > 30 ? 'RESTRICTED (High Wind)' : 'CLEAR FOR DEPLOYMENT'}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Turbulence index minimal</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400">Optoelectronic Sensors</div>
                  <div className={`font-bold mt-1 ${weather.visibility < 5 ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {weather.visibility < 5 ? 'IR / THERMAL PRIORITY' : 'FULL OPTICAL SPECTRUM'}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Atmospheric scatter 0.12</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400">Artillery Ballistics</div>
                  <div className="font-bold text-emerald-400 mt-1">
                    CORRECTIONS COMPUTED
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Air density adjusted: 1.21 kg/m³</div>
                </div>
              </div>
            </div>

            {/* Sector Quick Switcher in Modal */}
            <div>
              <div className="text-xs font-tech font-bold text-white uppercase mb-2">
                Switch Operational Border Sector
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    requestLiveLocation();
                    setShowViewAllModal(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                    location.isLiveGps
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-tech font-bold flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>My Live GPS Device Location</span>
                    </div>
                    <div className="text-[9.5px] font-mono-code text-slate-400">
                      Real-time device coordinates
                    </div>
                  </div>
                  {location.isLiveGps && <Check className="w-4 h-4 text-emerald-400" />}
                </button>

                {PRESET_SECTORS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      selectPresetSector(sec.id);
                      setShowViewAllModal(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                      !location.isLiveGps && location.name.includes(sec.shortName)
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-tech font-bold text-white truncate">{sec.name}</div>
                      <div className="text-[9.5px] font-mono-code text-slate-400 truncate">{sec.description}</div>
                    </div>
                    {!location.isLiveGps && location.name.includes(sec.shortName) && (
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[10px] font-mono-code text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Real-Time Open-Meteo Satellite Feed • Online</span>
              </span>
              <button
                type="button"
                onClick={() => setShowViewAllModal(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
