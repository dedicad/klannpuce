import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAdvancementDto } from './dto/create-advancement.dto';
import { UpdateAdvancementDto } from './dto/update-advancement.dto';
import { Advancement } from './entities/advancement.entity';

@Injectable()
export class AdvancementsService {
  constructor(
    @InjectRepository(Advancement)
    private advancementRepository: Repository<Advancement>,
  ) {}
  async create(
    createAdvancementDto: CreateAdvancementDto,
    user: User,
  ): Promise<Advancement> {
    const advancement = new Advancement();
    advancement.userId = user.id;
    advancement.taskId = createAdvancementDto.taskId;

    const count = await this.advancementRepository.count({
      where: { taskId: createAdvancementDto.taskId, userId: user.id },
    });
    if (count === 0) {
      // The task has not already been validated, we can validate it
      return this.advancementRepository.save(advancement);
    }
    throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
  }

  async findAll(user: User) {
    return await this.advancementRepository.find({
      where: [{ userId: user.id }],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} advancement`;
  }

  update(id: number, updateAdvancementDto: UpdateAdvancementDto) {
    return `This action updates a #${id} advancement`;
  }

  async remove(id: number, user: User) {
    const count = await this.advancementRepository.count({
      where: { id: id, userId: user.id },
    });
    if (count > 0) {
      // The task has been previously validated by this user (because it exists) so we can delete it
      this.advancementRepository.delete(id);
    }
    throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
  }
}
