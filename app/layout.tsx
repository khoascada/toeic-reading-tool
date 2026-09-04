import { env } from '@/env';
import Providers from '@lib/providers';
import '@styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { AppLayout } from '@components/layout/app-layout';

const OG_IMAGE = '/og-image.png';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'TOEIC Reading Tool',
  description: 'Công cụ luyện tập và phân tích bài đọc TOEIC Reading',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TOEIC Reading',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'TOEIC Reading Tool',
    title: 'TOEIC Reading Tool',
    description: 'Công cụ luyện tập và phân tích bài đọc TOEIC Reading',
    url: '/',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOEIC Reading Tool',
    description: 'Công cụ luyện tập và phân tích bài đọc TOEIC Reading',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
