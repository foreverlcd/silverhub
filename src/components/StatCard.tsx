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
      'bg-card rounded-2xl p-6 border border-border shadow-md group hover:shadow-lg transition-all duration-300 relative overflow-hidden',
      className
    )}>
      {/* Background Icon Detail */}
      {Icon && (
        <div className="absolute -top-2 -right-2 p-6 opacity-[0.02] group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-20 h-20" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {trend && (
            <div className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
              trend.isPositive ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight leading-none">{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-2 font-medium opacity-60">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
