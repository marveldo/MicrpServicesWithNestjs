import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateWalletDto, CreditWalletDto, DebitwalletDto } from './dto/wallet.dto';
import { ValidationPipe } from '@nestjs/common';
import {WalletService} from './wallet.service'

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService : WalletService) {

    }

    @Post('/create')
      createWallet(
        @Body(new ValidationPipe) data : CreateWalletDto
      ) {
        try {
          const response = this.walletService.createWallet(data);
          return response
        }
        catch (error) {
          throw new Error(`Failed to create wallet: ${error}`);
        }
      }
    
      @Get('/:id')
      getWalletById(
        @Param('id', ParseIntPipe) id : number
      ) {
        try {
          const response = this.walletService.getWalletById({id});
          return response
        }
        catch (error) {
          throw new Error(`Failed to get wallet: ${error}`);
        }
      }
    
      @Post('/credit')
      creditWallet(
        @Body(new ValidationPipe) data : CreditWalletDto
       ) {
        try {
          const response = this.walletService.creditWallet({userId : data.userId , amount : data.amount});
          return response
        }
        catch (error) {
          throw new Error(`Failed to credit wallet: ${error}`);
         }
      }
      @Post('/debit')
      debitWallet(
        @Body(new ValidationPipe) data : DebitwalletDto
       ) {
        try {
          const response = this.walletService.debitWallet({userId : data.userId , amount : data.amount});
          return response
        }
        catch (error) {
          throw new Error(`Failed to debit wallet: ${error}`);
         }
       }
}
