import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  grade: number;

  @Prop({ enum: ['admin', 'user', 'instructor'], default: 'user' })
  role: string;

  @Prop()
  age: number;

  @Prop()
  avatarUrl: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }] })
  courses: string[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);
