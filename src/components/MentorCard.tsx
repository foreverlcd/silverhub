import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Star, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface MentorCardProps {
  id: string;
  name: string;
  title: string;
  company?: string;
  location: string;
  imageUrl: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  matchScore?: number;
  pricePerSession: number;
  isRecommended?: boolean;
  onViewProfile?: () => void;
  onBook?: () => void;
  bio?: string;
  className?: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  name,
  title,
  location,
  imageUrl,
  skills,
  rating,
  matchScore,
  pricePerSession,
  isRecommended = false,
  onViewProfile,
  onBook,
  bio,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative bg-card rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-border overflow-hidden',
        isRecommended && 'ring-2 ring-primary/20 bg-primary/5 shadow-lg',
        className
      )}
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-150 transition-transform duration-[1500ms]">
         <Sparkles className="w-48 h-48" />
      </div>

      {isRecommended && (
        <div className="absolute -top-1 left-10 z-20 flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-b-xl shadow-lg">
          <Sparkles className="h-3 w-3 fill-current" />
          Recomendado por IA
        </div>
      )}

      {matchScore && (
        <div className="absolute top-8 right-8 z-10">
          <div className="bg-success text-success-foreground text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md border-2 border-background/20 backdrop-blur-md">
            {matchScore}% MATCH
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 mb-8 relative z-10">
        <div className="relative w-max self-center md:self-start">
          <div className="relative">
            <img
              src={imageUrl}
              alt={name}
              className="h-28 w-28 rounded-3xl object-cover shadow-lg border-2 border-background"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 h-10 w-10 bg-success border-4 border-background rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="h-5 w-5 text-success-foreground" />
          </div>
        </div>

        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-bold text-foreground text-2xl tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">{name}</h3>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide opacity-90">{title}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-foreground">{rating.toFixed(1)} <span className="text-muted-foreground opacity-50">/ 5.0</span></span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3 min-h-[4.5rem] text-base font-medium opacity-80">
        {bio || 'Experto en transformación digital y liderazgo estratégico, conectando el legado senior con el futuro tecnológico.'}
      </p>

      <div className="flex flex-wrap gap-2 mb-10 relative z-10 items-center justify-center md:justify-start">
        {skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 bg-secondary/10 text-secondary-foreground text-[10px] font-bold uppercase tracking-wider rounded-lg border border-border/50"
          >
            {skill}
          </span>
        ))}
        {skills.length > 3 && (
          <span className="text-[10px] font-bold text-muted-foreground opacity-40 ml-1">+{skills.length - 3}</span>
        )}
      </div>

      <div className="mt-auto pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-baseline gap-1">
             <span className="text-sm font-bold text-muted-foreground">S/</span>
             <span className="text-4xl font-bold text-foreground tracking-tight">{pricePerSession}</span>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">Por Sesión</span>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button 
            variant="ghost" 
            className="h-12 flex-1 sm:flex-none px-6 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-secondary/50 border border-transparent hover:border-secondary transition-all" 
            onClick={onViewProfile}
          >
            PERFIL
          </Button>
          <Button 
            className="h-14 flex-1 sm:flex-none px-8 font-bold uppercase tracking-wider text-[11px] rounded-xl shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95" 
            onClick={onBook}
          >
            RESERVAR <ArrowRight className="h-3 w-3 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
