
export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string; // Changed from Timestamp to string
};

export type PostFormData = {
  title: string;
  content: string;
  author: string;
  authorId: string;
};
