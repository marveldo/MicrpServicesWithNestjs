import {IsNotEmpty} from "class-validator";
import { Transform } from "class-transformer";

export class CreateWalletDto {
    @IsNotEmpty({ message: 'UserId is required'})
    @Transform(({ value }) => Number(value))
    userId : number
}
