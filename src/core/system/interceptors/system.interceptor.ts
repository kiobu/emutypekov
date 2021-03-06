import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SystemInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SystemInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(0);
    this.logger.debug(
      `${context.getType()}: ${req.socket.remoteAddress} => Request: ${
        req.url
      }`,
    );

    const response: Response = context.switchToHttp().getResponse();

    response.setHeader('X-Powered-By', 'EmuTypekov');
    response.setHeader('Set-Cookie', 'PHPSESSID=undefined');

    return next.handle().pipe(
      map((body) => {
        return body;
      }),
    );
  }
}
