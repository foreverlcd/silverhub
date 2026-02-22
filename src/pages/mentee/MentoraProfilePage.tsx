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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="section-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-10 font-bold uppercase text-[10px] tracking-widest hover:bg-secondary/10 rounded-xl h-12 px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Catálogo
          </Button>
          
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Profile Info */}
            <div className="lg:col-span-8 space-y-10 animate-fade-in">
              <div className="bg-card rounded-[2.5rem] p-10 md:p-14 border border-border shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.01] group-hover:scale-110 transition-transform duration-1000">
                    <Award className="w-80 h-80" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-10 relative z-10">
                  <div className="relative shrink-0 self-center md:self-start">
                    <div className="relative">
                      <img 
                        src={mentor.imageUrl} 
                        alt={mentor.name} 
                        className="w-48 h-48 rounded-3xl object-cover shadow-lg border-2 border-background" 
                      />
                    </div>
                    {mentor.isVerified && (
                      <div className="absolute -bottom-2 -right-2 h-12 w-12 bg-success text-success-foreground rounded-2xl flex items-center justify-center shadow-lg border-4 border-background" title="Coach Verificado">
                         <CheckCircle className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="space-y-3 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                           <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">{mentor.name}</h1>
                           {mentor.matchScore && (
                             <div className="animate-fade-in scale-110 md:mt-1">
                               <MatchScoreBadge score={mentor.matchScore} size="lg" />
                             </div>
                           )}
                        </div>
                        <p className="text-lg text-primary font-bold uppercase tracking-wide opacity-90">{mentor.title}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 border border-border rounded-lg text-sm font-semibold">
                           {mentor.company}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           <MapPin className="h-3 w-3" /> Ubicación
                        </p>
                        <p className="font-bold text-base">{mentor.location}, <span className="text-primary">{mentor.country}</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           <Star className="h-3 w-3 text-primary fill-primary" /> Rating
                        </p>
                        <p className="font-bold text-base">{mentor.rating} <span className="text-muted-foreground font-medium text-xs">/ 5.0</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           <Globe className="h-3 w-3" /> Nivel
                        </p>
                        <p className="font-bold text-base text-primary">Experto Senior</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-card rounded-[2rem] p-8 space-y-6 border border-border shadow-sm">
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                       <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Brain className="h-5 w-5" />
                       </div>
                       <h2 className="text-xl font-bold text-foreground tracking-tight leading-none">Visión Estratégica</h2>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed font-medium">
                      {mentor.bio}
                    </p>
                 </div>

                 <div className="bg-card rounded-[2rem] p-8 space-y-6 border border-border shadow-sm">
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                       <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-foreground">
                          <Sparkles className="h-5 w-5" />
                       </div>
                       <h2 className="text-xl font-bold text-foreground tracking-tight leading-none">Perfil de Match IA</h2>
                    </div>
                    <div className="space-y-4 text-sm font-medium leading-relaxed">
                       <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-muted-foreground">
                          Optimizado para líderes que buscan dominar <span className="font-bold text-primary">Arquitecturas Digitales</span> y <span className="font-bold text-primary">Estrategias de IA</span>.
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {mentor.skills.slice(0, 4).map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-secondary/10 border border-border rounded-lg text-[10px] font-bold uppercase tracking-widest">
                               {skill}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="bg-card rounded-[2rem] p-8 space-y-6 border border-border shadow-sm">
                <h2 className="text-xl font-bold text-foreground tracking-tight">Competencias de Especialidad</h2>
                <div className="flex flex-wrap gap-3">
                  {mentor.skills.map((skill) => (
                    <span key={skill} className="px-5 py-2.5 bg-primary/5 text-primary border border-primary/10 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary/10 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar / Booking */}
            <div className="lg:col-span-4 space-y-8 relative">
              <div className="sticky top-28 space-y-8">
                <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground shadow-xl relative overflow-hidden group border border-white/10 animate-fade-in">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700">
                     <Calendar className="w-32 h-32" />
                  </div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className="text-center space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 mb-4">Costo por Sesión</p>
                      <div className="flex items-center justify-center gap-1">
                         <span className="text-lg font-bold opacity-60 self-start mt-2">S/</span>
                         <p className="text-5xl md:text-6xl font-bold tracking-tight">{mentor.pricePerSession}</p>
                      </div>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">60 minutos de mentoría</p>
                    </div>

                    <Button 
                      className="w-full h-16 bg-white text-primary hover:bg-white/90 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all" 
                      onClick={() => navigate(`/booking/${mentor.id}`)}
                    >
                      Reservar Sesión <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    
                    <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-2 opacity-50">
                       <p className="text-[9px] font-bold uppercase tracking-widest text-center leading-relaxed">Procesado por SilverHub AI Engine</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm space-y-8">
                  <div className="space-y-4">
                     <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                       <Clock className="h-4 w-4 text-primary" /> Ventanas Abiertas
                     </h3>
                     <div className="flex flex-wrap gap-2">
                       {mentor.availability.map((day) => (
                         <span key={day} className="px-3 py-1.5 bg-secondary/10 border border-border rounded-lg text-[10px] font-bold uppercase tracking-widest">{day}</span>
                       ))}
                     </div>
                  </div>

                  <div className="space-y-4 border-t border-border pt-8">
                     <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                       <Globe className="h-4 w-4 text-primary" /> Idiomas Disponibles
                     </h3>
                     <div className="flex flex-wrap gap-4">
                       {mentor.languages.map((lang) => (
                         <span key={lang} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                           <div className="h-2 w-2 rounded-full bg-primary" /> {lang}
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
