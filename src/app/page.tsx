import { getPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative scroll-smooth">
      <section id="welcome" className="h-screen flex flex-col items-center justify-center text-center p-4 relative">
        <div className="bg-background/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary via-teal-400 to-accent mb-4">
            Welcome to PostCraft
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a collection of insightful articles and stories. Create, share, and discover content that matters.
          </p>
        </div>
        <a href="#content" className="absolute bottom-12 animate-bounce">
          <ArrowDown className="w-8 h-8 text-foreground/50"/>
        </a>
      </section>

      <section id="content" className="min-h-screen py-16 md:py-24">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center py-20 bg-card/30 backdrop-blur-sm border-2 border-dashed rounded-2xl w-full max-w-2xl">
              <h2 className="text-2xl font-semibold mb-2">No posts yet.</h2>
              <p className="text-muted-foreground mb-4">Be the first one to create a post!</p>
              <Link href="/posts/new">
                <Button>Create New Post</Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
