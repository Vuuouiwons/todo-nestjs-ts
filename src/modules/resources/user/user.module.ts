import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common/database/database.providers';
import { UserRepo } from './repository/user.repo';
import { SecurityModule } from 'src/libs/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [UserController],
  providers: [UserService, UserRepo],
})
export class UserModule { }
