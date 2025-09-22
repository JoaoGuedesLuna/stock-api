import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Inventory-API')
    .setDescription(
      'RESTful API for managing product inventory, including stock tracking, product details, and warehouse management.'
    )
    .setVersion('0.0.1')
    .setContact('João Guedes', 'https://github.com/joaoguedesluna', 'joaoguedesluna@gmail.com')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the JWT token as: Bearer <token>'
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
}
