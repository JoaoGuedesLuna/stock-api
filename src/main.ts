import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { setupSwagger } from '@/config/swagger.config';
import { HttpResponseInterceptor } from '@/common/interceptors';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  setupSwagger(app);

  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APP_PORT ?? 3000, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Error starting the app', err);
  process.exit(1);
});
