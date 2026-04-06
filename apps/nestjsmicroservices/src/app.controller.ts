import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/user.dto';
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
}
