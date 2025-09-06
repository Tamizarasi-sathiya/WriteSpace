import Link from 'next/link';
import { Button } from './ui/button';
import { PenSquare, Lightbulb } from 'lucide-react';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
          PostCraft
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Link href="/suggest-topics" passHref>
            <Button variant="ghost">
              <Lightbulb />
              <span className="hidden sm:inline">Suggest Topics</span>
            </Button>
          </Link>
          <Link href="/posts/new" passHref>
            <Button>
              <PenSquare />
              <span className="hidden sm:inline">New Post</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
