
import React, { useState, useEffect } from 'react';
import { LearningMode, UserProfile } from '../types';
import { generatePuzzle, generateCognitiveShadowCommentary } from '../services/geminiService';
import { CheckCircle2, XCircle, Brain, RefreshCw, ChevronRight, MessageSquareCode } from 'lucide-react';

interface TaskRunnerProps {
  mode: LearningMode;
  user: UserProfile;
  mood: string;
  onFinish: (result: any) => void;
}

const TaskRunner: React.FC<TaskRunnerProps> = ({ mode, user, mood, onFinish }) => {
  const [puzzle, setPuzzle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [shadowComment, setShadowComment] = useState<string>('');
  const [difficulty, setDifficulty] = useState(5);

  const fetchPuzzle = async () => {
    setLoading(true);
    setSelected(null);
    setResult(null);
    
    // Neuro-adaptive logic: if mood is 'Fatigued', lower difficulty
    let currentDifficulty = difficulty;
    if (mood === 'Fatigued') currentDifficulty = Math.max(1, difficulty - 2);
    if (mood === 'Confident' || mood === 'Focused') currentDifficulty = Math.min(10, difficulty + 1);

    const data = await generatePuzzle(user, mood, currentDifficulty);
    setPuzzle(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPuzzle();
  }, [mode]);

  const handleSelect = async (option: string) => {
    if (result) return;
    setSelected(option);
    const isCorrect = option === puzzle.correctAnswer;
    setResult(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) setDifficulty(d => Math.min(10, d + 1));
    else setDifficulty(d => Math.max(1, d - 1));

    // Get Cognitive Shadow feedback
    const comment = await generateCognitiveShadowCommentary(user, `Selected "${option}" for ${puzzle.title}`);
    setShadowComment(comment);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-white font-orbitron">Synthesizing Neuro-Challenge</p>
          <p className="text-slate-400 text-sm italic">Calibrating to current mood: {mood}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 animate-in fade-in zoom-in-95">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Brain size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">{mode}</h2>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Neural Load</p>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-3 rounded-full ${i < difficulty ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                ))}
              </div>
            </div>
            <button onClick={fetchPuzzle} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
               <RefreshCw size={20} />
            </button>
         </div>
      </div>

      <div className="glass p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Brain size={120} />
        </div>

        <div className="space-y-4 mb-10 relative">
          <h3 className="text-3xl font-orbitron font-bold text-white">{puzzle.title}</h3>
          <p className="text-xl text-slate-300 leading-relaxed">{puzzle.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {puzzle.options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!result}
              className={`p-6 rounded-2xl border text-left transition-all ${
                selected === opt
                  ? result === 'correct'
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-rose-600 border-rose-500 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-indigo-500 hover:bg-slate-800'
              } ${result && opt === puzzle.correctAnswer ? 'bg-emerald-600/30 border-emerald-500' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{opt}</span>
                {selected === opt && (
                  result === 'correct' ? <CheckCircle2 /> : <XCircle />
                )}
              </div>
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-10 p-8 bg-slate-900/50 rounded-3xl border border-slate-700 space-y-4 animate-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${result === 'correct' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {result === 'correct' ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-xl font-bold text-white">{result === 'correct' ? 'Cognitive Breakthrough!' : 'Path Disrupted'}</p>
                <p className="text-slate-400 leading-relaxed">{puzzle.explanation}</p>
              </div>
            </div>

            <hr className="border-slate-800" />
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl">
                <MessageSquareCode size={32} />
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Cognitive Shadow™ Insights</p>
                <p className="text-slate-200 italic">"{shadowComment}"</p>
              </div>
            </div>

            <button 
              onClick={fetchPuzzle}
              className="mt-4 w-full py-4 neuro-gradient rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-2"
            >
              Next Challenge <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskRunner;
