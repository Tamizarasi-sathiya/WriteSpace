import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';
import { Playfair_Display, Inter } from 'next/font/google';
import React from 'react';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PostCraft',
  description: 'A full-stack blog application built with Next.js and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, playfairDisplay.variable, 'font-sans antialiased')}>
        <Header />
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
