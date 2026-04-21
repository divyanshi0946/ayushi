import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User } from "@/src/types";
import { motion } from "motion/react";
import { Sparkles, TrendingUp, Briefcase, Trophy, Rocket, Brain, Target, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FutureSelfProps {
  user: User;
  setActiveTab: (tab: string) => void;
}

const projectionData = [
  { day: 'Day 0', current: 14500, projected: 14500 },
  { day: 'Day 10', current: 14500, projected: 18000 },
  { day: 'Day 20', current: 14500, projected: 25000 },
  { day: 'Day 30', current: 14500, projected: 35000 },
  { day: 'Day 45', current: 14500, projected: 55000 },
  { day: 'Day 60', current: 14500, projected: 85000 },
];

export function FutureSelf({ user, setActiveTab }: FutureSelfProps) {
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
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold mb-4 border border-cyan-500/20">
            <Sparkles className="w-3 h-3" />
            AI-POWERED PROJECTION
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-white">Your Future Self</h1>
          <p className="text-slate-400">Based on your {user.streak}-day streak and consistency rate.</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button 
            onClick={() => setActiveTab('roadmaps')}
            className="rounded-2xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 font-bold"
          >
            Simulate Roadmap
          </Button>
        </motion.div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* XP Growth Projection */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  XP Growth Trajectory (60 Days)
                </CardTitle>
                <CardDescription className="text-slate-400">Maintain your current 80% daily completion rate to hit these milestones.</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px' }}
                      itemStyle={{ color: '#E5E7EB' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="projected" 
                      stroke="#2563EB" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorProjected)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="current" 
                      stroke="#475569" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="transparent" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Evolution */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                <Brain className="w-5 h-5 text-cyan-400" />
                Evolution Path
              </h3>
              <div className="space-y-6">
                 {[
                   { skill: 'Coding', current: 78, next: 95, icon: Rocket },
                   { skill: 'System Design', current: 52, next: 85, icon: Target },
                 ].map((s, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs mb-1 font-bold">
                        <span className="text-slate-400 uppercase tracking-widest">{s.skill}</span>
                        <span className="text-cyan-400">{s.next}% Mastery</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyan-500"
                          initial={{ width: `${s.current}%` }}
                          animate={{ width: `${s.next}%` }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </div>
                   </div>
                 ))}
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Career Matches (Projected)
              </h3>
              <div className="space-y-4">
                 {[
                   { role: 'Senior Lead Architect', match: 98, company: 'Google / Meta' },
                   { role: 'Open Source Maintainer', match: 92, company: 'Remote' },
                 ].map((c, i) => (
                   <div key={i} className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700">
                      <div className="text-sm font-bold text-white">{c.role}</div>
                      <div className="text-[10px] text-slate-400 mb-2">{c.company}</div>
                      <div className="flex items-center gap-2">
                         <Badge className="bg-blue-600/20 text-blue-400 border-none">{c.match}% Match</Badge>
                      </div>
                   </div>
                 ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Rank Projection */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-cyan-300" />
                  Upcoming Rank
                </CardTitle>
                <CardDescription className="text-blue-100">ETA: 14 Days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-black italic tracking-tighter mb-2">GOLD II</div>
                  <div className="text-sm font-bold text-blue-100 uppercase tracking-widest text-center">Top 2% Globally</div>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs leading-relaxed italic">
                  "At your current pace, you'll surpass 8,402 other learners in coding agility by next Tuesday."
                </div>
                <Button variant="secondary" className="w-full h-12 rounded-xl bg-white text-blue-600 font-bold hover:bg-white/90">
                  Boost Prediction
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Discipline Streak Forecast */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900 border-slate-800 p-6 text-center">
               <Zap className="w-10 h-10 text-cyan-400 mx-auto mb-4 animate-pulse" />
               <h3 className="font-bold text-lg mb-2 text-white">Discipline Forecast</h3>
               <p className="text-slate-400 text-sm mb-6">You are on track to build a 50-day legendary streak.</p>
               <div className="grid grid-cols-7 gap-2">
                 {[...Array(7)].map((_, i) => (
                   <div key={i} className={`h-8 rounded-lg ${i === 0 || i === 1 ? 'bg-cyan-500 shadow-lg shadow-cyan-500/20' : 'bg-slate-800'}`} />
                 ))}
               </div>
               <div className="mt-2 text-[10px] text-slate-500 font-bold uppercase">7 Day Consistency Plan</div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
