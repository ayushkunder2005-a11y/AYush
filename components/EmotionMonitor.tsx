
import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Sparkles, Activity, AlertCircle, ShieldCheck } from 'lucide-react';
import { detectMood } from '../services/geminiService';

interface EmotionMonitorProps {
  onMoodDetected: (mood: string) => void;
}

const EmotionMonitor: React.FC<EmotionMonitorProps> = ({ onMoodDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<string>('Initializing...');
  const [isDrifting, setIsDrifting] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = 320;
    canvas.height = 240;
    context.drawImage(videoRef.current, 0, 0, 320, 240);

    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    const mood = await detectMood(base64Image);
    
    setLastAnalysis(mood);
    onMoodDetected(mood);
    
    // Mind Drift Logic
    if (mood === 'Distracted' || mood === 'Fatigued') {
      setIsDrifting(true);
      setTimeout(() => setIsDrifting(false), 5000);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(captureAndAnalyze, 10000); // Analyze every 10 seconds
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={`fixed bottom-6 right-6 w-72 glass rounded-[2.5rem] overflow-hidden shadow-2xl border transition-all duration-500 z-50 ${isDrifting ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-slate-800'}`}>
      <div className="relative aspect-video bg-slate-900 group">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
        <canvas ref={canvasRef} className="hidden" />
        
        {!isActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="p-3 bg-slate-800 rounded-full text-indigo-400">
              <CameraOff size={24} />
            </div>
            <button 
              onClick={startCamera}
              className="px-6 py-3 bg-[#3b49df] text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30"
            >
              Enable Mind Drift Guardian™
            </button>
          </div>
        ) : (
          <div className="absolute top-3 right-3 flex items-center gap-2">
             <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
             <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Secured</span>
          </div>
        )}

        {isDrifting && (
          <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-[2px] flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-rose-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 shadow-2xl">
              <AlertCircle size={14} /> MIND DRIFT DETECTED
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-indigo-400" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-orbitron">Guardian Monitor</span>
          </div>
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${isDrifting ? 'bg-rose-500 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
            {lastAnalysis}
          </span>
        </div>
        
        <div className="flex items-center gap-4 pt-1">
           <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${isDrifting ? 'bg-rose-500 w-1/3' : 'bg-indigo-500 w-3/4'}`} />
           </div>
           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Focus Index</span>
        </div>
      </div>
    </div>
  );
};

export default EmotionMonitor;
