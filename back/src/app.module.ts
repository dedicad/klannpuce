import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
