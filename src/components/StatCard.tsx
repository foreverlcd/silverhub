import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}) => {
  return (
    <div className={cn(
      'glass rounded-[2rem] p-8 border-white/10 shadow-xl group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden',
      className
    )}>
      {/* Background Icon Detail */}
      {Icon && (
        <div className="absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
          <Icon className="w-24 h-24" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          {Icon && (
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Icon className="h-6 w-6" />
            </div>
          )}
          {trend && (
            <div className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
              trend.isPositive ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{title}</p>
          <h3 className="text-4xl font-black text-foreground font-display tracking-tight leading-none italic">{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-3 font-medium italic opacity-70">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
