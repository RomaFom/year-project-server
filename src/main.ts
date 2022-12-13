import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3500;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Year Project API Docs')
    .setDescription('The NestJS Dictionary API description')
    .setVersion('1.0.0')
    .addTag('Year Project')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
