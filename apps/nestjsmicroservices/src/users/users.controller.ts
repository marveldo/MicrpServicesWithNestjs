import {UsersService} from "./users.service"
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto} from './dto/user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService) {}
    @Post('/create')
      createUser(
        @Body(new ValidationPipe) data : CreateUserDto 
      ) {
        try {
          const response =  this.usersService.createUser(data);
          return response
        }
        catch (error) {
          throw new Error(`Failed to create user: ${error}`);
        }
       
      }
      @Get('/:id')
      getUserById(
        @Param('id', ParseIntPipe) id : number
      ) {
        try {
          const response = this.usersService.getUserById(id);
          return response
        }
        catch (error) {
          throw new Error(`Failed to get user: ${error}`);
        }
      }
}
