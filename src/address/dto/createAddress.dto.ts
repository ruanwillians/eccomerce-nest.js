import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class CreateAddressDto {
  @ApiProperty()
  readonly userid: UUID;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly district: string;

  @ApiProperty()
  readonly street: string;

  @ApiProperty()
  readonly cep: number;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly complement: string;
}
