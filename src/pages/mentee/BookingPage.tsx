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
          let id = `${Date.now()}`;

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
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative h-24 w-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
            <CreditCard className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Procesando Pago...</h2>
            <p className="text-muted-foreground text-sm font-medium">Espera un momento, estamos confirmando tu sesión.</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16 px-4">
          <div className="bg-card rounded-[2.5rem] p-12 max-w-xl w-full text-center animate-fade-in shadow-xl border border-border">
            <div className="h-20 w-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-8 border border-success/20">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Sesión Confirmada.</h1>
            <p className="text-lg text-muted-foreground font-medium mb-12 leading-relaxed">
              Tu encuentro estratégico con <span className="text-foreground font-bold">{mentor.name}</span> ha sido reservado para el <span className="text-primary font-bold">{selectedDate}</span> a las <span className="text-primary font-bold">{selectedTime}</span>.
            </p>
            <div className="grid gap-4">
              <Button 
                className="h-14 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-md hover:bg-primary/90 transition-all" 
                onClick={() => navigate('/mentee/dashboard')}
              >
                Ir a mi Panel
              </Button>
              <Button 
                variant="ghost" 
                className="h-14 rounded-xl font-bold uppercase tracking-widest text-[10px] text-muted-foreground hover:bg-secondary/10" 
                onClick={() => navigate('/matching')}
              >
                Explorar otros expertos
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => step === 1 ? navigate(-1) : setStep(1)} 
            className="mb-10 font-bold uppercase tracking-widest text-[10px] hover:bg-secondary/10 rounded-xl h-12 px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> {step === 1 ? 'Volver al Perfil' : 'Ajustar Horario'}
          </Button>
          
          <div className="grid lg:grid-cols-12 gap-10">
             {/* Info Sidebar */}
             <div className="lg:col-span-4 space-y-6 lg:order-2">
                <div className="bg-card rounded-[2.5rem] p-8 border border-border shadow-md relative overflow-hidden group">
                   <div className="relative z-10 space-y-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <img src={mentor.imageUrl} alt={mentor.name} className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-background" />
                          <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-success border-2 border-background rounded-xl flex items-center justify-center shadow-md">
                            <CheckCircle className="h-4 w-4 text-success-foreground" />
                          </div>
                        </div>
                        <h2 className="font-bold text-xl tracking-tight leading-tight mb-1">{mentor.name}</h2>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-80">{mentor.title}</p>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-border">
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Inversión</span>
                            <div className="flex items-baseline gap-1">
                               <span className="text-xs font-bold text-muted-foreground">S/</span>
                               <span className="text-2xl font-bold tracking-tight">59</span>
                            </div>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Duración</span>
                            <span className="font-bold text-lg text-primary">60 <span className="text-xs text-muted-foreground">min</span></span>
                         </div>
                         {selectedDate && (
                           <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in text-center">
                              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Bloque Reservado</p>
                              <p className="text-lg font-bold text-foreground">{selectedDate} @ {selectedTime}</p>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-secondary/5 border border-border">
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                       Paga de forma segura con tarjeta de crédito o débito. La sesión se realizará a través de nuestra plataforma propia.
                    </p>
                </div>
             </div>

             {/* Main Area */}
             <div className="lg:col-span-8 animate-fade-in">
                <div className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-border shadow-md relative overflow-hidden">
                   {step === 1 && (
                     <div className="space-y-12">
                        <div className="text-center md:text-left">
                          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2 leading-tight">Reserva tu <span className="text-primary">Sesión.</span></h1>
                          <p className="text-lg text-muted-foreground font-medium">Selecciona el horario que mejor se adapte a tu agenda.</p>
                        </div>

                        <div className="space-y-6">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                             <Calendar className="h-4 w-4" /> Fechas Disponibles
                          </Label>
                          <div className="grid grid-cols-2 gap-4">
                            {dates.map((date) => (
                              <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={cn(
                                  "h-16 rounded-xl border-2 font-bold transition-all flex items-center justify-center text-lg",
                                  selectedDate === date ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-background border-border hover:border-primary/40 text-muted-foreground"
                                )}
                              >
                                {date}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                           <Label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                             <Clock className="h-4 w-4" /> Horarios
                           </Label>
                           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                              {times.map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setSelectedTime(t)}
                                  className={cn(
                                    "h-14 rounded-lg border-2 font-bold transition-all text-xs tracking-widest",
                                    selectedTime === t ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background border-border hover:border-primary/40 text-muted-foreground"
                                  )}
                                >
                                   {t}
                                </button>
                              ))}
                           </div>
                        </div>

                        <Button 
                          className="w-full h-16 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-md transition-all disabled:opacity-20 mt-8" 
                          disabled={!selectedDate || !selectedTime} 
                          onClick={() => setStep(2)}
                        >
                          Continuar al Pago
                          <ArrowRight className="h-4 w-4 ml-3" />
                        </Button>
                     </div>
                   )}

                   {step === 2 && (
                     <div className="space-y-12">
                        <div className="text-center md:text-left">
                           <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2 leading-tight">Detalles de <span className="text-primary">Pago.</span></h1>
                           <p className="text-lg text-muted-foreground font-medium">Pago seguro y encriptado.</p>
                        </div>

                        <div className="space-y-8">
                           <div className="grid gap-6">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nombre en la Tarjeta</Label>
                                <Input 
                                  placeholder="NOMBRE COMPLETO" 
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                  className="h-14 rounded-xl border-2 font-bold px-6 uppercase tracking-wider focus:border-primary text-base shadow-sm"
                                />
                                {errors.cardName && <p className="text-[10px] text-destructive font-bold uppercase tracking-wider">{errors.cardName}</p>}
                              </div>

                              <div className="space-y-2">
                                 <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Número de Tarjeta</Label>
                                 <div className="relative">
                                    <Input 
                                      placeholder="0000 0000 0000 0000" 
                                      value={formatCardNumber(cardNumber, cardType)}
                                      onChange={(e) => setCardNumber(sanitizeNumber(e.target.value))}
                                      className="h-14 rounded-xl border-2 font-bold text-lg tracking-widest focus:border-primary shadow-sm"
                                    />
                                    {cardType !== 'unknown' && (
                                       <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-[10px] uppercase tracking-widest text-primary">{cardType}</span>
                                    )}
                                 </div>
                                 {errors.cardNumber && <p className="text-[10px] text-destructive font-bold uppercase tracking-wider">{errors.cardNumber}</p>}
                               </div>

                              <div className="grid grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Vencimiento</Label>
                                    <Input 
                                      placeholder="MM/YY" 
                                      value={expiry}
                                      onChange={(e) => {
                                        const val = sanitizeNumber(e.target.value).slice(0, 4);
                                        setExpiry(val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val);
                                      }}
                                      className="h-14 rounded-xl border-2 font-bold text-center text-lg tracking-widest focus:border-primary shadow-sm"
                                    />
                                    {errors.expiry && <p className="text-[10px] text-destructive font-bold uppercase tracking-wider">{errors.expiry}</p>}
                                 </div>
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CVV</Label>
                                    <Input 
                                      type="password"
                                      placeholder="***" 
                                      className="h-14 rounded-xl border-2 font-bold text-center text-lg tracking-widest focus:border-primary shadow-sm"
                                      value={cvv}
                                      onChange={(e) => setCvv(sanitizeNumber(e.target.value).slice(0, cardType === 'amex' ? 4 : 3))}
                                    />
                                    {errors.cvv && <p className="text-[10px] text-destructive font-bold uppercase tracking-wider">{errors.cvv}</p>}
                                 </div>
                              </div>
                           </div>
                        </div>

                        <Button 
                          className="w-full h-16 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-primary/90 transition-all mt-6" 
                          onClick={handlePayment}
                          disabled={isProcessing}
                        >
                          Confirmar Pago S/ 149.00
                        </Button>
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
