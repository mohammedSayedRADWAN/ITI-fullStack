// src/user/interfaces/user.interface.ts
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  grade: number;
  role: 'admin' | 'user' | 'instructor';
  createdAt: Date;
  age?: number;
  avatarUrl?: string;
  courses?: string[] | number[];
}