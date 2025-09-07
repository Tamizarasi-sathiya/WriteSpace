import Link from 'next/link';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const postDate = new Date(post.createdAt);
  const formattedDate = postDate ? format(postDate, 'MMMM d, yyyy') : 'Date not available';

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <Link href={`/posts/${post.id}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 bg-card/30 backdrop-blur-md border-border/20 hover:border-primary/50">
        <CardHeader>
          <CardTitle className="font-headline font-bold text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">
            {post.content}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{post.author}</span>
              <time dateTime={postDate?.toISOString()}>{formattedDate}</time>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
