import PostForm from '@/components/PostForm';
import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';

type EditPostPageProps = {
    params: {
        id: string;
    }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const post = await getPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-bold mb-8 text-center">Edit Post</h1>
            <PostForm post={post} />
        </div>
    );
}
