import Link from 'next/link';
import { Button } from './ui/button';
import { PenSquare, Lightbulb } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
          PostCraft
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/suggest-topics" className="flex items-center gap-2">
              <>
                <Lightbulb />
                <span className="hidden sm:inline">Suggest Topics</span>
              </>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/posts/new" className="flex items-center gap-2">
              <>
                <PenSquare />
                <span className="hidden sm:inline">New Post</span>
              </>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
