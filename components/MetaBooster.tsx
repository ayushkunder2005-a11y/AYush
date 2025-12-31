
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  ChevronRight, 
  Mic, 
  Zap, 
  Activity, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface MetaBoosterProps {
  user: UserProfile;
}

const MetaBooster: React.FC<MetaBoosterProps> = ({ user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [thoughtMap, setThoughtMap] = useState<string[]>([]);

  const simulateThoughtMapping = () => {
    setIsRecording(true);
    setTimeout(() => {
      setThoughtMap([
        "Abstract Logic → Spatial Anchors",
        "Semantic Node: 'Neural Plasticity'",
        "Mapped to: 'Library Bookshelf' (Memory Palace)"
      ]);
      setIsRecording(false);
    }, 3000);
  };

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-700 bg-[#0a0f1e] min-h-full">
      {/* Header matching screenshot */}
      <div className="mb-16">
        <h2 className="text-5xl font-orbitron font-bold text-white tracking-tighter flex items-baseline gap-4">
          Meta - Learning Booster <span className="text-xl font-orbitron text-slate-500 uppercase">TM</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Memory Palaces Card */}
        <div className="glass p-10 rounded-[2.5rem] border border-slate-800/50 bg-[#161d31]/40 space-y-8 group hover:border-indigo-500/30 transition-all shadow-2xl">
          <h3 className="text-2xl font-bold text-indigo-400 font-inter">Memory Palaces</h3>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Strategy : Attach new concepts to your bedroom's furniture . The AI has identified that you recall 40 % more when using spatial anchors .
          </p>
          <button className="px-10 py-4 bg-[#3b49df] text-white rounded-2xl font-bold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            Practice Strategy
          </button>
        </div>

        {/* Confidometer Card */}
        <div className="glass p-10 rounded-[2.5rem] border border-slate-800/50 bg-[#161d31]/40 space-y-8 group hover:border-pink-500/30 transition-all shadow-2xl">
          <h3 className="text-2xl font-bold text-pink-500 font-inter">Confidometer AI Tips</h3>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Your recent voice responses showed hesitation in logic deconstruction . Tip : Lower your pitch slightly to increase neuro-authoritative signal .
          </p>
          <button className="px-10 py-4 bg-[#d61f69] text-white rounded-2xl font-bold text-sm hover:bg-pink-500 transition-all shadow-lg shadow-pink-500/20 active:scale-95">
            Confidence Drill
          </button>
        </div>
      </div>

      {/* Advanced System: Thought-to-Text Pipeline */}
      <section className="mt-20 glass p-10 rounded-[3rem] border border-slate-800 bg-gradient-to-br from-indigo-900/10 to-transparent">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-orbitron font-bold text-white flex items-center gap-3">
              <Mic className="text-indigo-400" /> Thought-to-Text Pipeline
            </h3>
            <p className="text-slate-400 mt-2">Whisper Engine &rarr; Semantic Logic Mapping</p>
          </div>
          <button 
            onClick={simulateThoughtMapping}
            disabled={isRecording}
            className={`p-6 rounded-full transition-all ${isRecording ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500'} shadow-xl`}
          >
            <Mic size={32} className="text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-950/50 rounded-3xl p-8 border border-slate-800 min-h-[200px] flex flex-col justify-center items-center">
            {isRecording ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-8 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`}} />)}
                </div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Inhaling Stream...</span>
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">Hold the mic to map your subconscious concepts into logic nodes.</p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Semantic Nodes Generated</h4>
            <div className="space-y-3">
              {thoughtMap.length > 0 ? thoughtMap.map((node, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 animate-in slide-in-from-right-4" style={{animationDelay: `${i*0.2}s`}}>
                  <Zap size={14} className="text-yellow-400" />
                  <span className="text-sm font-medium text-slate-300">{node}</span>
                </div>
              )) : (
                [1,2].map(i => <div key={i} className="h-14 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed" />)
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced System: Riddle-Your-Life Engine (Contextual Link) */}
      <section className="glass p-10 rounded-[3rem] border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Search size={140} />
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles className="text-emerald-400" /> Riddle-Your-Life Engine
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-xl">
              Syncs with your calendar to generate contextual logic riddles based on your actual daily meetings and study modules.
            </p>
            <div className="flex gap-3">
              <div className="px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">
                Next Event: 14:00 Logic Seminar
              </div>
              <div className="px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-[10px] font-bold uppercase border border-indigo-500/20">
                Riddle Pending
              </div>
            </div>
          </div>
          <button className="px-10 py-5 bg-emerald-600 text-white rounded-[2rem] font-bold shadow-2xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all flex items-center gap-3 group/btn active:scale-95">
            Sync Calendar <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MetaBooster;
