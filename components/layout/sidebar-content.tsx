'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Library, BookMarked, History, BarChart2 } from 'lucide-react';
import ThemeToggle from '@components/shared/theme-toggle';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarContentProps {
  onNavigate?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ onNavigate }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menu: MenuItem[] = [
    {
      label: 'Bài đọc (Passages)',
      icon: <BookOpen size={18} />,
      path: '/passages',
    },
    {
      label: 'Bộ đề (Tests)',
      icon: <Library size={18} />,
      path: '/tests',
    },
    {
      label: 'Sổ từ vựng (Vocab)',
      icon: <BookMarked size={18} />,
      path: '/vocabulary',
    },
    {
      label: 'Lịch sử làm bài',
      icon: <History size={18} />,
      path: '/attempts',
    },
    {
      label: 'Thống kê & Tiến độ',
      icon: <BarChart2 size={18} />,
      path: '/analytics',
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (onNavigate) {
      onNavigate();
    }
  };

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <>
      {/* Sidebar Header / Logo */}
      <div className="border-border flex h-14 shrink-0 items-center gap-2 border-b px-6">
        <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold shadow-sm">
          T
        </div>
        <span className="text-foreground text-base font-bold tracking-tight">TOEIC Reading</span>
      </div>

      <div className="flex-grow p-2">
        <ul className="list-none p-0">
          {menu.map((item, index) => {
            const active = isActive(item.path);
            return (
              <li key={index} className="mb-0.5">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full transition-all duration-200 ${
                    active ? 'bg-primary/20 text-primary' : 'bg-transparent'
                  } ${
                    active ? 'hover:bg-primary/30' : 'hover:bg-primary/10'
                  } flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left`}
                >
                  <div className={`flex min-w-[30px] items-center`}>{item.icon}</div>
                  <span
                    className={`text-sm ${
                      active ? 'text-sidebar-primary-foreground font-semibold' : 'font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sidebar Footer / Theme Toggle */}
      <div className="border-border mt-auto flex shrink-0 items-center justify-between gap-3 border-t p-4">
        <span className="text-muted-foreground text-xs font-medium">Chế độ giao diện</span>
        <ThemeToggle />
      </div>
    </>
  );
};
