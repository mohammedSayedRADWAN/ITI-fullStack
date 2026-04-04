import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required and cannot be empty' })
  name!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @IsOptional()
  @IsEnum(['admin', 'user', 'instructor'], { 
    message: 'Role must be either admin, user, or instructor' 
  })
  role?: 'admin' | 'user' | 'instructor';
  @IsNumber({}, { message: 'Grade must be a number' })
  @Min(0)
  @Max(100)
  grade!: number; // لازم تضاف هنا عشان "property grade should not exist" تختفي

  @IsNumber()
  @IsOptional()
  age?: number;
}