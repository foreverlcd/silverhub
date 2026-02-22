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
  GraduationCap,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';

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

  // Step 3: Nivel de Mentoría
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

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
      case 2: return stemArea && selectedSubThemes.length > 0 && selectedSupport.length > 0;
      case 3: return selectedLevels.length > 0;
      case 4: return selectedSchedules.length > 0;
      default: return false;
    }
  };

  const stepTitles = [
    'Perfil',
    'Especialización',
    'Impacto',
    'Disponibilidad'
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
                      Tu Perfil como Coach Digital.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Iniciemos personalizando tu registro para conectar con líderes senior.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Edad</Label>
                      <Input
                        type="number"
                        placeholder="Ej: 28"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-14 rounded-xl bg-background border-2 text-lg font-bold px-6 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Ciudad</Label>
                      <Input
                        placeholder="Ej: Bogotá"
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

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Rol Profesional</Label>
                      <div className="grid gap-2">
                        {roles.map((r) => (
                          <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={cn(
                              "h-12 px-6 rounded-xl border-2 text-left font-bold text-sm transition-all",
                              role === r ? "bg-primary/5 border-primary text-primary" : "bg-background border-border"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Años de Especialidad</Label>
                      <div className="grid gap-2">
                        {experienceYears.map((exp) => (
                          <button
                            key={exp}
                            onClick={() => setExperience(exp)}
                            className={cn(
                              "h-12 px-6 rounded-xl border-2 text-left font-bold text-sm transition-all",
                              experience === exp ? "bg-primary/5 border-primary text-primary" : "bg-background border-border"
                            )}
                          >
                            {exp} años
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Enlace a LinkedIn</Label>
                    <div className="relative group">
                      <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        placeholder="https://linkedin.com/in/tuperfil"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="h-14 pl-16 rounded-xl bg-background border-2 font-bold focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                      Tu Dominio Digital.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Define tu área de enseñanza para conectarte con los líderes senior.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Vertical Principal</Label>
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
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Especialidades (Hasta 5)</Label>
                      <div className="flex flex-wrap gap-2">
                        {subThemes[stemArea as keyof typeof subThemes].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => toggleSelection(theme, selectedSubThemes, setSelectedSubThemes, 5)}
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
                    <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Capacidades de Mentoría (Hasta 5)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       {supportTypes.map((support) => (
                        <button
                          key={support}
                          onClick={() => toggleSelection(support, selectedSupport, setSelectedSupport, 5)}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between",
                            selectedSupport.includes(support) ? "bg-primary/5 border-primary text-primary" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                          {support}
                          {selectedSupport.includes(support) && <CheckCircle className="h-4 w-4" />}
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
                      Enfoque de Impacto.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Define a qué nivel de líderes deseas guiar en su transformación digital.
                    </p>
                  </div>

                  <div className="grid gap-4">
                     {['Principiante', 'Intermedio', 'Avanzado'].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => toggleSelection(lvl, selectedLevels, setSelectedLevels)}
                          className={cn(
                             "p-8 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group",
                             selectedLevels.includes(lvl) ? "bg-primary/5 border-primary shadow-sm" : "bg-background border-border hover:border-primary/20"
                          )}
                        >
                           <div>
                              <p className={cn("text-2xl font-bold transition-colors", selectedLevels.includes(lvl) ? "text-primary" : "text-foreground")}>{lvl}</p>
                              <p className="text-sm text-muted-foreground font-medium mt-1">Líderes con conocimiento {lvl === 'Principiante' ? 'nulo pero alta visión directiva' : lvl === 'Intermedio' ? 'base buscando mayor fluidez' : 'avanzado buscando coaching especializado'}.</p>
                           </div>
                           <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", selectedLevels.includes(lvl) ? "border-primary bg-primary" : "border-border")}>
                              {selectedLevels.includes(lvl) && <CheckCircle className="h-4 w-4 text-white" />}
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
                      Disponibilidad.
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Define tus horarios para las sesiones de mentoría digital.
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
                      <Label className="font-bold uppercase tracking-widest text-[10px] opacity-60 ml-1">Ventanas Horarias (Hasta 2)</Label>
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

                    <div className="p-8 bg-primary rounded-2xl text-primary-foreground flex items-center gap-6 shadow-lg relative overflow-hidden">
                       <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                          <GraduationCap className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="text-lg font-bold">Compromiso de Calidad</p>
                          <p className="text-sm opacity-80 font-medium">Tu perfil será revisado para asegurar el estándar de excelencia de SilverHub.</p>
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

export default MentoraOnboardingPage;
