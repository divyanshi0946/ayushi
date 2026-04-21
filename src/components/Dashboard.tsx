import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mission } from "@/src/types";
import { Flame, Star, Trophy, Zap, Clock, ChevronRight, Brain, Code, MessageSquare, Calendar as CalendarIcon, Sparkles, Gamepad, Target } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion } from "motion/react";

interface DashboardProps {
  user: User;
  missions: Mission[];
}

const performanceData = [
  { day: 'Mon', xp: 120 },
  { day: 'Tue', xp: 300 },
  { day: 'Wed', xp: 200 },
  { day: 'Thu', xp: 450 },
  { day: 'Fri', xp: 400 },
  { day: 'Sat', xp: 600 },
  { day: 'Sun', xp: 550 },
];

export function Dashboard({ user, missions }: DashboardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const stats = [
    { label: 'Current Streak', value: `${user.streak} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Total XP', value: user.xp.toLocaleString(), icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Skill Rank', value: `#${user.rank}`, icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Level', value: user.level, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  ];

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-24 md:pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-heading font-black text-white italic tracking-tight">Skill <span className="text-cyan-400">PRO</span> HUB</h1>
          <p className="text-slate-400 text-sm">Welcome back, {user.name.split(' ')[0]}! You're dominating the Weekly Arena.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800">
             <CalendarIcon className="mr-2 w-4 h-4" />
             Weekly Stats
          </Button>
          <Button className="rounded-xl bg-brand-primary hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold">
            Next Mission
          </Button>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden group hover:border-brand-accent/30 transition-colors">
              <CardContent className="p-6">
                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Chart Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
               <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                   <CardTitle className="text-white">Active Mastery Curve</CardTitle>
                   <CardDescription className="text-slate-500 text-xs">XP growth trends against peak performance.</CardDescription>
                 </div>
                 <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 uppercase tracking-widest text-[9px] font-black italic">+14% Growth</Badge>
               </CardHeader>
               <CardContent className="h-[300px] w-full pt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px', fontSize: '12px' }}
                        itemStyle={{ color: '#E5E7EB' }}
                      />
                      <Area type="monotone" dataKey="xp" stroke="#22D3EE" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                    </AreaChart>
                 </ResponsiveContainer>
               </CardContent>
            </Card>
          </motion.div>

          {/* Daily Missions */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white italic">
                <Target className="w-5 h-5 text-brand-primary" />
                Battle Ready Missions
              </h2>
              <Button variant="ghost" size="sm" className="text-brand-accent hover:bg-cyan-500/10">Quick View</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
               {missions.slice(0, 2).map((m, i) => (
                 <Card key={i} className="hover:border-cyan-500/30 transition-all cursor-pointer group bg-slate-900 border-slate-800">
                   <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className="border-slate-800 text-slate-400 font-mono text-[9px] uppercase">{m.category}</Badge>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-bold">
                          <Clock className="w-3 h-3" /> {m.duration}
                        </span>
                      </div>
                      <h3 className="font-bold mb-1 group-hover:text-cyan-400 transition-colors text-white">{m.title}</h3>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{m.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                         <div className="font-mono text-sm font-black text-brand-primary tracking-tighter">+{m.xp} XP</div>
                         <Button size="sm" className="rounded-lg px-4 h-8 bg-brand-primary text-white hover:bg-blue-700 shadow-md">Execute</Button>
                      </div>
                   </CardContent>
                 </Card>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Visual Skill Heatmap Placeholder */}
           <motion.div variants={itemVariants}>
             <Card className="bg-slate-900 border-slate-800 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -mr-8 -mt-8" />
               <CardHeader>
                 <CardTitle className="text-sm font-bold flex items-center gap-2 text-white uppercase tracking-widest italic">
                   <Gamepad className="w-4 h-4 text-cyan-400" />
                   Skill Matrix
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                 {Object.entries(user.skills).map(([skill, value]) => (
                   <div key={skill} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{skill}</span>
                       <span className="text-white">{value}%</span>
                     </div>
                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                       />
                     </div>
                   </div>
                 ))}
               </CardContent>
             </Card>
           </motion.div>

           {/* Future Self Projection Teaser */}
           <motion.div 
             variants={itemVariants}
             whileHover={{ y: -5 }}
             className="cursor-pointer"
           >
             <Card className="bg-slate-900 border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)] text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 opacity-50" />
               <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Sparkles className="w-12 h-12 text-cyan-400" />
               </div>
               <CardHeader className="relative">
                 <CardTitle className="text-white text-lg italic uppercase tracking-tighter">AI Future Projection</CardTitle>
                 <CardDescription className="text-slate-400">Based on your Consistency Score</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center font-bold text-cyan-400">
                       {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400">PROJECTED RANK</div>
                      <div className="text-lg font-black text-white italic">ELITE II (TOP 0.8%)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-[10px] italic text-slate-300 leading-relaxed">
                    "Continue this pace for 12 days to unlock the 'Lead Architect' roadmap."
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold">
                    Go to Future Self
                  </Button>
               </CardContent>
             </Card>
           </motion.div>

           {/* Hot Challenges */}
           <motion.div variants={itemVariants}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Live Arena Challenges</h3>
              <div className="space-y-3">
                 {[
                   { user: 'Rahul_S', level: 32, type: 'Sprint' },
                   { user: 'Storm7', level: 19, type: 'Quiz' }
                 ].map((c, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 group hover:border-brand-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[10px] font-bold text-slate-400">{c.user.charAt(0)}</div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{c.user} <span className="text-slate-500 text-[9px] lowercase italic ml-1">Lv.{c.level}</span></div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase">{c.type} Mode</div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 px-4 text-xs font-bold bg-slate-800 text-white rounded-lg hover:bg-blue-600 border border-slate-700">Accept</Button>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
