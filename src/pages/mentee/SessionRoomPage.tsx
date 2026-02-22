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
          <div className="bg-card rounded-[2rem] p-12 max-w-xl w-full text-center border border-border shadow-xl">
            <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
               <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Sesión No Disponible</h1>
            <p className="text-muted-foreground font-medium mb-10">Esta sesión ha concluido o el enlace ya no es válido.</p>
            <Button onClick={() => navigate('/mentee/dashboard')} className="h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-[10px]">Volver al Panel</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      
      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-card rounded-[2.5rem] border border-border shadow-2xl max-w-lg w-full p-10 space-y-10 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <Video className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                  Configuración de la Sesión
                </h2>
                <p className="text-muted-foreground font-medium text-sm">
                  Prepara tu cámara y micrófono para iniciar la sesión de mentoría digital.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
               <div className="flex items-center gap-4 p-5 bg-secondary/10 rounded-2xl border border-border">
                  <Mic className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest">Audio</p>
                    <p className="text-[10px] text-muted-foreground/80">Conexión de voz segura activa.</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-5 bg-secondary/10 rounded-2xl border border-border">
                  <Video className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest">Video</p>
                    <p className="text-[10px] text-muted-foreground/80">Transmisión de alta definición.</p>
                  </div>
               </div>
            </div>

            {videoError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-xs font-bold uppercase tracking-wider">{videoError}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                onClick={() => setShowPermissionModal(false)}
              >
                Solo Escuchar
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] shadow-md"
                onClick={handleRequestPermissions}
                disabled={isRequestingPermissions}
              >
                {isRequestingPermissions ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar a la Sala'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden pt-28 px-6 pb-6">
        <div className="h-full flex flex-col gap-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-6 flex-shrink-0">
            <div className="flex items-center gap-6">
               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-success">Sesión en Vivo</p>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Mentoría con <span className="text-primary">{displaySession.mentorName}</span>
                  </h1>
               </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Tiempo transcurrido</p>
                  <div className="flex items-center gap-2 justify-end text-lg font-bold">
                     <Clock className="h-4 w-4 text-primary" /> 00:42:15
                  </div>
               </div>
            </div>
          </div>

          <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
            {/* Video Area */}
            <div className="lg:col-span-8 flex flex-col gap-6 h-full min-h-0">
               <div className="flex-1 bg-card rounded-[2rem] border border-border shadow-lg relative overflow-hidden bg-black/90">
                  {isVideoOn && videoStreamRef.current ? (
                    <div className="absolute inset-0 z-10">
                       <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center space-y-6">
                          <div className="h-24 w-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                             <VideoOff className="h-10 w-10 text-primary/40" />
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Cámara Desactivada</p>
                       </div>
                    </div>
                  )}

                  {/* UI Overlays */}
                  <div className="absolute top-6 right-6 z-30 flex gap-3">
                     <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white">Full HD</span>
                     </div>
                  </div>

                  {/* Mentor ID Overlay */}
                  <div className="absolute bottom-6 left-6 z-30">
                     <div className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
                        <div className="relative">
                           <img src={displaySession.mentorImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'} className="h-12 w-12 rounded-xl object-cover border border-white/20" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-white tracking-tight leading-none mb-1">{displaySession.mentorName}</h3>
                           <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">{displaySession.mentorTitle}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Controls Bar */}
               <div className="p-6 bg-card rounded-[2rem] border border-border shadow-lg flex items-center justify-center gap-6 relative overflow-hidden flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Button
                      size="lg"
                      variant={isMicOn ? 'outline' : 'default'}
                      className={cn("h-14 w-14 rounded-xl transition-all shadow-md", !isMicOn && "bg-destructive hover:bg-destructive/90 text-white")}
                      onClick={() => setIsMicOn(!isMicOn)}
                    >
                      {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                    <Button
                      size="lg"
                      variant={isVideoOn ? 'outline' : 'default'}
                      className={cn("h-14 w-14 rounded-xl transition-all shadow-md", !isVideoOn && "bg-destructive hover:bg-destructive/90 text-white")}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                  </div>

                  <div className="h-8 w-[1px] bg-border mx-2" />

                  <div className="flex items-center gap-3">
                    <Button
                      size="lg"
                      variant={isTranslationOn ? 'default' : 'outline'}
                      className={cn("h-14 px-6 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest", isTranslationOn && "bg-accent text-accent-foreground")}
                      onClick={() => setIsTranslationOn(!isTranslationOn)}
                    >
                      Traducción
                    </Button>
                    <Button
                      size="lg"
                      variant={isAiPilotOpen ? 'default' : 'outline'}
                      className={cn("h-14 px-6 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest", isAiPilotOpen && "bg-primary text-primary-foreground")}
                      onClick={() => setIsAiPilotOpen(!isAiPilotOpen)}
                    >
                      AI Co-Pilot
                    </Button>
                  </div>

                  <div className="h-8 w-[1px] bg-border mx-2" />

                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-xl bg-destructive hover:bg-destructive/90 text-white font-bold text-[10px] uppercase tracking-widest shadow-md"
                    onClick={handleEndSession}
                  >
                    <PhoneOff className="h-4 w-4 mr-2" /> Salir
                  </Button>
               </div>
            </div>

            {/* AI/Sidebar Panel */}
            <div className="lg:col-span-4 h-full min-h-0 flex flex-col gap-6">
               {isAiPilotOpen ? (
                 <div className="flex-1 bg-card rounded-[2rem] border border-border shadow-lg overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border bg-primary/5">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                             <Brain className="h-5 w-5" />
                          </div>
                          <h3 className="font-bold text-lg">AI Co-Pilot</h3>
                       </div>
                       <div className="flex gap-2">
                          <span className="px-2.5 py-1 bg-success/10 text-success text-[9px] font-bold uppercase tracking-widest rounded-lg border border-success/20">Modo Estratégico</span>
                       </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Notas en Vivo</p>
                        {aiNotes.map((note, i) => (
                          <div key={i} className="group relative pl-6">
                             <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
                             <p className="text-sm font-medium leading-relaxed">{note}</p>
                          </div>
                        ))}
                    </div>

                    <div className="p-6 bg-secondary/5 border-t border-border">
                       <div className="flex items-center justify-between gap-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                          <span>Análisis de sentimiento</span>
                          <span className="text-success">Positivo</span>
                       </div>
                       <ProgressBar value={85} variant="success" size="sm" />
                    </div>
                 </div>
               ) : (
                 <div className="flex-1 bg-card rounded-[2rem] border border-border p-10 text-center flex flex-col items-center justify-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center shadow-inner">
                       <MessageSquare className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold mb-2">Asistente en Espera</h3>
                       <p className="text-sm text-muted-foreground font-medium">Activa el Co-Pilot para ver notas y sugerencias en tiempo real.</p>
                    </div>
                    <Button variant="ghost" className="font-bold uppercase tracking-widest text-[10px] text-primary" onClick={() => setIsAiPilotOpen(true)}>Habilitar</Button>
                 </div>
               )}

               {/* Chat Access */}
               <div className="bg-card rounded-2xl p-5 border border-border shadow-md flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <MessageCircle className="h-4 w-4" />
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest">Chat de la sesión</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsChatOpen(true)}>
                     <ArrowRight className="h-4 w-4" />
                  </Button>
               </div>
            </div>

            {/* Chat Modal */}
            {isChatOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                <div className="bg-card rounded-[2rem] border border-border shadow-2xl w-full max-w-lg h-[600px] flex flex-col overflow-hidden animate-fade-in">
                  <div className="p-6 border-b border-border flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl overflow-hidden border border-primary/20">
                         <img src={displaySession.mentorImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Chat de la Sesión</h3>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Canal Encriptado</p>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl" onClick={() => setIsChatOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 space-y-4">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                         <MessageCircle className="h-12 w-12 mb-4" />
                         <p className="text-[10px] font-bold uppercase tracking-widest">No hay mensajes aún</p>
                      </div>
                    ) : (
                      chatMessages.map((msg) => (
                        <div key={msg.id} className={cn("flex", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                          <div className={cn("max-w-[80%] p-4 rounded-2xl shadow-sm", 
                            msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-secondary/10 border border-border rounded-tl-none')}>
                            <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                            <p className={cn("text-[8px] font-bold uppercase mt-2 tracking-widest opacity-50", 
                              msg.sender === 'me' ? 'text-primary-foreground text-right' : 'text-muted-foreground')}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); if(chatInput.trim()) { setChatMessages([...chatMessages, { id: Date.now().toString(), text: chatInput, sender: 'me', time: 'AHORA' }]); setChatInput(''); } }} 
                    className="p-6 border-t border-border bg-secondary/5 flex gap-3">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="h-12 rounded-xl border border-border bg-background px-5 focus:border-primary text-sm shadow-sm"
                    />
                    <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-primary text-primary-foreground shadow-md shrink-0" disabled={!chatInput.trim()}>
                      <Send className="h-5 w-5" />
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
