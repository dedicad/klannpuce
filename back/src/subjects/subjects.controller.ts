import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { User } from 'src/users/entities/user.entity';
import { UserDecorator } from 'src/users/user.decorator';
import { Roles } from 'src/auth/roles.decorators';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @Roles('teacher')
  create(
    @Body() createSubjectDto: CreateSubjectDto,
    @UserDecorator() user: User,
  ) {
    return this.subjectsService.create(createSubjectDto, user);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('teacher')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @Roles('teacher')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
