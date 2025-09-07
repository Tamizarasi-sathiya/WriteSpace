
'use client';

import { 
    auth 
} from './firebase';
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut as firebaseSignOut 
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        throw new Error('Failed to sign in with Google.');
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};
