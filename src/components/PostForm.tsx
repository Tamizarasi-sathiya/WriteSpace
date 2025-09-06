'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { createPostAction, updatePostAction } from '@/actions/posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Post } from '@/types';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PenSquare } from 'lucide-react';

type PostFormProps = {
  post?: Post;
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Post' : 'Create Post')}
        </Button>
    )
}

export default function PostForm({ post }: PostFormProps) {
  const isEditing = !!post;
  const action = isEditing ? updatePostAction.bind(null, post.id) : createPostAction;

  const [state, formAction] = useActionState(action, { message: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: state.message,
      });
    } else if (state.message) {
       toast({
        variant: "destructive",
        title: "An error occurred",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Your post title"
              defaultValue={post?.title}
              required
              className="text-base"
            />
            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="author" className="text-lg">Author</Label>
            <Input
              id="author"
              name="author"
              placeholder="Your name"
              defaultValue={post?.author}
              required
              className="text-base"
            />
            {state.errors?.author && <p className="text-sm text-destructive">{state.errors.author.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-lg">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your thoughts here..."
              defaultValue={post?.content}
              required
              className="min-h-[300px] text-base"
            />
            {state.errors?.content && <p className="text-sm text-destructive">{state.errors.content.join(', ')}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
            <SubmitButton isEditing={isEditing} />
        </CardFooter>
      </Card>
    </form>
  );
}
