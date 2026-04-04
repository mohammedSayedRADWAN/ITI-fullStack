import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); // وقت بداية التنفيذ
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    return next.handle().pipe(
      // 1. في حالة النجاح (Success)
      map((data) => ({
        message: 'Request successful',
        responseCode: response.statusCode,
        timeExecution: new Date().toISOString(),
        duration: `${Date.now() - now}ms`,
        data: data, // البيانات الأصلية اللي جاية من الـ Controller
      })),
      
      // 2. في حالة الخطأ (Error)
      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse =
          err instanceof HttpException
            ? err.getResponse()
            : err?.message || String(err);

        return throwError(() => new HttpException({
          error: typeof errorResponse === 'object' ? errorResponse['message'] || errorResponse : errorResponse,
          errorCode: statusCode,
          timeExecution: new Date().toISOString(),
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // يظهر الـ stack في التطوير فقط
          duration: `${Date.now() - now}ms`,
        }, statusCode));
      }),
    );
  }
}