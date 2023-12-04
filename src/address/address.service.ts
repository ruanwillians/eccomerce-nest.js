import { Injectable } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createNewAddress(
    createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    const newAddress = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(newAddress);
  }

  async getAllAddress(): Promise<AddressEntity[]> {
    return await this.addressRepository.find();
  }
}
