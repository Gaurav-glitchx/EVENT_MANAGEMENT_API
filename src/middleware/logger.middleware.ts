import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const timestamp = new Date().toISOString();
    const userAgent = req.get('user-agent') || '';

    this.logger.log(`[${timestamp}] ${method} ${originalUrl} - IP: ${ip} - Agent: ${userAgent}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || 0;

      this.logger.log(
        `[${timestamp}] ${method} ${originalUrl} - Status: ${statusCode} - Length: ${contentLength}`,
      );
    });

    next();
  }
}
