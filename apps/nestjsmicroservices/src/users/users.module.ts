import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule , Transport} from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports : [
    ClientsModule.register([
          {
         name: "USER_PACKAGE",
         transport: Transport.GRPC,  
         options: {
          package: 'user',
          protoPath: join(__dirname, '../../../../libs/packages/src/proto/user.proto'),
          url: 'localhost:3002'
        }
       },
      
        ]),
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
