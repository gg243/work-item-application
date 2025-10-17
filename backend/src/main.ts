import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS BEFORE listening
  app.enableCors({
    origin: 'http://localhost:3000', // your Next.js frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
  console.log(
    ` Server running on http://localhost:${process.env.PORT ?? 5000}`,
  );
}
bootstrap();
