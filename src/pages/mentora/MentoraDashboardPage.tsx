import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
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
  const payoutSoles = (completedSessions.length * 59 * 0.6).toFixed(0);
  const activeMentees = new Set(
    [...upcomingSessions, ...completedSessions].map((s) => s.menteeId || s.menteeName || 'mentee')
  ).size;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="section-container">
          {/* Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
                 <Sparkles className="h-3 w-3" />
                 Coaching Hub
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                Bienvenido(a), <span className="text-primary">{user?.name || 'Coach Digital'}.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                Tu capacidad para proyectar visión tecnológica en mentes estratégicas está redefiniendo el liderazgo corporativo.
              </p>
            </div>
            
            <div className="flex gap-4 animate-fade-in animation-delay-200">
               <Button size="lg" className="h-16 px-10 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-primary/40 active:scale-95 transition-all" onClick={() => navigate('/availability')}>
                  Ajustar Agenda
               </Button>
            </div>
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
             {[
               { icon: Calendar, label: 'Sincronizaciones Mes', value: sessionsThisMonth, color: 'primary' },
               { icon: DollarSign, label: 'Ingresos Netos', value: `S/ ${payoutSoles}`, color: 'success' },
               { icon: Star, label: 'Rating Promedio', value: '4.98', color: 'accent' },
               { icon: Users, label: 'Líderes Impactados', value: activeMentees, color: 'primary' }
             ].map((stat, i) => (
               <div key={i} className="bg-card rounded-[2rem] p-8 border border-border shadow-md group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className={cn("absolute -top-4 -right-4 p-8 opacity-[0.02] group-hover:scale-125 transition-transform", `text-${stat.color}`)}>
                     <stat.icon className="w-24 h-24" />
                  </div>
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm", 
                    stat.color === 'primary' ? 'bg-primary/10 text-primary' : 
                    stat.color === 'success' ? 'bg-success/10 text-success' : 
                    'bg-accent/10 text-accent')}>
                     <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
               </div>
             ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Primary Schedule Content */}
            <div className="lg:col-span-8 space-y-12">
              <section className="animate-slide-up animation-delay-300">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">Próximos Desafíos</h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Líderes Senior esperando tu guía estratégica.</p>
                  </div>
                  <Button variant="ghost" className="text-primary font-bold uppercase text-[10px] tracking-widest hover:bg-primary/5 h-10 px-4">Ver Calendario Full</Button>
                </div>
                
                {upcomingSessions.length > 0 ? (
                  <div className="grid gap-4">
                    {upcomingSessions.map((s, i) => (
                      <div key={s.id} className="bg-card rounded-[2rem] p-8 border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary/40 transition-all duration-300 shadow-sm opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                        <div className="flex items-center gap-6">
                           <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shadow-inner">
                              {s.menteeName?.charAt(0) || 'L'}
                           </div>
                           <div>
                              <p className="text-xl font-bold text-foreground mb-1">{s.menteeName || 'Líder Senior'}</p>
                              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                                 <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-primary">
                                    <Calendar className="h-3 w-3" /> {s.date}
                                 </div>
                                 <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                                    <Clock className="h-3 w-3" /> {s.time}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <Button variant="outline" className="h-12 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] border-primary/20 hover:border-primary/50 transition-all" onClick={() => navigate(`/session/${s.id}`)}>
                             Sala Ejecutiva
                           </Button>
                           <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] shadow-md hover:bg-primary/90 transition-all">
                             Confirmar
                           </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-[3.5rem] p-20 text-center border-dashed border-2 border-border relative overflow-hidden">
                    <Clock className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-muted-foreground">Sin Pendientes</h3>
                    <p className="text-muted-foreground/60 mt-3 font-medium">Tu visibilidad está al máximo. Nuevos retos llegarán pronto.</p>
                  </div>
                )}
              </section>

              <section className="animate-slide-up animation-delay-500">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                   <div>
                      <h2 className="text-2xl font-bold text-foreground tracking-tight">Bitácora de Impacto</h2>
                      <p className="text-sm text-muted-foreground font-medium mt-1">Transformaciones digitales completadas.</p>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                      <TrendingUp className="h-5 w-5" />
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {completedSessions.length > 0 ? (
                     completedSessions.map((s) => (
                       <div key={s.id} className="flex items-center justify-between p-6 bg-card rounded-[2rem] border border-border hover:border-success/30 hover:shadow-lg transition-all group">
                          <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center shadow-inner">
                                <CheckCircle className="h-5 w-5" />
                             </div>
                             <div>
                                <p className="text-base font-bold text-foreground mb-0.5">{s.menteeName || 'Líder Senior'}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="px-3 py-1 bg-success/10 text-success text-[8px] font-bold uppercase tracking-widest rounded-full border border-success/20">Finalizada</span>
                          </div>
                       </div>
                     ))
                  ) : (
                    <div className="col-span-full py-16 text-center opacity-30">
                       <p className="text-xs font-bold uppercase tracking-widest">Comienza tu legado digital hoy.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8 animate-fade-in animation-delay-700">
                <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground relative overflow-hidden shadow-xl group">
                   <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <TrendingUp className="w-56 h-56" />
                   </div>
                   <div className="relative z-10">
                      <div className="h-14 w-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                         <Sparkles className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 leading-tight">Crecimiento del Perfil</h3>
                      <p className="text-base font-medium opacity-80 mb-8 leading-relaxed">Tu perfil ha escalado un <span className="font-bold">83%</span> en el algoritmo. Los líderes buscan expertos en <span className="text-secondary font-bold">IA Corporativa</span>.</p>
                      <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl h-14 font-bold uppercase tracking-widest text-xs shadow-md group/btn">
                         Optimizar Mi Perfil <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                   </div>
                </div>

               <div className="bg-card rounded-[2.5rem] p-10 border border-border shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                     <Brain className="h-24 w-24" />
                  </div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10 flex items-center gap-2">
                     <Target className="h-4 w-4 text-primary" /> Objetivos de Maestría
                  </h3>
                  <div className="space-y-8 relative z-10">
                     {[
                       { title: 'Certificación AI-PRO', desc: 'Desbloquea el módulo de "IA para Directorios" para triplicar tus leads.', color: 'primary' },
                       { title: 'FeedbackSnapshot', desc: 'Tienes 3 nuevos testimonios ejecutivos listos para brillar en tu perfil.', color: 'accent' }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-4 group">
                          <div className={cn("h-2.5 w-2.5 rounded-full mt-1 shrink-0 shadow-sm", i === 0 ? "bg-primary" : "bg-accent")} />
                          <div>
                             <p className="font-bold text-sm uppercase tracking-wider mb-1">{item.title}</p>
                             <p className="text-xs text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-border">
                     <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Nivel de Impacto: Platinum Hub</p>
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
