import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Success`);
      }),
      catchError((error) => {
        this.logger.error('Error occurred:', error);  
        this.logger.error('Error code:', error?.code);
        this.logger.error('Error message:', error?.message);
        this.logger.error('Stack:', error?.stack);
        return throwError(() => error);
      }),
    );
  }
}