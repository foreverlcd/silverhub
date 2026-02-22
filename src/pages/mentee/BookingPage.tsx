import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mentoras } from '@/data/mockData';
import { ArrowLeft, Calendar, Clock, CreditCard, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const mentor = mentoras.find((m) => m.id === id) || mentoras[0];
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dates = ['24 Enero', '25 Enero', '26 Enero', '27 Enero'];
  const times = ['08:00', '10:00', '13:00', '16:00', '18:00'];

  const sanitizeNumber = (value: string) => value.replace(/\D/g, '');

  const detectCardType = (number: string) => {
    const digits = sanitizeNumber(number);
    if (/^4/.test(digits)) return 'visa';
    if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    return 'unknown';
  };

  const luhnCheck = (number: string) => {
    const digits = sanitizeNumber(number);
    if (digits.length < 12) return false;
    let sum = 0;
    let doubleIt = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      if (doubleIt) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      doubleIt = !doubleIt;
    }
    return sum % 10 === 0;
  };

  const formatCardNumber = (value: string, type: string) => {
    const digits = sanitizeNumber(value);
    if (type === 'amex') {
      return digits
        .replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, g1, g2, g3) => [g1, g2, g3].filter(Boolean).join(' '))
        .trim();
    }
    return digits
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const cardType = detectCardType(cardNumber);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const plainNumber = sanitizeNumber(cardNumber);

    if (!cardName.trim()) {
      newErrors.cardName = 'El nombre es obligatorio.';
    }

    if (!plainNumber) {
      newErrors.cardNumber = 'Ingresa el número de tarjeta.';
    } else {
      const expectedLength = cardType === 'amex' ? 15 : 16;
      if (plainNumber.length !== expectedLength) {
        newErrors.cardNumber = `La tarjeta debe tener ${expectedLength} dígitos.`;
      } else if (!luhnCheck(plainNumber)) {
        newErrors.cardNumber = 'Número de tarjeta inválido.';
      }
    }

    if (!expiry) {
      newErrors.expiry = 'Ingresa la fecha de expiración.';
    } else {
      const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
      if (!match) {
        newErrors.expiry = 'Usa el formato MM/YY.';
      } else {
        const month = parseInt(match[1], 10);
        const year = parseInt(`20${match[2]}`, 10);
        const now = new Date();
        const expDate = new Date(year, month - 1, 1);
        expDate.setMonth(expDate.getMonth() + 1);
        if (expDate <= now) {
          newErrors.expiry = 'La tarjeta está expirada.';
        }
      }
    }

    const expectedCvv = cardType === 'amex' ? 4 : 3;
    if (!cvv) {
      newErrors.cvv = 'Ingresa el CVV.';
    } else if (!/^\d+$/.test(cvv)) {
      newErrors.cvv = 'Solo dígitos en el CVV.';
    } else if (cvv.length !== expectedCvv) {
      newErrors.cvv = `El CVV debe tener ${expectedCvv} dígitos.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    const ok = validateFields();
    if (!ok) return;
    setIsProcessing(true);

    setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && selectedDate && selectedTime) {
          const key = 'smd_sessions';
          const raw = window.localStorage.getItem(key);
          const existing = raw ? JSON.parse(raw) : [];
          let id: string;
          if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
            id = (crypto as { randomUUID?: () => string }).randomUUID?.() ?? `${Date.now()}`;
          } else {
            id = `${Date.now()}`;
          }

          const newSession = {
            id,
            mentorId: mentor.id,
            mentorName: mentor.name,
            mentorImage: mentor.imageUrl,
            mentorTitle: mentor.title,
            menteeId: user?.id || 'mentee',
            menteeName: user?.name || 'Líder Senior',
            date: selectedDate,
            time: selectedTime,
            status: 'upcoming' as const,
          };

          const updated = Array.isArray(existing) ? [...existing, newSession] : [newSession];
          window.localStorage.setItem(key, JSON.stringify(updated));
        }
      } catch (error) {
        console.error('No se pudo guardar la sesión en localStorage', error);
      }

      setIsProcessing(false);
      setStep(3);
    }, 2200);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-12 animate-pulse">
          <div className="relative h-40 w-40 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 border-[6px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-6 border-[6px] border-accent/10 border-b-accent rounded-full animate-spin-slow"></div>
            <CreditCard className="h-16 w-16 text-primary relative z-10" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-foreground font-display italic tracking-tight">Cifrando Operación.</h2>
            <p className="text-primary font-black uppercase tracking-[0.4em] text-xs">Security Protocol v4.0 Active</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16 px-4">
          <div className="glass rounded-[4rem] p-16 max-w-2xl w-full text-center animate-scale-in shadow-[0_50px_100px_-20px_rgba(var(--primary-rgb),0.2)] relative overflow-hidden border-white/20">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
               <CheckCircle className="h-80 w-80" />
            </div>
            <div className="h-32 w-32 rounded-[3rem] bg-success/10 flex items-center justify-center mx-auto mb-10 border-2 border-success/20 shadow-inner">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
            <h1 className="text-5xl font-black text-foreground font-display italic mb-6 tracking-tight">Sesión Confirmada.</h1>
            <p className="text-2xl text-muted-foreground font-medium mb-16 leading-relaxed">
              Tu encuentro estratégico con <span className="text-foreground font-black italic">{mentor.name}</span> ha sido blindado para el <span className="text-primary font-black">{selectedDate}</span> a las <span className="text-primary font-black">{selectedTime}</span>.
            </p>
            <div className="grid gap-6">
              <Button 
                className="h-20 rounded-[2rem] bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all" 
                onClick={() => navigate('/mentee/dashboard')}
              >
                Acceder a mi Panel Central
              </Button>
              <Button 
                variant="ghost" 
                className="h-16 rounded-[2rem] font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:bg-secondary/50" 
                onClick={() => navigate('/matching')}
              >
                Explorar otros expertos digitales
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-700 selection:bg-primary/20 flex flex-col">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => step === 1 ? navigate(-1) : setStep(1)} 
            className="mb-12 font-black uppercase tracking-widest text-[10px] hover:bg-secondary/50 rounded-2xl h-14 px-8"
          >
            <ArrowLeft className="h-5 w-5 mr-3" /> {step === 1 ? 'Volver al Perfil' : 'Ajustar Horario'}
          </Button>
          
          <div className="grid lg:grid-cols-12 gap-12">
             {/* Info Sidebar - Luxury Preview */}
             <div className="lg:col-span-4 space-y-8 lg:order-2">
                <div className="glass rounded-[3rem] p-10 border-white/20 shadow-2xl overflow-hidden relative group">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                      <CreditCard className="w-48 h-48" />
                   </div>
                   <div className="relative z-10 space-y-10">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <img src={mentor.imageUrl} alt={mentor.name} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl border-4 border-background group-hover:rotate-3 transition-all" />
                          <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-success border-4 border-background rounded-2xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="h-5 w-5 text-success-foreground" />
                          </div>
                        </div>
                        <h2 className="font-black text-2xl italic font-display tracking-tight leading-none mb-2">{mentor.name}</h2>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-80">{mentor.title}</p>
                      </div>

                      <div className="space-y-6 pt-10 border-t border-border/10">
                         <div className="flex justify-between items-center">
                            <span className="font-black text-muted-foreground uppercase tracking-widest text-[10px]">Inversión</span>
                            <div className="flex items-baseline gap-1">
                               <span className="text-xs font-black text-muted-foreground">S/</span>
                               <span className="text-3xl font-black tracking-tighter">149</span>
                            </div>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="font-black text-muted-foreground uppercase tracking-widest text-[10px]">Duración</span>
                            <span className="font-black text-lg">60 <span className="text-xs text-muted-foreground">min</span></span>
                         </div>
                         {selectedDate && (
                           <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 animate-fade-in text-center">
                              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Bloque Reservado</p>
                              <p className="text-xl font-black text-foreground uppercase tracking-tighter">{selectedDate} <span className="text-primary mx-1">@</span> {selectedTime}</p>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                <div className="p-10 rounded-[3rem] bg-secondary/10 border border-border/10 relative overflow-hidden group">
                    <div className="absolute -bottom-5 -right-5 opacity-5 group-hover:scale-120 transition-transform">
                       <Sparkles className="h-32 w-32" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground/70 leading-relaxed relative z-10 italic">
                       "En SilverHub, cada sesión es protegida bajo protocolos de confidencialidad de alto nivel. Incluimos seguimiento estratégico por 24 horas."
                    </p>
                </div>
             </div>

             {/* Main Form Area - Premium Stepper */}
             <div className="lg:col-span-8 animate-slide-up">
                <div className="glass rounded-[4rem] p-10 md:p-16 border-white/20 shadow-2xl relative overflow-hidden">
                   {step === 1 && (
                     <div className="animate-fade-in space-y-16">
                        <div>
                          <h1 className="text-4xl md:text-6xl font-black text-foreground font-display italic tracking-tight mb-4 leading-[0.95]">Reserva tu <span className="text-primary">Evolución.</span></h1>
                          <p className="text-xl text-muted-foreground font-medium italic">Selecciona el bloque estratégico que transformará tu visión digital.</p>
                        </div>

                        <div className="space-y-8">
                          <Label className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4">
                             <Calendar className="h-5 w-5" /> Ventanas Disponibles
                          </Label>
                          <div className="grid grid-cols-2 gap-6">
                            {dates.map((date) => (
                              <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={cn(
                                  "h-24 rounded-3xl border-2 font-black transition-all flex items-center justify-center text-xl shadow-md",
                                  selectedDate === date ? "bg-primary text-primary-foreground border-primary shadow-2xl scale-105" : "bg-background/20 border-border/20 hover:border-primary/40 text-muted-foreground/60"
                                )}
                              >
                                {date}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-8">
                           <Label className="text-xs font-black uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                             <Clock className="h-5 w-5" /> Distribución Horaria
                           </Label>
                           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                              {times.map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setSelectedTime(t)}
                                  className={cn(
                                    "h-20 rounded-2xl border-2 font-black transition-all text-sm uppercase tracking-tighter px-2",
                                    selectedTime === t ? "bg-accent text-accent-foreground border-accent shadow-xl" : "bg-background/10 border-border/10 hover:border-accent/40 text-muted-foreground/40"
                                  )}
                                >
                                   {t}
                                </button>
                              ))}
                           </div>
                        </div>

                        <Button 
                          className="w-full h-24 rounded-[2.5rem] bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_-10px_rgba(var(--primary-rgb),0.3)] active:scale-95 transition-all disabled:opacity-20 mt-16" 
                          disabled={!selectedDate || !selectedTime} 
                          onClick={() => setStep(2)}
                        >
                          Continuar al Pago Seguro
                          <ArrowRight className="h-5 w-5 ml-4" />
                        </Button>
                     </div>
                   )}

                   {step === 2 && (
                     <div className="animate-fade-in space-y-16">
                        <div>
                           <h1 className="text-4xl md:text-6xl font-black text-foreground font-display italic tracking-tight mb-4 leading-[0.95]">Blindaje de <span className="text-accent">Pago.</span></h1>
                           <p className="text-xl text-muted-foreground font-medium italic">Inversión corporativa bajo los más altos estándares de seguridad.</p>
                        </div>

                        <div className="space-y-10">
                           <div className="grid gap-8">
                              <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Titular de Cuenta</Label>
                                <Input 
                                  placeholder="NOMBRE COMO APARECE EN TARJETA" 
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                  className="h-20 rounded-2xl bg-background/5 border-2 font-black px-8 uppercase tracking-[0.2em] focus:border-accent text-lg shadow-inner"
                                />
                                {errors.cardName && <p className="text-xs text-destructive font-black uppercase italic tracking-wider">{errors.cardName}</p>}
                              </div>

                              <div className="space-y-4">
                                 <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Credenciales de Acceso</Label>
                                 <div className="relative group">
                                    <CreditCard className="absolute left-8 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground group-focus-within:text-accent transition-colors" />
                                    <Input 
                                      placeholder="0000 0000 0000 0000" 
                                      value={formatCardNumber(cardNumber, cardType)}
                                      onChange={(e) => setCardNumber(sanitizeNumber(e.target.value))}
                                      className="h-24 pl-24 rounded-3xl bg-background/5 border-2 font-black text-3xl tracking-widest focus:border-accent shadow-inner"
                                    />
                                    {cardType !== 'unknown' && (
                                       <span className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-4 py-2 rounded-xl border border-accent/20">{cardType}</span>
                                    )}
                                 </div>
                                 {errors.cardNumber && <p className="text-xs text-destructive font-black uppercase italic tracking-wider">{errors.cardNumber}</p>}
                              </div>

                              <div className="grid grid-cols-2 gap-8">
                                 <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Vencimiento</Label>
                                    <Input 
                                      placeholder="MM/YY" 
                                      value={expiry}
                                      onChange={(e) => {
                                        const val = sanitizeNumber(e.target.value).slice(0, 4);
                                        setExpiry(val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val);
                                      }}
                                      className="h-20 rounded-2xl bg-background/5 border-2 font-black px-8 focus:border-accent text-center text-xl tracking-widest shadow-inner"
                                    />
                                    {errors.expiry && <p className="text-xs text-destructive font-black uppercase italic tracking-wider">{errors.expiry}</p>}
                                 </div>
                                 <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">CVV</Label>
                                    <Input 
                                      type="password"
                                      placeholder="***" 
                                      className="h-20 rounded-2xl bg-background/5 border-2 font-black px-8 focus:border-accent text-center text-xl tracking-widest shadow-inner"
                                      value={cvv}
                                      onChange={(e) => setCvv(sanitizeNumber(e.target.value).slice(0, cardType === 'amex' ? 4 : 3))}
                                    />
                                    {errors.cvv && <p className="text-xs text-destructive font-black uppercase italic tracking-wider">{errors.cvv}</p>}
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="pt-12 border-t border-border/10 text-center">
                           <Button 
                             className="w-full h-24 rounded-[2.5rem] bg-accent text-accent-foreground font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_-10px_rgba(var(--accent-rgb),0.3)] active:scale-95 transition-all mb-6" 
                             onClick={handlePayment}
                             disabled={isProcessing}
                           >
                             Autorizar Inversión S/ 149.00
                           </Button>
                           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] opacity-40 flex items-center justify-center gap-4">
                              <div className="h-1 w-8 bg-muted-foreground/30 rounded-full" />
                              Transacción Cifrada 256-bit AES
                              <div className="h-1 w-8 bg-muted-foreground/30 rounded-full" />
                           </p>
                        </div>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
