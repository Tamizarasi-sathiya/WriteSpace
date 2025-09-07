import PostForm from '@/components/PostForm';
import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';

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
        <div className="container py-12 max-w-3xl mx-auto">
             <AnimatedSection animation="slide-in-up">
                <h1 className="font-headline text-4xl font-bold mb-8 text-center">Edit Post</h1>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-up" delay={0.1}>
                <PostForm post={post} />
            </AnimatedSection>
        </div>
    );
}
