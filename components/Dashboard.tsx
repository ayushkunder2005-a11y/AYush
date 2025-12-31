
import React from 'react';
import { UserProfile, CognitiveStats } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Award, 
  Zap, 
  Target, 
  TrendingUp, 
  Brain, 
  Activity, 
  Sparkles, 
  Clock, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  stats: CognitiveStats;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, stats }) => {
  const radarData = [
    { subject: 'Logic', User: 85, Shadow: 90, fullMark: 100 },
    { subject: 'Recall', User: 70, Shadow: 65, fullMark: 100 },
    { subject: 'Focus', User: stats.focus, Shadow: 95, fullMark: 100 },
    { subject: 'Reflex', User: stats.speed / 5, Shadow: 80, fullMark: 100 },
    { subject: 'Accuracy', User: stats.accuracy, Shadow: 88, fullMark: 100 },
    { subject: 'Creative', User: 95, Shadow: 75, fullMark: 100 },
  ];

  const focusData = [
    { time: '08:00', load: 30 },
    { time: '10:00', load: 85 },
    { time: '12:00', load: 45 },
    { time: '14:00', load: 92 },
    { time: '16:00', load: 60 },
    { time: '18:00', load: 75 },
    { time: '20:00', load: 40 },
  ];

  return (
    <div className="p-8 space-y-8 pb-32 animate-in fade-in duration-700">
      {/* Neural Command Header */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-[2rem] neuro-gradient p-1 shadow-2xl shadow-indigo-500/30 rotate-3">
              <div className="w-full h-full bg-slate-900 rounded-[1.8rem] flex items-center justify-center">
                <Brain className="text-indigo-400" size={36} />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-orbitron font-bold text-white tracking-tighter">Command Center</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-slate-400 font-medium">Link Status: <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">Optimal</span></span>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <span className="text-slate-400 font-medium italic">Symbiosis Level 14</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
           <DashboardMetric icon={<Zap className="text-yellow-400" />} label="Global Rank" value="#1,284" sub="#20 in Course" />
           <DashboardMetric icon={<Award className="text-indigo-400" />} label="Pulse Points" value={profile.points.toLocaleString()} sub="+450 today" highlight />
           <DashboardMetric icon={<Activity className="text-pink-500" />} label="Neural Load" value="High" sub="88% Utilization" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: The Radar & Mind Style */}
        <div className="lg:col-span-4 space-y-8">
          <section className="glass rounded-[3rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 p-20 bg-indigo-500/5 rounded-full blur-3xl" />
            
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3 relative z-10">
              <Target className="text-rose-500" /> Cognitive Mind-Map™
            </h3>
            
            <div className="h-72 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                  <Radar name="User" dataKey="User" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                  <Radar name="Shadow" dataKey="Shadow" stroke="#ec4899" fill="#ec4899" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 space-y-4 relative z-10">
              <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-800 shadow-inner group-hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shadow Insights</span>
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "Your Divergent Logic is expanding rapidly. However, focus decay during Numerical drills suggests we need a deeper 'Neuro-Boost' session at 14:00 tomorrow."
                </p>
              </div>
              
              <button className="w-full py-4 glass border border-slate-700 rounded-2xl text-xs font-bold text-indigo-400 uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2 group">
                Download Detailed Synthesis <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          <section className="glass rounded-[3rem] p-8 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" /> Cognitive Stability
            </h3>
            <div className="space-y-6">
               <StabilityBar label="Stress Resilience" value={82} color="bg-emerald-500" />
               <StabilityBar label="Neural Plasticity" value={94} color="bg-indigo-500" />
               <StabilityBar label="Attention Span" value={65} color="bg-yellow-500" />
            </div>
          </section>
        </div>

        {/* Right Col: Performance Trends */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="glass rounded-[3rem] p-8 border border-slate-800 shadow-2xl h-96 overflow-hidden relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="text-indigo-400" /> Pulse Growth (7D)
              </h3>
              <div className="h-64 absolute bottom-0 left-0 right-0 p-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.history}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="glass rounded-[3rem] p-8 border border-slate-800 shadow-2xl h-96 overflow-hidden relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="text-pink-500" /> Daily Focus Load
              </h3>
              <div className="h-64 absolute bottom-0 left-0 right-0 p-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={focusData}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip color="#ec4899" />} />
                    <Area type="stepAfter" dataKey="load" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Response Speed" value={`${stats.speed}ms`} change="-12ms" trend="up" />
            <StatCard label="Accuracy" value={`${stats.accuracy}%`} change="+4.2%" trend="up" positive />
            <StatCard label="Cognitive Focus" value={`${stats.focus}/100`} change="+8" trend="up" positive />
            <StatCard label="Neural Fatigue" value="22%" change="-5%" trend="down" positive />
          </div>

          <section className="glass p-8 rounded-[3rem] border border-slate-800 relative overflow-hidden group hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Brain size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Recommended Next Protocol</h4>
                  <p className="text-slate-400">Targeting Logic & Numerical Synapses • +250 Pulse Points</p>
                </div>
              </div>
              <div className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 group-hover:bg-indigo-500">
                Initiate Link
              </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
          </section>
        </div>
      </div>
    </div>
  );
};

const DashboardMetric = ({ icon, label, value, sub, highlight }: any) => (
  <div className={`p-6 rounded-[2rem] border transition-all flex items-center gap-4 ${highlight ? 'neuro-gradient border-transparent shadow-xl shadow-indigo-600/20' : 'glass border-slate-800 hover:border-slate-700'}`}>
    <div className={`p-3 rounded-2xl ${highlight ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
      {icon}
    </div>
    <div>
      <p className={`text-[10px] uppercase font-bold tracking-widest ${highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-xl font-bold text-white">{value}</p>
        <p className={`text-[10px] font-bold ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{sub}</p>
      </div>
    </div>
  </div>
);

const StabilityBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div>
    <div className="flex justify-between text-xs mb-2">
      <span className="text-slate-400 font-medium">{label}</span>
      <span className="text-white font-bold">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const StatCard = ({ label, value, change, trend, positive }: any) => (
  <div className="glass p-7 rounded-[2.5rem] border border-slate-800 hover:border-slate-700 transition-all group">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 group-hover:text-slate-400">{label}</p>
    <div className="flex items-end justify-between">
      <p className="text-2xl font-bold text-white group-hover:scale-110 origin-left transition-transform">{value}</p>
      <div className={`flex items-center gap-1 text-xs font-bold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {change}
      </div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label, color = "#6366f1" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-xl">
        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">{label || 'Metric'}</p>
        <p className="text-lg font-bold" style={{ color }}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default Dashboard;
