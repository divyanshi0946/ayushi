import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Sparkles, User as UserIcon, Bot } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from 'react-markdown';

const apiKey = process.env.GEMINI_API_KEY as string;
const ai = new GoogleGenAI({ apiKey });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AICoach({ userSkills }: { userSkills: any }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your **Skill PRO AI Coach**. Based on your current stats, I've identified a growth opportunity in **System Design**. \n\nHow would you like to level up today? I can generate a **Custom Roadmap** or explain a concept in detail." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are an expert personalized skill coach for a student learning these skills: ${JSON.stringify(userSkills)}.
          The user is currently using a gamified platform called "Skill PRO".
          Provide actionable, concise, and motivating advice. Use markdown for highlighting key terms.
          Keep response under 200 words.`
        }
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.text || "I'm sorry, I couldn't generate a response." 
      }]);
    } catch (error) {
      console.error("AI Coach Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm experiencing a neural sync delay. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-5xl mx-auto h-[calc(100vh-160px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 pb-24 md:pb-8"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-white italic tracking-tight">AI Skill Coach</h1>
          <p className="text-slate-400 text-sm italic">Hyper-personalized roadmaps powered by Gemini AI.</p>
        </div>
        <div className="flex gap-2">
           <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black uppercase tracking-widest text-[9px]">FLASH MODE</Badge>
           <Badge className="bg-blue-600/10 text-brand-primary border-brand-primary/20 font-black uppercase tracking-widest text-[9px]">REAL-TIME</Badge>
        </div>
      </header>
      
      <Card className="flex-1 flex flex-col border-slate-800 shadow-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-cyan-400 to-indigo-600" />
        
        <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                    m.role === 'assistant' 
                      ? 'bg-slate-800 border-slate-700 text-cyan-400' 
                      : 'bg-brand-primary border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  }`}>
                    {m.role === 'assistant' ? <Bot className="w-5 h-5 shadow-[0_0_10px_rgba(34,211,238,0.3)]" /> : <UserIcon className="w-5 h-5" />}
                  </div>
                  <div className={`p-5 rounded-3xl max-w-[85%] text-sm leading-relaxed shadow-inner ${
                    m.role === 'assistant' 
                      ? 'bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none' 
                      : 'bg-brand-primary text-white rounded-tr-none'
                  }`}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex gap-3"
               >
                 <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
                 </div>
                 <div className="bg-slate-800/50 text-slate-500 p-5 rounded-3xl rounded-tl-none border border-slate-700 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200" />
                    </div>
                   <span className="text-[10px] font-black uppercase tracking-widest italic ml-2">Assembling Roadmap...</span>
                 </div>
               </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-900/80 border-t border-slate-800">
          <div className="flex gap-3 relative">
            <Input
              placeholder="Ask for coding tips, system design, or a career roadmap..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="h-14 rounded-2xl bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-brand-primary shadow-inner pr-20"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading}
              className="absolute right-2 top-2 h-10 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/10"
            >
              Send
            </Button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {["Next Milestone?", "Build 30-day coding plan", "System Design tips", "Mock Interview"].map((tip, i) => (
              <button
                key={i}
                onClick={() => setInput(tip)}
                className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-[10px] font-black text-slate-400 whitespace-nowrap hover:border-cyan-500/50 hover:text-white transition-all uppercase tracking-widest italic"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
