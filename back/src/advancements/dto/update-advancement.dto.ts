import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvancementDto } from './create-advancement.dto';

export class UpdateAdvancementDto extends PartialType(CreateAdvancementDto) {}
