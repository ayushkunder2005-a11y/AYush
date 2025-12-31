
import React from 'react';
import { 
  Brain, 
  LayoutDashboard, 
  Award, 
  Settings, 
  LogOut, 
  Activity, 
  Ghost, 
  Zap, 
  BookOpen, 
  HelpCircle,
  Trophy
} from 'lucide-react';
import { AppState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: AppState) => void;
  mood?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, mood }) => {
  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-slate-800 flex flex-col p-4 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="p-1.5 neuro-gradient rounded-xl shadow-lg shadow-indigo-500/20">
            <Brain className="text-white w-6 h-6" />
          </div>
          <h1 className="font-orbitron text-lg font-bold tracking-tighter text-transparent bg-clip-text neuro-gradient">
            NEUROPULSE
          </h1>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Analytics" 
            active={activeTab === AppState.DASHBOARD} 
            onClick={() => onTabChange(AppState.DASHBOARD)}
          />
          <NavItem 
            icon={<Brain size={18} />} 
            label="Training Lab" 
            active={activeTab === AppState.LEARNING_HUB} 
            onClick={() => onTabChange(AppState.LEARNING_HUB)}
          />
          <NavItem 
            icon={<Zap size={18} />} 
            label="Tasks" 
            active={activeTab === AppState.TASK_ACTIVE} 
            onClick={() => onTabChange(AppState.LEARNING_HUB)}
          />
          <NavItem 
            icon={<BookOpen size={18} />} 
            label="AI Tips" 
            active={activeTab === AppState.AI_TIPS} 
            onClick={() => onTabChange(AppState.AI_TIPS)}
          />
          <NavItem 
            icon={<Ghost size={18} />} 
            label="AI Twin" 
            active={activeTab === AppState.AI_TWIN} 
            onClick={() => onTabChange(AppState.AI_TWIN)}
          />
          <NavItem 
            icon={<Trophy size={18} />} 
            label="Rewards" 
            active={activeTab === AppState.REWARDS} 
            onClick={() => onTabChange(AppState.REWARDS)}
          />
        </nav>

        <div className="mt-6 pt-6 border-t border-slate-800 space-y-1">
          {mood && (
            <div className="p-3 mb-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={12} className="text-pink-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Live State</span>
              </div>
              <p className="text-sm font-bold text-white">{mood}</p>
            </div>
          )}
          
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={activeTab === AppState.SETTINGS} 
            onClick={() => onTabChange(AppState.SETTINGS)}
          />
          <NavItem 
            icon={<HelpCircle size={18} />} 
            label="Help" 
            active={activeTab === AppState.HELP} 
            onClick={() => onTabChange(AppState.HELP)}
          />
          <button className="flex items-center gap-3 w-full p-2.5 text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors text-sm font-medium mt-2">
            <LogOut size={18} />
            <span>End Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-950">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all text-sm font-medium ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Layout;
