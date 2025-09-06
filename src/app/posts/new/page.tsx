import PostForm from '@/components/PostForm';

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-headline text-4xl font-bold mb-8 text-center">Create a New Post</h1>
      <PostForm />
    </div>
  );
}
