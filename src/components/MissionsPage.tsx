import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mission } from "@/src/types";
import { Search, Clock, Target, Rocket, Zap, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MissionsPageProps {
  missions: Mission[];
  setActiveTab: (tab: string) => void;
}

export function MissionsPage({ missions, setActiveTab }: MissionsPageProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredMissions = missions.filter((m) => {
    const matchesFilter = filter === "all" || m.category.toLowerCase() === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                          m.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-white">Daily Missions</h1>
          <p className="text-slate-400">Master new skills with 15-minute daily hyper-missions.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                className="pl-10 h-12 rounded-2xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-brand-primary" 
                placeholder="Search skills..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {["all", "coding", "communication", "aptitude"].map((cat) => (
          <Button
            key={cat}
            onClick={() => setFilter(cat)}
            variant={filter === cat ? "default" : "outline"}
            className={`rounded-full px-6 font-bold transition-all uppercase text-[10px] tracking-widest ${
              filter === cat 
                ? "bg-brand-primary text-white shadow-lg shadow-blue-500/20" 
                : "border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </Button>
        ))}
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, i) => (
            <motion.div 
              key={mission.id} 
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl hover:border-brand-accent/30 transition-all group relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                   <Target className="w-12 h-12" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                     <Badge className="bg-slate-800 text-slate-400 border-none uppercase tracking-widest text-[9px] font-black">{mission.category}</Badge>
                     <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mission.duration}
                     </span>
                  </div>
                  <CardTitle className="text-white group-hover:text-cyan-400 transition-colors italic uppercase tracking-tight">{mission.title}</CardTitle>
                  <CardDescription className="text-slate-500 line-clamp-2 text-sm leading-relaxed">{mission.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                     <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Reward</span>
                        <span className="text-lg font-black text-brand-primary tracking-tighter">+{mission.xp} XP</span>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-brand-primary" />
                     </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12 rounded-xl bg-brand-primary hover:bg-blue-700 font-bold transition-all group-hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/10">
                    Execute Mission
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredMissions.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
             <Search className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Target Not Found</h3>
          <p className="text-slate-500">No missions match your current parameters.</p>
        </div>
      )}

      {/* AI Coach Suggestion */}
      <section className="pt-20">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-brand-primary/10 to-transparent border border-slate-800 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform group-hover:scale-110" />
            <div className="relative z-10 max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-cyan-500/20">
                  <Rocket className="w-3 h-3" />
                  Custom Roadmap
               </div>
               <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">Can't find a <br />skill roadmap?</h2>
               <p className="text-lg text-slate-400 mb-8 leading-relaxed italic">"Our AI Skill Coach can generate a personalized 14-day mission sprint based on your career goals."</p>
               <Button 
                onClick={() => setActiveTab('roadmaps')}
                className="h-14 px-10 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-lg transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
               >
                  Talk to AI Coach
               </Button>
            </div>
         </motion.div>
      </section>
    </div>
  );
}
