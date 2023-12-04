import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds: number = 10;
    const password = await hash(createUser.password, saltOrRounds);
    return this.userRepository.save({
      ...createUser,
      password,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
