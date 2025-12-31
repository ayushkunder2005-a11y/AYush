
import React from 'react';
import { HelpCircle, Book, Activity, MessageSquare, Terminal, ChevronDown, ChevronUp, Zap, Sparkles } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="p-8 space-y-8 pb-32 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-4 bg-indigo-500/10 rounded-full text-indigo-400 mb-2">
          <HelpCircle size={48} />
        </div>
        <h2 className="text-4xl font-orbitron font-bold text-white">Neural Support</h2>
        <p className="text-slate-400 max-w-md mx-auto">Master the interface between your mind and the NeuroPulse AI ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <HelpCard 
          icon={<Book className="text-indigo-400" />} 
          title="Manuals" 
          desc="Deep dive into cognitive training methodologies." 
        />
        <HelpCard 
          icon={<Terminal className="text-emerald-400" />} 
          title="Diagnostics" 
          desc="Test your neural signal and hardware compatibility." 
        />
        <HelpCard 
          icon={<MessageSquare className="text-pink-400" />} 
          title="Direct Link" 
          desc="Speak with a high-level AI support twin." 
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white font-orbitron mb-6 flex items-center gap-2">
          <Sparkles className="text-yellow-400" size={20} /> Neural Knowledge Base
        </h3>
        <FAQItem 
          question="What is a 'Cognitive Shadow'?" 
          answer="The Cognitive Shadow is a mirrored AI agent that learns your decision-making patterns. It challenges you by presenting puzzles exactly at the edge of your logic capabilities, simulating a 'thinking twin' to compete against." 
        />
        <FAQItem 
          question="How does the PDF Uplink work?" 
          answer="When you upload a document (like your project report), the AI twin ingests the facts and logic structures. This allows you to ask complex questions or engage in a voice-based 'Comm-Link' to discuss the material as if you were brainstorming with a mentor." 
        />
        <FAQItem 
          question="Is my neural data safe?" 
          answer="Absolutely. NeuroPulse uses local-first processing for biometric data. Your facial expressions and vocal tones are analyzed and then immediately discarded; we only store the resulting 'Mood Metadata' to adjust difficulty." 
        />
        <FAQItem 
          question="What are Pulse Points?" 
          answer="Pulse Points (XP) represent your mental consistency. They are earned through correct answers and daily streaks. You can spend them in the Rewards hub to unlock new training soundscapes or neural avatars." 
        />
      </div>

      <div className="glass p-8 rounded-[3rem] border border-slate-700 bg-gradient-to-br from-slate-900 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Interface Diagnostics</h4>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">System Check v1.0.4</p>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20">All Systems Nominal</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DiagStat label="Core API" status="Online" />
          <DiagStat label="Neural SDK" status="Ready" />
          <DiagStat label="Audio Buffer" status="Stable" />
          <DiagStat label="Sync Latency" status="14ms" />
        </div>
      </div>
    </div>
  );
};

const HelpCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <button className="glass p-6 rounded-3xl border border-slate-700 hover:border-indigo-500 transition-all text-left group">
    <div className="p-3 bg-slate-800 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="font-bold text-white mb-2">{title}</h4>
    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
  </button>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="glass rounded-2xl border border-slate-800 overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
      >
        <span className="text-sm font-bold text-slate-200">{question}</span>
        {isOpen ? <ChevronUp size={18} className="text-indigo-400" /> : <ChevronDown size={18} className="text-slate-500" />}
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-xs text-slate-400 leading-relaxed animate-in slide-in-from-top-2">
          {answer}
        </div>
      )}
    </div>
  );
};

const DiagStat = ({ label, status }: { label: string, status: string }) => (
  <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
    <p className="text-[10px] text-slate-500 mb-1 font-bold uppercase">{label}</p>
    <p className="text-sm font-bold text-indigo-400">{status}</p>
  </div>
);

export default Help;
