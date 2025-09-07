import Link from 'next/link';
import { Button } from './ui/button';
import { PenSquare, Lightbulb } from 'lucide-react';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-lg sticky top-0 z-50 transition-all duration-300 border-b border-transparent hover:shadow-lg hover:border-border">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex-1 flex justify-start">
           <Link href="/suggest-topics" passHref>
            <Button variant="ghost">
              <span className="flex items-center gap-2">
                <Lightbulb />
                <span className="hidden sm:inline">Suggest Topics</span>
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-xl sm:text-2xl font-headline font-bold text-foreground hover:opacity-80 transition-opacity whitespace-nowrap">
            Write Space
          </Link>
        </div>
        <nav className="flex-1 flex justify-end items-center">
          <Link href="/posts/new" passHref>
            <Button>
              <span className="flex items-center gap-2">
                <PenSquare />
                <span className="hidden sm:inline">New Post</span>
              </span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
