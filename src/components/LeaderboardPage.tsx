import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Minus, Globe, Users, Target, Rocket, Zap, Sparkles, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Rahul S.", points: "45,200", streak: 45, level: 32, trend: "stable", avatar: "RS" },
  { rank: 2, name: "Alex_Chen", points: "42,100", streak: 32, level: 30, trend: "up", avatar: "AC" },
  { rank: 3, name: "Sarah_Dev", points: "38,500", streak: 28, level: 28, trend: "up", avatar: "SD" },
  { rank: 4, name: "CryptoKing", points: "35,200", streak: 15, level: 25, trend: "down", avatar: "CK" },
  { rank: 5, name: "DesignWiz", points: "32,900", streak: 88, level: 24, trend: "stable", avatar: "DW" },
  { rank: 451, name: "ShadowPulse", points: "15,200", streak: 12, level: 13, trend: "up", avatar: "SP" },
  { rank: 452, name: "Divyanshi S.", points: "14,500", streak: 8, level: 12, trend: "stable", avatar: "DS", highlight: true },
  { rank: 453, name: "User_Zero", points: "12,900", streak: 4, level: 11, trend: "down", avatar: "UZ" },
];

export function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("weekly");

  const podium = LEADERBOARD_DATA.slice(0, 3);
  const others = LEADERBOARD_DATA.slice(3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 max-w-6xl mx-auto space-y-12 pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center md:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-cyan-500/20 leading-none italic">
          <Sparkles className="w-3 h-3 fill-cyan-400" />
          Global Dominance
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-white italic uppercase tracking-tighter">Skill Rankings</h1>
        <p className="text-slate-400 text-lg max-w-2xl">The world's most consistent performing students. Where is your future heading?</p>
      </motion.div>

      {/* Tabs / Filter */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Tabs defaultValue="weekly" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            <TabsTrigger value="weekly" className="rounded-xl px-8 data-[state=active]:bg-brand-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest h-10 transition-all">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="rounded-xl px-8 data-[state=active]:bg-brand-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest h-10 transition-all">Monthly</TabsTrigger>
            <TabsTrigger value="all-time" className="rounded-xl px-8 data-[state=active]:bg-brand-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest h-10 transition-all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800 shadow-xl">
           <Globe className="w-4 h-4 text-cyan-400 animate-spin-slow" />
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Live Global Tracker</span>
        </div>
      </motion.div>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-12">
        {/* Silver */}
        <motion.div 
          variants={itemVariants}
          className="order-2 md:order-1"
        >
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
               <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-400 flex items-center justify-center text-3xl font-black text-white italic group-hover:scale-105 transition-transform">
                 {podium[1].avatar}
               </div>
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-400 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg italic shadow-lg">2</div>
            </div>
            <div className="text-center mb-6">
              <div className="font-black text-white italic uppercase tracking-tighter text-xl">{podium[1].name}</div>
              <div className="text-sm font-mono font-black text-slate-500 italic uppercase">Progression: {podium[1].points} XP</div>
            </div>
            <div className="w-full h-32 bg-slate-800/80 rounded-t-[32px] border-x border-t border-slate-700 flex items-end justify-center pb-6 shadow-2xl">
               <Medal className="w-12 h-12 text-slate-400 opacity-50" />
            </div>
          </div>
        </motion.div>

        {/* Gold */}
        <motion.div 
          variants={itemVariants}
          className="order-1 md:order-2"
        >
          <div className="flex flex-col items-center group">
            <div className="relative mb-8">
               <div className="w-32 h-32 rounded-full bg-brand-primary border-4 border-cyan-400 flex items-center justify-center text-4xl font-black text-white italic relative z-10 shadow-[0_0_50px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform">
                 {podium[0].avatar}
               </div>
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl italic shadow-2xl ring-4 ring-slate-950 z-20">1</div>
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-cyan-400 text-[10px] font-black px-4 py-1 rounded-full border border-cyan-400/50 z-30 uppercase tracking-widest italic group-hover:scale-110 transition-transform">PRO ELITE</div>
               <Zap className="absolute top-0 right-0 text-cyan-400 w-8 h-8 animate-pulse" />
               <Rocket className="absolute bottom-4 -left-6 text-brand-primary w-6 h-6 animate-bounce" />
            </div>
            <div className="text-center mb-8">
              <div className="text-3xl font-black text-white italic uppercase tracking-tighter mb-1">{podium[0].name}</div>
              <div className="text-xl font-mono font-black text-cyan-400 italic tracking-tighter">{podium[0].points} <span className="text-xs text-slate-600">XP</span></div>
            </div>
            <div className="w-full h-56 bg-gradient-to-t from-cyan-900/50 via-brand-primary/20 to-brand-primary/10 rounded-t-[48px] border-x border-t border-brand-primary/30 flex items-end justify-center pb-10 shadow-[0_-20px_60px_rgba(37,99,235,0.2)]">
               <Trophy className="w-20 h-20 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Bronze */}
        <motion.div 
          variants={itemVariants}
          className="order-3 md:order-3"
        >
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
               <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-orange-500/50 flex items-center justify-center text-3xl font-black text-white italic group-hover:scale-105 transition-transform">
                 {podium[2].avatar}
               </div>
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg italic shadow-lg">3</div>
            </div>
            <div className="text-center mb-6">
              <div className="font-black text-white italic uppercase tracking-tighter text-xl">{podium[2].name}</div>
              <div className="text-sm font-mono font-black text-slate-500 italic uppercase">Progression: {podium[2].points} XP</div>
            </div>
            <div className="w-full h-24 bg-slate-800/80 rounded-t-[32px] border-x border-t border-slate-700 flex items-end justify-center pb-6 shadow-2xl">
               <Medal className="w-12 h-12 text-orange-500 opacity-50" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Others Table */}
      <div className="space-y-4 pt-12">
        <div className="px-8 flex items-center text-[10px] font-black text-slate-500 uppercase tracking-widest hidden md:flex italic">
          <div className="w-12">Rank</div>
          <div className="flex-1 ml-14">Learner Profile</div>
          <div className="w-32 text-center text-slate-600">Mastery Level</div>
          <div className="w-32 text-center text-slate-600">Discipline</div>
          <div className="w-32 text-center text-slate-600">War Trend</div>
          <div className="w-32 text-right">Accumulated XP</div>
        </div>

        <div className="space-y-3">
          {others.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`flex items-center gap-4 p-5 md:p-6 rounded-[32px] transition-all hover:bg-slate-900/80 cursor-pointer border relative overflow-hidden group ${
                p.highlight 
                  ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_40px_rgba(37,99,235,0.15)] z-10 scale-[1.02]' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.highlight && (
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-12 h-12 text-cyan-400" />
                 </div>
              )}
              <div className={`w-12 text-lg font-black italic tracking-tighter ${p.highlight ? 'text-cyan-400' : 'text-slate-600'}`}>
                {p.rank}
              </div>
              <div className="flex-1 flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black italic transition-transform group-hover:scale-110 ${
                   p.highlight ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20' : 'bg-slate-800 text-slate-400'
                 }`}>
                   {p.avatar}
                 </div>
                 <div>
                   <div className="text-base font-black text-white italic tracking-tight">{p.name} {p.highlight && <span className="text-cyan-400 ml-1">●</span>}</div>
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest md:hidden">Lv.{p.level} • {p.streak}d Streak</div>
                 </div>
              </div>

              <div className="w-32 text-center hidden md:block">
                 <Badge variant="outline" className={`font-black italic text-[9px] uppercase tracking-widest border-2 px-3 py-1 ${p.highlight ? 'border-cyan-500 text-cyan-400' : 'border-slate-800 text-slate-500'}`}>MASTER LVL {p.level}</Badge>
              </div>

              <div className="w-32 text-center hidden md:block">
                 <div className="text-sm font-black text-slate-300 flex items-center justify-center gap-2 italic">
                   <Flame className="w-4 h-4 text-orange-500" />
                   {p.streak} DAYS
                 </div>
              </div>

              <div className="w-32 flex justify-center hidden md:flex">
                 {p.trend === 'up' && <TrendingUp className="w-5 h-5 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />}
                 {p.trend === 'down' && <TrendingDown className="w-5 h-5 text-rose-500" />}
                 {p.trend === 'stable' && <Minus className="w-5 h-5 text-slate-700" />}
              </div>

              <div className="w-32 text-right">
                 <div className={`font-mono font-black text-lg italic tracking-tighter ${p.highlight ? 'text-cyan-400' : 'text-white'}`}>
                   {p.points} <span className="text-[10px] text-slate-600 uppercase not-italic">XP</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Your Rank Card - Mobile Only */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="md:hidden fixed bottom-24 left-4 right-4 bg-brand-primary text-white p-5 rounded-[32px] shadow-2xl flex items-center justify-between z-40 border border-white/10"
      >
         <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center font-black italic shadow-inner">DS</div>
           <div>
             <div className="text-[10px] font-black uppercase tracking-widest opacity-70 italic">Your Trajectory</div>
             <div className="text-xl font-black italic tracking-tighter">#452 Active</div>
           </div>
         </div>
         <div className="text-right">
           <div className="text-[10px] font-black opacity-70 uppercase tracking-widest italic">Global Growth</div>
           <div className="text-lg font-black italic tracking-tighter text-cyan-300">Top 12% PRO</div>
         </div>
      </motion.div>
    </motion.div>
  );
}
