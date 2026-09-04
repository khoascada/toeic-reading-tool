'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@lib/utils';

const STAR_SIZES = {
  sm: 12,
  md: 16,
  lg: 20,
} as const;

export interface RatingProps {
  value: number;
  max?: number;
  size?: keyof typeof STAR_SIZES;
  readonly?: boolean;
  onChange?: (value: number) => void;
  showValue?: boolean;
  className?: string;
}

export const Rating = ({
  value,
  max = 5,
  size = 'md',
  readonly = false,
  onChange,
  showValue = false,
  className,
}: RatingProps) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const displayValue = hovered ?? value;
  const starSize = STAR_SIZES[size];

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`Rating: ${value} out of ${max}`}
      onMouseLeave={() => !readonly && setHovered(null)}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayValue;

        return (
          <button
            key={i}
            type="button"
            aria-label={`${starValue} stars`}
            onClick={() => !readonly && onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            className={cn(
              'transition-transform duration-100 outline-none',
              !readonly
                ? 'focus-visible:ring-ring cursor-pointer hover:scale-110 focus-visible:rounded-sm focus-visible:ring-1'
                : 'pointer-events-none cursor-default'
            )}
          >
            <Star
              size={starSize}
              className={cn(
                'transition-colors duration-150',
                filled ? 'fill-warning text-warning' : 'fill-muted text-muted-foreground/30'
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="text-text-secondary ml-1 text-[11px] font-medium tabular-nums">
          {value}/{max}
        </span>
      )}
    </div>
  );
};

Rating.displayName = 'Rating';
