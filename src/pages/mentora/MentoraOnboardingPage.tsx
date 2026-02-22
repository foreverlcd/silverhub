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
  Users,
  TrendingUp,
} from 'lucide-react';

const roles = ['Software Engineer', 'Data Scientist', 'IA Specialist', 'UX/UI Designer', 'Cloud Architect', 'Digital Product Manager'] as const;
const experienceYears = ['1-2 años', '3-5 años', '5+ años'] as const;
const countries = ['Perú', 'Colombia', 'México', 'Brasil', 'Argentina', 'Chile'] as const;

const stemVerticles = [
  { id: 'IA', name: 'Inteligencia Artificial & Automatización', icon: '🤖' },
  { id: 'DA', name: 'Data Science & Visualización', icon: '📈' },
  { id: 'DV', name: 'Desarrollo Web & App', icon: '💻' },
  { id: 'PD', name: 'Productividad & Herramientas No-Code', icon: '🚀' },
] as const;

const specialties = {
  IA: ['Prompt Engineering', 'LLMs (GPT, Claude, Gemini)', 'IA de Imagen/Video', 'Integraciones API', 'Automatización con Make/Zapier'],
  DA: ['Power BI / Tableau', 'SQL Avanzado', 'Python para Datos', 'Storytelling con Datos', 'Machine Learning Basics'],
  DV: ['React / Next.js', 'Arquitectura de Software', 'Ciberseguridad Directiva', 'Cloud Computing', 'Metodologías Ágiles'],
  PD: ['Notion Avanzado', 'Sistemas de CRM', 'Flujos de Trabajo en Slack', 'Gestión de Proyectos Tech', 'Social Selling / LinkedIn'],
};

const mentoringStyles = [
  { id: 'project', title: 'Basado en Proyectos', desc: 'Ayudo a construir soluciones reales durante la sesión.' },
  { id: 'knowledge', title: 'Transferencia de Conocimiento', desc: 'Explico conceptos complejos de forma simple y accionable.' },
  { id: 'strategic', title: 'Consultoría Técnica', desc: 'Asesoro sobre herramientas y arquitecturas específicas.' },
];

const motivations = [
  'Cerrar la brecha generacional digital',
  'Aprender de la visión estratégica senior',
  'Generar ingresos extra con impacto social',
  'Desarrollar habilidades de liderazgo pedagógico',
  'Networking con altos directivos corporativos',
] as const;

const scheduleOptions = [
  { id: 'morning', label: 'Mañanas (Inicios de jornada)' },
  { id: 'midday', label: 'Almuerzos (12:00 - 14:00)' },
  { id: 'afternoon', label: 'Tardes (Cierre de día)' },
  { id: 'weekend', label: 'Sábados / Domingos' },
];

const MentoraOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<typeof roles[number] | ''>('');
  const [experience, setExperience] = useState<typeof experienceYears[number] | ''>('');
  const [linkedin, setLinkedin] = useState('');
  
  const [vertical, setVertical] = useState<typeof stemVerticles[number]['id'] | ''>('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([]);
  
  const [mentoringStyle, setMentoringStyle] = useState('');
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
    navigate('/mentora/dashboard');
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
      case 1: return age && city && country && role && experience && linkedin;
      case 2: return vertical && selectedSpecialties.length > 0;
      case 3: return mentoringStyle && selectedMotivations.length > 0;
      case 4: return selectedSchedules.length > 0;
      default: return false;
    }
  };

  const stepTitles = [
    'Talento',
    'Maestría',
    'Impacto',
    'Logística'
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
                     step === i + 1 ? "bg-accent text-accent-foreground scale-110 shadow-md" : 
                     "bg-secondary/40 text-muted-foreground"
                   )}>
                     {step > i + 1 ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold text-base">{i + 1}</span>}
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest hidden md:block transition-colors",
                     step === i + 1 ? "text-accent" : "text-muted-foreground/50"
                   )}>{title}</span>
                 </div>
               ))}
            </div>
            <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-accent transition-all duration-500 ease-out" 
                 style={{ width: `${(step / totalSteps) * 100}%` }}
               />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-card rounded-[2.5rem] border border-border p-8 md:p-14 shadow-lg relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 p-12 opacity-[0.01] pointer-events-none">
              <Users className="w-64 h-64" />
            </div>

            <div className="relative z-10">
              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Tu Talento <span className="text-accent">Digital.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Conecta con la elite de líderes senior que buscan tu dominio tecnológico.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Edad</Label>
                      <Input
                        type="number"
                        placeholder="Ej: 24"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-accent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                       <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Enlace a LinkedIn</Label>
                      <Input
                        placeholder="linkedin.com/in/tuperfil"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Ciudad de Base</Label>
                      <Input
                        placeholder="Ej: Cusco"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-accent transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">País</Label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-accent transition-all focus:outline-none"
                      >
                        <option value="">Selección de País</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Rol Profesional Principal</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                       {roles.map((r) => (
                         <button
                           key={r}
                           onClick={() => setRole(r)}
                           className={cn(
                             "h-12 px-4 rounded-xl border-2 font-bold text-[10px] uppercase tracking-widest transition-all",
                             role === r ? "bg-accent text-accent-foreground border-accent shadow-md" : "bg-background border-border hover:border-accent/40 text-muted-foreground"
                           )}
                         >
                           {r}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Curva de Experiencia</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {experienceYears.map((exp) => (
                        <button
                          key={exp}
                          onClick={() => setExperience(exp)}
                          className={cn(
                            "h-14 rounded-xl border-2 font-bold transition-all text-[10px] uppercase tracking-widest",
                            experience === exp ? "bg-accent/10 text-accent border-accent" : "bg-background border-border hover:border-accent/20"
                          )}
                        >
                          {exp}
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
                      Tu Maestría <span className="text-accent">STEM.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      ¿Qué verticales tecnológicas dominas para transferir valor estratégico?
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {stemVerticles.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setVertical(v.id); setSelectedSpecialties([]); }}
                        className={cn(
                          "p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-6",
                          vertical === v.id ? "bg-accent/5 border-accent shadow-sm" : "bg-background border-border hover:border-accent/20"
                        )}
                      >
                         <span className="text-4xl">{v.icon}</span>
                         <div>
                            <p className="font-bold text-base leading-tight">{v.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Provider de Valor</p>
                         </div>
                      </button>
                    ))}
                  </div>

                  {vertical && (
                    <div className="space-y-4 animate-fade-in">
                       <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Dominios Técnicos (Máx. 4)</Label>
                       <div className="flex flex-wrap gap-2">
                         {specialties[vertical as keyof typeof specialties].map((s) => (
                            <button
                              key={s}
                              onClick={() => toggleSelection(s, selectedSpecialties, setSelectedSpecialties, 4)}
                              className={cn(
                                "px-5 py-2.5 rounded-xl border-2 font-bold text-xs transition-all",
                                selectedSpecialties.includes(s) ? "bg-accent text-accent-foreground border-accent shadow-md" : "bg-background border-border hover:border-accent/40 text-muted-foreground"
                              )}
                            >
                              {s}
                            </button>
                         ))}
                       </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Metodología del <span className="text-accent">Coach.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      ¿Cómo planeas guiar a la sabiduría senior hacia la era digital?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Estrategia Pedagógica</Label>
                    <div className="grid gap-4">
                       {mentoringStyles.map((style) => (
                         <button
                           key={style.id}
                           onClick={() => setMentoringStyle(style.id)}
                           className={cn(
                             "p-8 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group",
                             mentoringStyle === style.id ? "bg-accent/5 border-accent shadow-sm" : "bg-background border-border hover:border-accent/20"
                           )}
                         >
                            <div>
                               <p className={cn("text-2xl font-bold transition-colors", mentoringStyle === style.id ? "text-accent" : "text-foreground")}>{style.title}</p>
                               <p className="text-sm text-muted-foreground font-medium mt-1 leading-relaxed">{style.desc}</p>
                            </div>
                            <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", mentoringStyle === style.id ? "border-accent bg-accent" : "border-border")}>
                               {mentoringStyle === style.id && <CheckCircle className="h-4 w-4 text-white" />}
                            </div>
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Drivers de Impacto</Label>
                    <div className="flex flex-wrap gap-2">
                       {motivations.map((m) => (
                         <button
                           key={m}
                           onClick={() => toggleSelection(m, selectedMotivations, setSelectedMotivations, 3)}
                           className={cn(
                             "px-5 py-2.5 rounded-xl border-2 font-bold text-[10px] uppercase tracking-widest transition-all",
                             selectedMotivations.includes(m) ? "border-accent text-accent bg-accent/5" : "border-border text-muted-foreground"
                           )}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Logística y <span className="text-accent">Agenda.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Establece tus bloques de disponibilidad para empezar a brillar.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                       <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Bloques Deseados</Label>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {scheduleOptions.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => toggleSelection(opt.id, selectedSchedules, setSelectedSchedules, 2)}
                              className={cn(
                                "h-16 px-6 rounded-xl border-2 flex items-center justify-between font-bold text-base transition-all",
                                selectedSchedules.includes(opt.id) ? "bg-accent text-white border-accent shadow-md" : "bg-background border-border hover:border-accent/20"
                              )}
                            >
                               {opt.label}
                               {selectedSchedules.includes(opt.id) && <CheckCircle className="h-5 w-5" />}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="p-10 bg-accent rounded-[2.5rem] text-accent-foreground relative overflow-hidden shadow-xl">
                       <div className="absolute top-0 right-0 p-8 opacity-10">
                          <CheckCircle className="h-32 w-32" />
                       </div>
                       <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                          <div className="h-20 w-20 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
                             <Sparkles className="h-10 w-10 text-white" />
                          </div>
                          <div>
                             <p className="text-2xl font-bold mb-2 tracking-tight">Postulación en Marcha</p>
                             <p className="text-base font-medium opacity-80 leading-relaxed">Tu perfil pasará por una validación de 24 horas para asegurar el estándar de excelencia de SilverHub.</p>
                          </div>
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
                className="h-12 px-10 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-accent text-accent-foreground shadow-md hover:bg-accent/90 transition-all w-full sm:w-auto active:scale-95"
              >
                {step === totalSteps ? 'Enviar Postulación' : 'Siguiente Paso'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoraOnboardingPage;
