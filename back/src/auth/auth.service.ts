import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
      console.log("email : ", email, "password : ", password)
    const user = await this.usersService.findOne(email);
    const isMatch = await bcrypt.compare(password, user?.passwordHash)
    if (user && isMatch) {

      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }
}
