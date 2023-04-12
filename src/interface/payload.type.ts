export interface UserRegistration {
  first_name?: string;
  surname?: string;
  email: string;
  password: string;
  is_superuser?: boolean;
  role?: string;
}

export interface CreateNewPost {
  title: string;
  description?: string;
  content: string;
  category: string;
  image_url?: string;
}
