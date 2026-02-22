import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MatchScoreBadge } from '@/components/MatchScoreBadge';
import { mentoras } from '@/data/mockData';
import { MapPin, Star, Clock, Globe, Award, Calendar, ArrowLeft, CheckCircle, Brain, Sparkles, ArrowRight } from 'lucide-react';

const MentoraProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const mentor = mentoras.find((m) => m.id === id) || mentoras[0];

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20 flex flex-col">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="section-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-12 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-secondary/50 rounded-2xl h-14 px-8"
          >
            <ArrowLeft className="h-5 w-5 mr-3" /> Directorio de Elite
          </Button>
          
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Profile Info */}
            <div className="lg:col-span-8 space-y-12 animate-slide-up">
              <div className="glass rounded-[4rem] p-10 md:p-16 relative overflow-hidden group border-white/20 shadow-[0_50px_100px_-20px_rgba(var(--primary-rgb),0.1)]">
                <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000 group-hover:scale-110">
                    <Award className="w-80 h-80" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                  <div className="relative shrink-0 self-center md:self-start">
                    <div className="relative group/img">
                      <img 
                        src={mentor.imageUrl} 
                        alt={mentor.name} 
                        className="w-56 h-56 rounded-[3.5rem] object-cover shadow-2xl border-4 border-background group-hover/img:rotate-3 transition-transform duration-700" 
                      />
                      <div className="absolute -inset-4 bg-primary/10 rounded-[4rem] -z-10 blur-2xl opacity-0 group-hover/img:opacity-100 transition-opacity" />
                    </div>
                    {mentor.isVerified && (
                      <div className="absolute -bottom-4 -right-4 h-14 w-14 bg-success text-success-foreground rounded-[1.5rem] flex items-center justify-center shadow-2xl border-4 border-background" title="Coach Verificado">
                         <CheckCircle className="h-7 w-7" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="space-y-4 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                           <h1 className="text-4xl md:text-6xl font-black text-foreground font-display italic tracking-tight leading-none uppercase">{mentor.name}</h1>
                           {mentor.matchScore && (
                             <div className="animate-fade-in scale-110 md:mt-2">
                               <MatchScoreBadge score={mentor.matchScore} size="lg" />
                             </div>
                           )}
                        </div>
                        <p className="text-xl text-primary font-black italic uppercase tracking-[0.2em]">{mentor.title}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-xl text-sm font-bold">
                           {mentor.company}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-border/10">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           <MapPin className="h-3 w-3" /> Jurisdicción
                        </p>
                        <p className="font-black text-lg">{mentor.location}, <span className="text-primary italic">{mentor.country}</span></p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           <Star className="h-3 w-3 text-accent fill-accent" /> Performance
                        </p>
                        <p className="font-black text-lg">{mentor.rating} <span className="text-muted-foreground font-medium text-xs">/ 5.0</span></p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           <Globe className="h-3 w-3" /> Digital Index
                        </p>
                        <p className="font-black text-lg">Elite Level</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="glass rounded-[3rem] p-10 space-y-6 border-white/10 shadow-xl">
                    <div className="flex items-center gap-4 border-b border-border/10 pb-6">
                       <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Brain className="h-6 w-6" />
                       </div>
                       <h2 className="text-2xl font-black text-foreground font-display italic leading-none">Visión Estratégica</h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed font-medium italic">
                      {mentor.bio}
                    </p>
                 </div>

                 <div className="glass rounded-[3rem] p-10 space-y-8 border-white/10 shadow-xl">
                    <div className="flex items-center gap-4 border-b border-border/10 pb-6">
                       <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                          <Sparkles className="h-6 w-6" />
                       </div>
                       <h2 className="text-2xl font-black text-foreground font-display italic leading-none">Potencial de Match IA</h2>
                    </div>
                    <div className="space-y-6">
                       <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 italic text-sm font-medium leading-relaxed">
                          "Optimizado para líderes que buscan dominar <span className="font-black text-primary">Arquitecturas Cloud</span> y <span className="font-black text-primary">Estrategias de IA Generativa</span>."
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {mentor.skills.slice(0, 4).map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-secondary/5 border border-border/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                               {skill}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="glass rounded-[3rem] p-10 space-y-8 border-white/10 shadow-xl">
                <h2 className="text-2xl font-black text-foreground font-display italic">Competencias de Especialidad</h2>
                <div className="flex flex-wrap gap-4">
                  {mentor.skills.map((skill) => (
                    <span key={skill} className="px-8 py-4 bg-primary/5 text-primary border-2 border-primary/10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-inner hover:bg-primary/10 hover:border-primary/30 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar / Booking */}
            <div className="lg:col-span-4 space-y-8 relative">
              <div className="sticky top-28 space-y-8">
                <div className="bg-gradient-to-br from-primary via-zaffre to-primary rounded-[3.5rem] p-10 md:p-12 text-primary-foreground shadow-[0_40px_80px_-15px_rgba(var(--primary-rgb),0.5)] relative overflow-hidden group border-2 border-white/10 animate-scale-in">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                     <Calendar className="w-40 h-40" />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                    <div className="text-center space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 decoration-accent decoration-2 underline-offset-8 underline mb-6">Bloque Reservado</p>
                      <div className="flex items-center justify-center gap-1">
                         <span className="text-xl font-black opacity-60 self-start mt-4">S/</span>
                         <p className="text-6xl md:text-7xl font-black font-display tracking-tighter italic">{mentor.pricePerSession}</p>
                      </div>
                      <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Costo por Sincronización (60 min)</p>
                    </div>

                    <Button 
                      className="w-full h-20 bg-white text-primary hover:bg-theme-white/90 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-95 transition-all group/btn" 
                      size="lg" 
                      onClick={() => navigate(`/booking/${mentor.id}`)}
                    >
                      Reservar Sesuón <ArrowRight className="h-5 w-5 ml-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    
                    <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-2 opacity-60">
                       <p className="text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">SilverHub Elite Program — Cifrado de Sesión V.4</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-[3rem] p-10 space-y-10 border-white/10 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                     <Globe className="h-32 w-32" />
                  </div>
                  <div className="space-y-6 relative z-10 font-bold italic">
                     <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-3">
                       <Clock className="h-5 w-5 text-primary" /> Ventanas Abiertas
                     </h3>
                     <div className="flex flex-wrap gap-3">
                       {mentor.availability.map((day) => (
                         <span key={day} className="px-5 py-2.5 bg-secondary/10 border border-border/10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">{day}</span>
                       ))}
                     </div>
                  </div>

                  <div className="space-y-6 relative z-10 font-bold italic border-t border-border/10 pt-10">
                     <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-3">
                       <Globe className="h-5 w-5 text-accent" /> Canales de Transmisión
                     </h3>
                     <div className="flex flex-wrap gap-6">
                       {mentor.languages.map((lang) => (
                         <span key={lang} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                           <div className="h-2 w-2 rounded-full bg-accent animate-pulse" /> {lang}
                         </span>
                       ))}
                     </div>
                  </div>
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

export default MentoraProfilePage;
