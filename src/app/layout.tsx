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

const iconSvg = `
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100"
  >
    <style>
      .bg { fill: hsl(220 27% 97%); }
      .fg { fill: hsl(258 70% 78%); }
      @media (prefers-color-scheme: dark) {
        .bg { fill: hsl(224 21% 11%); }
        .fg { fill: hsl(258 70% 78%); }
      }
    </style>
    <rect width="100" height="100" rx="20" class="bg" />
    <path 
      d="M35 20 L70 55 L60 65 L25 30 Z M65 60 L75 70" 
      stroke-width="8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      stroke="hsl(258 70% 78%)"
      fill="none"
    />
    <circle cx="30" cy="25" r="5" class="fg" />
  </svg>
`;

const encodedIcon = `data:image/svg+xml,${encodeURIComponent(iconSvg)}`;

export const metadata: Metadata = {
  title: 'Write Space',
  description: 'A full-stack blog application built with Next.js and Firebase.',
  icons: [
    {
      rel: 'icon',
      url: encodedIcon,
    },
  ],
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
