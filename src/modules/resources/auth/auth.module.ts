import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/common/database/database.providers';
import { SecurityModule } from 'src/libs/security/security.module';
import { UserRepo } from '../user/repository/user.repo';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepo],
})
export class AuthModule { }
