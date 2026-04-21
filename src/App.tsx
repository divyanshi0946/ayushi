import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { AICoach } from './components/AICoach';
import { MissionsPage } from './components/MissionsPage';
import { BattlesPage } from './components/BattlesPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { FutureSelf } from './components/FutureSelf';
import { User, Mission } from './types';
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "motion/react";

const MOCK_USER: User = {
  name: "Divyanshi Srivastava",
  level: 12,
  xp: 14500,
  streak: 8,
  rank: "452",
  skills: {
    coding: 78,
    communication: 65,
    aptitude: 45,
    design: 52
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch('/api/missions');
        if (response.ok) {
          const data = await response.json();
          setMissions(data);
        }
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      }
    };
    fetchMissions();
  }, []);

  if (!isLoggedIn) {
    return <LandingPage onStart={() => setIsLoggedIn(true)} />;
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 overflow-hidden text-slate-200">
        <Navigation 
          user={MOCK_USER} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <main className="flex-1 overflow-y-auto h-screen relative bg-slate-950">
          <div className="md:hidden sticky top-0 bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <span className="font-heading font-extrabold text-xl tracking-tight text-white uppercase italic">Skill <span className="text-cyan-400">PRO</span></span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-xs uppercase">
              {MOCK_USER.name.charAt(0)}
            </div>
          </div>

          <div className="pb-24 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {activeTab === 'dashboard' && <Dashboard user={MOCK_USER} missions={missions} />}
                {activeTab === 'missions' && <MissionsPage missions={missions} />}
                {activeTab === 'battles' && <BattlesPage />}
                {activeTab === 'futureself' && <FutureSelf user={MOCK_USER} />}
                {activeTab === 'aicounselor' && <AICoach userSkills={MOCK_USER.skills} />}
                {activeTab === 'leaderboard' && <LeaderboardPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

function SwordIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
    </svg>
  );
}

