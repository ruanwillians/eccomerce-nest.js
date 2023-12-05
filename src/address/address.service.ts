import { Injectable } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
  ) {}

  async createNewAddress(
    createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    await this.userService.getUserById(createAddressDto.userid);
    const newAddress = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(newAddress);
  }

  async getAllAddress(): Promise<AddressEntity[]> {
    return await this.addressRepository.find();
  }
}
