import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Video } from 'lucide-react';
import { Button } from './ui/button';

interface SessionCardProps {
  mentorName: string;
  mentorImage: string;
  mentorTitle: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  onJoin?: () => void;
  onReschedule?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  mentorName,
  mentorImage,
  mentorTitle,
  date,
  time,
  status,
  onJoin,
  onReschedule,
  onViewDetails,
  className,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'upcoming':
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping" />
            Sincronización Activa
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
            Impacto Logrado
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-full">
            Interrumpida
          </div>
        );
    }
  };

  return (
    <div className={cn('glass rounded-[2rem] p-8 border-white/10 shadow-xl transition-all hover:shadow-2xl hover:border-white/20 group relative overflow-hidden', className)}>
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
        <Video className="w-24 h-24" />
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={mentorImage}
                alt={mentorName}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-background shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-background rounded-full flex items-center justify-center border border-border">
                <Video className="h-2.5 w-2.5 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg text-foreground font-display italic tracking-tight">{mentorName}</h4>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{mentorTitle}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center text-muted-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fecha</span>
              <span className="text-sm font-black">{date}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center text-muted-foreground">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Horario</span>
              <span className="text-sm font-black">{time}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {status === 'upcoming' && (
            <>
              <Button 
                onClick={onJoin} 
                className="flex-1 h-14 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
              >
                <Video className="h-4 w-4 mr-2" />
                Sincronizar Ahora
              </Button>
              <Button 
                variant="ghost" 
                onClick={onReschedule}
                className="h-14 px-6 rounded-xl border-2 border-border/50 font-black uppercase tracking-widest text-[10px] hover:bg-secondary/50"
              >
                Ajustar
              </Button>
            </>
          )}
          {status === 'completed' && (
            <Button 
              variant="ghost" 
              onClick={onViewDetails} 
              className="flex-1 h-14 rounded-xl border-2 border-border/50 font-black uppercase tracking-widest text-[10px] hover:bg-secondary/50"
            >
              Revisar Insights
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
