import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ClientsModule , Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports : [
    ClientsModule.register([
     {
        name: "WALLET_PACKAGE",
        transport: Transport.GRPC,  
        options: {
         package: 'wallet',
          protoPath: join(__dirname, '../../../../libs/packages/src/proto/wallet.proto'),
          url: 'localhost:3001'
       }
     }
      ]),],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
