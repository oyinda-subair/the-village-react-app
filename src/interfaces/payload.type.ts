export interface UserRegistration {
  first_name?: string;
  surname?: string;
  email: string;
  password: string;
  is_superuser?: boolean;
  role?: string;
}
