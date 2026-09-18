import React, { useState } from 'react';
import { 
  X, Check, AlertCircle, Shield, Calendar, 
  Package, Truck, Users, Box, ArrowRight 
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

// 1. ALLOCATE RESOURCES MODAL
export const AllocateResourcesModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [resourceType, setResourceType] = useState('Personnel');
  const [targetCommand, setTargetCommand] = useState('Northern Command (J&K)');
  const [quantity, setQuantity] = useState('250');
  const [priority, setPriority] = useState('HIGH');
  const [authPin, setAuthPin] = useState('849201');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Allocated ${quantity} ${resourceType} to ${targetCommand} [Priority: ${priority}]`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-lg bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">ALLOCATE RESOURCES</h3>
              <p className="text-[10px] font-mono-code text-cyan-400">BHARAT COMMAND NETWORK • DISPATCH CONSOLE</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-mono-code text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Resource Category</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="Personnel">Personnel (Infantry / Special Forces)</option>
              <option value="Armored Vehicles">Armored Vehicles (T-90 / BMP-2)</option>
              <option value="Combat Aircraft">Combat Aircraft (Su-30MKI / Rafale)</option>
              <option value="Naval Units">Naval Units (Corvettes / Frigates)</option>
              <option value="Ammunition & Logistics">Ammunition & Field Logistics</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Target Command</label>
              <select
                value={targetCommand}
                onChange={(e) => setTargetCommand(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="Northern Command (J&K)">Northern Command (J&K)</option>
                <option value="Western Command (Rajasthan)">Western Command (Rajasthan)</option>
                <option value="Eastern Command (NE Region)">Eastern Command (NE Region)</option>
                <option value="Southern Command (Tamil Nadu)">Southern Command (Tamil Nadu)</option>
                <option value="Central Command (MP)">Central Command (MP)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Quantity / Units</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Mission Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="CRITICAL">CRITICAL (Immediate Action)</option>
                <option value="HIGH">HIGH (Under 6 Hours)</option>
                <option value="STANDARD">STANDARD (Scheduled)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Officer Security PIN</label>
              <input
                type="password"
                value={authPin}
                onChange={(e) => setAuthPin(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400 font-mono tracking-widest"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Allocation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. REQUEST SUPPLY MODAL
export const RequestSupplyModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [supplyCategory, setSupplyCategory] = useState('Fuel');
  const [depot, setDepot] = useState('Central Depot 4 - Ambala');
  const [amount, setAmount] = useState('10,000 Litres');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Requisition submitted: ${amount} of ${supplyCategory} from ${depot}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-lg bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">REQUEST SUPPLY REQUISITION</h3>
              <p className="text-[10px] font-mono-code text-emerald-400">FORWARD BASE & DEPOT SUPPLY CHAIN</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-mono-code text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Supply Type</label>
            <select
              value={supplyCategory}
              onChange={(e) => setSupplyCategory(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="Aviation Turbine Fuel (ATF)">Aviation Turbine Fuel (ATF)</option>
              <option value="Standard Military Diesel">Standard Military Diesel</option>
              <option value="Artillery & Small Arms Ammunition">Artillery & Small Arms Ammunition</option>
              <option value="Operational Combat Rations (MRE)">Operational Combat Rations (MRE)</option>
              <option value="Combat Medical Kits & Plasma">Combat Medical Kits & Plasma</option>
              <option value="Avionics & Armored Spare Parts">Avionics & Armored Spare Parts</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Dispatch Depot</label>
              <select
                value={depot}
                onChange={(e) => setDepot(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="Central Depot 4 - Ambala">Central Depot 4 - Ambala</option>
                <option value="Southern Depot 2 - Secunderabad">Southern Depot 2 - Secunderabad</option>
                <option value="Eastern Logistics Node - Tezpur">Eastern Logistics Node - Tezpur</option>
                <option value="Northern Supply Hub - Udhampur">Northern Supply Hub - Udhampur</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Required Quantity</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Automated convoy routing will be generated across 26 active logistics corridors.</span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <Check className="w-4 h-4" />
              <span>Submit Requisition</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. SCHEDULE DEPLOYMENT MODAL
export const ScheduleDeploymentModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [unitName, setUnitName] = useState('14th Mechanized Infantry');
  const [date, setDate] = useState('2026-09-22');
  const [time, setTime] = useState('04:00');
  const [destination, setDestination] = useState('Sector 4 - Thar Desert');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Deployment scheduled for ${unitName} to ${destination} on ${date} at ${time} IST`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-lg bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">SCHEDULE DEPLOYMENT</h3>
              <p className="text-[10px] font-mono-code text-blue-400">TRI-SERVICE STRATEGIC MOVEMENT PLANNER</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-mono-code text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Deploying Combat Formation</label>
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Target Sector / Sector Base</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Date of Mobilization</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. VIEW INVENTORY MODAL
export const ViewInventoryModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [filter, setFilter] = useState('ALL');

  if (!isOpen) return null;

  const inventoryItems = [
    { id: 'EQ-901', name: 'T-90 Bhishma Main Battle Tank', branch: 'Army', total: 1200, operational: 1140, depot: 'Western Corps' },
    { id: 'EQ-802', name: 'Arjun Mk-1A MBT', branch: 'Army', total: 240, operational: 220, depot: 'Rajasthan Sector' },
    { id: 'EQ-703', name: 'Rafale Multirole Fighter', branch: 'Air Force', total: 36, operational: 34, depot: 'Ambala / Hasimara' },
    { id: 'EQ-604', name: 'Sukhoi Su-30MKI Super Flanker', branch: 'Air Force', total: 250, operational: 225, depot: 'Bareilly / Halwara' },
    { id: 'EQ-505', name: 'INS Kolkata Class Guided Destroyer', branch: 'Navy', total: 3, operational: 3, depot: 'Western Fleet (Mumbai)' },
    { id: 'EQ-406', name: 'INS Vikrant Aircraft Carrier', branch: 'Navy', total: 1, operational: 1, depot: 'Eastern Naval Command' },
    { id: 'EQ-307', name: 'S-400 Triumf Air Defense Battery', branch: 'Strategic', total: 5, operational: 5, depot: 'Northern / Western Air Command' },
    { id: 'EQ-208', name: 'Pinaka Multi-Barrel Rocket System', branch: 'Army', total: 84, operational: 80, depot: 'Central Artillery' }
  ];

  const filtered = filter === 'ALL' ? inventoryItems : inventoryItems.filter(item => item.branch.toUpperCase().includes(filter.toUpperCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-3xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-400 flex items-center justify-center text-purple-300">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">RESOURCE ASSET INVENTORY</h3>
              <p className="text-[10px] font-mono-code text-purple-400">COMPREHENSIVE MATERIEL & HARDWARE LEDGER</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 py-3 border-b border-slate-800 text-[10px] font-mono-code">
          <span className="text-slate-400 uppercase font-bold mr-1">Filter:</span>
          {['ALL', 'ARMY', 'AIR FORCE', 'NAVY', 'STRATEGIC'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-2.5 py-1 rounded-lg border transition ${
                filter === tab
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                  : 'bg-[#031533] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table list */}
        <div className="overflow-y-auto flex-1 my-2 divide-y divide-slate-800/60 font-mono-code text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                <th className="py-2 px-2">Asset ID</th>
                <th className="py-2 px-2">Name & Nomenclature</th>
                <th className="py-2 px-2">Branch</th>
                <th className="py-2 px-2 text-right">Total</th>
                <th className="py-2 px-2 text-right">Operational</th>
                <th className="py-2 px-2">Assigned Depot</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#031533]/80 transition">
                  <td className="py-2.5 px-2 text-cyan-400 font-bold">{item.id}</td>
                  <td className="py-2.5 px-2 text-slate-100 font-medium">{item.name}</td>
                  <td className="py-2.5 px-2 text-slate-300">{item.branch}</td>
                  <td className="py-2.5 px-2 text-right text-slate-200 font-bold">{item.total}</td>
                  <td className="py-2.5 px-2 text-right text-emerald-400 font-bold">{item.operational}</td>
                  <td className="py-2.5 px-2 text-slate-400 text-[11px]">{item.depot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono-code text-slate-400">Total Items Cataloged: 12,360 Units</span>
          <button
            onClick={() => {
              onSuccess('Exported inventory ledger (PDF/CSV)');
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono-code text-xs hover:bg-cyan-900 transition"
          >
            Export Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
