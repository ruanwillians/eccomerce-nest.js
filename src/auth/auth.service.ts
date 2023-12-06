import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(emailInvite: string, passwordInvite: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(emailInvite);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      const passwordMatch = await bcrypt.compare(passwordInvite, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Senha inválida');
      }
      const payload = { id: user.id, email: user.email, type: user.typeuser };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Erro ao comparar senhas');
    }
  }
}
