import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    PaymentModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRoot(config().mongoDB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
