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
          <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 text-success text-[10px] font-bold uppercase tracking-widest rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Sesión Próxima
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
            Completada
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-bold uppercase tracking-widest rounded-full">
            Cancelada
          </div>
        );
    }
  };

  return (
    <div className={cn('bg-card rounded-2xl p-6 border border-border shadow-md transition-all hover:shadow-lg group relative overflow-hidden', className)}>
      <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:scale-110 transition-transform duration-500">
        <Video className="w-20 h-20" />
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={mentorImage}
                alt={mentorName}
                className="h-14 w-14 rounded-xl object-cover border-2 border-background shadow-md"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground tracking-tight">{mentorName}</h4>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-80">{mentorTitle}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-secondary/10 flex items-center justify-center text-primary">
              <Calendar className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Fecha</span>
              <span className="text-xs font-bold">{date}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-secondary/10 flex items-center justify-center text-primary">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Horario</span>
              <span className="text-xs font-bold">{time}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {status === 'upcoming' && (
            <>
              <Button 
                onClick={onJoin} 
                className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                <Video className="h-4 w-4 mr-2" />
                Unirse a la Sesión
              </Button>
              <Button 
                variant="outline" 
                onClick={onReschedule}
                className="h-12 px-6 rounded-xl border border-border font-bold uppercase tracking-widest text-[10px] hover:bg-secondary/10"
              >
                Reagendar
              </Button>
            </>
          )}
          {status === 'completed' && (
            <Button 
              variant="outline" 
              onClick={onViewDetails} 
              className="flex-1 h-12 rounded-xl border border-border font-bold uppercase tracking-widest text-[10px] hover:bg-secondary/10"
            >
              Revisar Resumen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
