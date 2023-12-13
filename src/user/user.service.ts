import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CacheService } from 'src/cache/cache.service';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.cacheService.getCache<UserEntity>(
      `user_${email}`,
      () =>
        this.userRepository.findOne({
          where: {
            email,
          },
        }),
    );

    return user;
  }

  async getUserById(userId: UUID): Promise<UserEntity> {
    const user = await this.cacheService.getCache<UserEntity>(
      `user_${userId}`,
      () =>
        this.userRepository.findOne({
          where: {
            id: userId,
          },
        }),
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds: number = 10;
    const password = await hash(createUser.password, saltOrRounds);
    const user = await this.getUserByEmail(createUser.email);

    if (user) {
      throw new ConflictException('Email already exist');
    }
    return this.userRepository.save({
      ...createUser,
      password,
    });
  }
}
