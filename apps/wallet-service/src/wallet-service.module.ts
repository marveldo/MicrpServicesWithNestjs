import { Module } from '@nestjs/common';
import { WalletServiceController } from './wallet-service.controller';
import { WalletService } from './wallet-service.service';
import { PrismaModule } from '@app/packages';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';
import { WalletRepository } from './wallet-repository';


@Module({
  imports: [
    ClientsModule.register([
    {
      name: "USER_PACKAGE",
      transport: Transport.GRPC,  
      options: {
       package: 'user',
       protoPath: join(__dirname, '../../../libs/packages/src/proto/user.proto'),
       url: 'localhost:3002'
     }
    }
    ]),
    PrismaModule
],
  controllers: [WalletServiceController],
  providers: [WalletService, WalletRepository],
})
export class WalletServiceModule {}
