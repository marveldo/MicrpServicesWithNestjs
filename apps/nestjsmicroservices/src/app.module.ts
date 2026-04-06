import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
  LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' 
          ? { target: 'pino-pretty' } 
          : undefined,
      },
    }),
    UsersModule,
    WalletModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
