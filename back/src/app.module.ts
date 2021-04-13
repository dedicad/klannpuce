import { Module, ModuleMetadata, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from './subjects/subjects.module';
import { AdvancementsModule } from './advancements/advancements.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

const activateAuthentication = true; // Todo : remove this line, it should only be used through development variable maybe.

const providers = activateAuthentication
  ? [
      AppService,
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
    ]
  : [AppService];
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    SubjectsModule,
    AdvancementsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
