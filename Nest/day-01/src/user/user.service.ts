
import { Injectable, NotFoundException } from '@nestjs/common';
import { User} from './interface/user.interface';


@Injectable()
export class UserService {
 private users: User[] = [
  {
    id: 1,
    name: "Mohammed Sayed",
    email: "mohammed@example.com",
    username: "mo_dev",
    grade: 95,
    role: "admin",
    createdAt: new Date('2026-01-10T10:00:00Z')
  },
  {
    id: 2,
    name: "Ahmed Ali",
    email: "ahmed.ali@example.com",
    username: "ahmed_99",
    grade: 92,
    role: "instructor",
    createdAt: new Date('2026-02-15T14:30:00Z')
  },
  {
    id: 3,
    name: "Sara Hassan",
    email: "sara.h@example.com",
    username: "sara_designer",
    grade: 85,
    role: "user",
    createdAt: new Date('2026-03-01T09:15:00Z')
  },
  {
    id: 4,
    name: "Eng. Doaa Samy",
    email: "doaa.samy@iti.gov.eg",
    username: "doaa_instructor",
    grade: 90,
    role: "instructor",
    createdAt: new Date('2026-03-20T11:00:00Z')
  }
]; // In-memory storage
// داخل كلاس UserService
updateAvatar(id: number, avatarUrl: string) {
  // 1. البحث عن المستخدم المراد تحديث صورته
  const userIndex = this.users.findIndex((u) => u.id === id);

  // 2. إذا لم يجد المستخدم، يرمي خطأ 404
  if (userIndex === -1) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  // 3. تحديث حقل الـ avatarUrl فقط مع الحفاظ على باقي البيانات
  this.users[userIndex] = {
    ...this.users[userIndex],
    avatarUrl: avatarUrl,
  };

  // 4. إرجاع المستخدم بعد التعديل ليتأكد الـ Controller من نجاح العملية
  return this.users[userIndex];
}
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(user: any) {
  const newUser: User = { 
    id: Date.now(),            // توليد ID فريد مؤقت
    ...user,              
    role: user.role || 'user',
               // 
    createdAt: new Date() 
  };

  this.users.push(newUser);
  return newUser;
}

  update(id: number, updateUserDto: any) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    return { deleted: true };
  }
}