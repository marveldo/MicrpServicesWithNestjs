import { PrismaService } from "@app/packages";
import { CreateUserType, UserResponseType, UserType } from "@app/packages";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateUserType): Promise<UserResponseType> {
        try {
            const userData = {
                name: data.name,
                email: data.email
            }
            const user = await this.prisma.user.create({
                data: userData
            });
            return this.formatUserResponse(user)
        }
        catch (error) {
            throw error;
        }

    }

    async getUserbyId(id: number): Promise<UserResponseType | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            if (!user) return null;
            return this.formatUserResponse(user);
        }
        catch (error) {
            throw error;
        }

    }
    formatUserResponse(user: UserType): UserResponseType {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString()
        }
    }
}
