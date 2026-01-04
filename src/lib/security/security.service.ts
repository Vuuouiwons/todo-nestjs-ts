import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { unauthorizedMessage } from 'src/common/constants';

@Injectable()
export class SecurityService {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly jwtService: JwtService) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException(unauthorizedMessage);
    }
  }
}