import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Course title is required' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Instructor name is required' })
  instructor!: string;

  @IsNumber()
  @Min(0, { message: 'Price cannot be a negative value' })
  price!: number;

  
}

