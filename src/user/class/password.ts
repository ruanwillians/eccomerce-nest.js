import { hash } from 'bcrypt';

export class Password {
  constructor(
    private readonly password: string,
    private readonly saltOrRounds: number = 10,
  ) {}

  async getPassword(): Promise<string> {
    return await this.criptoPassword();
  }

  async criptoPassword(): Promise<string> {
    return await hash(this.password, this.saltOrRounds);
  }
}
