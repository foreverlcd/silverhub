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

const stages = ['directivo', 'gerencial', 'independiente', 'reinvención'] as const;
const countries = ['Perú', 'Colombia', 'México', 'Brasil'] as const;

const stemAreas = [
  { id: 'IA', name: 'Inteligencia Artificial', icon: '🤖' },
  { id: 'AN', name: 'Analítica de Datos', icon: '📈' },
  { id: 'CO', name: 'Herramientas Colaborativas', icon: '🤝' },
  { id: 'MA', name: 'Marketing Digital', icon: '📱' },
] as const;

const subThemes = {
  IA: ['ChatGPT & Prompt Engineering', 'Automatización de procesos', 'IA para toma de decisiones', 'Generación de contenido con IA', 'Copilot / Asistentes virtuales', 'Ética en IA'],
  AN: ['Power BI / Dashboards', 'Análisis de mercados', 'Google Analytics', 'Data Literacy', 'Excel Avanzado / Python', 'Visualización de datos'],
  CO: ['Notion / Gestión de proyectos', 'Slack / Comunicación moderna', 'Metodologías Ágiles', 'Manejo de la Nube (Cloud)', 'Ciberseguridad básica', 'Ecosistemas Digítales'],
  MA: ['LinkedIn para ejecutivos', 'Estrategia de marca personal', 'Social Selling', 'Trend Monitoring', 'E-commerce', 'Content Strategy'],
};

const objectives = [
  'Optimizar mi productividad con tecnología',
  'Liderar equipos digitales con confianza',
  'Actualizar mis competencias de mercado',
  'Emprender un negocio digital/consultoría',
  'Superar la brecha tecnológica',
] as const;

const supportTypes = [
  'Hoja de ruta personalizada',
  'Entrenamiento en herramientas específicas',
  'Acompañamiento en proyectos reales',
  'Optimización de LinkedIn/Marca Personal',
  'Diagnóstico de brecha digital',
  'Consultoría en IA aplicada',
  'Networking de alto nivel',
  'Liderazgo en entornos digitales',
] as const;

const scheduleOptions = [
  { id: 'morning', label: 'Mañanas (6:00 – 12:00)' },
  { id: 'afternoon', label: 'Tardes (12:00 – 18:00)' },
  { id: 'night', label: 'Noches (18:00 – 22:00)' },
  { id: 'weekend', label: 'Fines de semana' },
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
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  const [level, setLevel] = useState('');
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
      case 2: return stemArea && selectedSubThemes.length > 0 && objective && selectedSupport.length > 0;
      case 3: return level;
      case 4: return selectedSchedules.length > 0;
      default: return false;
    }
  };

  const stepTitles = [
    'Perfil',
    'Estrategia',
    'Nivel',
    'Preferencias'
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
                      Tu Perfil Ejecutivo.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Iniciemos personalizando tu experiencia según tu trayectoria de liderazgo.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Edad</Label>
                      <Input
                        type="number"
                        placeholder="Ej: 55"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Ciudad</Label>
                      <Input
                        placeholder="Ej: Lima, Perú"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">País</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Nivel de Responsabilidad</Label>
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
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </p>
                          <p className="text-sm text-muted-foreground font-medium mt-1">
                            {s === 'reinvención' ? 'Buscando nuevas oportunidades o modelos de negocio.' : `Experiencia en nivel ${s} corporativo.`}
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
                      Objetivos Digitales.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Selecciona las áreas tecnológicas que deseas dominar.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Área Principal</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stemAreas.map((area) => (
                        <button
                          key={area.id}
                          onClick={() => { setStemArea(area.id); setSelectedSubThemes([]); }}
                          className={cn(
                            "p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
                            stemArea === area.id ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                          <span className="text-3xl">{area.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-center">{area.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {stemArea && (
                    <div className="space-y-4 animate-fade-in">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Temas de Interés (Máx. 3)</Label>
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
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Meta Principal</Label>
                    <div className="space-y-2">
                      {objectives.map((o) => (
                        <button
                          key={o}
                          onClick={() => setObjective(o)}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 text-left font-bold text-sm transition-all",
                            objective === o ? "bg-primary/5 border-primary" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Tipo de Acompañamiento</Label>
                    <div className="flex flex-wrap gap-2">
                      {supportTypes.slice(0, 6).map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleSelection(s, selectedSupport, setSelectedSupport, 3)}
                          className={cn(
                            "px-4 py-2 rounded-lg border font-bold text-[10px] uppercase tracking-widest transition-all",
                            selectedSupport.includes(s) ? "bg-primary text-white border-primary" : "bg-background border-border"
                          )}
                        >
                          {s}
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
                      Nivel de Experiencia.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Esto nos ayudará a encontrar el ritmo ideal para tus sesiones.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {['Principiante', 'Intermedio', 'Avanzado'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={cn(
                          "p-8 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group",
                          level === l ? "bg-primary/5 border-primary shadow-sm" : "bg-background border-border hover:border-primary/20"
                        )}
                      >
                        <div>
                           <p className={cn("text-2xl font-bold transition-colors", level === l ? "text-primary" : "text-foreground")}>{l}</p>
                           <p className="text-sm text-muted-foreground font-medium mt-1">
                              {l === 'Principiante' ? 'Sin experiencia previa con estas herramientas.' : l === 'Intermedio' ? 'Uso ocasional, necesito mayor fluidez.' : 'Tengo bases sólidas, busco perfeccionamiento.'}
                           </p>
                        </div>
                        <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", level === l ? "border-primary bg-primary" : "border-border")}>
                           {level === l && <CheckCircle className="h-4 w-4 text-white" />}
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
                      Preferencias de Sesión.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Define tu disponibilidad para las mentorías digitales.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-secondary/5 p-8 rounded-2xl border border-border">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Idioma</h4>
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold">ES</div>
                          <span className="text-lg font-bold">Español</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Disponibilidad sugerida</Label>
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

                    <div className="p-8 bg-primary rounded-2xl text-primary-foreground flex items-center gap-6 shadow-lg">
                       <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                          <Sparkles className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="text-lg font-bold">¡Todo listo para comenzar!</p>
                          <p className="text-sm opacity-80 font-medium text-pretty">Estamos preparando las mejores recomendaciones de coaches para tu perfil.</p>
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
                {step === totalSteps ? 'Finalizar Registro' : 'Siguiente'}
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
