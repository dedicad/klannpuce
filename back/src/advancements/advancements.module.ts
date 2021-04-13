import { Module } from '@nestjs/common';
import { AdvancementsService } from './advancements.service';
import { AdvancementsController } from './advancements.controller';
import { Advancement } from './entities/advancement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Advancement])],
  controllers: [AdvancementsController],
  providers: [AdvancementsService],
  exports: [AdvancementsService],
})
export class AdvancementsModule {}
