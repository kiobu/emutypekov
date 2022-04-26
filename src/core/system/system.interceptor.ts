import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import * as zlib from 'zlib'
import * as util from 'util'

const _deflate = util.promisify(zlib.deflate);

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

    if (!req.headers['x-no-compression']) {
      //response.setHeader('Content-Encoding', 'deflate');
    }

    return next.handle().pipe(map(data => {
      const response: Response = context.switchToHttp().getResponse();

      // return _deflate(data).then(data);
      return data;
    }))
  }
}
