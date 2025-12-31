
import React, { useState, useRef, useEffect } from 'react';
import { Ghost, Brain, Target, Zap, ShieldAlert, FileUp, Loader2, FileText, Sparkles, ChevronRight, Send, User, MessageCircle, Trash2, Mic } from 'lucide-react';
import { UserProfile, CognitiveStats } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import LiveAudioSession from './LiveAudioSession';
import { processDocument, queryDocumentContent } from '../services/geminiService';

interface AITwinProps {
  user: UserProfile;
  stats: CognitiveStats;
}

interface ChatMessage {
  role: 'user' | 'shadow';
  text: string;
}

const AITwin: React.FC<AITwinProps> = ({ user, stats }) => {
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [docContext, setDocContext] = useState<any>(null);
  const [base64File, setBase64File] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isThinking]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        setBase64File(base64);
        const result = await processDocument(base64, file.name);
        setDocContext({ ...result, fileName: file.name });
        setIsUploading(false);
        setChatMessages([{ 
          role: 'shadow', 
          text: `Neural link established with "${file.name}". I've ingested its internal logic. Ask me anything about this knowledge base, or initiate a Comm-Link to discuss it via voice.` 
        }]);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Document upload failed:', err);
      setIsUploading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, customQuery?: string) => {
    e?.preventDefault();
    const query = customQuery || inputValue;
    if (!query.trim() || !base64File || isThinking) return;

    setChatMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputValue('');
    setIsThinking(true);
    
    try {
      const response = await queryDocumentContent(base64File, query);
      setChatMessages(prev => [...prev, { role: 'shadow', text: response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'shadow', text: "Cognitive sync failed. I lost track of the document's logic." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const comparisonData = [
    { subject: 'Logic', User: 85, Shadow: 88, fullMark: 100 },
    { subject: 'Recall', User: 70, Shadow: 65, fullMark: 100 },
    { subject: 'Focus', User: stats.focus, Shadow: 92, fullMark: 100 },
    { subject: 'Reflex', User: stats.speed / 5, Shadow: stats.speed / 4.8, fullMark: 100 },
    { subject: 'Accuracy', User: stats.accuracy, Shadow: 85, fullMark: 100 },
    { subject: 'Creative', User: 95, Shadow: 70, fullMark: 100 },
  ];

  return (
    <div className="p-8 space-y-8 pb-24">
      {isLiveActive && (
        <LiveAudioSession 
          user={user} 
          onClose={() => setIsLiveActive(false)} 
          documentContext={docContext ? {
            fileName: docContext.fileName,
            summary: docContext.summary,
            knowledgeBase: docContext.knowledgeBase,
            logicChallenges: docContext.logicChallenges
          } : undefined}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600/20 border border-indigo-500/50 rounded-3xl text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Ghost size={36} />
          </div>
          <div>
            <h2 className="text-4xl font-orbitron font-bold text-white tracking-tight">Cognitive Shadow™</h2>
            <p className="text-slate-400 font-medium">Linked Neural Interface • Version 2.5</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />
          
          {docContext && (
            <button 
              onClick={() => { setDocContext(null); setBase64File(null); setChatMessages([]); }}
              className="p-4 glass rounded-2xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/30"
              title="Purge Neural Context"
            >
              <Trash2 size={20} />
            </button>
          )}

          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`flex items-center gap-3 px-6 py-4 glass rounded-2xl font-bold transition-all shadow-xl ${isUploading ? 'text-slate-500 cursor-wait' : 'text-indigo-400 border border-indigo-500/20 hover:border-indigo-500 hover:bg-indigo-500/5 hover:text-white'}`}
          >
            {isUploading ? <Loader2 className="animate-spin" size={20} /> : <FileUp size={20} />}
            {isUploading ? 'Grounded Syncing...' : docContext ? 'Refresh Neural Base' : 'Uplink Knowledge PDF'}
          </button>
          
          <button 
            onClick={() => setIsLiveActive(true)}
            className="flex items-center gap-3 px-8 py-4 neuro-gradient rounded-2xl font-bold text-white shadow-2xl shadow-indigo-600/30 hover:scale-[1.03] transition-all group active:scale-95"
          >
            <Mic size={20} className="group-hover:animate-pulse" />
            {docContext ? 'Comm-Link Grounded' : 'Neural Comm-Link'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Document Intelligence & Chat */}
        <div className="lg:col-span-2 space-y-8">
          {docContext ? (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
              {/* Grounded Summary Card */}
              <div className="glass p-8 rounded-[3rem] border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-transparent shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-500/20">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{docContext.fileName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active Synthesis</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-3xl border border-slate-800 flex items-center gap-4">
                     <div className="text-right">
                        <p className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter">Confidence</p>
                        <p className="text-xs font-bold text-indigo-400">98.4%</p>
                     </div>
                     <div className="w-px h-6 bg-slate-800" />
                     <Sparkles className="text-yellow-400" size={18} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Shadow Digest</p>
                      <p className="text-lg text-slate-200 leading-relaxed italic font-medium border-l-4 border-indigo-500 pl-6">
                        "{docContext.summary}"
                      </p>
                    </div>
                    <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                      <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1">Neural Anomaly Detected</p>
                      <p className="text-sm text-slate-300 italic">"I found a hidden connection: {docContext.hiddenConnection}"</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Starters</p>
                    <div className="space-y-2">
                      {docContext.logicChallenges.map((challenge: string, i: number) => (
                        <button 
                          key={i} 
                          onClick={() => handleSendMessage(undefined, challenge)}
                          className="w-full flex items-center justify-between p-3.5 bg-slate-800/40 rounded-2xl border border-slate-700/50 group hover:border-indigo-500 hover:bg-indigo-500/5 transition-all text-left"
                        >
                          <span className="text-xs text-slate-300 font-medium group-hover:text-white line-clamp-1">{challenge}</span>
                          <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="glass rounded-[3rem] border border-slate-800 overflow-hidden flex flex-col h-[550px] shadow-2xl">
                <div className="p-5 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-indigo-400" />
                    <span className="text-sm font-bold text-white uppercase tracking-widest font-orbitron">Knowledge Interface</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold bg-slate-900/80 px-4 py-1 rounded-full border border-slate-800">
                    Neural Grounding: {docContext.fileName}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth custom-scrollbar">
                  {chatMessages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-40 grayscale select-none">
                      <Brain size={64} className="text-indigo-400 mb-4 animate-pulse" />
                      <p className="text-sm font-bold uppercase tracking-tighter text-indigo-300">Synchronized Knowledge Base Ready</p>
                      <p className="text-[10px] text-slate-500 mt-2">Ask me about specific modules, authors, or objectives.</p>
                    </div>
                  )}
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                      <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'}`}>
                          {msg.role === 'user' ? <User size={20} className="text-white" /> : <Ghost size={20} className="text-indigo-400" />}
                        </div>
                        <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/20' 
                            : 'bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none backdrop-blur-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800/80 p-5 rounded-[1.5rem] rounded-tl-none border border-slate-700 flex gap-2 items-center">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest animate-pulse">Scanning Document...</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" />
                          <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-6 bg-slate-900/60 border-t border-slate-800 flex gap-4 backdrop-blur-xl">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about specific neural features, tech stack, or objectives..."
                    className="flex-1 bg-slate-800/80 border border-slate-700 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isThinking}
                    className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
                  >
                    <Send size={24} />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="glass p-20 rounded-[4rem] border border-slate-700 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700">
              <div className="relative">
                <div className="w-32 h-32 bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-600 shadow-inner">
                  <FileText size={56} />
                </div>
                <div className="absolute -bottom-3 -right-3 p-3.5 bg-indigo-600 rounded-2xl text-white shadow-xl animate-bounce">
                  <Zap size={24} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-white font-orbitron tracking-tighter">Neural Context Void</h3>
                <p className="text-slate-400 max-w-sm mx-auto leading-relaxed text-lg font-medium">Uplink your study materials to activate grounded Q&A and real-time voice deconstruction.</p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-12 py-5 bg-indigo-600/10 border-2 border-indigo-500/30 rounded-[2rem] text-sm font-bold text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95"
              >
                Sync First Neural Base
              </button>
            </div>
          )}
        </div>

        {/* Sidebar: Status & Matrix */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-slate-700 bg-gradient-to-br from-indigo-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <Zap size={100} />
            </div>
            <div className="flex items-center gap-3 text-yellow-500 mb-5 relative z-10">
              <Zap size={22} className="fill-yellow-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Shadow Transmission</span>
            </div>
            <p className="text-slate-200 italic leading-relaxed text-sm relative z-10 font-medium">
              {docContext 
                ? `"I've processed ${docContext.fileName}. The architecture you've uploaded matches my own logical substrates. We should discuss the 'Hidden Connection' in our next Comm-Link."`
                : `"Your creative divergeance is currently peak. Uplink more raw logic to balance our symbiosis matrix."`}
            </p>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Target className="text-indigo-400" /> Symbiosis Matrix
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={comparisonData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="User" dataKey="User" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                  <Radar name="Shadow" dataKey="Shadow" stroke="#ec4899" fill="#ec4899" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-slate-700">
            <h3 className="text-[10px] font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <Brain size={18} className="text-indigo-400" /> Neural Duels
            </h3>
            <div className="space-y-4">
              <ShadowDuelCard title="Logic Match" reward="500 Pulse" active />
              <ShadowDuelCard title="Context Clash" reward="750 Pulse" active={!!docContext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShadowDuelCard = ({ title, reward, active }: { title: string, reward: string, active?: boolean }) => (
  <div className={`p-5 rounded-[1.5rem] border transition-all ${active ? 'bg-indigo-600/10 border-indigo-500 shadow-xl' : 'bg-slate-800/40 border-slate-700 opacity-40'}`}>
    <div className="flex justify-between items-start mb-1">
      <h4 className="font-bold text-white text-sm">{title}</h4>
      {active && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
    </div>
    <p className="text-[10px] text-slate-400 mb-4 tracking-wider font-bold">{reward}</p>
    <button className={`w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${active ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
      {active ? 'Initiate Duel' : 'Context Locked'}
    </button>
  </div>
);

export default AITwin;
