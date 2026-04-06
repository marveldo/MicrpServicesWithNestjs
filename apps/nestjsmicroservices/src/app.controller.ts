import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto} from './dto/user.dto';
import { CreateWalletDto } from './dto/wallet.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('/user-create')
  createUser(
    @Body(new ValidationPipe) data : CreateUserDto 
  ) {
    try {
      const response =  this.appService.createUser(data);
      return response
    }
    catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
   
  }
  @Get('/user/:id')
  getUserById(
    @Param('id', ParseIntPipe) id : number
  ) {
    try {
      const response = this.appService.getUserById(id);
      return response
    }
    catch (error) {
      throw new Error(`Failed to get user: ${error}`);
    }
  }

  @Post('/wallet-create')
  createWallet(
    @Body(new ValidationPipe) data : CreateWalletDto
  ) {
    try {
      const response = this.appService.createWallet(data);
      return response
    }
    catch (error) {
      throw new Error(`Failed to create wallet: ${error}`);
    }
  }

  @Get('/wallet/:id')
  getWalletById(
    @Param('id', ParseIntPipe) id : number
  ) {
    try {
      const response = this.appService.getWalletById({id});
      return response
    }
    catch (error) {
      throw new Error(`Failed to get wallet: ${error}`);
    }
  }
}
