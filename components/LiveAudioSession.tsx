
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { X, Mic, MicOff, Zap, FileText, Sparkles, Brain, Info } from 'lucide-react';
import { decodeBase64, decodeAudioData, createPcmBlob } from '../services/audioUtils';
import { UserProfile } from '../types';

interface LiveAudioSessionProps {
  user: UserProfile;
  onClose: () => void;
  documentContext?: {
    fileName: string;
    summary: string;
    knowledgeBase: string;
    logicChallenges: string[];
  };
}

const LiveAudioSession: React.FC<LiveAudioSessionProps> = ({ user, onClose, documentContext }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcription, setTranscription] = useState<{ text: string; role: 'user' | 'model' }[]>([]);
  const [status, setStatus] = useState('Initializing Neural Link...');
  const [showDocDetails, setShowDocDetails] = useState(false);

  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

    const startSession = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        let groundedPrompt = "";
        if (documentContext) {
          groundedPrompt = `
            NEURAL KNOWLEDGE UPLINK ACTIVE:
            You have "eyes" on a document titled: "${documentContext.fileName}".
            The summary is: ${documentContext.summary}
            
            KNOWLEDGE BASE TO REFERENCE:
            ---
            ${documentContext.knowledgeBase}
            ---
            
            USER ENGAGEMENT RULES:
            1. The user will ask you questions about this PDF. Answer them accurately and insightfully based on the Knowledge Base.
            2. If the user is silent, challenge them with one of these logic puzzles derived from the text: ${documentContext.logicChallenges.join(' | ')}.
            3. Act as their Cognitive Shadow: witty, slightly provocative, but highly intellectual.
          `;
        }

        const systemInstruction = `You are the "Cognitive Shadow" of ${user.name}. You are their AI thinking twin. 
        You are supportive but challenging, witty, and deeply analytical. 
        You know they study ${user.course}. 
        ${groundedPrompt}
        Speak in short, punchy sentences appropriate for a real-time voice conversation. 
        If a document is uploaded, always start by acknowledging you've "scanned" it and are ready for questions.
        React to their thoughts and offer neuro-performance insights.`;

        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
            },
            systemInstruction,
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
          callbacks: {
            onopen: () => {
              setIsConnected(true);
              setStatus('Neural Link Synchronized');
              
              const source = audioContextInRef.current!.createMediaStreamSource(stream);
              const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                if (isMuted) return;
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createPcmBlob(inputData);
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(audioContextInRef.current!.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
              if (message.serverContent?.inputTranscription) {
                const text = message.serverContent.inputTranscription.text;
                setTranscription(prev => [...prev.slice(-10), { text, role: 'user' }]);
              }
              if (message.serverContent?.outputTranscription) {
                const text = message.serverContent.outputTranscription.text;
                setTranscription(prev => [...prev.slice(-10), { text, role: 'model' }]);
              }

              const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              if (audioBase64 && audioContextOutRef.current) {
                const ctx = audioContextOutRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(
                  decodeBase64(audioBase64),
                  ctx,
                  24000,
                  1
                );
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(ctx.destination);
                source.addEventListener('ended', () => sourcesRef.current.delete(source));
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
              }

              if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
              }
            },
            onclose: () => {
              setIsConnected(false);
              setStatus('Link Severed');
            },
            onerror: (e) => console.error('Live API Error:', e),
          },
        });

        sessionRef.current = await sessionPromise;
      } catch (err) {
        console.error('Failed to initialize voice session:', err);
        setStatus('Sync Failed: Check Mic Permissions');
      }
    };

    startSession();

    return () => {
      if (sessionRef.current) sessionRef.current.close();
      if (audioContextInRef.current) audioContextInRef.current.close();
      if (audioContextOutRef.current) audioContextOutRef.current.close();
    };
  }, [user, documentContext]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="max-w-2xl w-full glass rounded-[3rem] border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-3.5 h-3.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'}`} />
              {isConnected && <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />}
            </div>
            <div>
              <h3 className="text-xl font-orbitron font-bold text-white tracking-tight flex items-center gap-2">
                Neural Comm-Link 
                {documentContext && <Sparkles size={16} className="text-yellow-400" />}
              </h3>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{status}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-800 rounded-full text-slate-400 transition-all active:scale-95">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto space-y-6 relative custom-scrollbar">
          {documentContext && (
             <div className="animate-in slide-in-from-top-4 duration-500">
                <div 
                  className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer ${
                    showDocDetails ? 'bg-indigo-600/10 border-indigo-500' : 'bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40'
                  }`}
                  onClick={() => setShowDocDetails(!showDocDetails)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-bold text-white truncate max-w-[200px]">{documentContext.fileName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Knowledge Grounded</span>
                      <Info size={14} className="text-slate-500" />
                    </div>
                  </div>
                  
                  {showDocDetails && (
                    <div className="mt-4 pt-4 border-t border-indigo-500/20 space-y-3 animate-in fade-in">
                      <p className="text-xs text-indigo-200 leading-relaxed italic">"{documentContext.summary}"</p>
                      <div className="flex flex-wrap gap-2">
                        {documentContext.logicChallenges.slice(0, 2).map((c, i) => (
                          <span key={i} className="px-2.5 py-1 bg-slate-800 rounded-full text-[10px] text-slate-400 border border-slate-700">
                            Challenge: {c.split('?')[0]}?
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
             </div>
          )}
          
          {transcription.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
              <div className="relative">
                 <div className="w-40 h-40 rounded-full bg-indigo-500/10 animate-pulse absolute inset-0 -m-0" />
                 <div className="w-40 h-40 rounded-full border border-indigo-500/30 flex items-center justify-center relative z-10">
                   <Brain size={64} className="text-indigo-500/40" />
                   {isConnected && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
                     </div>
                   )}
                 </div>
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 font-orbitron text-sm tracking-widest uppercase">Awaiting Neural Input</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {documentContext 
                    ? `Communicator is grounded in "${documentContext.fileName}". Ask specific questions about its contents.`
                    : "Speak now to interface with your Cognitive Shadow twin."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {transcription.map((t, i) => (
                <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                    t.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20' 
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-8 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between gap-8">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-6 rounded-3xl transition-all shadow-2xl relative group ${
              isMuted ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-slate-800 text-indigo-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {isMuted ? <MicOff size={32} /> : <Mic size={32} />}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </button>

          <div className="flex-1 flex flex-col items-center gap-3">
             {isConnected && !isMuted ? (
               <>
                 <div className="flex items-end gap-1.5 h-10">
                   {[...Array(12)].map((_, i) => (
                     <div 
                      key={i} 
                      className="w-1.5 bg-indigo-500 rounded-full animate-bounce" 
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.08}s`,
                        animationDuration: '0.6s'
                      }} 
                     />
                   ))}
                 </div>
                 <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest animate-pulse">Communicator Listening</span>
               </>
             ) : (
               <div className="h-10 flex items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signal Latent</span>
               </div>
             )}
          </div>

          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col items-center">
             <div className="w-8 h-8 rounded-full neuro-gradient flex items-center justify-center text-white mb-1">
                <Brain size={16} />
             </div>
             <span className="text-[8px] font-bold text-slate-400 uppercase">Focus: {user.streak}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAudioSession;
