import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SignInDto, SignUpDto } from './dto/create-user.dto';
import { UserRepo } from './repository/user.repo';
import { SecurityService } from 'src/libs/security/security.service';
import { loginError } from 'src/common/constants';
import { Request } from 'express';
import { User } from 'src/common/database/user.entity';
import { resSignInI } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly securityService: SecurityService,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) { }  

  async userMe(user: User) {
    const id = user.id;
    const fetchedUser = await this.userRepo.findById(id) as User;

    return {
      username: fetchedUser.username
    }
  }
}
