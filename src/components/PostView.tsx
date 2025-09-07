
'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { DeletePostButton } from '@/components/DeletePostButton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Post } from '@/types';
import AnimatedSection from './AnimatedSection';

type PostViewProps = {
    post: Post;
}

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function PostView({ post }: PostViewProps) {
  const { user } = useAuth();
  
  const postDate = new Date(post.createdAt);
  const formattedDate = format(postDate, 'MMMM d, yy');
  const isAuthor = user && user.uid === post.authorId;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <AnimatedSection animation="slide-in-up">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-up" delay={0.1}>
          <div className="flex items-center gap-3 text-muted-foreground text-sm mt-8">
              <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{post.author}</span>
                  <time dateTime={postDate?.toISOString()}>{formattedDate}</time>
              </div>
          </div>
        </AnimatedSection>
      </header>

      <AnimatedSection animation="slide-in-up" delay={0.2}>
        <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap break-words text-lg font-sans">
          {post.content}
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slide-in-up" delay={0.3}>
        <div className="mt-12 pt-6 border-t flex items-center gap-4">
          {isAuthor && (
              <>
                  <Link href={`/posts/${post.id}/edit`}>
                    <Button variant="outline">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <DeletePostButton postId={post.id} />
              </>
          )}
          <div className="ml-auto">
              <Link href="/">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Posts
                </Button>
              </Link>
          </div>
        </div>
      </AnimatedSection>
    </article>
  );
}
