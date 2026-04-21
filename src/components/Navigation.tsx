import { Button } from "@/components/ui/button";
import { User } from "@/src/types";
import { LayoutDashboard, Trophy, Target, Bell, Settings, Sparkles, Sword, Brain, Rocket } from "lucide-react";

interface NavigationProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navigation({ user, activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'missions', label: 'Missions', icon: Target },
    { id: 'futureself', label: 'Future Self', icon: Sparkles },
    { id: 'battles', label: 'Battles', icon: Sword },
    { id: 'aicounselor', label: 'AI Coach', icon: Brain },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 py-2 flex justify-around items-center z-50 md:relative md:flex-col md:w-64 md:h-screen md:border-t-0 md:border-r md:justify-start md:pt-8 shrink-0 pb-safe">
      <div className="hidden md:flex items-center gap-2 mb-10 px-4">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Rocket className="w-6 h-6" />
        </div>
        <span className="font-heading font-extrabold text-xl tracking-tight text-white uppercase italic">Skill <span className="text-brand-accent">PRO</span></span>
      </div>

      <div className="flex w-full justify-around md:flex-col md:gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 rounded-xl transition-all ${
              activeTab === item.id
                ? "text-brand-accent bg-blue-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <item.icon className="w-6 h-6 md:w-5 md:h-5" />
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="hidden md:flex flex-col mt-auto w-full gap-4 px-4 pb-8">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-slate-900 font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{user.name}</span>
            <span className="text-[10px] text-slate-400">Level {user.level} {user.rank}</span>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
