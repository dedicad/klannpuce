import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { teacher, student, admin } from './populate-db-init/initial-users';
import {
  intrusionDetection,
  reverseEngineering,
} from './populate-db-init/initial-subjects';
import { CreateSubjectDto } from './subjects/dto/create-subject.dto';
import { SubjectsService } from './subjects/subjects.service';

async function upsertUser(userService, newUser: CreateUserDto) {
  if (!(await userService.exists(newUser.email)))
    await userService.create(newUser);
}

async function upsertSubject(subjetService, newSubject: CreateSubjectDto) {
  if (!(await subjetService.exists(newSubject.name))) {
    await subjetService.create(newSubject, teacher);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: 'http://localhost:3000' }); // Only one domain allowed, localhost. This would need to be done with more granularity and security on a real app. This is only safe for local development.
  await app.listen(8000);
  const userService = app.get(UsersService);
  await upsertUser(userService, admin);
  await upsertUser(userService, student);
  await upsertUser(userService, teacher);

  //   const subjetService = app.get(SubjectsService);

  //   await upsertSubject(subjetService, reverseEngineering);
  //   await upsertSubject(subjetService, intrusionDetection);
}
bootstrap();
