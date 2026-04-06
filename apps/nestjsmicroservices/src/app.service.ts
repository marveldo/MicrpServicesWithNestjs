import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME , UserServiceClient} from '@app/packages/proto/user.pb';
import { CreateUserType, CreateWalletType } from '@app/packages';
import { catchError, Observable } from 'rxjs';
import { WalletServiceClient , WALLET_SERVICE_NAME, GetWalletByIdRequest} from '@app/packages/proto/wallet.pb';
import { handleGrpcError } from '@app/packages';

@Injectable()
export class AppService implements OnModuleInit {
  private userService : UserServiceClient
  private walletService : WalletServiceClient
  constructor(
    @Inject("USER_PACKAGE") private client : ClientGrpc,
    @Inject("WALLET_PACKAGE") private walletClient : ClientGrpc
  ){}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
    this.walletService = this.walletClient.getService<WalletServiceClient>(WALLET_SERVICE_NAME)
  }

  createUser(data : CreateUserType) {

    return this.userService.createUser(data).pipe(
       catchError((error) => {
         handleGrpcError(error);
         throw new Error(`Failed to create user: ${error.message}`);
      })
    )
        
  }
    
  getUserById(id : number) {
     return this.userService.getUserbyId({id}).pipe(
       catchError((error) => {
         handleGrpcError(error);
         throw new Error(`Failed to get user: ${error.message}`);
      })
    )
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