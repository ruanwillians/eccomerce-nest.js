import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CacheService } from 'src/cache/cache.service';

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

  async getUserById(userId: string): Promise<UserEntity[]> {
    return this.cacheService.getCache<UserEntity[]>(`user_${userId}`, () =>
      this.userRepository.find({
        where: {
          id: userId,
        },
      }),
    );
  }

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds: number = 10;
    const password = await hash(createUser.password, saltOrRounds);
    return this.userRepository.save({
      ...createUser,
      password,
    });
  }
}
