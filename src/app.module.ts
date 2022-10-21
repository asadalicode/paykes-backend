import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/service/mail.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), MailModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule { }
