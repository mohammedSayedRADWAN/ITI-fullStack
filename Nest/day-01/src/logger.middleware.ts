import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // استخدام Logger الخاص بـ NestJS

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    // ننتظر حتى ينتهي الـ Request لنحسب الوقت والـ Status Code
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${duration}ms`
      );
    });

    next(); // الانتقال للخطوة التالية (Controller)
  }
}