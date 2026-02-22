import React from 'react';
import { cn } from '@/lib/utils';

interface MatchScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  className,
}) => {
  const getScoreClass = () => {
    if (score >= 85) return 'match-badge-high';
    if (score >= 70) return 'match-badge-medium';
    return 'match-badge-low';
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        getScoreClass(),
        getSizeClass(),
        className
      )}
    >
      <span>{score}%</span>
      {showLabel && <span className="font-normal">Match</span>}
    </div>
  );
};
