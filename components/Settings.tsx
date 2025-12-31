
import React from 'react';
import { User, Shield, Zap, Bell, Eye, EyeOff, Save, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (updated: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const [localProfile, setLocalProfile] = React.useState(user);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    onUpdate(localProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 space-y-8 pb-32 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-orbitron font-bold text-white">Neural Calibration</h2>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${saved ? 'bg-emerald-600 text-white' : 'neuro-gradient text-white hover:scale-105 active:scale-95'}`}
        >
          {saved ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {saved ? 'Synchronized' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <section className="glass p-8 rounded-[2.5rem] border border-slate-700 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <User className="text-indigo-400" /> Neural Identity
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Cognitive ID</label>
              <input 
                type="text" 
                value={localProfile.name}
                onChange={e => setLocalProfile({...localProfile, name: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Current Course/Focus</label>
              <input 
                type="text" 
                value={localProfile.course}
                onChange={e => setLocalProfile({...localProfile, course: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="glass p-8 rounded-[2.5rem] border border-slate-700 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Shield className="text-pink-500" /> Privacy Protocols
          </h3>
          <div className="space-y-4">
            <ToggleSetting 
              label="Biometric Feedback" 
              description="Allow camera access for real-time mood detection." 
              initial={true} 
            />
            <ToggleSetting 
              label="Cognitive Data Vault" 
              description="Encrypt PDF knowledge bases locally." 
              initial={true} 
            />
            <ToggleSetting 
              label="Anonymous Synthesis" 
              description="Share non-identifiable neural patterns for AI growth." 
              initial={false} 
            />
          </div>
        </section>

        {/* Neural Tuning */}
        <section className="glass p-8 rounded-[2.5rem] border border-slate-700 space-y-6 col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Zap className="text-yellow-400" /> Synaptic Sensitivity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-300">Baseline Difficulty</span>
                <span className="text-xs font-bold text-indigo-400">Level 6</span>
              </div>
              <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              <p className="text-[10px] text-slate-500">Determines the starting point for Neuro-Adaptive challenges.</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-300">Focus Decay Sensitivity</span>
                <span className="text-xs font-bold text-pink-400">High</span>
              </div>
              <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500" />
              <p className="text-[10px] text-slate-500">How quickly the AI alerts you when detecting mind drift.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ToggleSetting = ({ label, description, initial }: { label: string, description: string, initial: boolean }) => {
  const [active, setActive] = React.useState(initial);
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-800">
      <div className="space-y-1">
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-[10px] text-slate-500 leading-tight">{description}</p>
      </div>
      <button 
        onClick={() => setActive(!active)}
        className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-indigo-600' : 'bg-slate-700'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
};

export default Settings;
