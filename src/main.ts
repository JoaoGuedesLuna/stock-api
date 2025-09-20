import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { setupSwagger } from '@/config/swagger.config';
import { ResponseInterceptor } from '@/common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  setupSwagger(app);

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.APP_PORT ?? 3000, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Error starting the app', err);
  process.exit(1);
});
