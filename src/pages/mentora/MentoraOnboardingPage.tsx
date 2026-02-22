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
  User,
  Target,
  GraduationCap,
  Heart,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const roles = ['Profesional', 'Investigadora', 'Founder / Ejecutiva'] as const;
const experienceYears = ['3–5', '6–9', '10 a más'] as const;
const countries = ['Perú', 'Colombia', 'México', 'Brasil'] as const;

const stemAreas = [
  { id: 'S', name: 'Ciencia', icon: '🔬' },
  { id: 'T', name: 'Tecnología', icon: '💻' },
  { id: 'E', name: 'Ingeniería', icon: '⚙️' },
  { id: 'M', name: 'Matemáticas', icon: '🔢' },
] as const;

const subThemes = {
  S: ['Biología', 'Química', 'Ciencias ambientales', 'Neurociencia', 'Investigación científica', 'Ciencia aplicada'],
  T: ['Programación / desarrollo de software', 'Data Science / análisis de datos', 'Inteligencia artificial', 'Ciberseguridad', 'UX / producto digital', 'Tecnología para impacto social'],
  E: ['Mecatrónica', 'Automatización industrial', 'Ingeniería de sistemas', 'Electrónica', 'Robótica', 'Procesos industriales'],
  M: ['Estadística', 'Modelamiento matemático', 'Matemáticas aplicadas', 'Finanzas'],
};

const supportTypes = [
  'Plan de estudio y recursos',
  'Innovación/creación',
  'Investigación/tesis',
  'Portafolio/proyectos',
  'Entrevistas (técnicas/HR)',
  'Becas/internacional',
  'Networking/carrera',
  'Liderazgo/confianza',
] as const;

const industries = [
  'Tech/SaaS', 'Educación', 'Salud', 'Fintech', 'Energía', 'Manufactura', 'Investigación', 'Gobierno/ONG', 'Startups', 'Otro'
] as const;

const initialStages = ['Escolar', 'Preuniversitaria', 'Universitaria', 'Primeros años laborales'] as const;
const mentorLevels = ['Principiante', 'Intermedio', 'Avanzado'] as const;

const scheduleOptions = [
  { id: 'morning', label: 'Mañanas (6:00 – 12:00)' },
  { id: 'afternoon', label: 'Tardes (12:00 – 18:00)' },
  { id: 'night', label: 'Noches (18:00 – 22:00)' },
  { id: 'weekend', label: 'Fines de semana' },
];

const MentoraOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Info Básica
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<typeof roles[number] | ''>('');
  const [experience, setExperience] = useState<typeof experienceYears[number] | ''>('');
  const [linkedin, setLinkedin] = useState('');

  // Step 2: Experiencia STEM
  const [stemArea, setStemArea] = useState<typeof stemAreas[number]['id'] | ''>('');
  const [selectedSubThemes, setSelectedSubThemes] = useState<string[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Step 3: Nivel de Mentoría
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  // Step 4: Preferencias
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

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void, max?: number) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else if (!max || list.length < max) {
      setList([...list, item]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return age && city && country && role && experience && linkedin;
      case 2: return stemArea && selectedSubThemes.length > 0 && selectedSupport.length > 0 && selectedIndustries.length > 0;
      case 3: return selectedLevels.length > 0 && selectedStages.length > 0;
      case 4: return selectedSchedules.length > 0;
      default: return false;
    }
  };

  const stepTitles = [
    'Perfil Experto',
    'Especialización',
    'Enfoque Mentoría',
    'Logística'
  ];

  return (
    <div className="min-h-screen bg-background bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-4xl">
          
          {/* Executive Progress Header */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
               {stepTitles.map((title, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 group">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                     step > i + 1 ? "bg-success text-white scale-90" : 
                     step === i + 1 ? "bg-accent text-accent-foreground scale-110 shadow-accent/30 rotate-3" : 
                     "bg-secondary/50 text-muted-foreground"
                   )}>
                     {step > i + 1 ? <CheckCircle className="h-6 w-6" /> : <span className="font-black text-lg">{i + 1}</span>}
                   </div>
                   <span className={cn(
                     "text-[10px] font-black uppercase tracking-[0.2em] hidden md:block transition-colors",
                     step === i + 1 ? "text-accent" : "text-muted-foreground/50"
                   )}>{title}</span>
                 </div>
               ))}
            </div>
            <div className="h-1 w-full bg-secondary/30 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-accent transition-all duration-700 ease-out" 
                 style={{ width: `${(step / totalSteps) * 100}%` }}
               />
            </div>
          </div>

          {/* Main Card */}
          <div className="glass rounded-[3rem] border-white/20 p-10 md:p-16 shadow-2xl relative overflow-hidden animate-scale-in">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
              <Sparkles className="w-64 h-64" />
            </div>

            <div className="relative z-10 transition-all duration-500">
              {step === 1 && (
                <div className="space-y-10 animate-fade-in">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display italic tracking-tight">
                      Tu Legado es el Motor.
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                      Iniciemos formalizando tu registro como Coach Digital de élite.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="font-black uppercase tracking-widest text-xs opacity-60">Edad</Label>
                      <Input
                        type="number"
                        placeholder="Ej: 35"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-16 rounded-2xl bg-background/50 border-2 text-xl font-bold px-6 focus:border-accent transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="font-black uppercase tracking-widest text-xs opacity-60">Ciudad</Label>
                      <Input
                        placeholder="Ej: Bogotá"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-16 rounded-2xl bg-background/50 border-2 text-xl font-bold px-6 focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-black uppercase tracking-widest text-xs opacity-60">País de Residencia</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {countries.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCountry(c)}
                          className={cn(
                            "h-14 rounded-xl border-2 font-black transition-all flex items-center justify-center tracking-widest uppercase text-xs",
                            country === c ? "bg-accent text-accent-foreground border-accent shadow-lg scale-105" : "bg-background/30 border-border/50 hover:border-accent/50 text-muted-foreground"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="font-black uppercase tracking-widest text-xs opacity-60">Rol Profesional</Label>
                      <div className="grid gap-2">
                        {roles.map((r) => (
                          <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={cn(
                              "h-14 px-6 rounded-xl border-2 text-left font-bold transition-all",
                              role === r ? "bg-accent/5 border-accent text-accent" : "bg-background/30 border-border/50"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="font-black uppercase tracking-widest text-xs opacity-60">Años de Expertiz</Label>
                      <div className="grid gap-2">
                        {experienceYears.map((exp) => (
                          <button
                            key={exp}
                            onClick={() => setExperience(exp)}
                            className={cn(
                              "h-14 px-6 rounded-xl border-2 text-left font-bold transition-all",
                              experience === exp ? "bg-accent/5 border-accent text-accent" : "bg-background/30 border-border/50"
                            )}
                          >
                            {exp} años
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-black uppercase tracking-widest text-xs opacity-60">Perfil LinkedIn (Verificación)</Label>
                    <div className="relative group">
                      <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                      <Input
                        placeholder="https://linkedin.com/in/tuperfil"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="h-16 pl-16 rounded-2xl bg-background/50 border-2 font-bold focus:border-accent transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-fade-in">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display italic tracking-tight">
                      Dominio Tecnológico.
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                      Define tu eje de enseñanza para conectarte con los líderes senior que te necesitan.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-black uppercase tracking-widest text-xs opacity-60">Vertical de Maestría</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stemAreas.map((area) => (
                        <button
                          key={area.id}
                          onClick={() => { setStemArea(area.id); setSelectedSubThemes([]); }}
                          className={cn(
                            "p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all group",
                            stemArea === area.id ? "bg-accent text-accent-foreground border-accent shadow-xl scale-105" : "bg-background/30 border-border/50 hover:border-accent/20"
                          )}
                        >
                          <span className="text-4xl group-hover:scale-110 transition-transform">{area.icon}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-center">{area.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {stemArea && (
                    <div className="space-y-4 animate-slide-up">
                      <Label className="font-black uppercase tracking-widest text-xs opacity-60">Especialidades (Hasta 5)</Label>
                      <div className="flex flex-wrap gap-2">
                        {subThemes[stemArea as keyof typeof subThemes].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => toggleSelection(theme, selectedSubThemes, setSelectedSubThemes, 5)}
                            className={cn(
                              "px-6 py-3 rounded-full border-2 font-bold text-sm transition-all",
                              selectedSubThemes.includes(theme) ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-background/50 border-border/50 hover:border-primary/40"
                            )}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label className="font-black uppercase tracking-widest text-xs opacity-60">Capacidades de Mentoría (Hasta 5)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {supportTypes.map((support) => (
                        <button
                          key={support}
                          onClick={() => toggleSelection(support, selectedSupport, setSelectedSupport, 5)}
                          className={cn(
                            "p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between",
                            selectedSupport.includes(support) ? "bg-accent/5 border-accent text-accent" : "bg-background/30 border-border/50 hover:border-accent/30"
                          )}
                        >
                          {support}
                          {selectedSupport.includes(support) && <CheckCircle className="h-5 w-5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 animate-fade-in">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display italic tracking-tight">
                      Enfoque Estratégico.
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                      Define el alcance de tu impacto y el nivel de los líderes que guiarás.
                    </p>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-4">
                        <Label className="font-black uppercase tracking-widest text-xs opacity-60">Perfil de Mentees que Aceptas</Label>
                        <div className="grid gap-4">
                           {mentorLevels.map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() => toggleSelection(lvl, selectedLevels, setSelectedLevels)}
                                className={cn(
                                   "p-8 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group",
                                   selectedLevels.includes(lvl) ? "bg-accent/5 border-accent shadow-inner" : "bg-background/30 border-border/50 hover:border-accent/20"
                                )}
                              >
                                 <div>
                                    <p className={cn("text-2xl font-black font-display italic", selectedLevels.includes(lvl) ? "text-accent" : "text-foreground")}>{lvl}</p>
                                    <p className="text-muted-foreground font-medium mt-1">Líderes con conocimiento {lvl === 'Principiante' ? 'nulo pero alta visión de negocio' : lvl === 'Intermedio' ? 'base buscando fluidez' : 'avanzado buscando coaching de nicho'}.</p>
                                 </div>
                                 <div className={cn("h-8 w-8 rounded-full border-4 flex items-center justify-center transition-all", selectedLevels.includes(lvl) ? "border-accent bg-accent" : "border-border")}>
                                    {selectedLevels.includes(lvl) && <CheckCircle className="h-4 w-4 text-white" />}
                                 </div>
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10 animate-fade-in">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display italic tracking-tight">
                      Logística de Impacto.
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                      Configura tus horarios para garantizar una experiencia sin fricciones.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-secondary/20 p-8 rounded-3xl border border-border/50">
                       <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Idioma de Coaching</h4>
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-black">ES</div>
                          <span className="text-xl font-bold">Castellano (Predeterminado)</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="font-black uppercase tracking-widest text-xs opacity-60">Ventanas de Disponibilidad (Hasta 2)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scheduleOptions.map((opt) => (
                           <button
                             key={opt.id}
                             onClick={() => toggleSelection(opt.id, selectedSchedules, setSelectedSchedules, 2)}
                             className={cn(
                               "h-20 px-8 rounded-2xl border-2 flex items-center justify-between font-bold text-lg transition-all",
                               selectedSchedules.includes(opt.id) ? "bg-accent text-accent-foreground border-accent shadow-xl" : "bg-background/30 border-border/50 hover:border-accent/30"
                             )}
                           >
                              {opt.label}
                              {selectedSchedules.includes(opt.id) && <CheckCircle className="h-6 w-6" />}
                           </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-black dark:bg-accent rounded-[2rem] text-accent-foreground flex items-center gap-8 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Sparkles className="h-32 w-32" />
                       </div>
                       <div className="h-16 w-16 bg-accent-foreground/20 rounded-2xl flex items-center justify-center shrink-0 relative z-10">
                          <GraduationCap className="h-8 w-8" />
                       </div>
                       <div className="relative z-10">
                          <p className="text-lg font-black italic font-display">Compromiso Premium</p>
                          <p className="text-sm opacity-80 font-medium max-w-sm">Al finalizar, tu perfil será revisado por nuestro equipo de calidad para asegurar el estándar SilverHub.</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-16 pt-10 border-t border-border/50 flex flex-col sm:flex-row gap-4 items-center justify-between relative z-10">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs border-2 hover:bg-secondary/50 transition-all w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-14 px-12 rounded-2xl font-black uppercase tracking-widest text-xs bg-accent text-accent-foreground shadow-xl hover:shadow-accent/30 transition-all w-full sm:w-auto active:scale-95"
              >
                {step === totalSteps ? 'Finalizar Registro' : 'Siguiente Paso'}
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
