import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderInfo } from 'src/types/user';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    return user
      ? this.userRepository.save({ ...user, ...createUserDto })
      : this.userRepository.create(createUserDto).save();
  }

  async findUserByProviderInfoWithRooms(providerInfo: ProviderInfo) {
    return this.userRepository.findOne({
      where: providerInfo,
      relations: ['joinedRooms'],
    });
  }

  async findUserByProviderInfo(providerInfo: ProviderInfo) {
    return this.userRepository.findOne({
      where: providerInfo,
    });
  }

  async getJoinedRoom(user: User) {
    const joinedRooms = await user.joinedRooms;
    if (joinedRooms == null) {
      throw new BadRequestException('joinedRooms is null');
    }
    if (joinedRooms.length !== 1) {
      throw new InternalServerErrorException(
        `zero or multiple joined rooms ${joinedRooms.length}`,
      );
    }

    return joinedRooms[0];
  }
}
