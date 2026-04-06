import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserService } from './user-service.service';
import { PrismaModule } from '@app/packages';
import { UserRepository } from './user-repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserServiceController],
  providers: [UserService, UserRepository],
})
export class UserServiceModule {}
