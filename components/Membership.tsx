
import React from 'react';
import { Check, Zap, Shield, Sparkles, Brain } from 'lucide-react';

interface MembershipProps {
  onSelect: (type: 'free' | 'premium') => void;
}

const Membership: React.FC<MembershipProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="glass p-10 rounded-[2.5rem] border border-slate-700 flex flex-col hover:border-slate-500 transition-all">
          <h3 className="text-2xl font-orbitron font-bold text-white mb-2">Free Seeker</h3>
          <p className="text-slate-400 mb-8">Essential cognitive stimulation for the curious mind.</p>
          <div className="text-4xl font-bold text-white mb-8">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <FeatureItem text="Daily Puzzle Generator" />
            <FeatureItem text="Basic Dashboard" />
            <FeatureItem text="Community Riddles" />
          </ul>

          <button 
            onClick={() => onSelect('free')}
            className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
          >
            Start Journey
          </button>
        </div>

        {/* Premium Plan */}
        <div className="glass p-10 rounded-[2.5rem] border-2 border-indigo-500 flex flex-col relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 p-4 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl">
            Recommended
          </div>
          
          <h3 className="text-2xl font-orbitron font-bold text-white mb-2 flex items-center gap-2">
            Neuro-Premium <Zap size={20} className="text-yellow-400 fill-yellow-400" />
          </h3>
          <p className="text-indigo-200/60 mb-8">Unleash the full potential of your cognitive evolution.</p>
          <div className="text-4xl font-bold text-white mb-8">$19<span className="text-lg text-slate-400 font-normal">/mo</span></div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <FeatureItem text="24/7 Interactive AI Tutor" premium />
            <FeatureItem text="Cognitive Decay Monitor™" premium />
            <FeatureItem text="Thought-to-Text Assistant™" premium />
            <FeatureItem text="Mind Drift Guardian™ (Full)" premium />
            <FeatureItem text="AI Cognitive Twin (Shadow)" premium />
            <FeatureItem text="Meta-Learning Booster™" premium />
          </ul>

          <button 
            onClick={() => onSelect('premium')}
            className="w-full py-4 neuro-gradient text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, premium }: { text: string; premium?: boolean }) => (
  <li className="flex items-center gap-3">
    <div className={`p-1 rounded-full ${premium ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
      <Check size={14} />
    </div>
    <span className={`text-sm ${premium ? 'text-indigo-100 font-medium' : 'text-slate-400'}`}>{text}</span>
  </li>
);

export default Membership;
