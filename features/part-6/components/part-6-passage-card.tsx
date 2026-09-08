'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { BookOpen } from 'lucide-react';
import type { ReadingPassageItem } from '../types';

interface Part6PassageCardProps {
  passage: ReadingPassageItem;
  selectedAnswers?: Record<number, number>;
}

export const Part6PassageCard: React.FC<Part6PassageCardProps> = ({
  passage,
}) => {
  const text = passage.passage_text || '';
  const paragraphs = text.split('\n').filter(Boolean);
  console.log("🚀 ~ Part6PassageCard ~ paragraphs:", paragraphs)

  // Render text with highlighted blanks like [131], [132], [133], [134]
  const renderParagraphWithBlanks = (paraText: string, pIdx: number) => {
    // Regex matching patterns like [131], [132], etc.
    const parts = paraText.split(/(\[\d{3}\])/g);


    return (
      <p key={pIdx} className="leading-relaxed text-sm sm:text-base text-foreground/90 font-normal">
        {parts.map((part, idx) => {
          const match = part.match(/^\[(\d{3})\]$/);
          if (match) {
            const qNum = match[1];
            return (
              <span
                key={idx}
                className="inline-flex items-center justify-center font-bold px-2 py-0.5 mx-1.5 rounded-md bg-primary/15 text-primary border border-primary/30 text-xs sm:text-sm shadow-xs select-none"
              >
                [{qNum}]
              </span>
            );
          }
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        })}
      </p>
    );
  };

  return (
    <Card className="border-border/70 overflow-hidden shadow-sm">
      <CardHeader className="bg-muted/30 border-b border-border/40 py-3.5 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          {passage.passage_analysis?.topic && (
            <Badge variant="secondary" className="text-xs font-normal">
              {passage.passage_analysis.topic}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, idx) => renderParagraphWithBlanks(p, idx))
        ) : (
          <p className="text-sm text-muted-foreground italic">Không có nội dung đoạn văn.</p>
        )}
      </CardContent>
    </Card>
  );
};
