import {IsNotEmpty , Min} from "class-validator";
import { Transform } from "class-transformer";

export class CreateWalletDto {
    @IsNotEmpty({ message: 'UserId is required'})
    @Transform(({ value }) => Number(value))
    userId : number
}

export class CreditWalletDto {
    @IsNotEmpty({ message: 'UserId is required'})
    @Transform(({ value }) => Number(value))
    userId : number

    @IsNotEmpty({ message: 'Amount is required'})
    @Min(1 , { message: 'Amount must be greater than 0' })
    @Transform(({ value }) => Number(value))
    amount : number
}

export class DebitwalletDto {
    @IsNotEmpty({ message: 'UserId is required'})
    @Transform(({ value }) => Number(value))
     userId : number

    @IsNotEmpty({ message: 'Amount is required'})
    @Min(1 , { message: 'Amount must be greater than 0' })
    @Transform(({ value }) => Number(value))
     amount : number

}