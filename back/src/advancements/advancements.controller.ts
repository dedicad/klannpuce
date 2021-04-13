import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserDecorator } from 'src/users/user.decorator';
import { AdvancementsService } from './advancements.service';
import { CreateAdvancementDto } from './dto/create-advancement.dto';
import { UpdateAdvancementDto } from './dto/update-advancement.dto';

@Controller('advancements')
export class AdvancementsController {
  constructor(private readonly advancementsService: AdvancementsService) {}

  @Post()
  create(@Body() createAdvancementDto: CreateAdvancementDto, @UserDecorator() user: User) {
    return this.advancementsService.create(createAdvancementDto, user);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    return this.advancementsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advancementsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdvancementDto: UpdateAdvancementDto,
  ) {
    return this.advancementsService.update(+id, updateAdvancementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.advancementsService.remove(+id, user);
  }
}
