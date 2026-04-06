import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet-repository';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { CreateWalletType } from '@app/packages';


@Injectable()
export class WalletService {
  
  constructor(
    private readonly walletRepository: WalletRepository
  ) { }

  async createWallet(data: CreateWalletType) {
    try {
      const existingWallet = await this.walletRepository.getWalletByUserId(data.userId);
      if (existingWallet) {
        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: `A wallet for user with id ${data.userId} already exists`,
        });
      }
      const wallet = await this.walletRepository.createWallet(data);
      return wallet;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getwalletbyid(id: number) {
    const wallet = await this.walletRepository.getWalletById(id);
    if (!wallet) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Wallet with id ${id} not found`,
      });
    }
    return wallet;
  }

  async creditWallet(data: { userId: number, amount: number }) {
    try {
      return await this.walletRepository.creditWallet(
        data,
        async (tx) => {
          const wallet = await this.walletRepository.getWalletByUserId(data.userId, tx);
          if (!wallet) {
            throw new RpcException({
              code: status.NOT_FOUND,
              message: `User does not have a wallet`,
            });
          }

          return wallet;
        }
      );
    } catch (error: any) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        code: status.INTERNAL,
        message: 'Something went wrong',
      });
    }
  }

  async debitWallet(data : { userId: number, amount: number }) {
    try {
       return await this.walletRepository.DebitWallet(
        data,
        async(tx) => {
          const wallet = await this.walletRepository.getWalletByUserId(data.userId , tx)
          
          if (!wallet) {
            throw new RpcException({
              code: status.NOT_FOUND,
              message: `User does not have a wallet`,
            });
          }
          
          if (Number(wallet.balance) < Number(data.amount)) {
            throw new RpcException({
              code: status.INVALID_ARGUMENT,
              message: `Insufficient balance`,
            });
          }
          return wallet;

        })
    }catch(error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        code: status.INTERNAL,
        message: 'Something went wrong',
      });
    }
  }
}
