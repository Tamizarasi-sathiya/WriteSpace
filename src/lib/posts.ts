
import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, limit, Timestamp } from 'firebase/firestore';
import type { Post, PostFormData } from '@/types';

const postsCollection = collection(db, 'posts');

// Helper to convert Firestore doc to Post object
const fromFirestore = (doc: any): Post => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        content: data.content,
        author: data.author,
        createdAt: data.createdAt as Timestamp,
    };
};

export async function getPosts(postLimit: number = 20): Promise<Post[]> {
    try {
        const q = query(postsCollection, orderBy('createdAt', 'desc'), limit(postLimit));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(fromFirestore);
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return [];
    }
}

export async function getPost(id: string): Promise<Post | null> {
    try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return fromFirestore(docSnap);
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching post: ", error);
        return null;
    }
}

export async function addPost(postData: PostFormData): Promise<string | null> {
    try {
        const docRef = await addDoc(postsCollection, {
            ...postData,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        return null;
    }
}

export async function updatePost(id: string, postData: Partial<PostFormData>): Promise<boolean> {
    try {
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, postData);
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
}

export async function deletePost(id: string): Promise<boolean> {
    try {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting document: ", error);
        return false;
    }
}
