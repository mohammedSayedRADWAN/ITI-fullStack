export class User {
  id: number;
  name: string;
  email: string;
  username: string;
  grade: number;
  role: 'admin' | 'user' | 'instructor';
  createdAt: Date;
  age?: number;
  avatarUrl?: string;
}
