import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalPipes } from './pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  globalPipes(app);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
