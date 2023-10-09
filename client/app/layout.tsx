import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GlobalContextProvider } from '@/app/store/store';
import { useGlobalContext } from '@/app/store/store';
import { authToken } from '@/app/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marcos Tulli',
  description: 'Log in Interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContextProvider>
      <html>
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalContextProvider>
  );
}
