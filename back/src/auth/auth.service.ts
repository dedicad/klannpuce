import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isMatch = await bcrypt.compare(password, user?.passwordHash);
    if (user && isMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User){
    const payload = {email: user.email, username: user.name, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
