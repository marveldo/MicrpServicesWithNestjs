import { NestFactory } from '@nestjs/core';
import { WalletServiceModule } from './wallet-service.module';
import {Transport , MicroserviceOptions} from "@nestjs/microservices";
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WalletServiceModule, {
    transport : Transport.GRPC,
    options : {
      package : "wallet",
      protoPath : join(__dirname, '../../../libs/packages/src/proto/wallet.proto'),
      port : "0.0.0.0:3001"
    }
  });
  await app.listen();
}
bootstrap();

