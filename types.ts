
export interface UserProfile {
  name: string;
  age: number;
  course: string;
  strengthAreas: string[];
  focusGoals: string[];
  membership: 'free' | 'premium';
  points: number;
  badges: string[];
  streak: number;
}

export interface CognitiveStats {
  speed: number;
  accuracy: number;
  confidence: number;
  focus: number;
  history: Array<{
    date: string;
    score: number;
    type: string;
  }>;
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  MEMBERSHIP = 'MEMBERSHIP',
  DASHBOARD = 'DASHBOARD',
  LEARNING_HUB = 'LEARNING_HUB',
  TASK_ACTIVE = 'TASK_ACTIVE',
  PROGRESS = 'PROGRESS',
  AI_TWIN = 'AI_TWIN',
  REWARDS = 'REWARDS',
  AI_TIPS = 'AI_TIPS',
  SETTINGS = 'SETTINGS',
  HELP = 'HELP'
}

export enum LearningMode {
  NEURO_ADAPTIVE = 'Neuro-Adaptive Challenge Engine',
  REFLEX_GYM = 'Mental Reflex Gym',
  RIDDLE_SIM = 'Reality Riddle Simulator',
  MIND_MAPPING = 'Smart Mind Mapping',
  CONFIDOMETER = 'Confidometer AI Coach',
  RECALL_TRAINER = 'Neuro-Link Recall Trainer',
  DREAM_ENHANCER = 'Dream-to-Task Enhancer',
  TIME_BENDING = 'Time-Bending Tasks',
  COGNITIVE_SHADOW = 'Cognitive Shadow',
  RIDDLE_LIFE = 'Riddle Your Life',
  PUZZLE_GEN = 'EduHack AI Generator'
}
