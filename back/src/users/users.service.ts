import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;

    const hash = await bcrypt.hash(createUserDto.password, saltRounds); // Salt is auto-generated by bcrypt.
    user.passwordHash = hash;

    user.role = 'student'; // by default

    return this.usersRepository.save(user);
  }

  async findAll(user: User): Promise<User[]> {
    console.log('The connected user is :', user);
    return await this.usersRepository.find();
  }

  async findOne(_email: string): Promise<User> {
    return (
      await this.usersRepository.find({
        select: ['name', 'email', 'role', 'passwordHash'],
        where: [{ email: _email }],
      })
    )[0];
  }

  async update(user: User) {
    this.usersRepository.save(user);
  }

  async delete(user: User) {
    this.usersRepository.delete(user);
  }
}
