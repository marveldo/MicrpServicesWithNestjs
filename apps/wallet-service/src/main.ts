import { NestFactory } from '@nestjs/core';
import { WalletServiceModule } from './wallet-service.module';
import {Transport , MicroserviceOptions} from "@nestjs/microservices";
import { join } from 'path';
import {LoggingInterceptor} from "@app/packages";
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WalletServiceModule, {
    logger : ['error', 'warn', 'log', 'debug', 'verbose'],
    transport : Transport.GRPC,
    options : {
      package : "wallet",
      protoPath : join(__dirname, '../../../libs/packages/src/proto/wallet.proto'),
      url : "0.0.0.0:3001"
    }
  },
);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();

