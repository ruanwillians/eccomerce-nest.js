import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UUID } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Param('email') email: string,
  ): Promise<UserEntity[] | UserEntity> {
    if (email) {
      return this.userService.getUserByEmail(email);
    }
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: UUID): Promise<UserEntity> {
    return this.userService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }
}
