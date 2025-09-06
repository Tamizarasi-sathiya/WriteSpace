import Link from 'next/link';
import { Button } from './ui/button';
import { PenSquare, Lightbulb } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold font-headline text-primary hover:opacity-80 transition-opacity">
          PostCraft
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/suggest-topics" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Suggest Topics</span>
            </Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/posts/new" className="flex items-center gap-2">
              <PenSquare className="h-4 w-4" />
              <span className="hidden sm:inline">New Post</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
