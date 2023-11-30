import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderInfo } from 'src/types/user';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { provider, providerId } = createUserDto;
    const user = await this.findUserByProviderInfo({ provider, providerId });

    if (user) throw new BadRequestException('이미 존재하는 유저입니다');
    return this.userRepository.create(createUserDto).save();
  }

  async findUserByProviderInfo(providerInfo: ProviderInfo) {
    return this.userRepository.findOne({
      where: providerInfo,
    });
  }

  async findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
