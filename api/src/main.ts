import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(AppConfigService);
  
  app.enableCors({
    origin: [
      'http://localhost:3001',  // Your frontend dev server
      'http://localhost:3000',  // Alternative dev port
      'http://127.0.0.1:3001',  // Alternative localhost
      'http://127.0.0.1:3000',  // Alternative localhost
      'https://inspo-closet-staging.vercel.app'  // Your production frontend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = configService.port;
  await app.listen(port);
  
  console.log(`API running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
