import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { Password } from './class/password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: UserEntity[] = [];

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const passwordInstance = new Password(createUser.password);
    const password = await passwordInstance.getPassword();
    return this.userRepository.save({
      ...createUser,
      password,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
