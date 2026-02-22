import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MentorCard } from '@/components/MentorCard';
import { mentoras, testimonials, platformStats } from '@/data/mockData';
import {
  ArrowRight,
  Sparkles,
  Users,
  Calendar,
  Target,
  CheckCircle,
  Quote,
  ChevronDown,
  Brain,
  Lightbulb,
  Rocket,
  Globe,
  Award,
  TrendingUp,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      icon: Target,
      title: 'Diagnóstico Estratégico',
      description: 'Analizamos tu trayectoria para identificar las herramientas digitales que multiplicarán tu impacto.'
    },
    {
      icon: Users,
      title: 'Conexión con tu Coach',
      description: 'Matching inteligente con un experto digital (Junior) que habla tu lenguaje y entiende tus desafíos.'
    },
    {
      icon: Rocket,
      title: 'Dominio y Evolución',
      description: 'Sesiones 1:1 prácticas donde transformamos la tecnología en tu herramienta de poder.'
    }
  ];

  const faqs = [
    {
      question: '¿Qué es SilverHub?',
      answer: 'SilverHub es la plataforma líder en mentoría inversa que conecta la sabiduría de profesionales senior con la agilidad tecnológica de expertos digitales.'
    },
    {
      question: '¿Cómo funciona la membresía?',
      answer: 'Por S/ 149.90 al mes obtienes acceso total a nuestra red de coaches, 3 sesiones personalizadas y una hoja de ruta con IA diseñada exclusivamente para ti.'
    },
    {
      question: '¿Quiénes son los Coaches Digitales?',
      answer: 'Son jóvenes profesionales con dominio absoluto de IA, analítica y herramientas digitales de vanguardia, capacitados para transferir conocimiento de manera efectiva.'
    },
    {
      question: '¿Es seguro para mi información profesional?',
      answer: 'Absolutamente. Todas las sesiones y materiales están protegidos bajo protocolos de confidencialidad y seguridad de datos de alto nivel.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20">
      <Navbar />

      {/* Hero Section - The Luxe Entry */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-glow opacity-60" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-bold mb-8 animate-fade-in border border-primary/20 tracking-widest uppercase">
                 <Sparkles className="h-3 w-3" />
                 Liderazgo Senior x IA
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-slide-up leading-[1.1]">
                Experiencia que trasciende.<br />
                <span className="text-primary">Tecnología que impulsa.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-slide-up animation-delay-100 font-medium leading-relaxed">
                Empoderamos a líderes senior para dominar el futuro digital. Conectamos tu maestría profesional con el poder de la Inteligencia Artificial.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up animation-delay-200">
                <Button size="lg" className="h-16 px-10 text-base font-bold rounded-xl shadow-xl hover:shadow-primary/30 bg-primary text-primary-foreground group" onClick={() => navigate('/register')}>
                  Comenzar mi transformación
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button size="lg" variant="ghost" className="h-16 px-10 text-base font-bold rounded-xl border-2 border-primary/10 hover:bg-primary/5" onClick={() => navigate('/para-mentees')}>
                  Conocer más
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block animate-scale-in">
              <div className="relative z-10">
                 <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-1.5 border border-white/20 shadow-2xl overflow-hidden">
                    <img 
                      src="https://img.freepik.com/fotos-premium/hombre-ensenando-alfabetizacion-padre-anciano-computadora-portatil-sentado-sofa_922936-47724.jpg"
                      alt="Executive Talent"
                      className="w-full h-[550px] object-cover rounded-[2.8rem]"
                    />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 bg-background overflow-hidden relative">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                El Valor de la<br />
                <span className="text-primary">Experiencia Senior.</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                No se trata de aprender a usar herramientas; se trata de liderar la transformación digital con la sabiduría que solo dan las décadas de carrera.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'IA Strategy', text: 'Optimiza tu toma de decisiones con modelos de IA.' },
                  { title: 'Digital Presence', text: 'Domina los ecosistemas digitales donde se decide el futuro.' }
                ].map((item, i) => (
                  <div key={i} className="glass rounded-3xl p-8 border-white/20 shadow-xl">
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Target, 
                title: 'Impacto Real', 
                text: 'Posiciónate en los nuevos ecosistemas tecnológicos con autoridad.'
              },
              { 
                icon: Lightbulb, 
                title: 'Innovación', 
                text: 'Domina prompts y herramientas para potenciar tu productividad.'
              },
              { 
                icon: Rocket, 
                title: 'Independencia', 
                text: 'Habilita nuevas oportunidades de consultoría y liderazgo.'
              }
            ].map((p, i) => (
              <div key={i} className="group p-10 bg-card rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <p.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-background">
        <div className="section-container">
           <div className="glass rounded-[4rem] p-12 md:p-24 border-white/20 relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                       Metodología<br /><span className="text-primary">Silver Hub.</span>
                    </h2>
                    <div className="space-y-10">
                       {[
                         { step: '01', title: 'Diagnóstico', text: 'Identificamos las herramientas digitales clave para tu perfil.' },
                         { step: '02', title: 'Conexión', text: 'Te asignamos un Coach Digital experto en tu área.' },
                         { step: '03', title: 'Evolución', text: 'Sesiones 1:1 prácticas enfocadas en resultados.' }
                       ].map((m, i) => (
                         <div key={i} className="flex gap-6 group">
                            <div className="text-4xl font-bold text-primary/20 group-hover:text-primary transition-colors">{m.step}</div>
                            <div>
                               <h4 className="text-xl font-bold mb-2">{m.title}</h4>
                               <p className="text-muted-foreground font-medium">{m.text}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="relative flex justify-center">
                    <div className="h-64 w-64 bg-primary/5 rounded-full flex items-center justify-center relative">
                       <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
                       <Brain className="h-20 w-20 text-primary" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-24 md:py-32 bg-primary text-white rounded-[4rem] mx-4 md:mx-12 mb-24 overflow-hidden relative shadow-2xl">
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
                Invierte en tu<br /><span className="text-accent underline underline-offset-8">Futuro Digital.</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                  'Dashboard de evolución',
                  'Coaches Expertos en IA',
                  'Protocolos de Seguridad',
                  'Networking Senior',
                  'Roadmap Personalizado',
                  'Soporte Prioritario'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-lg font-bold opacity-90">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="h-16 px-12 bg-white text-primary hover:bg-white/90 text-lg font-bold rounded-xl shadow-2xl" onClick={() => navigate('/register')}>
                Obtener Membresía
              </Button>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-dark p-10 rounded-[3rem] border-white/20 text-center">
                <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Acceso Total</p>
                <div className="mb-8">
                  <span className="text-6xl font-bold tracking-tighter text-white">S/ 149</span>
                  <span className="text-lg font-bold opacity-40 ml-2">/mes</span>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-sm font-bold italic">3 Sesiones Mensuales Incluidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-24 bg-background">
        <div className="section-container text-center max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Coaches Digitales.</h2>
          <p className="text-xl text-muted-foreground font-medium mb-16">Expertos nativos digitales preparados para acompañar tu evolución profesional.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {mentoras.slice(0, 3).map((mentor, i) => (
              <div key={mentor.id}>
                <MentorCard {...mentor} isRecommended={i === 0} bio={mentor.bio} onBook={() => navigate('/register')} />
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="mt-16 text-primary font-bold text-lg group" onClick={() => navigate('/matching')}>
             Ver todos los coaches
             <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary/10 rounded-[4rem] mx-4 md:mx-12 mb-24 border border-border">
        <div className="section-container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-16">Preguntas Frecuentes.</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-0 bg-background rounded-3xl px-8 shadow-sm">
                <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="section-container">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Tu Futuro es Hoy.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Únete a la plataforma de mentoría que conecta la experiencia senior con el futuro tecnológico.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-xl shadow-xl bg-primary text-primary-foreground" onClick={() => navigate('/register')}>
              Iniciar mi cambio
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-12 text-lg font-bold rounded-xl border-2 border-primary/10" onClick={() => navigate('/para-mentores')}>
              Ser Coach Digital
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default LandingPage;

