import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import type { CoachDigital } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Target 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ProgressBar';

type DashboardSession = {
  id: string;
  mentorName: string;
  mentorImage: string;
  mentorTitle: string;
  menteeId?: string;
  menteeName?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

const MentoraDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [upcomingSessions, setUpcomingSessions] = useState<DashboardSession[]>([]);
  const [completedSessions, setCompletedSessions] = useState<DashboardSession[]>([]);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem('smd_sessions');
      if (!raw) return;
      const parsed = JSON.parse(raw) as DashboardSession[];
      if (!Array.isArray(parsed)) return;
      const upcoming = parsed.filter((s) => s.status === 'upcoming');
      const completed = parsed.filter((s) => s.status === 'completed');
      setUpcomingSessions(upcoming);
      setCompletedSessions(completed);
    } catch (error) {
      console.error('No se pudieron cargar las sesiones desde localStorage', error);
    }
  }, []);

  const sessionsThisMonth = upcomingSessions.length + completedSessions.length;
  const payoutSoles = (completedSessions.length * 149 * 0.6).toFixed(0);
  const activeMentees = new Set(
    [...upcomingSessions, ...completedSessions].map((s) => s.menteeId || s.menteeName || 'mentee')
  ).size;

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20 flex flex-col">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="section-container">
          {/* Executive Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20">
                 <Sparkles className="h-3 w-3" />
                 Elite Coaching Hub
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 font-display italic tracking-tight leading-[0.95]">
                Bienvenida, <span className="text-primary">{user?.name || 'Coach Digital'}.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                Tu capacidad para proyectar visión tecnológica en mentes estratégicas está redefiniendo el liderazgo corporativo.
              </p>
            </div>
            
            <div className="flex gap-4 animate-fade-in animation-delay-200">
               <Button size="lg" className="h-20 px-10 rounded-[2rem] bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all" onClick={() => navigate('/availability')}>
                  Ajustar Agenda
               </Button>
            </div>
          </div>

          {/* Luxury Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
             {[
               { icon: Calendar, label: 'Sincronizaciones Mes', value: sessionsThisMonth, color: 'primary' },
               { icon: DollarSign, label: 'Ingresos Netos', value: `S/ ${payoutSoles}`, color: 'success' },
               { icon: Star, label: 'Rating Elite', value: '4.98', color: 'accent' },
               { icon: Users, label: 'Líderes Impactados', value: activeMentees, color: 'primary' }
             ].map((stat, i) => (
               <div key={i} className="glass rounded-[3rem] p-10 border-white/20 shadow-2xl group hover:scale-[1.05] transition-all duration-500 relative overflow-hidden">
                  <div className={cn("absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:scale-125 transition-transform", `text-${stat.color}`)}>
                     <stat.icon className="w-24 h-24" />
                  </div>
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner", 
                    stat.color === 'primary' ? 'bg-primary/10 text-primary' : 
                    stat.color === 'success' ? 'bg-success/10 text-success' : 
                    'bg-accent/10 text-accent')}>
                     <stat.icon className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <p className="text-4xl font-black text-foreground font-display tracking-tight">{stat.value}</p>
               </div>
             ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Primary Schedule Content */}
            <div className="lg:col-span-8 space-y-12">
              <section className="animate-slide-up animation-delay-300">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-foreground font-display italic tracking-tight">Próximos Desafíos</h2>
                    <p className="text-sm text-muted-foreground font-medium italic mt-1">Líderes Senior esperando tu guía estratégica.</p>
                  </div>
                  <Button variant="ghost" className="text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/5 rounded-2xl h-12 px-6">Ver Calendario Full</Button>
                </div>
                
                {upcomingSessions.length > 0 ? (
                  <div className="grid gap-6">
                    {upcomingSessions.map((s, i) => (
                      <div key={s.id} className="glass rounded-[3rem] p-10 border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-primary/40 transition-all duration-500 shadow-xl opacity-0 animate-fade-in" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}>
                        <div className="flex items-center gap-8">
                           <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-3xl font-black text-primary/40 shadow-inner group-hover:rotate-3 transition-transform">
                              {s.menteeName?.charAt(0) || 'L'}
                           </div>
                           <div>
                              <p className="text-2xl font-black text-foreground font-display italic tracking-tight mb-2">{s.menteeName || 'Líder Senior'}</p>
                              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary">
                                    <Calendar className="h-3 w-3" /> {s.date}
                                 </div>
                                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-accent">
                                    <Clock className="h-3 w-3" /> {s.time}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <Button variant="outline" className="h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 border-primary/20 hover:border-primary/50 transition-all" onClick={() => navigate(`/session/${s.id}`)}>
                             Sala Ejecutiva
                           </Button>
                           <Button className="h-16 px-8 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all">
                             Confirmar
                           </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass rounded-[4rem] p-24 text-center border-dashed border-2 border-border/50 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
                       <Clock className="w-96 h-96 mx-auto -mt-20" />
                    </div>
                    <Clock className="h-20 w-20 text-muted-foreground/20 mx-auto mb-8" />
                    <h3 className="text-2xl font-black text-muted-foreground/60 font-display italic">Sin Pulsos Pendientes</h3>
                    <p className="text-muted-foreground/40 mt-4 font-medium italic">Tu visibilidad está al máximo. Nuevos retos llegarán pronto.</p>
                  </div>
                )}
              </section>

              <section className="animate-slide-up animation-delay-500">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/10">
                   <div>
                      <h2 className="text-3xl font-black text-foreground font-display italic tracking-tight">Bitácora de Impacto</h2>
                      <p className="text-sm text-muted-foreground font-medium italic mt-1">Transformaciones digitales completadas satisfactoriamente.</p>
                   </div>
                   <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center text-success">
                      <TrendingUp className="h-6 w-6" />
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {completedSessions.length > 0 ? (
                     completedSessions.map((s) => (
                       <div key={s.id} className="flex items-center justify-between p-8 glass rounded-[2.5rem] border border-transparent hover:border-success/30 hover:shadow-2xl transition-all group">
                          <div className="flex items-center gap-6">
                             <div className="h-14 w-14 rounded-2xl bg-success/10 text-success flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                <CheckCircle className="h-6 w-6" />
                             </div>
                             <div>
                                <p className="text-lg font-black text-foreground font-display italic tracking-tight mb-1">{s.menteeName || 'Líder Senior'}</p>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="px-4 py-2 bg-success/10 text-success text-[8px] font-black uppercase tracking-widest rounded-full border border-success/20">Finalizada</span>
                          </div>
                       </div>
                     ))
                  ) : (
                    <div className="col-span-full py-20 text-center opacity-30">
                       <p className="text-xs font-black uppercase tracking-[0.3em]">Comienza tu legado digital hoy.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar / Performance */}
            <div className="lg:col-span-4 space-y-10 animate-fade-in animation-delay-700">
                <div className="bg-gradient-to-br from-primary via-zaffre to-primary rounded-[3.5rem] p-12 text-primary-foreground relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(var(--primary-rgb),0.5)] border-2 border-white/10 group">
                   <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                      <TrendingUp className="w-64 h-64" />
                   </div>
                   <div className="relative z-10">
                      <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-10 shadow-inner">
                         <Sparkles className="h-8 w-8" />
                      </div>
                      <h3 className="text-3xl font-black font-display italic mb-6 leading-tight">Crecimiento Exponencial</h3>
                      <p className="text-lg font-medium opacity-80 mb-10 leading-relaxed italic">Tu perfil ha escalado un <span className="font-black text-white">83%</span> en el algoritmo. Los líderes buscan tu maestría en <span className="font-black text-accent italic">Prompt Engineering Business</span>.</p>
                      <Button className="w-full bg-white text-primary hover:bg-theme-white/90 rounded-[2rem] h-20 font-black uppercase tracking-widest text-xs shadow-2xl transition-all active:scale-95 group/btn">
                         Optimizar Mi Perfil <ArrowRight className="h-5 w-5 ml-4 group-hover:translate-x-2 transition-transform" />
                      </Button>
                   </div>
                </div>

               <div className="glass rounded-[3rem] p-12 border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                     <Brain className="h-32 w-32" />
                  </div>
                  <h3 className="text-sm font-black text-muted-foreground uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                     <Target className="h-5 w-5 text-primary" /> Objetivos de Maestría
                  </h3>
                  <div className="space-y-10 relative z-10">
                     {[
                       { title: 'Certificación AI-PRO', desc: 'Desbloquea el módulo de "IA para Directorios" para triplicar tus leads.', color: 'primary' },
                       { title: 'Feedback Snapshot', desc: 'Tienes 3 nuevos testimonios ejecutivos listos para brillar en tu perfil.', color: 'accent' }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 group">
                          <div className={cn("h-3 w-3 rounded-full mt-1.5 shrink-0 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]", i === 0 ? "bg-primary" : "bg-accent")} />
                          <div>
                             <p className="font-black text-sm uppercase tracking-widest mb-2 italic">{item.title}</p>
                             <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="mt-12 pt-10 border-t border-border/10">
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">Nivel de Impacto: Platinum</p>
                     <ProgressBar value={92} variant="success" size="lg" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentoraDashboardPage;
