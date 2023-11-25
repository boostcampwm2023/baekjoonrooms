import { Injectable } from '@nestjs/common';
import User from '../entities/user.entity';

@Injectable()
export class UserService {
  async create(username: string) {
    const user = new User();
    user.username = username;
    await user.save();
    return user;
  }

  async findOne(param: { username: string }) {
    return User.findOne({ where: param });
  }
}
