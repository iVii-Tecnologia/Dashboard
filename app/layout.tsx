import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iVii - Biblioteca Digital de Música',
  description: 'Descubra novos talentos, músicas e letras',
  icons: {
    icon: 'https://cdn.prod.website-files.com/67312dfea585bda016b09804/679bd7567e80d41a68c7ef2c_FAVICON.png',
    shortcut: 'https://cdn.prod.website-files.com/67312dfea585bda016b09804/679bd7567e80d41a68c7ef2c_FAVICON.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}