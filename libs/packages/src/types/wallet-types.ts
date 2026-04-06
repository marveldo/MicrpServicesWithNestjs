import { Wallet } from "../generated/prisma";
export type WalletType = Wallet
export type CreateWalletType = Omit<WalletType, "id" | "createdAt" | "balance"> 
export type WalletResponseType = Omit<WalletType, "createdAt"> & {
    createdAt : string
};