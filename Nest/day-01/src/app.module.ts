import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { LoggerMiddleware } from './logger.middleware';
import { ResponseInterceptor } from './interceptors/transform.interceptor'; 
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/iti_nest_lab'),
    UserModule, 
    CoursesModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,      
      useClass: ResponseInterceptor,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // This applies the logger to all routes
  }
}