import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet-service.service';
import { GrpcMethod  } from '@nestjs/microservices';
import { OnModuleInit, Inject } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient , USER_SERVICE_NAME } from '@app/packages/proto/user.pb';
import type {CreateWalletRequest, WalletResponse, GetWalletByIdRequest} from '@app/packages'
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { catchError , lastValueFrom} from 'rxjs';



@Controller()
export class WalletServiceController implements OnModuleInit {
  private userserviceClient :   UserServiceClient
  constructor(
    private readonly walletServiceService: WalletService,
    @Inject("USER_PACKAGE") private client : ClientGrpc
  ) {}
  onModuleInit() {
    this.userserviceClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME) 
  }


  @GrpcMethod("WalletService", "CreateWallet")
  async createWallet(data : CreateWalletRequest) : Promise<WalletResponse>  {
    try {
      const user = await lastValueFrom(this.userserviceClient.getUserbyId({id : data.userId}).pipe(
        catchError((error) => {
          if (error.code === status.NOT_FOUND) {
            console.error(error)
            throw new RpcException({
              code: status.NOT_FOUND,
              message: `User with id ${data.userId} not found`,
            });
          }
          else {
            console.error(error);
            throw new RpcException({
            code: status.INTERNAL,
            message: 'An error occurred while fetching user information',
          });
          }
         
        }
        )))
      return await this.walletServiceService.createWallet(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
      
  }

  @GrpcMethod("WalletService", "GetWalletById")
  async getWalletById(data : GetWalletByIdRequest) : Promise<WalletResponse> {
    try {
      return await this.walletServiceService.getwalletbyid(data.id);
    } catch (error) {
      throw error;
    }
  }

  
}
