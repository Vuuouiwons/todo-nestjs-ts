import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashSync, compareSync } from "bcryptjs";
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { jwtGenerate, jwtGenerateI } from '../../common/jwt';
import { RegisterDto, LoginDto } from './dto';
import { parseResponse } from '../dto/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }

  async register(registerBody: RegisterDto) {
    const username: string = registerBody.username;
    const password: string = registerBody.password;
    const isUserExist = await this.usersRepository.findOne({
      where: {
        username
      }
    });

    if (isUserExist)
      throw new HttpException('username exist', HttpStatus.BAD_REQUEST);

    const hash: string = hashSync(password, 10)
    const newUser = new User();
    newUser.username = username;
    newUser.password = hash;

    if (!await this.usersRepository.save(newUser)) {
      throw new HttpException('database error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return parseResponse(0,
      'RE',
      HttpStatus.CREATED,
      '',
      null);
  }

  async login(loginBody: LoginDto) {
    const username: string = loginBody.username;
    const password: string = loginBody.password;

    const unauthenticatedMessage = "username or password doesn't exist";

    const userInformation: User | null = await this.usersRepository.findOne({
      where: {
        username
      }
    });

    if (!userInformation || !compareSync(password, userInformation.password))
      throw new HttpException(unauthenticatedMessage, HttpStatus.UNAUTHORIZED);


    const jwtData: jwtGenerateI = {
      id: userInformation.id,
      username: userInformation.username
    }
    const token = jwtGenerate(jwtData)

    return parseResponse(0,
      'RE',
      HttpStatus.OK,
      'OK',
      { token });
  }
}
