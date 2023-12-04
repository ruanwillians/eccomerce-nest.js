import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  async getAllUsers() {
    return this.addressService.getAllAddress();
  }

  @Post()
  async createUser(@Body() createUser: CreateAddressDto) {
    return this.addressService.createNewAddress(createUser);
  }
}
