import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Users, Lightbulb, TrendingUp } from 'lucide-react';

const ParaMentoresPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-bold mb-8 border border-primary/20 tracking-widest uppercase">
            <Sparkles className="h-4 w-4 text-accent" />
            Nuevas Generaciones Impulsando Legados
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-foreground mb-8 animate-slide-up leading-tight tracking-tight">
            Sé el Motor de la<br />
            <span className="text-primary">Evolución Digital.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 animate-slide-up animation-delay-100 font-medium leading-relaxed">
            Convierte tu dominio tecnológico en una herramienta de impacto estratégico guiando a los líderes que construyeron el mundo que hoy habitamos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up animation-delay-200">
            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-xl shadow-xl bg-primary text-primary-foreground hover:shadow-primary/40 transition-all" onClick={() => navigate('/register')}>
              Iniciar como Coach Digital
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-10 text-lg font-bold rounded-xl border-2 border-primary/10 hover:bg-primary/5 text-primary" onClick={() => navigate('/matching')}>
              Ver Coaches Actuales
            </Button>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              ¿Por qué ser un <span className="text-accent underline underline-offset-8">Coach Hub</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Desarrolla el liderazgo que solo se obtiene conectando con la alta dirección corporativa.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
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
              <div key={i} className="bg-card rounded-[2rem] p-10 border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", pillar.color)}>
                  <pillar.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact Strip */}
      <section className="py-24 bg-primary text-white mx-4 md:mx-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl mb-24">
         <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
               <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Potencia el Legado del 50+.</h3>
               <p className="text-xl opacity-80 font-medium">Miles de líderes con una sabiduría incalculable esperan tu guía tecnológica para volver a brillar.</p>
            </div>
            <Button size="lg" className="h-16 px-12 bg-white text-primary text-lg font-bold rounded-xl shadow-xl hover:bg-white/90" onClick={() => navigate('/register')}>
               Postular como Coach
            </Button>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParaMentoresPage;
