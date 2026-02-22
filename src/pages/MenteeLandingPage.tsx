import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Users, Lightbulb, TrendingUp } from 'lucide-react';

const MenteeLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="section-container text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-bold mb-6 animate-fade-in border border-border/50">
            <Sparkles className="h-4 w-4 text-primary" />
            Líderes Senior: La tecnología es tu nueva aliada
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-slide-up leading-tight">
            Potencia tu trayectoria con <span className="text-gradient">Competencias Digitales</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-100 font-medium leading-relaxed">
            No permitas que la brecha digital frene tu impacto. Aprende a usar IA, analítica y herramientas modernas de la mano de expertos digitales.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10 animate-slide-up animation-delay-200">
            <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-lg" variant="default">
              Iniciar mi transformación
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-background/50 backdrop-blur-sm">
              Explorar Coaches
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              ¿Por qué digitalizar tu experiencia?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Integra tu maestría estratégica con las herramientas que dominan el mercado actual.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="dashboard-card text-center card-hover p-8 border-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Vigencia Laboral</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Supera el prejuicio de la obsolescencia demostrando dominio en IA y herramientas colaborativas.</p>
            </div>
            <div className="dashboard-card text-center card-hover p-8 border-2">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6 text-success">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Eficiencia con IA</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Maximiza tu productividad y automatiza tareas con inteligencia artificial y analítica de datos.</p>
            </div>
            <div className="dashboard-card text-center card-hover p-8 border-2">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-6 text-secondary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Independencia</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Asegura tu sostenibilidad financiera y bienestar liderando proyectos digitales de alto valor.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MenteeLandingPage;
