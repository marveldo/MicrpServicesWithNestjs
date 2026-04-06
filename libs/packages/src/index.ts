export * from './prisma/prisma.module';
export * from './prisma/prisma.service';
export * from "./generated/prisma"
export type {
  CreateUserRequest,
  UserResponse,
  GetUserbyIdRequest
} from './proto/user.pb';

export type {
  CreateWalletRequest,
  WalletResponse,
  CreditWalletRequest,
  DebitWalletRequest
} from './proto/wallet.pb';

export * from './types/user-types';