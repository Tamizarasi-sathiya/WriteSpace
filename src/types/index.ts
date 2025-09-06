import type { Timestamp } from 'firebase/firestore';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Timestamp;
};

export type PostFormData = {
  title: string;
  content: string;
  author: string;
};
