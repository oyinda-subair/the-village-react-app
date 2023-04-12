export interface Post {
  id?: string;
  title: string;
  description?: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Posts {
  post: Post[];
}

export interface FetchUserPosts {
  loading: boolean;
  userPosts: Post[];
  error?: any;
  success: boolean;
}
