import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-background/50 border-t mt-12">
      <div className="container mx-auto py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Write Space. All rights reserved.</p>
        <p className="text-sm mt-2">
          {'{Built with Next.js and Firebase by S Tamizarasi.}'}
        </p>
      </div>
    </footer>
  );
}
