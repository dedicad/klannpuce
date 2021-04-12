import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('')
  getAll() {
    return this.service.findAll();
  }

  @Get(':email')
  get(@Param() params) {
    return this.service.findOne(params.email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.service.create(createUserDto);
  }

  @Put()
  update(@Body() user: User) {
    return this.service.update(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
