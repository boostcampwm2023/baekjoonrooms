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

  async createOrUpdateUser(createUserDto: CreateUserDto) {
    const { provider, providerId } = createUserDto;
    const user = await this.findUserByProviderInfo({ provider, providerId });

    if (user) {
      // TODO: check if user info is actually updated by the ORM
      await this.userRepository.update(user.id, createUserDto);
      return this.userRepository.findOneBy({ id: user.id });
    } else {
      return this.userRepository.create(createUserDto).save();
    }
  }

  async findUserByProviderInfo(providerInfo: ProviderInfo) {
    return this.userRepository.findOne({
      where: providerInfo,
      relations: {
        joinedRooms: true,
      },
    });
  }

  async findUserWithRoomById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['joinedRooms'],
    });
  }
}
