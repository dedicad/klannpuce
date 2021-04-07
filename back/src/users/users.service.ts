import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.passwordHash = createUserDto.passwordHash;
    user.role = 'student'; // by default

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['name', 'email', 'role'],
      where: [{ id: _id }],
    });
  }

  async update(user: User) {
    this.usersRepository.save(user);
  }

  async delete(user: User) {
    this.usersRepository.delete(user);
  }
}
