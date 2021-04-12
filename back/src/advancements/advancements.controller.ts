import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdvancementsService } from './advancements.service';
import { CreateAdvancementDto } from './dto/create-advancement.dto';
import { UpdateAdvancementDto } from './dto/update-advancement.dto';

@Controller('advancements')
export class AdvancementsController {
  constructor(private readonly advancementsService: AdvancementsService) {}

  @Post()
  create(@Body() createAdvancementDto: CreateAdvancementDto) {
    return this.advancementsService.create(createAdvancementDto);
  }

  @Get()
  findAll() {
    return this.advancementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advancementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvancementDto: UpdateAdvancementDto) {
    return this.advancementsService.update(+id, updateAdvancementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advancementsService.remove(+id);
  }
}
