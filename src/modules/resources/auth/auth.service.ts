import { Injectable, Inject } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto/create-auth.dto';
import { UserRepo } from '../user/repository/user.repo';
import { SecurityService } from 'src/libs/security/security.service';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { loginError } from 'src/common/constants';
import { SignInResponseDto } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly securityService: SecurityService,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) { }
  async signUp(body: SignUpDto): Promise<void> {
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

  async signIn(body: SignInDto): Promise<SignInResponseDto> {
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
}
