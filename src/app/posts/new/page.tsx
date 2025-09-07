import PostForm from '@/components/PostForm';
import AnimatedSection from '@/components/AnimatedSection';

export default function NewPostPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
       <AnimatedSection animation="slide-in-up">
        <h1 className="font-headline text-4xl font-bold mb-8 text-center">Create a New Post</h1>
      </AnimatedSection>
      <AnimatedSection animation="slide-in-up" delay={0.1}>
        <PostForm />
      </AnimatedSection>
    </div>
  );
}
