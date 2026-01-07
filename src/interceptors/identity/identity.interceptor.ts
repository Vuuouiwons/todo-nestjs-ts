import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { unauthorizedMessage } from 'src/common/constants';
import { UserRepo } from 'src/modules/resources/user/repository/user.repo';

@Injectable()
export class IdentityInterceptor implements NestInterceptor {
  constructor(private userRepo: UserRepo) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const user = await this.userRepo.findById(request.user.id);

    if (!user) throw new NotFoundException('User not found')

    request.user = user;

    return next.handle();
  }
}
