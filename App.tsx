
import React, { useState, useEffect } from 'react';
import { AppState, UserProfile, CognitiveStats, LearningMode } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Membership from './components/Membership';
import LearningHub from './components/LearningHub';
import Dashboard from './components/Dashboard';
import TaskRunner from './components/TaskRunner';
import EmotionMonitor from './components/EmotionMonitor';
import AITwin from './components/AITwin';
import Rewards from './components/Rewards';
import Settings from './components/Settings';
import Help from './components/Help';
import MetaBooster from './components/MetaBooster';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentMood, setCurrentMood] = useState<string>('Focused');
  const [activeMode, setActiveMode] = useState<LearningMode | null>(null);
  
  const [stats, setStats] = useState<CognitiveStats>({
    speed: 340,
    accuracy: 88,
    confidence: 72,
    focus: 94,
    history: [
      { date: 'Mon', score: 65, type: 'Logic' },
      { date: 'Tue', score: 68, type: 'Recall' },
      { date: 'Wed', score: 75, type: 'Spatial' },
      { date: 'Thu', score: 72, type: 'Reflex' },
      { date: 'Fri', score: 82, type: 'Numerical' },
      { date: 'Sat', score: 88, type: 'Creative' },
      { date: 'Sun', score: 85, type: 'Linguistic' },
    ]
  });

  const handleOnboardingComplete = (profile: Partial<UserProfile>) => {
    setUserProfile({
      ...profile,
      membership: 'free',
      points: 1250,
      badges: [],
      streak: 1
    } as UserProfile);
    setAppState(AppState.MEMBERSHIP);
  };

  const handleMembershipSelect = (type: 'free' | 'premium') => {
    if (userProfile) {
      setUserProfile({ ...userProfile, membership: type });
    }
    setAppState(AppState.DASHBOARD);
  };

  const handleSelectMode = (mode: LearningMode) => {
    setActiveMode(mode);
    setAppState(AppState.TASK_ACTIVE);
  };

  const handleTabChange = (tab: AppState) => {
    setAppState(tab);
  };

  const updateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  if (appState === AppState.ONBOARDING) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (appState === AppState.MEMBERSHIP) {
    return <Membership onSelect={handleMembershipSelect} />;
  }

  return (
    <Layout 
      activeTab={appState} 
      onTabChange={handleTabChange}
      mood={currentMood}
    >
      <div className="relative">
        {appState === AppState.DASHBOARD && userProfile && (
          <Dashboard profile={userProfile} stats={stats} />
        )}

        {appState === AppState.LEARNING_HUB && (
          <LearningHub onSelectMode={handleSelectMode} />
        )}

        {appState === AppState.TASK_ACTIVE && activeMode && userProfile && (
          <TaskRunner 
            mode={activeMode} 
            user={userProfile} 
            mood={currentMood}
            onFinish={() => setAppState(AppState.DASHBOARD)} 
          />
        )}

        {appState === AppState.AI_TWIN && userProfile && (
          <AITwin user={userProfile} stats={stats} />
        )}

        {appState === AppState.REWARDS && userProfile && (
          <Rewards user={userProfile} />
        )}

        {appState === AppState.SETTINGS && userProfile && (
          <Settings user={userProfile} onUpdate={updateProfile} />
        )}

        {appState === AppState.HELP && (
          <Help />
        )}

        {appState === AppState.AI_TIPS && userProfile && (
          <MetaBooster user={userProfile} />
        )}

        {/* Global UI Elements */}
        <EmotionMonitor onMoodDetected={setCurrentMood} />
      </div>
    </Layout>
  );
};

export default App;
