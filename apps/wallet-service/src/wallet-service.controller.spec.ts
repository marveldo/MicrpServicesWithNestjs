import { Test, TestingModule } from '@nestjs/testing';
import { WalletServiceController } from './wallet-service.controller';
import { WalletService } from './wallet-service.service';

describe('WalletServiceController', () => {
  let walletServiceController: WalletServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletServiceController],
      providers: [WalletService],
    }).compile();

    walletServiceController = app.get<WalletServiceController>(WalletServiceController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(walletServiceController.getHello()).toBe('Hello World!');
  //   });
  // });
});
