import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Trophy, Play, Sword, Flame, Users, ChevronRight, Search, Shield, Target, Rocket } from "lucide-react";
import { motion } from "motion/react";

export function BattlesPage() {
  const activeBattles = [
    { id: '1', opponent: 'CyberNinja', type: 'Coding Sprint', xp: 500, time: '12m left', avatar: 'CN' },
    { id: '2', opponent: 'DesignPro', type: 'UI Critique', xp: 300, time: '4h left', avatar: 'DP' },
  ];

  const recentBattles = [
    { opponent: 'LlamaCoder', result: 'Won', xp: '+450', date: '2h ago' },
    { opponent: 'CryptoKing', result: 'Lost', xp: '-50', date: 'Yesterday' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero / CTA */}
      <motion.section 
        variants={itemVariants}
        className="relative h-64 md:h-80 rounded-[40px] overflow-hidden flex items-center bg-slate-900 border border-slate-800"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/battle/1600/600?dark" 
            alt="Battle Arena" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        
        <div className="relative z-10 px-8 md:px-12 w-full flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 backdrop-blur-md rounded-full text-[10px] font-black text-cyan-400 mb-4 border border-cyan-500/20 uppercase tracking-widest leading-none">
              <Zap className="w-3 h-3 fill-cyan-400" />
              Live Arena Open
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4 italic uppercase tracking-tighter">Skill Arena</h1>
            <p className="text-slate-400 text-lg max-w-md">Challenge the elite. Prove your consistency. <br />Dominate the leaderboard.</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-brand-primary text-white hover:bg-blue-700 font-bold shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
              Find Match
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-10 rounded-2xl border border-slate-700 text-white hover:bg-slate-800 font-bold">
              Challenge Friend
            </Button>
          </div>
        </div>
      </motion.section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Active & Live Matches */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white italic truncate">
                <Flame className="w-5 h-5 text-orange-500" />
                Active Engagement
              </h2>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">2 Live Wars</span>
            </div>
            <div className="space-y-4">
              {activeBattles.map((battle, i) => (
                <motion.div
                  key={battle.id}
                  variants={itemVariants}
                >
                  <Card className="hover:border-brand-accent/30 transition-all cursor-pointer group bg-slate-900 border-slate-800 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4">
                       <Badge className="bg-brand-primary text-white border-none font-mono text-[9px] uppercase tracking-tighter font-black italic">{battle.xp} XP AT STAKE</Badge>
                    </div>
                    <CardContent className="p-6 flex items-center gap-6">
                      <div className="relative">
                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-accent p-0.5">
                            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl font-black text-white italic">
                               {battle.avatar}
                            </div>
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-400 border-4 border-slate-950 rounded-full" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg text-white italic tracking-tight">{battle.opponent}</h3>
                          <span className="text-[9px] bg-white/5 text-slate-400 font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/5">{battle.type}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                           <span className="flex items-center gap-1.5 text-cyan-400">
                             <Trophy className="w-3.5 h-3.5" /> Gold League
                           </span>
                           <span className="text-slate-800">|</span>
                           <span>{battle.time}</span>
                        </div>
                      </div>

                      <Button className="h-12 w-12 rounded-2xl bg-slate-800 hover:bg-brand-primary text-white shadow-lg transition-colors group-hover:scale-105 active:scale-95">
                        <Play className="w-5 h-5 fill-current" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Leaderboard Glimpse */}
          <motion.section variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-white uppercase italic tracking-tighter">Global Ranking Elite</h2>
            <div className="space-y-4">
               {[1, 2, 3].map((r) => (
                 <div key={r} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className={`text-lg font-black w-6 italic ${r === 1 ? 'text-cyan-400' : 'text-slate-600'}`}>#{r}</div>
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-400">{r === 1 ? '🥇' : 'U'}</div>
                    <div className="flex-1 font-bold text-white group-hover:text-cyan-400 transition-colors">Elite_Warrior_{r}</div>
                    <div className="font-mono font-black text-cyan-400 tracking-tighter">{(10000 - r*500).toLocaleString()} <span className="text-[10px] text-slate-600 italic uppercase">XP</span></div>
                 </div>
               ))}
               <Button variant="ghost" className="w-full text-brand-accent hover:bg-cyan-500/5 font-black uppercase tracking-widest text-xs mt-4">
                 View Full Leaderboard
                 <ChevronRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Your Battle Stats */}
           <motion.div variants={itemVariants}>
             <Card className="border-slate-800 shadow-xl overflow-hidden bg-slate-900">
                <CardHeader className="bg-brand-primary text-white italic">
                  <CardTitle className="text-lg uppercase tracking-tighter font-black">Arena Profile</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="text-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <div className="text-2xl font-black text-white italic">124</div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Wins</div>
                     </div>
                     <div className="text-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <div className="text-2xl font-black text-slate-500 italic">42</div>
                        <div className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Losses</div>
                     </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">Current Standing</span>
                      <span className="text-cyan-400 italic">Elite IV</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-brand-primary h-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                      />
                    </div>
                    <div className="text-[9px] text-slate-600 text-center font-bold uppercase tracking-widest">120 XP TO NEXT TIER</div>
                  </div>
                </CardContent>
             </Card>
           </motion.div>

           {/* Battle History */}
           <motion.section variants={itemVariants}>
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">War History</h3>
             <div className="space-y-3">
               {recentBattles.map((battle, i) => (
                 <div key={i} className="flex items-center gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800 group hover:border-slate-700 transition-all cursor-pointer">
                    <div className={`w-1 h-8 rounded-full ${battle.result === 'Won' ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-rose-500'}`} />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white italic uppercase tracking-tight">{battle.opponent}</div>
                      <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{battle.date}</div>
                    </div>
                    <div className={`font-mono text-[10px] font-black italic tracking-tighter ${battle.result === 'Won' ? 'text-cyan-400' : 'text-rose-500'}`}>
                      {battle.result === 'Won' ? `+${battle.xp}` : battle.xp}
                    </div>
                 </div>
               ))}
             </div>
           </motion.section>

           {/* Challenge Invitations */}
           <motion.section variants={itemVariants}>
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-brand-primary/20 to-cyan-500/20 border border-brand-primary/30 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Shield className="w-12 h-12 text-blue-400" />
                </div>
                <h4 className="font-black italic uppercase tracking-tighter text-xl mb-2">Team Dominance</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium italic">"Form squads of 3 for global tournaments. High output, high stakes."</p>
                <Button variant="secondary" className="w-full h-12 rounded-xl bg-cyan-500 text-slate-950 font-black hover:bg-cyan-400 border-none shadow-lg shadow-cyan-500/10 active:scale-95 transition-all text-xs uppercase tracking-widest">
                  Deploy Squad
                </Button>
              </div>
           </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
