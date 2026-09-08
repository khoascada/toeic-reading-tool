'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Compass,
  Layers,
  BookMarked,
  Sparkles,
  Clock,
  Check,
} from 'lucide-react';
import type {
  ReadingPassageItem,
  PassageStructure,
  ParagraphAnalysisItem,
  ReadingStrategy,
} from '../types';

interface Part6PassageAnalysisProps {
  passage: ReadingPassageItem;
  expandedSections: Record<string, boolean>;
  onToggleSection: (sectionKey: string) => void;
}

export const Part6PassageAnalysis: React.FC<Part6PassageAnalysisProps> = ({
  passage,
  expandedSections,
  onToggleSection,
}) => {
  const analysis = passage.passage_analysis;
  if (!analysis) return null;

  const structure = (analysis.structure || {}) as unknown as PassageStructure;
  const paragraphs = (Array.isArray(analysis.paragraph_analysis)
    ? analysis.paragraph_analysis
    : []) as unknown as ParagraphAnalysisItem[];
  const strategy = (analysis.reading_strategy || {}) as unknown as ReadingStrategy;

  return (
    <Card className="border-border/70 overflow-hidden shadow-sm">
      <CardHeader className="bg-muted/40 border-b border-border/40 py-3.5 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-bold text-foreground">
            Phân tích chuyên sâu đoạn văn
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3">
        {/* 1. Mục Tóm tắt, Ý chính & Chủ đề */}
        <div className="rounded-xl border border-border/60 overflow-hidden transition-all bg-card">
          <button
            type="button"
            onClick={() => onToggleSection('summary')}
            className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-sm hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2 text-foreground">
              <FileText className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Tóm tắt & Ý chính</span>
              {analysis.topic && (
                <Badge variant="outline" className="text-[11px] font-normal border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 ml-1">
                  {analysis.topic}
                </Badge>
              )}
            </div>
            {expandedSections['summary'] ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSections['summary'] && (
            <div className="px-4 pb-4 pt-1 text-xs sm:text-sm space-y-3 border-t border-border/40 bg-muted/10">
              {analysis.main_idea && (
                <div>
                  <span className="font-bold text-foreground block mb-1">Ý chính:</span>
                  <p className="text-foreground/90 leading-relaxed bg-background/80 p-2.5 rounded-lg border border-border/50">
                    {analysis.main_idea}
                  </p>
                </div>
              )}
              {analysis.summary && (
                <div>
                  <span className="font-bold text-foreground block mb-1">Tóm tắt nội dung:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Cấu trúc đoạn văn (Document Structure) */}
        {Object.keys(structure).length > 0 && (
          <div className="rounded-xl border border-border/60 overflow-hidden transition-all bg-card">
            <button
              type="button"
              onClick={() => onToggleSection('structure')}
              className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-sm hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Layers className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Cấu trúc văn bản</span>
                {structure.type && (
                  <span className="text-xs text-muted-foreground font-normal">
                    ({structure.type})
                  </span>
                )}
              </div>
              {expandedSections['structure'] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections['structure'] && (
              <div className="px-4 pb-4 pt-2 text-xs sm:text-sm space-y-2.5 border-t border-border/40 bg-muted/10">
                {structure.headline && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground shrink-0 min-w-20">Tiêu đề:</span>
                    <span className="text-foreground/90">{String(structure.headline)}</span>
                  </div>
                )}
                {structure.lead && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground shrink-0 min-w-20">Mở đoạn:</span>
                    <span className="text-muted-foreground">{String(structure.lead)}</span>
                  </div>
                )}
                {structure.body && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground shrink-0 min-w-20">Thân bài:</span>
                    <span className="text-muted-foreground">{String(structure.body)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. Phân tích từng đoạn & Từ vựng trọng tâm */}
        {paragraphs.length > 0 && (
          <div className="rounded-xl border border-border/60 overflow-hidden transition-all bg-card">
            <button
              type="button"
              onClick={() => onToggleSection('paragraphs')}
              className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-sm hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-foreground">
                <BookMarked className="h-4 w-4 text-purple-500 shrink-0" />
                <span>Phân tích từng đoạn & Từ vựng</span>
                <span className="text-xs text-muted-foreground font-normal">
                  ({paragraphs.length} đoạn)
                </span>
              </div>
              {expandedSections['paragraphs'] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections['paragraphs'] && (
              <div className="px-4 pb-4 pt-2 space-y-4 border-t border-border/40 bg-muted/10">
                {paragraphs.map((para) => (
                  <div key={para.paragraph_number} className="bg-background/80 p-3 rounded-lg border border-border/50 space-y-2.5 text-xs sm:text-sm">
                    <div className="font-bold text-primary flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                        {para.paragraph_number}
                      </span>
                      <span>Đoạn {para.paragraph_number}</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {para.summary}
                    </p>

                    {para.key_points && para.key_points.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="font-semibold text-foreground text-xs">Ý then chốt:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-foreground/85 pl-1">
                          {para.key_points.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {para.key_vocabulary && para.key_vocabulary.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="font-semibold text-foreground text-xs">Từ vựng đáng chú ý:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {para.key_vocabulary.map((vocab, vIdx) => (
                            <div key={vIdx} className="bg-muted/40 p-2 rounded border border-border/40 text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-foreground">{vocab.word}</span>
                                {vocab.part_of_speech && (
                                  <span className="text-[10px] px-1 rounded bg-muted text-muted-foreground font-mono">
                                    ({vocab.part_of_speech})
                                  </span>
                                )}
                              </div>
                              <span className="text-muted-foreground text-[11px] block mt-0.5">
                                {vocab.meaning}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Chiến lược đọc hiểu (Reading Strategy) */}
        {(strategy.approach || strategy.tips?.length || strategy.recommended_time_seconds) && (
          <div className="rounded-xl border border-border/60 overflow-hidden transition-all bg-card">
            <button
              type="button"
              onClick={() => onToggleSection('strategy')}
              className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-sm hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Compass className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Chiến lược làm bài & Mẹo giải nhanh</span>
                {strategy.recommended_time_seconds && (
                  <Badge variant="outline" className="text-[11px] font-normal border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 ml-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{Math.round(strategy.recommended_time_seconds / 60)} phút</span>
                  </Badge>
                )}
              </div>
              {expandedSections['strategy'] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections['strategy'] && (
              <div className="px-4 pb-4 pt-2 text-xs sm:text-sm space-y-3 border-t border-border/40 bg-muted/10">
                {strategy.approach && (
                  <div>
                    <span className="font-bold text-foreground block mb-1">Phương pháp tiếp cận:</span>
                    <p className="text-foreground/90 leading-relaxed bg-background/80 p-2.5 rounded-lg border border-border/50">
                      {strategy.approach}
                    </p>
                  </div>
                )}

                {strategy.tips && strategy.tips.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-bold text-foreground block">Mẹo cần nhớ:</span>
                    <ul className="space-y-1.5 pl-1">
                      {strategy.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/85">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
