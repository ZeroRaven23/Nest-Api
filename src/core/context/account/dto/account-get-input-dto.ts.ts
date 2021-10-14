import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional} from "class-validator";

@Injectable()
export class AccountGetInputDto{
    @ApiProperty()
    @IsNumber()
    conta_usuario: number;
}