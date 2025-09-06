import { getPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">Welcome to PostCraft</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a collection of insightful articles and stories. Create, share, and discover content that matters.
        </p>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">No posts yet.</h2>
          <p className="text-muted-foreground mb-4">Be the first one to create a post!</p>
          <Button asChild>
            <Link href="/posts/new">Create New Post</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
