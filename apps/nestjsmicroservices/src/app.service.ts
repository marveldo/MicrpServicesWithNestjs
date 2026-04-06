import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME , UserServiceClient} from '@app/packages/proto/user.pb';
import { CreateUserType, CreateWalletType } from '@app/packages';
import { catchError, Observable } from 'rxjs';
import { WalletServiceClient , WALLET_SERVICE_NAME, GetWalletByIdRequest} from '@app/packages/proto/wallet.pb';
import { handleGrpcError } from '@app/packages';

@Injectable()
export class AppService{

  constructor(){}

  getHello(): string {
    return 'Hello World!';
  }
}