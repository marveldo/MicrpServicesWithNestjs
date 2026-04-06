import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME , UserServiceClient} from '@app/packages/proto/user.pb';
import { CreateUserType } from '@app/packages';
import { catchError, Observable } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { NotFoundException, ConflictException, BadRequestException, UnauthorizedException, ForbiddenException, ServiceUnavailableException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  private userService : UserServiceClient
  constructor(@Inject("USER_PACKAGE") private client : ClientGrpc){}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
  }

  createUser(data : CreateUserType) {

    return this.userService.createUser(data).pipe(
       catchError((error) => {
         this.handleGrpcError(error);
         throw new Error(`Failed to create user: ${error.message}`);
      })
    )
        
  }
    
  getUserById(id : number) {
     return this.userService.getUserbyId({id}).pipe(
       catchError((error) => {
         this.handleGrpcError(error);
         throw new Error(`Failed to get user: ${error.message}`);
      })
    )
 }

 handleGrpcError(error: any) {
  switch (error.code) {
    case status.NOT_FOUND:
      throw new NotFoundException(error.message);
    case status.ALREADY_EXISTS:
      throw new ConflictException(error.message);
    case status.INVALID_ARGUMENT:
      throw new BadRequestException(error.message);
    case status.UNAUTHENTICATED:
      throw new UnauthorizedException(error.message);
    case status.PERMISSION_DENIED:
      throw new ForbiddenException(error.message);
    case status.UNAVAILABLE:
      throw new ServiceUnavailableException('Service is currently unavailable');
    default:
      throw new InternalServerErrorException('Something went wrong');
  }
}
}