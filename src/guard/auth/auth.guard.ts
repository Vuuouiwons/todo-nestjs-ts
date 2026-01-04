import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';
import { SecurityService } from 'src/lib/security/security.service';
import { unauthorizedMessage } from 'src/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [authType, token] = request.headers.authorization?.split(' ');

    if (authType !== 'Bearer') throw new UnauthorizedException(unauthorizedMessage);
    if (!token) throw new UnauthorizedException(unauthorizedMessage);

    const payload = await this.securityService.verifyToken(token);
    request['user'] = payload;
    
    return true;
  }
}
