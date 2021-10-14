import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

@Injectable()
export class UserInputDto{
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    cpf: string;

    @ApiProperty()
    @IsString()
    email: string;

    @IsOptional()
    @IsNumber()
    conta: number;
}