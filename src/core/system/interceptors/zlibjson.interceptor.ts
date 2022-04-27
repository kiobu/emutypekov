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
  import { IO } from '../../common/util/io/io.service';
  import * as zlib from 'zlib';
  import * as util from 'util';
  
  const _deflate = util.promisify(zlib.deflate);
  
  @Injectable()
  export class ZLibDeflateJSONInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ZLibDeflateJSONInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      this.logger.debug("=> Response is zlib compressed.")
      const response: Response = context.switchToHttp().getResponse();
  
      response.setHeader('Content-Type', 'application/json');
  
      return next.handle().pipe(
        map(async (body) => {
          response.end(await _deflate(IO.cleanString(JSON.stringify(body))));
        }),
      );
    }
  }
  