import { Injectable } from '@nestjs/common';
import { UserRepo } from './repository/user.repo';
import { User } from 'src/common/database/user.entity';
import { ResponseUserMeDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
  ) { }  

  async userMe(user: User): Promise<ResponseUserMeDto> {
    const id = user.id;
    const fetchedUser = await this.userRepo.findById(id) as User;

    return {
      username: fetchedUser.username
    }
  }
}
