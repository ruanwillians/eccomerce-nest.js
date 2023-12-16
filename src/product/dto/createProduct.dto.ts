import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly categoryid: UUID;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly promotion: boolean;

  @ApiProperty()
  readonly image: string;
}
