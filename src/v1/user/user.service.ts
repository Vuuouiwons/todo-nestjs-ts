import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from "bcryptjs";
import { jwtGenerate, jwtGenerateI } from '../../common/jwt';
import { parseResponse } from '../dto/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }

  async register(registerBody: RegisterDto) {
    const username: string = registerBody.username;
    const password: string = registerBody.password;

    const hash: string = hashSync(password, 10)

    const isUserExist = await this.usersRepository.findOneBy({ username });

    if (isUserExist) {
      throw new HttpException('username exist', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = hash;

    if (!await this.usersRepository.save(newUser)) {
      throw new HttpException('database error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginBody: LoginDto) {
    const username: string = loginBody.username;
    const password: string = loginBody.password;

    const unauthenticatedMessage = "username or password doesn't exist";

    const userInformation: User | null = await this.usersRepository.findOneBy({ username });

    if (userInformation === null || !compareSync(password, userInformation.password)) {
      throw new HttpException(unauthenticatedMessage, HttpStatus.UNAUTHORIZED);
    }

    const jwtData: jwtGenerateI = {
      id: userInformation.id,
      username: userInformation.username
    }
    const token = jwtGenerate(jwtData)

    return parseResponse(0, 'RE', 200, 'OK', { token });
  }
}
