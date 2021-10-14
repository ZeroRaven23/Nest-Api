import { Body, Controller, Delete, Get, Header, Headers, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountGetInputDto } from "src/core/context/account/dto/account-get-input-dto.ts";
import { UserCpfInputDto } from "src/core/context/user";

import { GetAccountUseCase, AddAccountUseCase, AccountInputDto, PatchAccountUseCase, DeleteAccountUseCase } 
from "../../core/context/account/";

@ApiTags('account')
@Controller('/account')
export class AccountController {
    constructor(public getAccountUseCase: GetAccountUseCase,
        public addAccountUseCase: AddAccountUseCase,
        public patchAccountUseCase: PatchAccountUseCase,
        public deleteAccountUseCase: DeleteAccountUseCase) {
    }
    @Get('/')
    getAccount(@Body() accountGetInputDto:AccountGetInputDto) {
        return this.getAccountUseCase.getAccount(accountGetInputDto);
    }
    @Post("/")
    addAccount(@Body() accountInputDto: AccountInputDto) {
        return this.addAccountUseCase.addAccount(accountInputDto);

    }
    @Patch("/")
    patchAccount(
        @Body() accountInputDto: AccountInputDto,) {
        return this.patchAccountUseCase.patchAccount(accountInputDto );
    }
    @Delete(":id")
    deleteaccount(
        @Param("id") id: number) {
        return this.deleteAccountUseCase.deleteAccount(id);
    }
}