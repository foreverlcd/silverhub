import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Users, Lightbulb, TrendingUp } from 'lucide-react';

const ParaMenteesPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-bold mb-8 border border-primary/20 tracking-widest uppercase">
            <Sparkles className="h-4 w-4 text-primary" />
            Liderazgo Senior en la Era Digital
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-foreground mb-8 animate-slide-up leading-tight tracking-tight">
            Tu Sabiduría,<br />
            <span className="text-primary">Evolucionada.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 animate-slide-up animation-delay-100 font-medium leading-relaxed">
            Domina las herramientas que definen el presente. Conecta con expertos digitales para potenciar tu legado con el poder de la Inteligencia Artificial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up animation-delay-200">
            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-xl shadow-xl bg-primary text-primary-foreground hover:shadow-primary/40 transition-all" onClick={() => navigate('/register')}>
              Iniciar mi evolución hoy
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-10 text-lg font-bold rounded-xl border-2 border-primary/10 hover:bg-primary/5 text-primary" onClick={() => navigate('/matching')}>
              Explorar Coaches
            </Button>
          </div>
        </div>
      </section>

      {/* Why Mentoring? */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              El Poder de la <span className="text-primary underline underline-offset-8">Mentoría Inversa</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Fusionamos décadas de experiencia estratégica con la agilidad de los nativos digitales.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                icon: TrendingUp, 
                color: "bg-primary/10 text-primary", 
                title: 'Vigencia Estratégica', 
                desc: 'Asegura tu relevancia en los directorios modernos dominando la IA y la analítica predictiva.' 
              },
              { 
                icon: Lightbulb, 
                color: "bg-accent/10 text-accent", 
                title: 'Productividad x10', 
                desc: 'Automatiza procesos operativos y libera tiempo para lo que realmente importa: tu visión.' 
              },
              { 
                icon: Users, 
                color: "bg-secondary/10 text-secondary-foreground", 
                title: 'Conexión Generacional', 
                desc: 'Lidera equipos jóvenes con un entendimiento profundo de sus herramientas y lenguajes.' 
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

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white mx-4 md:mx-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl mb-24">
         <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
               <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Tu Trayectoria No Tiene Edad.</h3>
               <p className="text-xl opacity-80 font-medium">Únete a la elite de líderes que están redefiniendo el futuro corporativo.</p>
            </div>
            <Button size="lg" className="h-16 px-12 bg-white text-primary text-lg font-bold rounded-xl shadow-xl hover:bg-white/90" onClick={() => navigate('/register')}>
               Comenzar Ahora
            </Button>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParaMenteesPage;
