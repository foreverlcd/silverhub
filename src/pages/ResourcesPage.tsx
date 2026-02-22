import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, BookOpen, Users, Lightbulb } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section - Executive Style */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-glow opacity-60" />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full text-foreground text-xs font-black mb-8 animate-fade-in border border-white/20 shadow-xl tracking-widest uppercase">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            Centro de Excelencia Digital
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 animate-slide-up leading-[0.95] font-display italic tracking-tight">
            Maestría en la<br />
            <span className="text-primary italic">Era Digital.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up animation-delay-100 font-medium leading-relaxed">
            Curaduría exclusiva de conocimiento para líderes senior y expertos digitales. Potenciamos tu evolución con recursos de vanguardia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up animation-delay-200">
            <Button size="lg" className="h-16 px-12 text-xl font-black rounded-2xl shadow-2xl bg-primary text-primary-foreground group">
              Explorar biblioteca
              <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-12 text-xl font-black rounded-2xl border-2 border-primary/20">
              Contribuir
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Categories - Luxury Grid */}
      <section className="py-24 md:py-32 bg-background">
        <div className="section-container">
          <div className="text-left mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 font-display italic">Nuestras Verticales.</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-xl">Instrumentos estratégicos diseñados para acortar la brecha generacional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: BookOpen, 
                title: 'Guías de Liderazgo', 
                description: 'Estrategias de comunicación para sesiones de mentoría inversa de alto impacto.',
                color: 'bg-primary/10 text-primary'
              },
              { 
                icon: Users, 
                title: 'Protocolos de Éxito', 
                description: 'Metodologías probadas para la transferencia de conocimiento senior-joven.',
                color: 'bg-accent/10 text-accent'
              },
              { 
                icon: Lightbulb, 
                title: 'Tech Briefings', 
                description: 'Resúmenes ejecutivos sobre IA, Data y nuevas economías digitales.',
                color: 'bg-success/10 text-success'
              }
            ].map((resource, i) => (
              <div 
                key={i} 
                className="group relative glass rounded-[2.5rem] p-10 border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={cn("w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner transition-transform duration-700 group-hover:rotate-12", resource.color)}>
                  <resource.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black mb-4 font-display italic tracking-tight">{resource.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium mb-8">{resource.description}</p>
                <Button variant="ghost" className="p-0 font-black text-xs uppercase tracking-widest hover:bg-transparent text-primary hover:tracking-widest group/btn">
                  Descargar PDF
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
