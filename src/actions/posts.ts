
'use server';

import { z } from 'zod';
import { addPost, deletePost, getPost, updatePost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase/server';

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
  const user = await auth.currentUser;
  if (!user) {
    return { message: 'You must be logged in to create a post.' };
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

  try {
    const postId = await addPost({
      ...validatedFields.data,
      authorId: user.uid,
    });

    if (!postId) {
      return { message: 'Failed to create post. Please try again.' };
    }
    
    revalidatePath('/');
    redirect(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred. Failed to create post.' };
  }
}

export async function updatePostAction(id: string, prevState: FormState, formData: FormData) {
    const user = await auth.currentUser;
    if (!user) {
        return { message: 'You must be logged in to update a post.' };
    }

    if (!id) {
        return { message: 'Post ID is missing.' };
    }
    
    const post = await getPost(id);
    if (post?.authorId !== user.uid) {
        return { message: 'You are not authorized to edit this post.' };
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

    const success = await updatePost(id, {
        ...validatedFields.data,
        authorId: user.uid
    });

    if (!success) {
        return { message: 'Failed to update post.' };
    }
    
    revalidatePath('/');
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
}


export async function deletePostAction(id: string) {
    const user = await auth.currentUser;
    if (!user) {
        throw new Error('You must be logged in to delete a post.');
    }
    
    if (!id) {
        throw new Error('Post ID is missing.');
    }

    const post = await getPost(id);
    if (post?.authorId !== user.uid) {
        throw new Error('You are not authorized to delete this post.');
    }

    await deletePost(id);
    revalidatePath('/');
    redirect('/');
}
