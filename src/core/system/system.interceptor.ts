import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import { response, Response } from 'express';
import { IO } from '../common/util/io/io.service';
import * as zlib from 'zlib';
import * as util from 'util';

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

    const response: Response = context.switchToHttp().getResponse();

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'EmuTypekov');
    response.setHeader('Set-Cookie', 'PHPSESSID=undefined');

    return next.handle().pipe(
      map(async (res) => {
        const body = await _deflate(IO.cleanString(JSON.stringify(res)));

        /*zlib.inflate(x, (err, buf) => {
          console.log(buf.toString('utf-8'));
        });*/

        return body.toString('utf-8');
      }),
    );
  }
}
