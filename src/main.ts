import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  // Set the config options
  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: "https://paykes.firebaseio.com",
  });

  app.enableCors();
  const PORT = Number(process.env.PORT) || 8080;
  app.useGlobalPipes(new ValidationPipe());
  console.log("App running on", PORT)
  await app.listen(PORT);
}
bootstrap();
