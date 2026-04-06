import { Injectable } from "@nestjs/common";
import {WalletType , CreateWalletType, WalletResponseType} from "@app/packages";
import { PrismaService } from "@app/packages";

@Injectable()
export class WalletRepository {
    constructor(private readonly prisma: PrismaService) {}

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

    async getWalletByUserId(userId: number): Promise<WalletResponseType | null> {
        try {
            const wallet = await this.prisma.wallet.findUnique({
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

    // async CreditWalletBalance(id: number, newBalance: number): Promise<WalletResponseType> {
    //     try {
    //         const wallet = await this.prisma.wallet.update({
    //             where: {
    //                 id: id
    //             },
    //             data: {
    //                 balance: newBalance
    //             }
    //         });
    //         return this.formatWalletResponse(wallet);
    //     }   
    //     catch (error) {
    //         throw error;
    //     }
    // }

    formatWalletResponse(wallet: WalletType): WalletResponseType {
        return {
            id: wallet.id,
            userId: wallet.userId,
            balance: wallet.balance,
            createdAt: wallet.createdAt.toISOString()
        }
    }
}