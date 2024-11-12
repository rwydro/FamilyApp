import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Można też podać konkretną domenę, np. 'http://localhost:3000'
    methods: 'GET,POST,PUT,DELETE', // Dozwolone metody HTTP
    allowedHeaders: 'Content-Type, Authorization', // Dozwolone nagłówki
  });
  const config = new DocumentBuilder()
      .setTitle('Family app')
      .setDescription('The family API description')
      .setVersion('1.0')
      .addTag('family')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8888);
}
bootstrap();
