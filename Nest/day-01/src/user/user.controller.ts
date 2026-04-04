import { Controller, Get, Post, Body, Param, Patch, Delete,UseGuards, SetMetadata,UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service'; 
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto'; 
import { RoleGuard } from '../auth/role.guard'; 
import { AuthGuard } from '../auth/auth.guard'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

//@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  @Post('upload-avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads', // المجلد اللي هتتحفظ فيه الصور
      filename: (req, file, callback) => {
        // إنشاء اسم فريد للملف: الوقت الحالي + رقم عشوائي + الامتداد الأصلي
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
    // اختياري: التأكد من نوع الملف (Images only)
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    }
  }))
  uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const avatarUrl = `/user/avatars/${file.filename}`;
    // تحديث المستخدم بالرابط الجديد في الـ Service
    return this.userService.updateAvatar(+id, avatarUrl);
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) { 
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard) 
  @SetMetadata('roles', ['admin'])
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}