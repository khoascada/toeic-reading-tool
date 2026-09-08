'use client';

import React, { useState } from 'react';
import { SidebarContent } from './sidebar-content';
import { useIsMobile } from '@lib/hooks/use-media-query';
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet';
import { Button } from '@components/ui';
import { Menu } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="bg-background flex h-screen w-screen flex-col overflow-hidden md:flex-row">
      {/* Mobile Header Top Bar (hiển thị khi màn hình < md) */}
      <div className="border-border bg-card flex h-14 shrink-0 items-center justify-between border-b px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold shadow-sm">
            T
          </div>
          <span className="text-foreground text-base font-bold tracking-tight">TOEIC Reading</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="text-foreground h-9 w-9 cursor-pointer p-0"
          aria-label="Mở menu navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Desktop Sidebar Container (hiển thị khi màn hình >= md) */}
      <aside className="border-border bg-card hidden h-full w-64 shrink-0 flex-col border-r md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sheet (Drawer từ bên trái khi isMobile) */}
      {isMobile && (
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent side="left" className="flex h-full w-64 flex-col p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent onNavigate={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      )}

      {/* Main Content Area */}
      <div className="bg-background/50 flex h-full min-w-0 flex-1 flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
