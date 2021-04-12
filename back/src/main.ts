import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' }); // Only one domain allowed, localhost. This would need to be done with more granularity and security on a real app. This is only safe for local development.
  await app.listen(8000);
}
bootstrap();
