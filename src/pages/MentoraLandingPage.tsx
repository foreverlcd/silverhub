import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Users, Lightbulb, TrendingUp } from 'lucide-react';

const MentoraLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="section-container text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-bold mb-6 animate-fade-in border border-primary/20">
            <Sparkles className="h-4 w-4" />
            Jóvenes Talentos: Conviértete en Coach Digital
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-slide-up leading-tight">
            Tu dominio digital es el <span className="text-gradient">puente al éxito senior</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-100 font-medium leading-relaxed">
            Aplica tu conocimiento en IA y tecnología para potenciar la experiencia de líderes senior. Genera ingresos extra impactando en la Economía Plateada.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10 animate-slide-up animation-delay-200">
            <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-lg" variant="default">
              Quiero ser Coach
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-background/50 backdrop-blur-sm">
              Ver el impacto
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              ¿Por qué ser Coach en SilverHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Desarrolla tu liderazgo y obtén beneficios tangibles por tu maestría digital.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="dashboard-card text-center card-hover p-8 border-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ingresos Meritocráticos</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Recibe el 60% por cada sesión 1:1. Valoramos tu tiempo y tu capacidad de enseñanza tecnológica.</p>
            </div>
            <div className="dashboard-card text-center card-hover p-8 border-2">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6 text-foreground">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Liderazgo Estratégico</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Conéctate con profesionales de alto nivel (50-65 años) y fortalece tus habilidades de comunicación y red profesional.</p>
            </div>
            <div className="dashboard-card text-center card-hover p-8 border-2">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6 text-success">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Escalabilidad</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Nuestra red crece con la demanda. Aseguramos un flujo constante de mentorías en un sector con alta capacidad de pago.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default MentoraLandingPage;
