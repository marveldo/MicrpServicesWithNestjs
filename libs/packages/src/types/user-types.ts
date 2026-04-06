import { User } from "../generated/prisma";
export type UserType = User
export type CreateUserType = Omit<UserType, "id" | "createdAt">;
export type UserResponseType = Omit<UserType, "createdAt"> & {
    createdAt : string
};
