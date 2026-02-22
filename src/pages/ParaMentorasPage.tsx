import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Users, Lightbulb, TrendingUp } from 'lucide-react';

const ParaMentorasPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed flex flex-col">
      <Navbar />
      
      {/* Hero Section - The Coach's Entry */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow opacity-60" />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full text-foreground text-xs font-black mb-10 animate-fade-in border border-white/20 shadow-xl tracking-[0.3em] uppercase">
            <Sparkles className="h-4 w-4 text-accent" />
            Nuevas Generaciones Impulsando Legados
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 animate-slide-up leading-[0.95] font-display italic tracking-tight">
            Sé el Motor de la<br />
            <span className="text-primary">Evolución Digital.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto mb-16 animate-slide-up animation-delay-100 font-medium leading-relaxed italic">
            Convierte tu dominio tecnológico en una herramienta de impacto estratégico guiando a los líderes que construyeron el mundo que hoy habitamos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center animate-slide-up animation-delay-200">
            <Button size="lg" className="h-20 px-12 text-lg font-black rounded-3xl shadow-2xl bg-primary text-white hover:shadow-primary/40 active:scale-95 transition-all uppercase tracking-widest" onClick={() => navigate('/register')}>
              Iniciar como Coach Digital
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            <Button size="lg" variant="ghost" className="h-20 px-12 text-lg font-black rounded-3xl border-2 border-primary/20 hover:bg-primary/5 uppercase tracking-widest text-primary" onClick={() => navigate('/matching')}>
              Ver Coaches Actuales
            </Button>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-32 relative bg-white dark:bg-black overflow-hidden">
        <div className="section-container">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 font-display italic">
              ¿Por qué ser un <span className="text-accent underline decoration-4 underline-offset-8">Coach Hub</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Desarrolla el liderazgo que solo se obtiene conectando con la alta dirección corporativa.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                icon: Users, 
                color: "bg-primary/10 text-primary", 
                title: 'Networking de Élite', 
                desc: 'Acceso directo a mentores senior que ofrecen sabiduría operativa y estratégica invaluable para tu carrera.' 
              },
              { 
                icon: Lightbulb, 
                color: "bg-accent/10 text-accent", 
                title: 'Liderazgo Pedagógico', 
                desc: 'Aprende a transferir conocimiento técnico transformándolo en valor de negocio y decisiones tácticas.' 
              },
              { 
                icon: TrendingUp, 
                color: "bg-success/10 text-success", 
                title: 'Monetización Ética', 
                desc: 'Genera ingresos de alto valor mientras cierras la brecha digital intergeneracional más urgente.' 
              }
            ].map((pillar, i) => (
              <div key={i} className="glass rounded-[3rem] p-12 border-white/20 shadow-xl group hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <pillar.icon className="w-48 h-48" />
                </div>
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", pillar.color)}>
                  <pillar.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 font-display italic tracking-tight">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg italic">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact Strip */}
      <section className="py-24 bg-primary text-white mx-4 md:mx-8 rounded-[4rem] relative overflow-hidden shadow-2xl mb-24">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
         <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
               <h3 className="text-4xl md:text-5xl font-black font-display italic mb-4 italic leading-tight">Potencia el Legado del 50+.</h3>
               <p className="text-xl opacity-80 font-medium italic">Miles de líderes con una sabiduría incalculable esperan tu guía tecnológica para volver a brillar.</p>
            </div>
            <Button size="lg" className="h-16 px-12 bg-white text-primary text-xl font-black rounded-2xl shadow-2xl hover:bg-white/90" onClick={() => navigate('/register')}>
               Postular como Coach
            </Button>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParaMentorasPage;
