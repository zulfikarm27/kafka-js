import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data.status) {
          ctx.switchToHttp().getResponse().status(data.status);
        }
        const query = ctx.switchToHttp().getRequest().query;

        return {
          status: data?.status,
          message: data?.message,
          result: data?.result,
          pageInfo: data?.pageInfo
            ? {
                ...data.pageInfo,
                isNextPage:
                  data.pageInfo.totalResults - query.pageSize * query.page > 0,
              }
            : undefined,
        };
      })
    );
  }
}
