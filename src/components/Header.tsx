
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { PenSquare, Lightbulb, LogIn } from 'lucide-react';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

function UserNav() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const { user, loading } = useAuth();

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
        <nav className="flex-1 flex justify-end items-center gap-2">
          <Link href="/posts/new">
            <Button variant="outline">
                <PenSquare className="mr-2 h-4 w-4" />
                New Post
            </Button>
          </Link>
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <UserNav />
          ) : (
            <Link href="/login">
                <Button>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
