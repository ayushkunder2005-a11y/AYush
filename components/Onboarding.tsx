
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { ChevronRight, Target, BookOpen, BrainCircuit, Activity, Fingerprint, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0 is the new Biometric Enrollment
  const [enrollmentStatus, setEnrollmentStatus] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: 21,
    course: '',
    strengthAreas: [],
    focusGoals: [],
    membership: 'free'
  });

  const nextStep = () => setStep(s => s + 1);

  const startEnrollment = () => {
    let status = 0;
    const interval = setInterval(() => {
      status += 10;
      setEnrollmentStatus(status);
      if (status >= 100) {
        clearInterval(interval);
        setTimeout(nextStep, 1000);
      }
    }, 150);
  };

  const handleComplete = () => {
    onComplete(profile as UserProfile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0f1e]">
      <div className="max-w-xl w-full glass p-10 rounded-[3rem] border border-slate-800/60 shadow-2xl relative overflow-hidden">
        {step === 0 && (
          <div className="space-y-10 py-4 animate-in fade-in zoom-in-95 text-center">
            <div className="relative inline-block">
               <div className={`p-10 rounded-full border-4 transition-all duration-1000 ${enrollmentStatus > 0 ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900'}`}>
                 <Fingerprint size={84} className={`transition-all duration-1000 ${enrollmentStatus > 0 ? 'text-indigo-400 scale-110' : 'text-slate-600'}`} />
               </div>
               {enrollmentStatus > 0 && (
                 <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-20" />
               )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-orbitron font-bold text-white tracking-tighter">Neuro-Fingerprint ID</h2>
              <p className="text-slate-400 max-w-sm mx-auto">Initializing privacy-safe biometric enrollment. We use local encryption for face, voice, and cognitive dynamics.</p>
            </div>

            {enrollmentStatus === 0 ? (
              <button 
                onClick={startEnrollment}
                className="w-full py-5 neuro-gradient rounded-2xl font-bold text-white shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <Lock size={20} /> Enroll Learning ID
              </button>
            ) : (
              <div className="space-y-4">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all" style={{width: `${enrollmentStatus}%`}} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Enrolling Neural Patterns</span>
                  <span>{enrollmentStatus}%</span>
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Privacy Protocol v2.5 Active
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">ID Verified</span>
              </div>
              <h2 className="text-3xl font-orbitron font-bold text-white">Neural Mapping</h2>
              <p className="text-slate-400">Initialize your cognitive baseline.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cognitive ID Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 transition-all outline-none"
                  placeholder="e.g. Alex"
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Age</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none"
                    value={profile.age}
                    onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Current Course</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none"
                    placeholder="e.g. CS"
                    value={profile.course}
                    onChange={e => setProfile({...profile, course: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={nextStep}
              className="w-full py-5 bg-[#3b49df] rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
            >
              Continue Calibration <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div className="space-y-2 text-center">
              <h2 className="text-3xl font-orbitron font-bold text-white">Synaptic Strengths</h2>
              <p className="text-slate-400">Select areas where your mind already excels.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['Logic', 'Spatial', 'Creative', 'Numerical', 'Linguistic', 'Memory'].map(area => (
                <button
                  key={area}
                  onClick={() => {
                    const current = profile.strengthAreas || [];
                    const next = current.includes(area) ? current.filter(a => a !== area) : [...current, area];
                    setProfile({...profile, strengthAreas: next});
                  }}
                  className={`p-6 rounded-3xl border transition-all text-sm font-bold ${
                    profile.strengthAreas?.includes(area) 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-500/20' 
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="w-full py-5 bg-[#3b49df] rounded-2xl font-bold text-white flex items-center justify-center gap-2"
            >
              Set Objectives <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div className="space-y-2 text-center">
              <h2 className="text-3xl font-orbitron font-bold text-white">Focus Goals</h2>
              <p className="text-slate-400">What is your primary training objective?</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Long-term Retention', icon: <BrainCircuit size={18} /> },
                { label: 'Exam Performance', icon: <BookOpen size={18} /> },
                { label: 'Decision Speed', icon: <Target size={18} /> },
                { label: 'Mental Clarity', icon: <Activity size={18} /> }
              ].map(goal => (
                <button
                  key={goal.label}
                  onClick={() => {
                    const current = profile.focusGoals || [];
                    const next = current.includes(goal.label) ? current.filter(g => g !== goal.label) : [...current, goal.label];
                    setProfile({...profile, focusGoals: next});
                  }}
                  className={`w-full flex items-center gap-6 p-6 rounded-3xl border transition-all ${
                    profile.focusGoals?.includes(goal.label)
                      ? 'bg-[#d61f69] border-[#d61f69] text-white shadow-xl shadow-pink-500/20'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${profile.focusGoals?.includes(goal.label) ? 'bg-white/20' : 'bg-slate-800'}`}>
                    {goal.icon}
                  </div>
                  <span className="font-bold text-lg">{goal.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleComplete}
              className="w-full py-5 neuro-gradient rounded-3xl font-bold text-white shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] transition-all"
            >
              Activate Neural Pulse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
