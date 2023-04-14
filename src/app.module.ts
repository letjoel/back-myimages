import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config()
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
