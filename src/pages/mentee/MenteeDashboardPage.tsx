import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { SessionCard } from '@/components/SessionCard';
import { MentorCard } from '@/components/MentorCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  Calendar,
  MessageSquare,
  Target,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

const MenteeDashboardPage: React.FC = () => {
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

  const recommendedMentors = mentoras.slice(0, 3);

  return (
    <div className="min-h-screen bg-background bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-[0.98]">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="section-container">
          {/* Executive Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4 border border-primary/20">
                <Sparkles className="h-3 w-3" />
                Panel de Transformación Digital
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 font-display italic tracking-tight">
                Bienvenido, {user?.name || 'Líder Senior'}
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">
                Tu hoja de ruta estratégica está activa. Hemos optimizado tus próximos pasos con IA.
              </p>
            </div>
            
            <div className="flex gap-4 animate-fade-in animation-delay-200">
               <Button size="lg" className="rounded-2xl h-14 px-8 font-bold shadow-xl shadow-primary/20" onClick={() => navigate('/matching')}>
                 Reservar Coach
               </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* AI Evolution Roadmap */}
              <div className="glass rounded-[3rem] p-10 md:p-14 shadow-2xl border-white/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:rotate-12">
                   <Target className="w-64 h-64" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-accent/20">
                        Ruta de Maestría
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-foreground font-display italic tracking-tight">AI Evolution Roadmap</h2>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center min-w-[140px]">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Nivel Actual</p>
                       <p className="text-2xl font-black text-primary italic">Silver Elite</p>
                    </div>
                  </div>

                  {/* Visual Roadmap Stepper */}
                  <div className="relative space-y-12">
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-success via-primary to-secondary/30 hidden md:block" />
                    
                    {[
                      { 
                        title: 'Fundamentos IA', 
                        status: 'completed', 
                        desc: 'Dominio de arquitecturas LLM y ética digital.',
                        icon: CheckCircle,
                        date: 'Completado'
                      },
                      { 
                        title: 'Prompt Engineering Business', 
                        status: 'current', 
                        desc: 'Optimización de flujos corporativos con IA Generativa.',
                        icon: Sparkles,
                        date: 'En progreso'
                      },
                      { 
                        title: 'Estrategia de Datos Pro', 
                        status: 'upcoming', 
                        desc: 'Liderazgo en decisiones basadas en arquitectura de datos.',
                        icon: Target,
                        date: 'Próximo paso'
                      }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-8 relative group/step">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all duration-500 shadow-lg",
                          step.status === 'completed' ? "bg-success text-success-foreground" :
                          step.status === 'current' ? "bg-primary text-primary-foreground scale-125 animate-pulse-glow" :
                          "bg-secondary/20 text-muted-foreground border border-white/10"
                        )}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 pb-2">
                           <div className="flex items-center justify-between mb-2">
                              <h4 className={cn("text-xl font-black font-display italic", step.status === 'upcoming' ? "text-muted-foreground" : "text-foreground")}>
                                {step.title}
                              </h4>
                              <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", 
                                step.status === 'completed' ? "border-success/20 text-success" :
                                step.status === 'current' ? "border-primary/20 text-primary" :
                                "border-border/50 text-muted-foreground/50"
                              )}>
                                {step.date}
                              </span>
                           </div>
                           <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-xl">
                             {step.desc}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 p-8 bg-gradient-to-r from-primary to-zaffre rounded-[2rem] text-primary-foreground flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <TrendingUp className="h-32 w-32" />
                    </div>
                    <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                       <Sparkles className="h-8 w-8" />
                    </div>
                    <div className="text-center md:text-left relative z-10">
                       <p className="text-xl font-black italic font-display mb-1">Próximo Salto: Analítica Predictiva</p>
                       <p className="text-sm opacity-80 font-medium">Tu Coach te espera el 24 de Enero para desbloquear esta competencia.</p>
                    </div>
                    <Button className="md:ml-auto bg-primary-foreground text-primary hover:bg-white rounded-xl h-14 px-8 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                       Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recommended Coach Highlight */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-foreground font-display italic">Tu Coach Ideal para hoy</h2>
                  <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-xl" onClick={() => navigate('/matching')}>
                    Explorar más <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div className="bg-gradient-primary/5 rounded-[3rem] p-1 border border-primary/10">
                   <MentorCard
                     {...recommendedMentors[0]}
                     isRecommended
                     onViewProfile={() => navigate(`/mentora/${recommendedMentors[0].id}`)}
                     onBook={() => navigate(`/booking/${recommendedMentors[0].id}`)}
                   />
                </div>
              </div>

              {/* Grid of Other Options */}
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedMentors.slice(1, 3).map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    {...mentor}
                    onViewProfile={() => navigate(`/mentora/${mentor.id}`)}
                    onBook={() => navigate(`/booking/${mentor.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar / Schedule */}
            <div className="lg:col-span-4 space-y-8">
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-1 gap-6">
                <div className="glass rounded-3xl p-8 border-white/20 shadow-xl flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-foreground tracking-tight">{completedSessions.length}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Sesiones Logradas</p>
                  </div>
                </div>
                
                <div className="glass rounded-3xl p-8 border-white/20 shadow-xl flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-foreground tracking-tight">12</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Mensajes de Red</p>
                  </div>
                </div>
              </div>

              {/* Agenda Section */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">Próximo Encuentro</h3>
                {upcomingSessions.length > 0 ? (
                  <div className="animate-scale-in">
                    <SessionCard
                      {...upcomingSessions[0]}
                      onJoin={() => navigate(`/session/${upcomingSessions[0].id}`)}
                      onReschedule={() => alert('Reagendar')}
                    />
                  </div>
                ) : (
                  <div className="glass rounded-3xl p-10 text-center border-dashed border-2 border-border/50">
                    <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-6" />
                    <p className="text-muted-foreground font-medium mb-6">Tu agenda está lista para nuevas metas.</p>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2 border-primary/20 hover:border-primary/40" onClick={() => navigate('/matching')}>
                      Agendar Sesión
                    </Button>
                  </div>
                )}
              </div>

              {/* Resources Box */}
              <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-24 h-24" />
                 </div>
                 <h3 className="text-xl font-black mb-4 font-display italic">Centro de Recursos</h3>
                 <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed">Accede a las últimas guías de IA Generativa para ejecutivos senior.</p>
                  <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl h-12 font-black">
                    Explorar Biblioteca
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenteeDashboardPage;
