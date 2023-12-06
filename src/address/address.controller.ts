import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.addressService.getAllAddress();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() createUser: CreateAddressDto) {
    return this.addressService.createNewAddress(createUser);
  }
}
