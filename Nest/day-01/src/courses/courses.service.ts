import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity'; // استيراد الـ Entity

@Injectable()
export class CoursesService {
  private courses: Course[] = [];

  create(createCourseDto: CreateCourseDto) {
    const newCourse: Course = {
      id: Date.now(), // توليد ID فريد
      ...createCourseDto,
      createdAt: new Date(),
    } as Course;

    this.courses.push(newCourse);
    return newCourse;
  }

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses.find(course => course.id === id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const index = this.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      // دمج البيانات الجديدة مع القديمة
      this.courses[index] = { 
        ...this.courses[index], 
        ...updateCourseDto 
      };
      return this.courses[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      const deletedCourse = this.courses[index];
      this.courses.splice(index, 1); // حذف العنصر من المصفوفة
      return { message: 'Course deleted successfully', deletedCourse };
    }
    return null;
  }
}