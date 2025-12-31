
import React from 'react';
// Added Brain and Target to the imports to fix the missing component errors
import { Trophy, Star, Award, Flame, Zap, ShoppingBag, Brain, Target } from 'lucide-react';
import { UserProfile } from '../types';

interface RewardsProps {
  user: UserProfile;
}

const Rewards: React.FC<RewardsProps> = ({ user }) => {
  return (
    <div className="p-8 space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-orbitron font-bold text-white">Neural Rewards</h2>
          <p className="text-slate-400">Unlock your true cognitive potential with mental assets.</p>
        </div>
        <div className="flex gap-4">
           <div className="glass px-6 py-4 rounded-3xl border border-indigo-500/30 flex items-center gap-4">
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-full">
                <Flame size={24} className="fill-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Streak</p>
                <p className="text-2xl font-bold text-white">12 Days</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Badges */}
          <section className="glass p-8 rounded-[2.5rem] border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="text-indigo-400" /> Neural Credentials
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <BadgeItem icon={<Zap />} title="Speed Demon" date="Jan 24" unlocked />
              <BadgeItem icon={<Brain />} title="Logic Master" date="Feb 02" unlocked />
              <BadgeItem icon={<Star />} title="Creative Spark" date="LOCKED" />
              <BadgeItem icon={<Trophy />} title="The Pioneer" date="Jan 15" unlocked />
              <BadgeItem icon={<Target />} title="Focus God" date="LOCKED" />
              <BadgeItem icon={<Shield />} title="Guardian" date="LOCKED" />
            </div>
          </section>

          {/* Point Shop */}
          <section className="glass p-8 rounded-[2.5rem] border border-slate-700">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="text-pink-500" /> Neuro-Market
                </h3>
                <div className="px-4 py-2 bg-slate-800 rounded-full flex items-center gap-2">
                   <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                   <span className="text-sm font-bold text-white">{user.points} Pulse</span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <ShopItem title="Neural Skin: Cybernetic" price="2500" />
               <ShopItem title="Soundscape: Alpha Waves" price="1200" />
               <ShopItem title="Double XP Booster (1hr)" price="800" />
               <ShopItem title="Streak Freeze" price="500" />
             </div>
          </section>
        </div>

        <aside className="space-y-6">
           <div className="glass p-6 rounded-3xl border border-slate-700 bg-gradient-to-br from-indigo-600/10 to-transparent">
              <h4 className="text-sm font-bold text-white mb-4">Daily Quest</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Solve 3 logic puzzles while maintaining a focus score above 85%.</p>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                 <span>Progress</span>
                 <span>2 / 3</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                 <div className="h-full bg-indigo-500 w-[66%]" />
              </div>
              <button className="w-full py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all">
                Continue Quest
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
};

const BadgeItem = ({ icon, title, date, unlocked }: any) => (
  <div className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${unlocked ? 'bg-indigo-600/5 border-indigo-500/20' : 'bg-slate-900 border-slate-800 opacity-40'}`}>
    <div className={`p-4 rounded-full mb-3 ${unlocked ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-800 text-slate-600'}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-xs font-bold text-white text-center mb-1">{title}</span>
    <span className="text-[10px] text-slate-500 uppercase">{date}</span>
  </div>
);

const ShopItem = ({ title, price }: { title: string, price: string }) => (
  <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 flex items-center justify-between hover:border-slate-500 transition-all">
    <span className="text-sm font-medium text-slate-200">{title}</span>
    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg text-xs font-bold text-white hover:bg-indigo-600 transition-all">
      <Zap size={10} /> {price}
    </button>
  </div>
);

const Shield = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export default Rewards;
