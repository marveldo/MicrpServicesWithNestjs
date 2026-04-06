import { Injectable } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { CreateUserType , Prisma} from '@app/packages';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async CreateUser(data: CreateUserType) {
    try {
      return await this.userRepository.createUser(data);
    }
    catch(error : any){
       if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            throw new RpcException({
            code: status.ALREADY_EXISTS,
            message: 'A user with this email already exists',
      });
        }
      }
      throw error;
    }
  }
  
  async GetUserById(id: number) {
    const user = await this.userRepository.getUserbyId(id);
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with id ${id} not found`,
      });
    }
    return user;
  }
}

