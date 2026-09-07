import React from 'react';
import { QuestionType } from '@prisma/client';
import { PART_5_QUESTION_TYPES } from '../types';

interface Part5TypeBadgeProps {
  type?: QuestionType | null;
  className?: string;
}

export const Part5TypeBadge: React.FC<Part5TypeBadgeProps> = ({ type, className = '' }) => {
  if (!type) {
    return (
      <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-muted text-muted-foreground border-border ${className}`}>
        Không xác định
      </span>
    );
  }

  const meta = PART_5_QUESTION_TYPES.find((t) => t.key === type);
  const colorClass = meta?.colorClass || 'bg-muted text-muted-foreground border-border';
  const label = meta ? `${meta.label} (${type})` : type;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors ${colorClass} ${className}`}
      title={meta?.description}
    >
      {label}
    </span>
  );
};
