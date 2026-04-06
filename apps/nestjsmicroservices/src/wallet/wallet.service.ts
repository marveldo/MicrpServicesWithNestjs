import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {  CreateWalletType } from '@app/packages';
import { catchError } from 'rxjs';
import { WalletServiceClient , WALLET_SERVICE_NAME, GetWalletByIdRequest} from '@app/packages/proto/wallet.pb';
import { handleGrpcError } from '@app/packages';

@Injectable()
export class WalletService  implements OnModuleInit {
    private walletService : WalletServiceClient
    constructor(
         @Inject("WALLET_PACKAGE") private walletClient : ClientGrpc
    ){}
    onModuleInit() {
        this.walletService = this.walletClient.getService<WalletServiceClient>(WALLET_SERVICE_NAME)
    }
    createWallet(data : CreateWalletType) {
    return this.walletService.createWallet(data).pipe(
       catchError((error) => {
         handleGrpcError(error);
          throw new Error(`Failed to create wallet: ${error.message}`);
      })
    )
 }

  getWalletById(data : GetWalletByIdRequest ) {
    return this.walletService.getWalletById(data).pipe(
       catchError((error) => {
         handleGrpcError(error);
          throw new Error(`Failed to get wallet: ${error.message}`);
      })
    )
  }

  creditWallet(data : { userId: number, amount: number }) {
    return this.walletService.creditWallet({id : data.userId , amount : data.amount}).pipe(
       catchError((error) => {
         handleGrpcError(error);
          throw new Error(`Failed to credit wallet: ${error.message}`);
      }
    ))
  }
  debitWallet(data : { userId: number, amount: number }) {
    return this.walletService.debitWallet({id : data.userId , amount : data.amount}).pipe(
       catchError((error) => {
          handleGrpcError(error);
          throw new Error(`Failed to debit wallet: ${error.message}`);
      }
    ))
  }
}
