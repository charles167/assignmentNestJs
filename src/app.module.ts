import * as bodyParser from 'body-parser';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './departments/department.module';
import * as dotenv from 'dotenv';

dotenv.config()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), // Update with your MongoDB URI
    AuthModule,
    DepartmentModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
      .forRoutes('*');
  }
}
