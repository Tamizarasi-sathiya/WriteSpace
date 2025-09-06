import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { DeletePostButton } from '@/components/DeletePostButton';

type PostPageProps = {
    params: {
        id: string;
    }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }
  
  const postDate = post.createdAt?.toDate();
  const formattedDate = postDate ? format(postDate, 'MMMM d, yyyy') : 'Date not available';

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground text-sm">
          <span>By {post.author}</span> &middot; <time dateTime={postDate?.toISOString()}>{formattedDate}</time>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap text-lg font-body">
        {post.content}
      </div>

      <div className="mt-12 pt-6 border-t flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href={`/posts/${post.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeletePostButton postId={post.id} />
      </div>
    </article>
  );
}
