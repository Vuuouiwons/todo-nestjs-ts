import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRepo } from 'src/modules/resources/users/repository/user.repo';

@Injectable()
export class IdentityInterceptor implements NestInterceptor {
  constructor(private userRepo: UserRepo) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const user = await this.userRepo.findById(request.user.id);

    request.user = user;

    return next.handle();
  }
}
