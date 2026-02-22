import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, BookOpen, Users, Lightbulb } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-bold mb-8 border border-primary/20 tracking-widest uppercase">
            <Sparkles className="h-4 w-4 text-primary" />
            Centro de Conocimiento Digital
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-foreground mb-8 animate-slide-up leading-tight tracking-tight">
            Maestría en la<br />
            <span className="text-primary">Era Digital.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up animation-delay-100 font-medium leading-relaxed">
            Curaduría exclusiva de conocimiento para líderes senior y expertos digitales. Potenciamos tu evolución con recursos de vanguardia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up animation-delay-200">
            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-xl shadow-xl bg-primary text-primary-foreground group">
              Explorar biblioteca
              <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-10 text-lg font-bold rounded-xl border-2 border-primary/10">
              Contribuir
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center md:text-left mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Nuestras Verticales.</h2>
            <p className="text-lg text-muted-foreground font-medium max-w-xl">Instrumentos estratégicos diseñados para acortar la brecha generacional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: 'Guías de Liderazgo', 
                description: 'Estrategias de comunicación para sesiones de mentoría inversa de alto impacto.',
                color: 'bg-primary/10 text-primary'
              },
              { 
                icon: Users, 
                title: 'Casos de Éxito', 
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
                className="group relative bg-card rounded-[2.5rem] p-10 border border-border shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm", resource.color)}>
                  <resource.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{resource.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium mb-8 text-sm">{resource.description}</p>
                <Button variant="ghost" className="p-0 font-bold text-xs uppercase tracking-widest hover:bg-transparent text-primary group/btn">
                  Descargar PDF
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
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
