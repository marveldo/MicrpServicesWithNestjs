import { Module } from '@nestjs/common';
import { WalletServiceController } from './wallet-service.controller';
import { WalletServiceService } from './wallet-service.service';
import { PrismaModule } from '@app/packages';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';


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
  providers: [WalletServiceService],
})
export class WalletServiceModule {}
