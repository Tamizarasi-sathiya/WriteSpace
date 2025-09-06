'use server';

import { z } from 'zod';
import { addPost, deletePost, updatePost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  author: z.string().min(2, 'Author name must be at least 2 characters long.'),
});

export type FormState = {
    message: string;
    errors?: {
        title?: string[];
        content?: string[];
        author?: string[];
    };
};


export async function createPostAction(prevState: FormState, formData: FormData) {
  const validatedFields = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const postId = await addPost(validatedFields.data);

  if (!postId) {
    return { message: 'Failed to create post.' };
  }
  
  revalidatePath('/');
  redirect(`/posts/${postId}`);
}

export async function updatePostAction(id: string, prevState: FormState, formData: FormData) {
    if (!id) {
        return { message: 'Post ID is missing.' };
    }

    const validatedFields = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        author: formData.get('author'),
    });
    
    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const success = await updatePost(id, validatedFields.data);

    if (!success) {
        return { message: 'Failed to update post.' };
    }
    
    revalidatePath('/');
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
}


export async function deletePostAction(id: string) {
    if (!id) {
        throw new Error('Post ID is missing.');
    }
    await deletePost(id);
    revalidatePath('/');
    redirect('/');
}
