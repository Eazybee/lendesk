import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { PORT } from './constants';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors(); // TODO: add configuration

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api/v1')

  const config = new DocumentBuilder()
  .setTitle('Lendesk API')
  .setDescription('Documentation for the Lendesk API v1')
  .setVersion('1.0')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory);

  await app.listen(PORT);
}
bootstrap();
