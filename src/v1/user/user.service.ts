import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  register(registerBody: RegisterDto) {
    const username: string = registerBody.username;
    const password: string = registerBody.password;

    console.log(username, password);

    return 'register';
  }

  login(loginBody: LoginDto) {
    const username: string = loginBody.username;
    const password: string = loginBody.password;

    console.log(username, password);

    return `login`;
  }
}
