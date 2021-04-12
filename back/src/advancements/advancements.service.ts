import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdvancementDto } from './dto/create-advancement.dto';
import { UpdateAdvancementDto } from './dto/update-advancement.dto';
import { Advancement } from './entities/advancement.entity';

@Injectable()
export class AdvancementsService {
  constructor(
    @InjectRepository(Advancement) private advancementRepository: Repository<Advancement>,
  ) {}
  create(createAdvancementDto: CreateAdvancementDto): Promise<Advancement> {
    // Todo : It would be better to check if the taskId exists
    // Todo : we should retrieve the userId directly from the auth Middleware
    const advancement = new Advancement();
    advancement.userId = createAdvancementDto.userId;
    advancement.taskId = createAdvancementDto.taskId;

    return this.advancementRepository.save(advancement);
    };


  async findAll() {
    return await this.advancementRepository.find(
      // {      where: [{userId: }]} TODO : user userId from auth Middleware
      );

  }

  findOne(id: number) {
    return `This action returns a #${id} advancement`;
  }

  update(id: number, updateAdvancementDto: UpdateAdvancementDto) {
    return `This action updates a #${id} advancement`;
  }

  remove(id: number) {
    // Todo, we also need to check that the userId is the same one that come from the auth Middleware.
    this.advancementRepository.delete(id);
  }
}
