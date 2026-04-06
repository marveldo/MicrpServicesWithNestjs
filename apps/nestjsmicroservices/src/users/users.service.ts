import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME , UserServiceClient} from '@app/packages/proto/user.pb';
import { CreateUserType, CreateWalletType } from '@app/packages';
import { catchError } from 'rxjs';
import { handleGrpcError } from '@app/packages';

@Injectable()
export class UsersService implements OnModuleInit {
    private userService : UserServiceClient

    constructor(
        @Inject("USER_PACKAGE") private client : ClientGrpc
    ){}
    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
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


}
