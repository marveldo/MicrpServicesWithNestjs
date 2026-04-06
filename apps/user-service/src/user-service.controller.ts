import { Controller, Get } from '@nestjs/common';
import { UserService } from './user-service.service';
import { GrpcMethod  } from '@nestjs/microservices';
import type {CreateUserRequest, UserResponse, GetUserbyIdRequest} from '@app/packages'

@Controller()
export class UserServiceController {
  constructor(private readonly userService: UserService) {}
    @GrpcMethod("UserService", "CreateUser")
    async createUser(data : CreateUserRequest) : Promise<UserResponse> {
       try {
        const user = await this.userService.CreateUser(data)
        return user
       }
       catch(error){
        throw error
        }
  }

   @GrpcMethod("UserService", "GetUserbyId")
    async getUserById(data :GetUserbyIdRequest ) : Promise<UserResponse> {
      try {
        const user = await this.userService.GetUserById(data.id)
        return user
       }
      catch(error){
        throw error
    }
  
}
}

