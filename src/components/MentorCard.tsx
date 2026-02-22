import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Star, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { MatchScoreBadge } from './MatchScoreBadge';
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
  company,
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
        'group relative glass rounded-[3.5rem] p-10 flex flex-col transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(var(--primary-rgb),0.25)] hover:-translate-y-4 border-white/20 overflow-hidden',
        isRecommended && 'ring-2 ring-accent/30 bg-accent/5 shadow-[0_0_40px_rgba(var(--accent-rgb),0.1)]',
        className
      )}
    >
      <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none group-hover:scale-150 transition-transform duration-[1.5s]">
         <Sparkles className="w-64 h-64" />
      </div>

      {isRecommended && (
        <div className="absolute -top-1 left-12 z-20 flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent to-citron text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-b-[1.5rem] shadow-2xl animate-pulse-glow">
          <Sparkles className="h-4 w-4 fill-white" />
          Elite IA Match
        </div>
      )}

      {matchScore && (
        <div className="absolute top-10 right-10 z-10 scale-110">
          <div className="bg-success text-success-foreground text-[10px] font-black px-5 py-2 rounded-full shadow-2xl border-4 border-background/20 backdrop-blur-xl animate-scale-in">
            {matchScore}% SCORE
          </div>
        </div>
      )}

      <div className="flex flex-col gap-10 mb-10 relative z-10">
        <div className="relative w-max self-center md:self-start">
          <div className="relative group/avatar">
            <img
              src={imageUrl}
              alt={name}
              className="h-32 w-32 rounded-[3.5rem] object-cover shadow-2xl border-4 border-background group-hover/avatar:scale-105 transition-transform duration-700"
            />
            <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] -z-10 blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-12 w-12 bg-success border-4 border-background rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform">
            <CheckCircle className="h-6 w-6 text-success-foreground" />
          </div>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h3 className="font-black text-foreground text-4xl font-display italic tracking-tight group-hover:text-primary transition-colors duration-500 uppercase leading-none">{name}</h3>
          <p className="text-sm font-black text-primary uppercase tracking-[0.3em] italic opacity-80 decoration-accent decoration-2 underline-offset-8 underline">{title}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mt-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 fill-accent text-accent animate-pulse-glow" />
              <span className="text-foreground">{rating.toFixed(1)} <span className="text-muted-foreground opacity-50">/ 5.0</span></span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-10 line-clamp-3 min-h-[5rem] text-lg font-medium italic opacity-80 relative">
        <span className="text-4xl text-primary/20 font-black absolute -top-4 -left-4">"</span>
        {bio || 'Expertiz en transformación digital y liderazgo estratégico, conectando el legado senior con el futuro tecnológico.'}
        <span className="text-4xl text-primary/20 font-black absolute -bottom-8 right-0 rotate-180">"</span>
      </p>

      <div className="flex flex-wrap gap-3 mb-12 relative z-10 items-center justify-center md:justify-start">
        {skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-6 py-2.5 bg-secondary/10 text-secondary-foreground text-[9px] font-black uppercase tracking-[0.2em] rounded-2xl border border-white/5 backdrop-blur-sm shadow-sm hover:bg-secondary/20 transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
        {skills.length > 3 && (
          <span className="text-[10px] font-black text-muted-foreground opacity-40 ml-2">+{skills.length - 3}</span>
        )}
      </div>

      <div className="mt-auto pt-10 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-baseline gap-1">
             <span className="text-xl font-black text-muted-foreground self-start mt-2 mr-1">S/</span>
             <span className="text-5xl font-black text-foreground tracking-tighter italic font-display">{pricePerSession}</span>
          </div>
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-1 opacity-50">Sesión Elite</span>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Button 
            variant="ghost" 
            className="h-16 flex-1 sm:flex-none px-8 font-black uppercase tracking-widest text-[10px] rounded-[2rem] hover:bg-secondary/50 transition-all border border-transparent hover:border-secondary" 
            onClick={onViewProfile}
          >
            PERFIL
          </Button>
          <Button 
            className="h-20 flex-1 sm:flex-none px-12 font-black uppercase tracking-[0.2em] text-[11px] rounded-[2rem] shadow-2xl bg-primary text-primary-foreground hover:shadow-primary/40 transition-all active:scale-95 group/btn" 
            onClick={onBook}
          >
            RESERVAR <ArrowRight className="h-4 w-4 ml-4 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
