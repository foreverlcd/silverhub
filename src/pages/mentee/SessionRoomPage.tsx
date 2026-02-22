import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Calendar, 
  Clock, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageCircle, 
  Loader2, 
  Send, 
  X, 
  AlertCircle, 
  Sparkles, 
  CheckCircle, 
  Brain, 
  MessageSquare, 
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type StoredSession = {
  id: string;
  mentorName: string;
  mentorImage: string;
  mentorTitle: string;
  menteeId?: string;
  menteeName?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

const SessionRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAiPilotOpen, setIsAiPilotOpen] = useState(true);
  const [isTranslationOn, setIsTranslationOn] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; text: string; sender: 'me' | 'mentor'; time: string }>>([]);
  const [aiNotes, setAiNotes] = useState<string[]>([
    "Analizando contexto estratégico...",
    "Definiendo KPIs de transformación digital.",
    "Insight: La resistencia al cambio es el principal bloqueador."
  ]);
  const [chatInput, setChatInput] = useState('');
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  let session: StoredSession | null = null;

  if (typeof window !== 'undefined' && id) {
    try {
      const raw = window.localStorage.getItem('smd_sessions');
      if (raw) {
        const parsed = JSON.parse(raw) as StoredSession[];
        session = Array.isArray(parsed) ? parsed.find((s) => s.id === id) || null : null;
      }
    } catch (error) {
      console.error('No se pudo leer la sesión desde localStorage', error);
    }
  }

  useEffect(() => {
    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
        videoStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    const stream = videoStreamRef.current;
    if (!el || !stream || !isVideoOn) return;

    try {
      if (el.srcObject !== stream) {
        el.srcObject = stream;
      }
      void el.play().catch(() => {});
    } catch (error) {
      console.error('No se pudo conectar el stream al video', error);
    }
  }, [isVideoOn, showPermissionModal]);

  const handleRequestPermissions = async () => {
    setIsRequestingPermissions(true);
    setVideoError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      videoStreamRef.current = stream;
      setIsMicOn(true);
      setIsVideoOn(true);
      setShowPermissionModal(false);

      stream.getAudioTracks().forEach((t) => (t.enabled = true));
      stream.getVideoTracks().forEach((t) => (t.enabled = true));
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setVideoError('Acceso denegado. Por favor, habilita los permisos del navegador.');
    } finally {
      setIsRequestingPermissions(false);
    }
  };

  const handleEndSession = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
    
    try {
      if (typeof window !== 'undefined' && id) {
        const raw = window.localStorage.getItem('smd_sessions');
        if (raw) {
          const parsed = JSON.parse(raw) as StoredSession[];
          if (Array.isArray(parsed)) {
            const updated = parsed.map((s) =>
              s.id === id ? { ...s, status: 'completed' as const } : s
            );
            window.localStorage.setItem('smd_sessions', JSON.stringify(updated));
          }
        }
      }
    } catch (error) {
      console.error('No se pudo actualizar el estado de la sesión', error);
    }
    navigate('/mentee/dashboard');
  };

  const displaySession = session || {
    mentorName: 'Coach Digital',
    mentorImage: '',
    mentorTitle: 'Estratega Senior',
    date: 'Hoy',
    time: 'Ahora',
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 pt-32">
          <div className="glass rounded-[3rem] p-12 max-w-xl w-full text-center border-white/20 shadow-2xl">
            <div className="h-20 w-20 rounded-[2rem] bg-destructive/10 flex items-center justify-center mx-auto mb-8">
               <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-3xl font-black text-foreground font-display italic mb-4">Sala No Operativa</h1>
            <p className="text-muted-foreground font-medium mb-12">Esta sesión ha concluido o no tiene credenciales de acceso activas.</p>
            <Button onClick={() => navigate('/mentee/dashboard')} className="h-14 px-8 rounded-xl font-black uppercase tracking-widest text-xs">Volver al Dashboard</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <Navbar />
      
      {/* Premium Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="glass rounded-[4rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(var(--primary-rgb),0.3)] max-w-lg w-full p-12 space-y-10 animate-scale-in">
            <div className="text-center space-y-6">
              <div className="mx-auto h-24 w-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center shadow-inner group">
                <Video className="h-10 w-10 text-primary group-hover:rotate-6 transition-transform" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-foreground font-display italic tracking-tight mb-3">
                  CheckPoint Biométrico
                </h2>
                <p className="text-muted-foreground font-medium italic">
                  Prepare su entorno para una sesión de alto impacto estratégico. Requiere audio/video.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
               <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <Mic className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest">Protocolos de Voz</p>
                    <p className="text-[10px] text-muted-foreground/60">Cifrado de audio 256-bit AES activo.</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <Video className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest">Transmisión 4K Premium</p>
                    <p className="text-[10px] text-muted-foreground/60">Optimización de ancho de banda adaptativa.</p>
                  </div>
               </div>
            </div>

            {videoError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-4 text-destructive">
                <AlertCircle className="h-6 w-6 shrink-0" />
                <p className="text-xs font-black uppercase tracking-wider">{videoError}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="ghost"
                className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                onClick={() => setShowPermissionModal(false)}
              >
                Modo Oyente
              </Button>
              <Button
                className="flex-1 h-16 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-primary/30"
                onClick={handleRequestPermissions}
                disabled={isRequestingPermissions}
              >
                {isRequestingPermissions ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Activar Credenciales'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden pt-28 px-6 pb-6 lg:px-12">
        <div className="h-full flex flex-col gap-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-8 flex-shrink-0 animate-fade-in">
            <div className="flex items-center gap-8">
               <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
               </div>
               <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="h-2 w-2 rounded-full bg-success animate-ping" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-success">Transmisión Segura Activa</p>
                  </div>
                  <h1 className="text-3xl font-black font-display italic tracking-tight italic">
                    Maestría Digital con <span className="text-primary">{displaySession.mentorName}</span>
                  </h1>
               </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
               <div className="text-right">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Tiempo de Sesión</p>
                  <div className="flex items-center gap-3 justify-end text-xl font-black font-display">
                     <Clock className="h-5 w-5 text-primary" /> 00:42:15
                  </div>
               </div>
               <div className="h-14 w-[1px] bg-border/20" />
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-black">AI</div>
                  ))}
               </div>
            </div>
          </div>

          <div className="flex-1 grid lg:grid-cols-12 gap-8 min-h-0 overflow-hidden">
            {/* Massive Video Stage */}
            <div className="lg:col-span-8 flex flex-col gap-6 h-full min-h-0">
               <div className="flex-1 glass rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden bg-black/40 group">
                  {isVideoOn && videoStreamRef.current ? (
                    <div className="absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-[1.02]">
                       <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale-[0.2]" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zaffre/50 to-primary/20">
                       <div className="text-center space-y-8 animate-pulse">
                          <div className="h-40 w-40 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto shadow-2xl">
                             <VideoOff className="h-20 w-20 text-primary/40" />
                          </div>
                          <p className="text-sm font-black uppercase tracking-[0.4em] text-primary/60">Modo de Ahorro de Energía Activo</p>
                       </div>
                    </div>
                  )}

                  {/* UI Overlays on Video */}
                  <div className="absolute top-8 right-8 z-30 flex gap-4">
                     <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-success" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Directo 4K</span>
                     </div>
                     {isTranslationOn && (
                       <div className="px-4 py-2 bg-accent/60 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-3 animate-fade-in">
                          <Loader2 className="h-3 w-3 animate-spin text-white" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">Traducción Pro ON</span>
                       </div>
                     )}
                  </div>

                  {/* Mentor Overlay */}
                  <div className="absolute bottom-10 left-10 right-10 z-30 flex items-end justify-between">
                     <div className="flex items-center gap-6 p-6 glass rounded-3xl border-white/30 backdrop-blur-2xl shadow-2xl animate-slide-up">
                        <div className="relative">
                           <img src={displaySession.mentorImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'} className="h-20 w-20 rounded-2xl object-cover border-2 border-white/50" />
                           <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-success rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
                              <CheckCircle className="h-4 w-4 text-white" />
                           </div>
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-white font-display italic leading-none mb-1">{displaySession.mentorName}</h3>
                           <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">{displaySession.mentorTitle}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Command Center Controls */}
               <div className="p-8 glass rounded-[2.5rem] border-white/20 shadow-2xl flex items-center justify-center gap-8 relative overflow-hidden flex-shrink-0 animate-slide-up">
                  <div className="flex items-center gap-4">
                    <Button
                      size="lg"
                      variant={isMicOn ? 'outline' : 'default'}
                      className={cn("h-16 w-16 rounded-2xl transition-all shadow-xl active:scale-90", !isMicOn && "bg-destructive hover:bg-destructive/90 text-white")}
                      onClick={() => setIsMicOn(!isMicOn)}
                    >
                      {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                    </Button>
                    <Button
                      size="lg"
                      variant={isVideoOn ? 'outline' : 'default'}
                      className={cn("h-16 w-16 rounded-2xl transition-all shadow-xl active:scale-90", !isVideoOn && "bg-destructive hover:bg-destructive/90 text-white")}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                    </Button>
                  </div>

                  <div className="h-10 w-[1px] bg-border/20 mx-4" />

                  <div className="flex items-center gap-4">
                    <Button
                      size="lg"
                      variant={isTranslationOn ? 'default' : 'outline'}
                      className={cn("h-16 px-8 rounded-2xl transition-all shadow-xl active:scale-90 font-black text-[10px] uppercase tracking-widest", isTranslationOn && "bg-accent text-accent-foreground")}
                      onClick={() => setIsTranslationOn(!isTranslationOn)}
                    >
                      Traducción Pro
                    </Button>
                    <Button
                      size="lg"
                      variant={isAiPilotOpen ? 'default' : 'outline'}
                      className={cn("h-16 px-8 rounded-2xl transition-all shadow-xl active:scale-90 font-black text-[10px] uppercase tracking-widest", isAiPilotOpen && "bg-primary text-primary-foreground")}
                      onClick={() => setIsAiPilotOpen(!isAiPilotOpen)}
                    >
                      AI Co-Pilot
                    </Button>
                  </div>

                  <div className="h-10 w-[1px] bg-border/20 mx-4" />

                  <Button
                    size="lg"
                    className="h-16 px-10 rounded-2xl bg-destructive hover:bg-destructive/90 text-white shadow-xl active:scale-90 font-black text-[10px] uppercase tracking-widest"
                    onClick={handleEndSession}
                  >
                    <PhoneOff className="h-5 w-5 mr-3" /> Terminar Sesión
                  </Button>
               </div>
            </div>

            {/* AI Sidekick Panel */}
            <div className="lg:col-span-4 h-full min-h-0 flex flex-col gap-6 animate-fade-in animation-delay-200">
               {isAiPilotOpen ? (
                 <div className="flex-1 glass rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-border/10 bg-primary/5">
                       <div className="flex items-center gap-4 mb-4">
                          <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                             <Brain className="h-6 w-6" />
                          </div>
                          <h3 className="font-black italic font-display text-xl">AI Co-Pilot Alpha</h3>
                       </div>
                       <div className="flex gap-2">
                          <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black uppercase tracking-widest rounded-full border border-success/20">Modo Estratégico</span>
                          <span className="px-3 py-1 bg-white/5 text-muted-foreground text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">Live Notes</span>
                       </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-elegant">
                        <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] mb-4">Notas Generadas en Tiempo Real</p>
                        {aiNotes.map((note, i) => (
                          <div key={i} className="group relative pl-8 animate-slide-up" style={{ animationDelay: `${i * 200}ms` }}>
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
                             <p className="text-sm font-medium leading-relaxed italic">{note}</p>
                             <p className="text-[8px] font-black text-primary/40 uppercase mt-2">v.1.4.2 — 14:{20 + i}</p>
                          </div>
                        ))}
                        <div className="p-6 rounded-3xl bg-accent/5 border border-accent/20 border-dashed animate-pulse">
                           <p className="text-xs font-black text-accent uppercase tracking-widest leading-relaxed">
                              Sugerencia: Pregunta sobre la integración de sistemas legacy con APIs modernas.
                           </p>
                        </div>
                    </div>

                    <div className="p-8 bg-black/10 border-t border-border/10">
                       <div className="flex items-center justify-between gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-6">
                          <span>Sentiment Analysis</span>
                          <span className="text-success">Neutro Positivo</span>
                       </div>
                       <ProgressBar value={85} variant="success" size="sm" />
                    </div>
                 </div>
               ) : (
                 <div className="flex-1 glass rounded-[3rem] border-white/20 p-12 text-center flex flex-col items-center justify-center gap-6 group">
                    <div className="h-24 w-24 rounded-[2.5rem] bg-secondary/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                       <MessageSquare className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black italic font-display mb-2">Panel en Standby</h3>
                       <p className="text-sm text-muted-foreground font-medium italic">Activa el Co-Pilot para asistencia ejecutiva en tiempo real.</p>
                    </div>
                    <Button variant="ghost" className="font-black uppercase tracking-widest text-[10px] text-primary" onClick={() => setIsAiPilotOpen(true)}>Despertar IA</Button>
                 </div>
               )}

               {/* Chat Quick Access */}
               <div className="glass rounded-[2rem] p-6 border-white/20 shadow-xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <MessageCircle className="h-5 w-5" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest">Canal de Chat</span>
                  </div>
                  <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform" onClick={() => setIsChatOpen(true)}>
                     <ArrowRight className="h-5 w-5" />
                  </Button>
               </div>
            </div>

            {/* Overlay Chat Modal */}
            {isChatOpen && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                <div className="glass rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-lg h-[700px] flex flex-col overflow-hidden animate-scale-in">
                  <div className="p-8 border-b border-border/10 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl overflow-hidden border-2 border-primary">
                         <img src={displaySession.mentorImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black font-display italic">Chat Directo</h3>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Cifrado de Extremo a Extremo</p>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="rounded-2xl" onClick={() => setIsChatOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 space-y-6 scrollbar-elegant">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                         <Sparkles className="h-20 w-20 mb-6" />
                         <p className="text-sm font-black uppercase tracking-widest leading-relaxed">Sin actividad reciente.<br/>Envíe un pulso estratégico.</p>
                      </div>
                    ) : (
                      chatMessages.map((msg) => (
                        <div key={msg.id} className={cn("flex", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                          <div className={cn("max-w-[85%] p-6 rounded-[2rem] shadow-xl", 
                            msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none')}>
                            <p className="text-sm font-medium leading-relaxed italic">{msg.text}</p>
                            <p className={cn("text-[8px] font-black uppercase mt-3 tracking-widest opacity-40", 
                              msg.sender === 'me' ? 'text-primary-foreground text-right' : 'text-muted-foreground')}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); if(chatInput.trim()) { setChatMessages([...chatMessages, { id: Date.now().toString(), text: chatInput, sender: 'me', time: 'AHORA' }]); setChatInput(''); } }} 
                    className="p-8 border-t border-border/10 bg-white/5 flex gap-4">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="ESCRIBA SU REQUERIMIENTO..."
                      className="h-16 rounded-2xl bg-black/20 border-2 font-black px-8 focus:border-primary text-xs tracking-widest uppercase shadow-inner"
                    />
                    <Button type="submit" size="icon" className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground shadow-2xl shrink-0" disabled={!chatInput.trim()}>
                      <Send className="h-6 w-6" />
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionRoomPage;

