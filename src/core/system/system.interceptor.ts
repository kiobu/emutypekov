import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class InOutInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InOutInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(0);
    this.logger.log(`${context.getType()} => Request: ${req.url}`);
    return next.handle().pipe();
  }
}
