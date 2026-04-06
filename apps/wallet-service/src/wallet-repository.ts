import { Injectable } from "@nestjs/common";
import { WalletType, CreateWalletType, WalletResponseType } from "@app/packages";
import { PrismaService } from "@app/packages";
import { PrismaTransaction } from "@app/packages";

@Injectable()
export class WalletRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createWallet(data: CreateWalletType): Promise<WalletResponseType> {
        try {
            const walletData = {
                userId: data.userId
            }
            const wallet = await this.prisma.wallet.create({
                data: walletData
            });
            return this.formatWalletResponse(wallet)
        }
        catch (error) {
            console.error(error)
            throw error;
        }
    }

    async getWalletByUserId(userId: number, tx?: PrismaTransaction): Promise<WalletResponseType | null> {
        try {
            const prismaClient = tx ? tx : this.prisma;
            const wallet = await prismaClient.wallet.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!wallet) return null;
            return this.formatWalletResponse(wallet);
        }
        catch (error) {
            throw error;
        }
    }

    async getWalletById(id: number): Promise<WalletResponseType | null> {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: {
                    id: id
                }
            });
            if (!wallet) return null;
            return this.formatWalletResponse(wallet);
        }
        catch (error) {
            throw error;
        }
    }
    async creditWallet(
        data: { userId: number, amount: number },
        callback: (tx: PrismaTransaction) => Promise<WalletResponseType>  
    ) {
        try {
            return await this.prisma.$transaction(async (tx) => {

                const wallet = await callback(tx);

                const createdEWallet = await tx.wallet.update({
                    where: { id: wallet.id },
                    data: {
                        balance: {
                            increment: data.amount
                        }
                    }
                });
                return this.formatWalletResponse(createdEWallet);
            });
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async DebitWallet(
        data: { userId: number, amount: number },
        callback: (tx: PrismaTransaction) => Promise<WalletResponseType>  
    ) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const wallet = await callback(tx);

                const updatedWallet = await tx.wallet.update({
                    where: { id: wallet.id },
                    data: {
                        balance: {
                            decrement : data.amount
                        }
                    }
                });
                return this.formatWalletResponse(updatedWallet);
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    formatWalletResponse(wallet: WalletType): WalletResponseType {
        return {
            id: wallet.id,
            userId: wallet.userId,
            balance: wallet.balance,
            createdAt: wallet.createdAt.toISOString()
        }
    }
}