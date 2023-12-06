import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly document: string;

  @ApiProperty()
  readonly password: string = null;

  @ApiProperty()
  readonly typeuser: number;
}
