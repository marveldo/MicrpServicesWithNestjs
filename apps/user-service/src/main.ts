import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import {Transport , MicroserviceOptions} from "@nestjs/microservices";
import { join } from 'path';
import { LoggingInterceptor } from '@app/packages';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceModule, {
    transport : Transport.GRPC,
    options : {
      package : "user",
      protoPath : join(__dirname, '../../../libs/packages/src/proto/user.proto'),
      url : "0.0.0.0:3002",
    }
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
