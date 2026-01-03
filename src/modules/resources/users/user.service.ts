import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async signUp(body: SignUpDto) {
    return 'This action adds a new user';
  }

  async signIn(body: SignInDto) {
    return {
      foo: 'bar'
    };
  }

  async findOne() {
    return;
  }
}
