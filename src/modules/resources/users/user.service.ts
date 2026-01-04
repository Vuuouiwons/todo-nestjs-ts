import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SignInDto, SignUpDto } from './dto/create-user.dto';
import { UserRepo } from './repository/user.repo';
import { SecurityService } from 'src/lib/security/security.service';
import { loginError } from 'src/common/constants';
import { Request } from 'express';
import { User } from 'src/common/database/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly securityService: SecurityService,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) { }

  async signUp(body: SignUpDto) {
    return await this.dataSource.transaction(async (manager) => {
      const { username, email, password } = body


      const isEmailRegistered = await this.userRepo.findByEmail(email)

      if (isEmailRegistered !== null) throw new BadRequestException('email already registered');

      const hashedPassword = await this.securityService.hashPassword(password);

      await this.userRepo.create({
        username,
        password: hashedPassword,
        email
      }, manager);
    });

  }

  async signIn(body: SignInDto) {
    const { email, password } = body

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new BadRequestException(loginError);
    }

    const isPasswordMatching = await this.securityService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatching) {
      throw new BadRequestException(loginError);
    }

    const token = await this.securityService.generateToken({
      id: user.id,
      email: user.email
    });

    return {
      token
    };
  }

  async findOne() {
    const id = 1;

    const user = await this.userRepo.findById(id) as User;

    return {
      username: user.username
    }
  }
}
