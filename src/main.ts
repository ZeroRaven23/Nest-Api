import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { enableSwaggerConfig } from './config/enable-swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/bank');
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const port = config.get('port');
  enableSwaggerConfig(app);
  await app.listen(port);
}
bootstrap();
