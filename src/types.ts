export interface User {
  name: string;
  level: number;
  xp: number;
  streak: number;
  rank: string;
  avatar?: string;
  skills: {
    coding: number;
    communication: number;
    aptitude: number;
    design: number;
  };
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  duration: string;
  category: string;
  completed?: boolean;
}

export interface BattleChallenge {
  id: string;
  type: 'Quiz' | 'Code' | 'Speed';
  opponent: string;
  reward: number;
  status: 'pending' | 'active' | 'completed';
}
