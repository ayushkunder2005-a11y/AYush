
import React from 'react';
import { LearningMode } from '../types';
import { 
  Zap, Activity, Search, Network, 
  MessageSquare, History, Moon, Timer, 
  Ghost, Calendar, PuzzleIcon, Lock
} from 'lucide-react';

interface LearningHubProps {
  onSelectMode: (mode: LearningMode) => void;
}

const LearningHub: React.FC<LearningHubProps> = ({ onSelectMode }) => {
  const modes = [
    { id: LearningMode.NEURO_ADAPTIVE, icon: <Zap />, color: 'from-indigo-500 to-cyan-400', desc: 'Real-time difficulty adjustment based on neural load.', premium: false },
    { id: LearningMode.REFLEX_GYM, icon: <Activity />, color: 'from-rose-500 to-orange-400', desc: 'Reaction time & Stroop effect drills for pressure tasks.', premium: false },
    { id: LearningMode.RIDDLE_SIM, icon: <Search />, color: 'from-emerald-500 to-teal-400', desc: 'AR-inspired spatial logic and environmental tasks.', premium: false },
    { id: LearningMode.MIND_MAPPING, icon: <Network />, color: 'from-violet-500 to-purple-400', desc: 'Analyze solving behavior to discover your learning style.', premium: true },
    { id: LearningMode.CONFIDOMETER, icon: <MessageSquare />, color: 'from-amber-500 to-yellow-400', desc: 'AI confidence coach using speech/body analysis.', premium: true },
    { id: LearningMode.RECALL_TRAINER, icon: <History />, color: 'from-blue-500 to-indigo-400', desc: 'Neural-link trainer for long-term concept association.', premium: false },
    { id: LearningMode.DREAM_ENHANCER, icon: <Moon />, color: 'from-slate-700 to-slate-900', desc: 'Transform dream logs into creative logical puzzles.', premium: true },
    { id: LearningMode.TIME_BENDING, icon: <Timer />, color: 'from-fuchsia-500 to-pink-400', desc: 'High-speed decision games to dilate focus.', premium: false },
    { id: LearningMode.COGNITIVE_SHADOW, icon: <Ghost />, color: 'from-gray-500 to-slate-400', desc: 'Compete against an AI that mimics your thinking style.', premium: true },
    { id: LearningMode.RIDDLE_LIFE, icon: <Calendar />, color: 'from-lime-500 to-emerald-400', desc: 'Turn your daily schedule into logic riddles.', premium: true },
    { id: LearningMode.PUZZLE_GEN, icon: <PuzzleIcon />, color: 'from-sky-500 to-blue-400', desc: 'EduHack AI generating auto-contextual quizzes.', premium: false },
  ];

  return (
    <div className="p-8 space-y-8 pb-32">
      <div className="space-y-2">
        <h2 className="text-4xl font-orbitron font-bold text-white">Neuro-Training Hub</h2>
        <p className="text-slate-400 text-lg max-w-2xl">Target specific neural pathways to optimize your mental hardware.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className="group relative glass p-6 rounded-3xl border border-slate-700 hover:border-indigo-500/50 transition-all text-left overflow-hidden h-full flex flex-col"
          >
            {mode.premium && (
              <div className="absolute top-4 right-4 z-10 p-1.5 bg-indigo-500 text-white rounded-lg shadow-lg flex items-center gap-1">
                 <Lock size={12} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Premium</span>
              </div>
            )}
            
            <div className="absolute top-0 right-0 p-8 -mr-4 -mt-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <div className="text-white scale-[3]">{mode.icon}</div>
            </div>
            
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
              {mode.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-tight">{mode.id}</h3>
            <p className="text-slate-400 text-sm flex-grow leading-relaxed">{mode.desc}</p>
            
            <div className="mt-6 flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Initiate Link <Zap size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LearningHub;
