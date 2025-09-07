import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import PostView from '@/components/PostView';

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

  return (
    <div className="container py-12">
        <PostView post={post} />
    </div>
  );
}
