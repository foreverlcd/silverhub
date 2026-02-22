import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

const stages = ['C-Level / Director', 'Gerencia Media', 'Empresario / Dueño', 'Consultor Independiente'] as const;
const countries = ['Perú', 'Colombia', 'México', 'Brasil', 'Chile', 'Ecuador'] as const;

const stemAreas = [
  { id: 'IA', name: 'Inteligencia Artificial Estratégica', icon: '🧠' },
  { id: 'AN', name: 'Gobierno de Datos & Analytics', icon: '📊' },
  { id: 'CO', name: 'Productividad & Ecosistemas Cloud', icon: '☁️' },
  { id: 'MA', name: 'Marca Personal & Influencia Digital', icon: '✨' },
] as const;

const subThemes = {
  IA: ['IA Generativa para Directorios', 'Automatización de Procesos Críticos', 'Ética y Gobernanza en IA', 'Copilot para Ejecutivos', 'Prompt Engineering para Estrategia'],
  AN: ['Dashboards de Control de Mando', 'Data Literacy para Líderes', 'Visualización Estratégica', 'Cultura Driven-Data', 'Modelos Predictivos de Negocio'],
  CO: ['Arquitecturas de Trabajo Híbrido', 'Gestión de Proyectos en la Nube', 'Ciberseguridad para Directivos', 'Agilidad Escalada', 'Herramientas de Co-creación'],
  MA: ['LinkedIn para Líderes de Opinión', 'Social Selling para Ejecutivos', 'Estrategia de Contenido Digital', 'Networking de Alto Nivel', 'Reputación Online'],
};

const objectives = [
  'Modernizar mi visión de negocio con IA',
  'Liderar la transformación digital de mi equipo',
  'Asegurar mi relevancia en el mercado actual',
  'Optimizar mi productividad estratégica',
  'Entender el lenguaje de las nuevas generaciones',
] as const;

const supportTypes = [
  'Mentoría personalizada 1 a 1',
  'Casos de estudio aplicados a mi industria',
  'Configuración de herramientas en vivo',
  'Análisis de tendencias tecnológicas',
  'Acompañamiento en la toma de decisiones tech',
] as const;

const scheduleOptions = [
  { id: 'morning', label: 'Mañanas (Inicios de jornada)' },
  { id: 'midday', label: 'Almuerzos Ejecutivos (12:00 - 14:00)' },
  { id: 'afternoon', label: 'Tardes (Cierre de agenda)' },
  { id: 'weekend', label: 'Sábados de Capacitación' },
];

const MenteeOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [stage, setStage] = useState<typeof stages[number] | ''>('');
  
  const [stemArea, setStemArea] = useState<typeof stemAreas[number]['id'] | ''>('');
  const [selectedSubThemes, setSelectedSubThemes] = useState<string[]>([]);
  const [objective, setObjective] = useState('');
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  
  const [learningStyle, setLearningStyle] = useState('');
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate('/mentee/dashboard');
  };

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void, max: number) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else if (list.length < max) {
      setList([...list, item]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return age && city && country && stage;
      case 2: return stemArea && selectedSubThemes.length > 0 && objective;
      case 3: return learningStyle;
      case 4: return selectedSchedules.length > 0;
      default: return false;
    }
  };

  const stepTitles = [
    'Trayectoria',
    'Brecha Digital',
    'Metodología',
    'Calendario'
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-4xl">
          
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
               {stepTitles.map((title, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 group">
                   <div className={cn(
                     "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
                     step > i + 1 ? "bg-success text-success-foreground" : 
                     step === i + 1 ? "bg-primary text-primary-foreground scale-110 shadow-md" : 
                     "bg-secondary/40 text-muted-foreground"
                   )}>
                     {step > i + 1 ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold text-base">{i + 1}</span>}
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest hidden md:block transition-colors",
                     step === i + 1 ? "text-primary" : "text-muted-foreground/50"
                   )}>{title}</span>
                 </div>
               ))}
            </div>
            <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-primary transition-all duration-500 ease-out" 
                 style={{ width: `${(step / totalSteps) * 100}%` }}
               />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-card rounded-[2.5rem] border border-border p-8 md:p-14 shadow-lg relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 p-12 opacity-[0.01] pointer-events-none">
              <Sparkles className="w-64 h-64" />
            </div>

            <div className="relative z-10">
              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Tu Legado Estratégico.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Personalicemos tu camino hacia el liderazgo digital moderno.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Años de Trayectoria</Label>
                      <Input
                        type="number"
                        placeholder="Ej: 54"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                       <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Ciudad / Ciudad de Operación</Label>
                      <Input
                        placeholder="Ej: Lima, Perú"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Región Principal</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {countries.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCountry(c)}
                          className={cn(
                            "h-12 rounded-xl border-2 font-bold transition-all flex items-center justify-center tracking-widest uppercase text-[10px]",
                            country === c ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background border-border hover:border-primary/40 text-muted-foreground"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Nivel de Responsabilidad Actual</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stages.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStage(s)}
                          className={cn(
                            "p-6 rounded-2xl border-2 text-left transition-all",
                            stage === s ? "bg-primary/5 border-primary shadow-sm" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                          <p className={cn("text-lg font-bold transition-colors", stage === s ? "text-primary" : "text-foreground")}>
                            {s}
                          </p>
                          <p className="text-sm text-muted-foreground font-medium mt-1">
                            Enfoque en decisiones {s.includes('Director') ? 'de alto nivel y visión' : 'operativas y estratégicas'}.
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Desafíos Digitales.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      ¿En qué área sientes que la tecnología puede potenciar tu visión?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Frontera Tecnológica</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stemAreas.map((area) => (
                        <button
                          key={area.id}
                          onClick={() => { setStemArea(area.id); setSelectedSubThemes([]); }}
                          className={cn(
                            "p-6 rounded-2xl border-2 flex items-center gap-6 transition-all",
                            stemArea === area.id ? "bg-primary/10 border-primary shadow-md" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                          <span className="text-4xl">{area.icon}</span>
                          <div className="text-left">
                             <span className="text-sm font-bold block">{area.name}</span>
                             <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Optimización & Estrategia</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {stemArea && (
                    <div className="space-y-4 animate-fade-in">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Enfoques de Interés (Sugeridos por IA)</Label>
                      <div className="flex flex-wrap gap-2">
                        {subThemes[stemArea as keyof typeof subThemes].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => toggleSelection(theme, selectedSubThemes, setSelectedSubThemes, 3)}
                            className={cn(
                              "px-5 py-2.5 rounded-xl border-2 font-bold text-xs transition-all",
                              selectedSubThemes.includes(theme) ? "bg-primary text-white border-primary shadow-md" : "bg-background border-border hover:border-primary/40 text-muted-foreground"
                            )}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Meta de Transformación</Label>
                    <div className="space-y-2">
                      {objectives.map((o) => (
                        <button
                          key={o}
                          onClick={() => setObjective(o)}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 text-left font-bold text-sm transition-all",
                            objective === o ? "bg-primary text-white border-primary" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Estilo de Mentoría.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Buscamos el ritmo ideal para tu estilo de liderazgo.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {[
                      { id: 'hands-on', title: 'Práctico & Inmersivo', desc: 'Aprender haciendo, configurando herramientas en tiempo real.' },
                      { id: 'strategic', title: 'Visión Estratégica', desc: 'Entender el "por qué" y el impacto en el negocio antes que el "cómo".' },
                      { id: 'case-study', title: 'Basado en Casos', desc: 'Analizar cómo otras empresas líderes están aplicando estas tecnologías.' }
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLearningStyle(l.id)}
                        className={cn(
                          "p-8 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group",
                          learningStyle === l.id ? "bg-primary/5 border-primary shadow-sm" : "bg-background border-border hover:border-primary/20"
                        )}
                      >
                        <div>
                           <p className={cn("text-2xl font-bold transition-colors", learningStyle === l.id ? "text-primary" : "text-foreground")}>{l.title}</p>
                           <p className="text-sm text-muted-foreground font-medium mt-1">
                              {l.desc}
                           </p>
                        </div>
                        <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", learningStyle === l.id ? "border-primary bg-primary" : "border-border")}>
                           {learningStyle === l.id && <CheckCircle className="h-4 w-4 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Disponibilidad Ejecutiva.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Aseguremos bloques de tiempo sin interrupciones.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Ventanas Horarias Preferidas</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scheduleOptions.map((opt) => (
                           <button
                             key={opt.id}
                             onClick={() => toggleSelection(opt.id, selectedSchedules, setSelectedSchedules, 2)}
                             className={cn(
                               "h-16 px-6 rounded-xl border-2 flex items-center justify-between font-bold text-base transition-all",
                               selectedSchedules.includes(opt.id) ? "bg-primary text-white border-primary shadow-md" : "bg-background border-border hover:border-primary/20"
                             )}
                           >
                              {opt.label}
                              {selectedSchedules.includes(opt.id) && <CheckCircle className="h-5 w-5" />}
                           </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-primary rounded-[2rem] text-primary-foreground flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
                       <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                          <CheckCircle className="h-8 w-8" />
                       </div>
                       <div>
                          <p className="text-xl font-bold">Protocolo de Confidencialidad</p>
                          <p className="text-sm opacity-80 font-medium">Todas tus sesiones están protegidas. Tu coach firmará un acuerdo de no divulgación automático.</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-[10px] border-border hover:bg-secondary/10 transition-all w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-12 px-10 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-all w-full sm:w-auto active:scale-95"
              >
                {step === totalSteps ? 'Activar Plan de Evolución' : 'Continuar'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeOnboardingPage;
